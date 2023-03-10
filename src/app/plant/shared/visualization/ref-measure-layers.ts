import { GeoJSONLayer, GroupLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ReferenceMeasurementSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
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

  public addAndSelectAnalysis(analysisId: string | undefined) {
    this.selectedAnalysis = this.analyses.find(analysis => analysis.id === analysisId);
    
    if (analysisId && !this.analysesIds.find(id => id === analysisId)) {
      this.analysesIds.push(analysisId);

      this.addLayers();
    }
  }

  public async updateRefMeasuresOfSelectedAnalysis() {
    if (!this.selectedAnalysis) {
      throw new Error("Cannot update reference measurements. No analysis selected");
    }

    const refMeasures = await volateqApi.getReferenceMeasurements(this.selectedAnalysis.id);
    for (const refMeasure of refMeasures) {
      const existingRefMeasureLayer = this.referenceMeasurementLayers
        .find(rml => rml.referenceMeasurement.id === refMeasure.id);
      
      if (existingRefMeasureLayer) {
        existingRefMeasureLayer.reloadLayer();
        if (existingRefMeasureLayer.getSelected()) {
          existingRefMeasureLayer.rerender();
        }
      } else {
        this.addLayer(refMeasure);
      }
    }

    let deletedRefMeasureLayerId: string | undefined = undefined;
    let deletedRefMeasureLayerIndex = -1;
    this.referenceMeasurementLayers.forEach((rml, i) => {
      if (!refMeasures.find(rm => rm.id === rml.referenceMeasurement.id)) {
        deletedRefMeasureLayerId = rml.id;
        deletedRefMeasureLayerIndex = i;

        return;
      }
    });

    if (deletedRefMeasureLayerId && deletedRefMeasureLayerIndex != -1) {
      this.referenceMeasurementLayers.splice(deletedRefMeasureLayerIndex, 1);
      
      const layerIndex = this.geoJsonLayers.findIndex(l => l.id === deletedRefMeasureLayerId);
      if (layerIndex != -1) {
        this.geoJsonLayers.splice(layerIndex, 1);
      }
    }
  }

  private addLayers() {
    if (!this.selectedAnalysis) {
      return;
    }

    for (const refMeasure of this.selectedAnalysis.reference_measurements) {
      this.addLayer(refMeasure);
    }
  }

  private addLayer(refMeasure: ReferenceMeasurementSchema) {
    const refMeasureLayer = new ReferenceMeasurementLayer(this.vueComponent, this.selectedAnalysis!, refMeasure);
    this.referenceMeasurementLayers.push(refMeasureLayer);
    this.geoJsonLayers.push(refMeasureLayer.toGeoLayer());
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

  public async reselectAllLayers(): Promise<void> {
    const reselectUserMails = this.referenceMeasurementLayers
      .filter(l => l.getSelected())
      .map(l => l.referenceMeasurement.user_created.email);

    for (const refMeasureLayer of this.referenceMeasurementLayers) {
      const isLayerOfSelectedAnalysis = refMeasureLayer.referenceMeasurement.analysis_id === this.selectedAnalysis?.id;

      if (!isLayerOfSelectedAnalysis && refMeasureLayer.getSelected()) {
        await refMeasureLayer.setSelected(false);
      }
      if (isLayerOfSelectedAnalysis && 
        reselectUserMails.includes(refMeasureLayer.referenceMeasurement.user_created.email)) 
      {
        await refMeasureLayer.setSelected(true);  
      }
    }
  }
}