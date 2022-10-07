import { GeoJSONLayer, GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ReferenceMeasurementLayer } from "./layers/reference-measurement-layer";
import { IPlantVisualization } from "./types";

export class RefMeasureLayers {
  private selectedAnalysis: AnalysisForViewSchema | undefined;
  private analysesIds: string[] = [];
  
  public readonly referenceMeasurementLayers: ReferenceMeasurementLayer[] = [];
  public readonly geoJsonLayers: GeoJSONLayer[] = [];

  public readonly groupLayer: GroupLayer;
  
  constructor(
    private readonly vueComponent: BaseAuthComponent & IPlantVisualization,
    private readonly analyses: AnalysisForViewSchema[],
  ) {
    this.groupLayer = {
      name: this.vueComponent.$t("reference-measurements").toString(),
      type: "group",
      visible: false,
      childLayers: this.geoJsonLayers,
      icon: "clipboard-check",
    };
  }

  public async addAndSelectAnalysis(analysisId: string | undefined) {
    this.selectedAnalysis = this.analyses.find(analysis => analysis.id === analysisId);
    
    if (analysisId && !this.analysesIds.find(id => id === analysisId)) {
      this.analysesIds.push(analysisId);

      await this.addLayers();
    }
  }

  private async addLayers(): Promise<void> {
    if (!this.selectedAnalysis) {
      return;
    }

    for (const refMeasure of this.selectedAnalysis.reference_measurements) {
      const refMeasureLayer = new ReferenceMeasurementLayer(this.vueComponent, this.selectedAnalysis.analysis_result || null, refMeasure);
      this.referenceMeasurementLayers.push(refMeasureLayer);
      this.geoJsonLayers.push(refMeasureLayer.toGeoLayer());
    }
  }

  public updateVisibility(): void {
    let allInvisble = true;
    for (const refMeasureLayer of this.referenceMeasurementLayers) {
      const visible = refMeasureLayer.referenceMeasurement.analysis_id === this.selectedAnalysis?.id;
      
      refMeasureLayer.setVisible(visible);

      if (visible) {
        allInvisble = false;
      }
    }

    this.groupLayer.visible = !allInvisble;
  }
}