import { GEO_JSON_OPTIONS } from "@/app/shared/components/app-map/constants";
import { VectorGeoLayer } from "@/app/shared/components/app-map/types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Feature, Map } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { LayerColor } from "./types";
import { AppSeqEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { Legend } from "../types";
import { i18n } from "@/main";

export enum RefMeasureLayerEvent {
  ON_REF_MEASURE_LAYERS_CHANGED = "ON_REF_MEASURE_LAYERS_CHANGED",
}

export class RefMeasureLayersService extends AppSeqEventService<RefMeasureLayerEvent> {
  private static readonly refMeasureLayersServices: Record<string, RefMeasureLayersService> = {};

  public static get(plant: PlantSchema, map: Map): RefMeasureLayersService {
    if (!(plant.id in this.refMeasureLayersServices)) {
      this.refMeasureLayersServices[plant.id] = new RefMeasureLayersService(plant, map);
    }

    return this.refMeasureLayersServices[plant.id];
  }

  private readonly analysesRefMeasureLayers: Record<string, VectorGeoLayer> = {};
  private currentRefMeasurePCSCodes: Record<string, true> = {};
  private currentAnalysis: AnalysisForViewSchema | undefined = undefined;

  public readonly refMeasurLegendId = "refMeasureLegend";

  private constructor(
    private readonly plant: PlantSchema,
    private readonly map: Map,
  ) {
    super();
  }

  public hasPCS(pcs: string): boolean {
    return pcs in this.currentRefMeasurePCSCodes;
  }

  public getLegend(): Legend | undefined {
    if (this.currentAnalysis && (this.currentAnalysis.id in this.analysesRefMeasureLayers)) {
      return {
        id: this.refMeasurLegendId,
        entries: [
          {
            color: LayerColor.volateqBlue,
            name: this.analysesRefMeasureLayers[this.currentAnalysis.id].getSource()!.getFeatures().length + 
              " " + i18n.t("reference-measurements").toString(),
          }
        ],
      }
    }
  }

  public async loadLayersForAnalysis(analysis: AnalysisForViewSchema | undefined) {
    this.currentAnalysis = analysis;
    this.currentRefMeasurePCSCodes = {};

    for (const analysisId in this.analysesRefMeasureLayers) {
      this.analysesRefMeasureLayers[analysisId].setVisible(false);
    }

    if (analysis) {
      if (analysis.reference_measurements.length > 0) {
        if (analysis.id in this.analysesRefMeasureLayers) {
          this.analysesRefMeasureLayers[analysis.id].setVisible(true);
        } else {
          this.analysesRefMeasureLayers[analysis.id] = await this.loadLayer(analysis);
        }
  
        for (const feature of this.analysesRefMeasureLayers[analysis.id].getSource()!.getFeatures()) {
          this.currentRefMeasurePCSCodes[feature.getProperties().name] = true;
        }
      }
    }

    await this.emit(this.plant.id, RefMeasureLayerEvent.ON_REF_MEASURE_LAYERS_CHANGED);
  }

  private async loadLayer(analysis: AnalysisForViewSchema): Promise<VectorGeoLayer> {
    const features: Feature<Geometry>[] = [];
    for (const refMeasure of analysis.reference_measurements) {
      features.push(...(new GeoJSON(GEO_JSON_OPTIONS).readFeatures(
        await volateqApi.getReferenceMeasurementValuesGeoVisual(refMeasure.id))
      ));
    }

    for (const feature of features) {
      feature.setStyle(new Style({
        stroke: new Stroke({
          color: LayerColor.volateqBlue,
          width: 3,
        }),
      }));
    }

    const vectorGeoLayer = new VectorImageLayer({
      properties: { id: `${analysis.id}__refMeasures` },
      source: new VectorSource({ features }),
      // A larger ratio avoids cut images during panning, but will cause a decrease in performance.
      // See https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorImage-VectorImageLayer.html
      imageRatio: 1,
      zIndex: 1,
    });

    this.map.addLayer(vectorGeoLayer);

    return vectorGeoLayer;
  }
}