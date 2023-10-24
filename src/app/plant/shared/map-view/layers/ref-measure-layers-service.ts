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
import { Circle, Stroke, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import { LayerColor } from "./types";
import { AppSeqEventService } from "@/app/shared/services/app-event-service/app-event-service";
import { Legend } from "../types";
import { i18n } from "@/main";
import { LayersService } from "./layers-service";
import { setOpacityForColor } from "@/app/shared/services/helper/color-helper";

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
    if (this.loadedLayer) {
      return {
        id: this.refMeasurLegendId,
        entries: [
          {
            color: LayerColor.volateqBlue,
            name: this.loadedLayer.getSource()!.getFeatures().length + 
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

  public async reload() {
    if (this.currentAnalysis && this.currentAnalysis.id in this.analysesRefMeasureLayers) {
      const loadedLayer = this.analysesRefMeasureLayers[this.currentAnalysis.id];
      loadedLayer.setVisible(false);
      this.map.removeLayer(loadedLayer);
      delete this.analysesRefMeasureLayers[this.currentAnalysis.id];

      await this.loadLayersForAnalysis(this.currentAnalysis);

      LayersService.get(this.plant.id).rerenderLoadedLayers();
    }
  }

  public get loadedLayer(): VectorGeoLayer | null {
    if (this.currentAnalysis && (this.currentAnalysis.id in this.analysesRefMeasureLayers)) {
      return this.analysesRefMeasureLayers[this.currentAnalysis.id];
    }

    return null;
  }

  public rerenderLoadedLayer() {
    this.loadedLayer?.changed();
  }

  public setOpacity(opacity: number) {
    if (this.loadedLayer) {
      this.loadedLayer.getSource()?.getFeatures().forEach(f => f.setStyle(this.getStyle(f, opacity)));
      this.rerenderLoadedLayer();
    }
  }

  private async loadLayer(analysis: AnalysisForViewSchema): Promise<VectorGeoLayer> {
    const features: Feature<Geometry>[] = [];
    for (const refMeasure of analysis.reference_measurements) {
      features.push(...(new GeoJSON(GEO_JSON_OPTIONS).readFeatures(
        await volateqApi.getReferenceMeasurementValuesGeoVisual(refMeasure.id))
      ));
    }

    for (const feature of features) {
      feature.setStyle(this.getStyle(feature));
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

  private getStyle(feature: Feature<Geometry>, opacity = 1): Style {
    if (feature.getGeometry()?.getType() === GeometryType.POINT) {
      return new Style({
        image: new Circle({
          radius: 3,
          stroke: new Stroke({
            color: this.getColor(opacity),
            width: 3,
          }),
        })
      })
    }

    return new Style({
      stroke: new Stroke({
        color: this.getColor(opacity),
        width: 3,
      }),
    });
  }

  private getColor(opacity = 1): string | number[] {
    return opacity === 1 ? LayerColor.volateqBlue : setOpacityForColor(LayerColor.volateqBlue, opacity);
  }
}