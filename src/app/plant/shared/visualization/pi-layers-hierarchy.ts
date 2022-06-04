import { GroupLayer, LayerType } from "@/app/shared/components/app-geovisualization/types/layers";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { KeyFigureColorScheme, KeyFigureInfo } from "./layers/types";
import { GroupKPILayer, KeyFigureTypeMap } from "./types";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";

/**
 * Component -> PIGroup -> PICheckbox
 * Component -> PICheckbox
 */
export class PILayersHierarchy {
  private readonly parentComponentKpiLayers: GroupKPILayer[];
  // Each groupLayer refs to the groupLayer object in parentComponentKpiLayers
  public readonly groupLayers: LayerType[];
  private readonly analysisResultIds: string[];
  private selectedAnalysisResultId: string | undefined;
  private compareAnylysisResultId: string | undefined;

  constructor(
    private readonly vueComponent: Vue,
    private readonly analysisResults: AnalysisResultDetailedSchema[],
    private readonly keyFigureLayers: KeyFigureTypeMap[]
  ) {
    this.parentComponentKpiLayers = [];
    this.groupLayers = [];
    this.analysisResultIds = [];
  }

  public addAndSelectAnalysisResult(analysisResultId: string | undefined) {
    this.selectedAnalysisResultId = analysisResultId
    
    if (analysisResultId && !this.analysisResultIds.find(id => id === analysisResultId)) {
      this.analysisResultIds.push(analysisResultId);

      this.updateGroupedKPILayers();
    }
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

  public toggleMultiSelection(multiSelection: boolean, deep = false): void {
    for (const componentId in this.parentComponentKpiLayers) {
      this.parentComponentKpiLayers[componentId].groupLayer.singleSelection = !multiSelection;
      
      if (deep) {
        if (this.parentComponentKpiLayers[componentId].subGroupLayers) {
          for (const childLayer of this.parentComponentKpiLayers[componentId].groupLayer.childLayers) {
            (childLayer as GroupLayer).singleSelection = !multiSelection;
          }
        }
      }
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

  public setCompareAnalysisResult(analysisResult: AnalysisResultDetailedSchema | null) {
    this.compareAnylysisResultId = analysisResult?.id;

    for (const childLayer of this.getAllChildLayers()) {
      childLayer.setCompareAnalysisResult(analysisResult);
      if (childLayer.isCompareEnabled) {
        childLayer.reloadLayer();
      }
    }
  }

  private updateGroupedKPILayers() {
    const currentChildLayers = this.getAllChildLayers();

    for (const analysisResultIds of this.analysisResultIds) {
      const analysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultIds)!;
      for (const keyFigureTypeMap of this.keyFigureLayers) {
        const keyFigure: KeyFigureSchema | undefined = analysisResult.key_figures
          .find(keyFigure => keyFigure.id === keyFigureTypeMap.keyFigureId);
        const isNewAnalysisResult = !currentChildLayers
          .find(keyFigureLayer => keyFigureLayer.analysisResult.id === analysisResult.id);

        if (keyFigure && isNewAnalysisResult) {
          const parentComponentKpiLayer = this.getOrCreateParentComponentLayer(keyFigure)

          const kpiLayer = this.createKPILayers(analysisResult, keyFigureTypeMap);
          if (kpiLayer) {
            if (kpiLayer instanceof KeyFigureLayer) {
              parentComponentKpiLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
              parentComponentKpiLayer.keyFigureLayers.push(kpiLayer);
            } else {
              parentComponentKpiLayer.groupLayer.childLayers.push(kpiLayer.groupLayer);
              parentComponentKpiLayer.subGroupLayers!.push(kpiLayer);
            }
          }
        }
      }
    }
  }

  public updateVisibility(): void {
    const setVisibilityRec = (groupKpiLayers: GroupKPILayer[]) => {
      let allInvisble = true;
      for (const groupKpiLayer of groupKpiLayers) {
        let allKeyFiguresInvisible = true;
        for (const keyFigureLayer of groupKpiLayer.keyFigureLayers) {
          let visible = (this.selectedAnalysisResultId && keyFigureLayer.analysisResult.id == this.selectedAnalysisResultId) || false;
          if (visible && this.compareAnylysisResultId) {
            visible = keyFigureLayer.hasKeyFigureForCompareAnalysisResult();
          }

          keyFigureLayer.setVisible(visible);

          if (visible) {
            allKeyFiguresInvisible = false;
          }
        }

        if (groupKpiLayer.subGroupLayers && groupKpiLayer.subGroupLayers.length > 0) {
          const childLayersVisible = setVisibilityRec(groupKpiLayer.subGroupLayers);
          groupKpiLayer.groupLayer.visible = !allKeyFiguresInvisible || childLayersVisible;
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

  public clearOrthoImages(): void {
    for (const layer of this.getAllChildLayers()) {
      layer.removeOrthoImageFeatures();
    }
  }

  private getOrCreateParentComponentLayer(keyFigure: KeyFigureSchema): GroupKPILayer {
    let parentComponentKpiLayer = this.parentComponentKpiLayers
      .find(parentComponentKpiLayer => parentComponentKpiLayer.componentId === keyFigure.component_id);
    
    if (!parentComponentKpiLayer) {
      parentComponentKpiLayer = {
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

      this.parentComponentKpiLayers.push(parentComponentKpiLayer);
      this.groupLayers.push(parentComponentKpiLayer.groupLayer);
    }

    return parentComponentKpiLayer;
  }

  private createKPILayers(
    anaysisResult: AnalysisResultDetailedSchema,
    keyFigureLayer: KeyFigureTypeMap
  ): KeyFigureLayer<AnalysisResultSchemaBase> | GroupKPILayer {
    if (!keyFigureLayer.subLayers) {
      return new keyFigureLayer.layerType(
        this.vueComponent,
        anaysisResult,
        keyFigureLayer.keyFigureId,
        keyFigureLayer.keyFigureInfo,
        keyFigureLayer.query,
        keyFigureLayer.color,
        keyFigureLayer.selected
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
        id: `group__
          ${anaysisResult.id}__
          ${keyFigureLayer.keyFigureInfo?.keyName || keyFigureLayer.keyFigureInfo?.templateName || ""}`,
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
          childLayer.color,
          keyFigureLayer.selected,
        );
        groupKpiLayer.keyFigureLayers.push(kpiLayer);
        groupKpiLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
      }
    }

    return groupKpiLayer;
  }
}
