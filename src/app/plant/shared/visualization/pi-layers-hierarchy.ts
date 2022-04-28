import { LayerType } from "@/app/shared/components/app-geovisualization/types/layers";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureColorScheme, KeyFigureInfo } from "./layers/types";
import { GroupKPILayer, KeyFigureTypeMap } from "./types";

/**
 * Component -> PIGroup -> PICheckbox
 * Component -> PICheckbox
 */
export class PILayersHierarchy {
  private parentComponentKpiLayers!: GroupKPILayer[];
  private readonly analysisResultIds: (string | string[])[] = [];

  constructor(
    private readonly vueComponent: Vue,
    private readonly analysisResults: AnalysisResultDetailedSchema[],
    private readonly keyFigureLayers: KeyFigureTypeMap[]
  ) {
    this.createGroupedKPILayers();
  }

  public addAnalysisResultIds(analysisResultIds: string | string[]) {
    this.analysisResultIds.push(analysisResultIds);
  }

  public getGeoJSONLayers(): LayerType[] {
    return this.parentComponentKpiLayers.map(parentComponentKpiLayer => parentComponentKpiLayer.groupLayer);
  }

  public getAllChildLayers(): KeyFigureLayer<AnalysisResultSchemaBase>[] {
    const allChildLayers: KeyFigureLayer<AnalysisResultSchemaBase>[] = [];

    function getAllChildLayersRec(groupKpiLayers: GroupKPILayer[]) {
      for (const groupKpiLayer of groupKpiLayers) {
        for (const keyFigureLayer of groupKpiLayer.keyFigureLayers) {
          allChildLayers.push(keyFigureLayer);
        }

        groupKpiLayer.subGroupLayers && getAllChildLayersRec(groupKpiLayer.subGroupLayers);
      }
    }

    getAllChildLayersRec(this.parentComponentKpiLayers);

    return allChildLayers;
  }

  public setVisibility(analysisResultId: string | undefined): void {
    function setVisibilityRec(groupKpiLayers: GroupKPILayer[]) {
      let allInvisble = true;
      for (const groupKpiLayer of groupKpiLayers) {
        let allKeyFiguresInvisible = true;
        for (const keyFigureLayer of groupKpiLayer.keyFigureLayers) {
          const visible = (analysisResultId && keyFigureLayer.analysisResult.id == analysisResultId) || false;
          keyFigureLayer.setVisible(visible);

          if (visible) {
            allKeyFiguresInvisible = false;
          }
        }

        if (groupKpiLayer.subGroupLayers && groupKpiLayer.subGroupLayers.length > 0) {
          groupKpiLayer.groupLayer.visible = setVisibilityRec(groupKpiLayer.subGroupLayers);
        } else {
          groupKpiLayer.groupLayer.visible = !allKeyFiguresInvisible;
        }

        if (!allKeyFiguresInvisible) {
          allInvisble = false;
        }
      }

      return !allInvisble;
    }

    setVisibilityRec(this.parentComponentKpiLayers);
  }

  public toggleMultiSelection(multiSelection: boolean): void {
    for (const componentId in this.parentComponentKpiLayers) {
      this.parentComponentKpiLayers[componentId].groupLayer.singleSelection = !multiSelection;
    }
    for (const childLayer of this.getAllChildLayers()) {
      childLayer.setColorScheme(multiSelection ? KeyFigureColorScheme.RAINBOW : KeyFigureColorScheme.TRAFFIC_LIGHT);
      childLayer.reloadLayer();
    }
  }

  public toggleShowUndefined(showUndefined: boolean): void {
    for (const childLayer of this.getAllChildLayers()) {
      if (childLayer.query?.undefined !== undefined && childLayer.keyFigureInfo.displayName !== "not-measured") {
        childLayer.query.undefined = showUndefined && 1 || 0;
        childLayer.reloadLayer();
      }
    }
  }

  private createGroupedKPILayers() {
    const parentComponentLayers: Record<number, GroupKPILayer> = {};

    const currentChildLayers = this.getAllChildLayers();

    for (const analysisResultIds in this.analysisResultIds) {
      if (Array.isArray(analysisResultIds)) { 
        // compare mode

      } else {
        const analysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultIds)!;
        for (const keyFigureTypeMap of this.keyFigureLayers) {
          const keyFigure = analysisResult.key_figures.find(keyFigure => keyFigure.id === keyFigureTypeMap.keyFigureId);
          const isNewAnalysisResult = !currentChildLayers
            .find(keyFigureLayer => keyFigureLayer.analysisResult.id === analysisResult.id);

          if (keyFigure && isNewAnalysisResult) {
            if (!(keyFigure.component.id in parentComponentLayers)) {
              parentComponentLayers[keyFigure.component.id] = {
                componentId: keyFigure.component.id,
                groupLayer: {
                  name: this.vueComponent.$t(keyFigure.component.abbrev).toString(),
                  type: "group",
                  childLayers: [],
                  visible: false,
                  singleSelection: true,
                },
                keyFigureLayers: [],
                subGroupLayers: [],
              };
            }
  
            const kpiLayer = this.createKPILayers(analysisResult, keyFigureTypeMap);
            if (kpiLayer) {
              const groupLayer = parentComponentLayers[keyFigure.component.id];
              if (kpiLayer instanceof KeyFigureLayer) {
                groupLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
                groupLayer.keyFigureLayers.push(kpiLayer);
              } else {
                groupLayer.groupLayer.childLayers.push(kpiLayer.groupLayer);
                groupLayer.subGroupLayers!.push(kpiLayer);
              }
            }
          }
        }
      }
      
    }

    this.parentComponentKpiLayers = Object.keys(parentComponentLayers).map(
      componentId => parentComponentLayers[componentId]
    );
  }

  private createKPILayers(
    anaysisResult: AnalysisResultDetailedSchema,
    keyFigureLayer: KeyFigureTypeMap
  ): KeyFigureLayer<AnalysisResultSchemaBase> | GroupKPILayer | undefined {
    if (!keyFigureLayer.subLayers) {
      return new keyFigureLayer.layerType(
        this.vueComponent,
        anaysisResult,
        keyFigureLayer.keyFigureId,
        keyFigureLayer.keyFigureInfo,
        keyFigureLayer.query,
        keyFigureLayer.color
      );
    }

    const groupKpiLayer: GroupKPILayer = {
      groupLayer: {
        name:
          keyFigureLayer.keyFigureInfo?.templateName ||
          this.vueComponent.$t(keyFigureLayer.keyFigureInfo!.keyName!).toString(),
        type: "group",
        childLayers: [],
        visible: false,
        singleSelection: false,
      },
      keyFigureLayers: [],
    };

    for (const childLayer of keyFigureLayer.subLayers) {
      if (!childLayer.displayCondition || childLayer.displayCondition(anaysisResult)) {
        const childKeyFigureInfo: KeyFigureInfo = childLayer.keyFigureInfo || {};
        childKeyFigureInfo.displayName =
          childLayer.keyFigureInfo!.displayName || keyFigureLayer.keyFigureInfo?.displayName;
        childKeyFigureInfo.keyName = keyFigureLayer.keyFigureInfo?.keyName;

        const kpiLayer: KeyFigureLayer<AnalysisResultSchemaBase> = new keyFigureLayer.layerType(
          this.vueComponent,
          anaysisResult,
          keyFigureLayer.keyFigureId,
          childKeyFigureInfo,
          childLayer.query,
          childLayer.color
        );
        groupKpiLayer.keyFigureLayers.push(kpiLayer);
        groupKpiLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
      }
    }

    return groupKpiLayer;
  }
}
