import { GeoJSONLayer, GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ReferenceMeasurementLayer } from "./layers/reference-measurement-layer";
import { IPlantVisualization } from "./types";

export class RefMeasureLayers {
  private selectedAnalysisResult: AnalysisResultDetailedSchema | undefined;
  private analysisResultIds: string[] = [];
  
  public readonly referenceMeasurementLayers: ReferenceMeasurementLayer[] = [];
  public readonly geoJsonLayers: GeoJSONLayer[] = [];

  public readonly groupLayer: GroupLayer;
  
  constructor(
    private readonly vueComponent: BaseAuthComponent & IPlantVisualization,
    private readonly analysisResults: AnalysisResultDetailedSchema[],
  ) {
    this.groupLayer = {
      name: this.vueComponent.$t("reference-measurements").toString(),
      type: "group",
      visible: false,
      childLayers: this.geoJsonLayers,
    };
  }

  public async addAndSelectAnalysisResult(analysisResultId: string | undefined) {
    this.selectedAnalysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultId);
    
    if (analysisResultId && !this.analysisResultIds.find(id => id === analysisResultId)) {
      this.analysisResultIds.push(analysisResultId);

      await this.addLayers();
    }
  }

  private async addLayers(): Promise<void> {
    if (!this.selectedAnalysisResult) {
      return;
    }

    const refMeasures = await volateqApi.getReferenceMeasurements(this.selectedAnalysisResult.analysis.id);
    for (const refMeasure of refMeasures) {
      const refMeasureLayer = new ReferenceMeasurementLayer(this.vueComponent, this.selectedAnalysisResult, refMeasure);
      this.referenceMeasurementLayers.push(refMeasureLayer);
      this.geoJsonLayers.push(refMeasureLayer.toGeoLayer());
    }
  }

  public updateVisibility(): void {
    let allInvisble = true;
    for (const refMeasureLayer of this.referenceMeasurementLayers) {
      const visible = refMeasureLayer.referenceMeasurement.analysis_id === this.selectedAnalysisResult?.analysis.id;
      
      refMeasureLayer.setVisible(visible);

      if (visible) {
        allInvisble = false;
      }
    }

    if (allInvisble) {
      this.groupLayer.visible = false;
    }
  }
}