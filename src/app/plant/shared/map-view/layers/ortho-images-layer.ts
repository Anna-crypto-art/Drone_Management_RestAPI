import { VectorGeoLayer } from "@/app/shared/components/app-map/types";
import { Feature, Map } from "ol";
import { Geometry, SimpleGeometry } from "ol/geom";
import * as ExtentFunctions from "ol/extent";
import { State } from "ol/render";
import { Style } from "ol/style";
import { OrthoImage } from "./types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import GeoJSON from "ol/format/GeoJSON";
import { GEO_JSON_OPTIONS } from "@/app/shared/components/app-map/constants";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import VectorSource from "ol/source/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import { AppSeqEventService } from "@/app/shared/services/app-event-service/app-event-service";

export enum OrthoImageEvent {
  ON_ORTHO_IMAGE_CHANGED = "ON_ORTHO_IMAGE_CHANGED",
}

export class OrthoImagesLayer extends AppSeqEventService<OrthoImageEvent> {
  private static readonly orthoImagesLayers: Record<string, OrthoImagesLayer> = {};

  public static get(plant: PlantSchema, map: Map): OrthoImagesLayer {
    if (!(plant.id in this.orthoImagesLayers)) {
      this.orthoImagesLayers[plant.id] = new OrthoImagesLayer(plant, map);
    }

    return this.orthoImagesLayers[plant.id];
  }

  private readonly orthoImages: OrthoImage[] = [
    { name: "RGB_ONLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID },
    { name: "RGB_ONLINE_NO_REFLEX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_NO_REFLEX_ID },
    { name: "RGB_OFFLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID },
    { name: "IR", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID },
    { name: "SDX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID },
    { name: "TRACKER_IR", keyFigureId: ApiKeyFigure.TRACKER_ORTHO_IMAGES_IR_ID },
    { name: "TRACKER_RGB", keyFigureId: ApiKeyFigure.TRACKER_ORTHO_IMAGES_RGB_ID },
    { name: "TRACKER_RAW_IR", keyFigureId: ApiKeyFigure.TRACKER_RAW_IMAGES_IR_ID },
  ];

  private loadedLayer: VectorGeoLayer | undefined;

  private constructor(
    private readonly plant: PlantSchema,
    private readonly map: Map,
  ) {
    super();
  }

  public getAvailableOrthoImages(analysisResult: AnalysisResultDetailedSchema): OrthoImage[] {
    return this.orthoImages.filter(o => analysisResult.key_figures.find(kf => kf.id === o.keyFigureId));
  }

  public async getImageFeatures(
    orthoImage: OrthoImage,
    analysisResult: AnalysisResultDetailedSchema,
    componentId?: ApiComponent,
    pcs?: string,
  ): Promise<Feature<Geometry>[]> {
    const geoJSON = await volateqApi.getKeyFiguresGeoVisual(
      this.plant.id,
      analysisResult.id,
      orthoImage.keyFigureId,
      (
        componentId && pcs ? 
        {
          child_component_id: componentId,
          child_pcs: pcs,
        } :
        undefined
      )
    );

    const features: Feature<Geometry>[] = new GeoJSON(GEO_JSON_OPTIONS).readFeatures(geoJSON)
    if (!features || features.length === 0) {
      throw { error: "NOT_FOUND", message: "Ortho image not found" };
    }

    return features;
  }

  public async loadImages(
    orthoImage: OrthoImage,
    analysisResult: AnalysisResultDetailedSchema,
    componentId?: ApiComponent,
    pcs?: string,
  ): Promise<void> {
    const features = await this.getImageFeatures(orthoImage, analysisResult, componentId, pcs);
    for (const feature of features) {
      this.setImageFeatureStyle(feature);
    }

    if (!this.loadedLayer) {
      this.loadedLayer = this.loadLayer();
    }
    this.loadedLayer.getSource()?.addFeatures(features);

    await this.emit(this.plant.id, OrthoImageEvent.ON_ORTHO_IMAGE_CHANGED);
  }

  public async removeAllImages() {
    this.loadedLayer?.getSource()?.clear();

    await this.emit(this.plant.id, OrthoImageEvent.ON_ORTHO_IMAGE_CHANGED);
  }

  public hasLoadedImages(): boolean {
    const loadedFeatures = this.loadedLayer?.getSource()?.getFeatures();
    return loadedFeatures && loadedFeatures.length > 0 || false;
  }

  private loadLayer(): VectorImageLayer<VectorSource> {
    const vectorGeoLayer = new VectorImageLayer({
      properties: { id: `${this.plant.id}__orthoImages` },
      source: new VectorSource(),
      // A larger ratio avoids cut images during panning, but will cause a decrease in performance.
      // See https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorImage-VectorImageLayer.html
      imageRatio: 1,
      zIndex: 3,
    });

    this.map.addLayer(vectorGeoLayer);

    return vectorGeoLayer;
  }

  private setImageFeatureStyle(
    feature: Feature<Geometry>,
  ) {
    const plantRotation = (Math.PI / 180) * (this.plant.fieldgeometry?.orientation || 0);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      feature.setStyle(
        new Style({
          renderer: (pixelCoordinates, state: State): void => {
            const ctx = state.context;
            const geometry = state.geometry.clone() as SimpleGeometry;
            geometry.setCoordinates(pixelCoordinates);
            geometry.rotate(-state.rotation - plantRotation, [0, 0]);

            const extent = geometry.getExtent();

            const width = ExtentFunctions.getWidth(extent);
            const height = ExtentFunctions.getHeight(extent);
            const bottomLeft = ExtentFunctions.getBottomLeft(extent);
            const bottom = bottomLeft[1];
            const left = bottomLeft[0];

            ctx.save();
            ctx.rotate(plantRotation + state.rotation);
            ctx.drawImage(img, left, bottom, width, height);
            ctx.restore();
          },
        })
      );
    };

    img.src = feature.get("image");
  }
}