import { LayerType } from "@/app/shared/components/app-geovisualization/types/layers";
import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
// import { LayerType } from "volateq-geovisualization";
import { KeyFigureLayer } from "./key-figures/shared/key-figure-layer";
import { KEY_FIGURE_LAYERS } from "./layers";
import { GroupKPILayer } from "./types";

/**
 * Component -> PIGroup -> PICheckbox
 * Component -> PICheckbox
 */
export class PILayersHierarchy {
  private parentComponentKpiLayers!: GroupKPILayer[];

  constructor(
    private readonly vueComponent: Vue,
    private readonly analysisResults: AnalysisResultDetailedSchema[]
  ) {
    this.createGroupedKPILayers();
  }

  public getGeoJSONLayers(): LayerType[] {
    return this.parentComponentKpiLayers.map(parentComponentKpiLayer => parentComponentKpiLayer.groupLayer)
  }

  public getAllChildLayers(): KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[] {
    const allChildLayers: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[] = [];

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
        for (const keyFigureLayer of groupKpiLayer.keyFigureLayers) {
          const visible = analysisResultId && keyFigureLayer.analysisResult.id == analysisResultId || false;
          keyFigureLayer.setVisible(visible);

          if (visible) {
            allInvisble = false;
          }
        }

        if (groupKpiLayer.subGroupLayers) {
          groupKpiLayer.groupLayer.visible = setVisibilityRec(groupKpiLayer.subGroupLayers);
        } else {
          groupKpiLayer.groupLayer.visible = !allInvisble
        }
      }

      return !allInvisble;
    }

    setVisibilityRec(this.parentComponentKpiLayers);
  }

  private createGroupedKPILayers() {
    const parentComponentLayers: Record<number, GroupKPILayer> = {};

    for (const analysisResult of this.analysisResults) {
      for (const keyFigure of analysisResult.key_figures) {
        if (!(keyFigure.component.id in parentComponentLayers)) {
          parentComponentLayers[keyFigure.component.id] = {
            componentId: keyFigure.component.id,
            groupLayer: {
              name: this.vueComponent.$t(keyFigure.component.abbrev).toString(),
              type: "group",
              childLayers: [],
              visible: false,
              groupSelection: true,
            },
            keyFigureLayers: [],
            subGroupLayers: [],
          }
        }

        const kpiLayer = this.createKPILayers(analysisResult, keyFigure.id);
        if (kpiLayer) {
          const groupLayer = parentComponentLayers[keyFigure.component.id];
          if (kpiLayer instanceof KeyFigureLayer) {
            groupLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer())
            groupLayer.keyFigureLayers.push(kpiLayer)
          } else {
            groupLayer.groupLayer.childLayers.push(kpiLayer.groupLayer);
            groupLayer.subGroupLayers!.push(kpiLayer);
          }
        }
      }
    }

    this.parentComponentKpiLayers = Object.keys(parentComponentLayers).map(componentId => parentComponentLayers[componentId]);
  }

  private createKPILayers(
    anaysisResult: AnalysisResultDetailedSchema,
    keyFigureId: AnalysisResultKeyFigure
  ): KeyFigureLayer<AnalysisResultCspPtcSchemaBase> | GroupKPILayer | undefined {
    const keyFigureLayer = KEY_FIGURE_LAYERS.find(keyFigureLayer => keyFigureLayer.keyFigureId === keyFigureId);
    if (!keyFigureLayer) {
      return undefined;
    }

    if (!keyFigureLayer.layers) {
      return new (keyFigureLayer.layerType)(this.vueComponent, anaysisResult, keyFigureLayer.keyFigureId, keyFigureLayer.keyFigureInfo);
    }

    const groupKpiLayer: GroupKPILayer = {
      groupLayer: {
        name: keyFigureLayer.keyFigureInfo?.templateName || this.vueComponent.$t(keyFigureLayer.keyFigureInfo!.keyName!).toString(),
        type: "group",
        childLayers: [],
        visible: false,
        groupSelection: true,
      },
      keyFigureLayers: [],
    };

    for (const childLayer of keyFigureLayer.layers) {
      const childKeyFigureInfo = childLayer.keyFigureInfo || {};
      childKeyFigureInfo.displayName = childLayer.keyFigureInfo!.displayName || keyFigureLayer.keyFigureInfo?.displayName;
      childKeyFigureInfo.keyName = childLayer.keyFigureInfo!.keyName || keyFigureLayer.keyFigureInfo?.keyName;

      const kpiLayer: KeyFigureLayer<AnalysisResultCspPtcSchemaBase> = new (keyFigureLayer.layerType)(
        this.vueComponent, 
        anaysisResult,
        keyFigureLayer.keyFigureId,
        childKeyFigureInfo,
        childLayer.queryColor
      );
      groupKpiLayer.keyFigureLayers.push(kpiLayer);
      groupKpiLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer());
    }

    return groupKpiLayer;
  }
}