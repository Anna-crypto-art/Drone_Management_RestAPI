import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, SimpleGeometry } from "ol/geom";
import { State } from "ol/render";
import * as ExtentFunctions from "ol/extent";
import { Style } from "ol/style";
import { layerEvents } from "../layer-events";
import { GEO_JSON_OPTIONS, LayerBase } from "../layers/layer-base";
import { FeatureAction, FeatureInfos } from "../types";
import { IOrthoImageMixin, OrthoImage } from "./types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisResultPvTrackerSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-pv-tracker-schema";

export class OrhtoImageMixin {
  constructor(protected readonly layer: LayerBase & IOrthoImageMixin) {
    this.layer.orthoImages = [
      { name: "RGB_ONLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID },
      { name: "RGB_ONLINE_NO_REFLEX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_NO_REFLEX_ID },
      { name: "RGB_OFFLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID },
      { name: "IR", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID },
      { name: "SDX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID },
      { name: "TRACKER_IR", keyFigureId: ApiKeyFigure.TRACKER_ORTHO_IMAGES_IR_ID },
      { name: "TRACKER_RGB", keyFigureId: ApiKeyFigure.TRACKER_ORTHO_IMAGES_RGB_ID },
      { name: "TRACKER_RAW_IR", keyFigureId: ApiKeyFigure.TRACKER_RAW_IMAGES_IR_ID },
    ];
  }

  public isOrthoImageAvailable(orthoImage: OrthoImage, componentId: ApiComponent): boolean {
    return this.layer.orthoImages !== null && !!this.layer.analysisResult 
      && !!this.layer.analysisResult.key_figures.find(keyFigure => keyFigure.id === orthoImage.keyFigureId)
      && (!orthoImage.componentId || orthoImage.componentId === componentId)
  }

  public addShowOrthoImageActions(featureInfos: FeatureInfos | undefined, componentId: ApiComponent) {
    if (featureInfos && this.layer.orthoImages) {
      const actions: FeatureAction[] = this.layer.orthoImages.filter(orthoImage => this.isOrthoImageAvailable(orthoImage, componentId))
        .map(orthoImage => ({
          name: orthoImage.name,
          action: async () => { 
            if (orthoImage.keyFigureId === ApiKeyFigure.TRACKER_RAW_IMAGES_IR_ID) {
              await this.loadRawTrackerIRImage(orthoImage, componentId, featureInfos.title!);
            } else {
              await this.loadOrthoImage(orthoImage, featureInfos, componentId); 
            }
          }
        }));
      
      if (actions.length > 0) {
        if (!featureInfos.actionsSummaries) {
          featureInfos.actionsSummaries = [];  
        }

        featureInfos.actionsSummaries.push({
          name: this.layer.vueComponent.$t("show-ortho-image").toString(),
          buttonVariant: 'secondary',
          actions: actions,
        });
      }
    }

    return featureInfos;
  }

  public static async loadOrthoImage(
    orthoImage: OrthoImage,
    plant: PlantSchema,
    analysisResultId: string,
    componentId?: ApiComponent,
    pcs?: string,
  ): Promise<void> {
    const geoJSON = await volateqApi.getKeyFiguresGeoVisual(
      plant.id,
      analysisResultId,
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

    if (!orthoImage.features) {
      orthoImage.features = [];
    }
    orthoImage.features.push(...features);

    for (const feature of features) {
      OrhtoImageMixin.setImageFeatureStyle(feature, plant);
    }

    // Ortho images will be added into the SCA component layer
    layerEvents.emitOrthoImageLoaded(features);
  }

  private static setImageFeatureStyle(
    feature: Feature<Geometry>,
    plant: PlantSchema,
  ) {
    const plantRotation = (Math.PI / 180) * (plant.fieldgeometry?.orientation || 0);

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

  protected async loadOrthoImage(
    orthoImage: OrthoImage,
    featureInfos: FeatureInfos,
    componentId: ApiComponent,
  ): Promise<void> {
    try {
      await OrhtoImageMixin.loadOrthoImage(
        orthoImage,
        this.layer.vueComponent.plant,
        this.layer.analysisResult!.id,
        componentId,
        featureInfos.title,
      );

      this.layer.vueComponent.hideToast();
    } catch (e) {
      this.layer.vueComponent.showError(e);
    }
  }

  public async loadRawTrackerIRImage(
    orthoImage: OrthoImage,
    componentId: ApiComponent,
    pcs: string,
  ) {
    const geoJSON = await volateqApi.getKeyFiguresGeoVisual(
      this.layer.vueComponent.plant.id,
      this.layer.analysisResult!.id,
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
      throw { error: "NOT_FOUND", message: "Raw IR image not found" };
    }

    const imageUrl = features[0].get("image");

    const piToastInfo = this.layer.vueComponent.piToastInfo;
    
    // Property "featureInfos" of component AppFeatureInfosToast needs to be reassigned this way to recognize the change.
    this.layer.vueComponent.piToastInfo = { groups: [] };
    await this.layer.vueComponent.$nextTick();

    if (!piToastInfo.images) {
      piToastInfo.images = [];
    }
    piToastInfo.images.push({
      title: orthoImage.name,
      url: imageUrl,
    });

    this.layer.vueComponent.piToastInfo = piToastInfo;
  }

  public removeOrthoImageFeatures() {
    if (this.layer.orthoImages) {
      for (const orthoImage of this.layer.orthoImages) {
        if (orthoImage.features) {
          layerEvents.emitRemoveOrthoImages(orthoImage.features);

          orthoImage.features = undefined;
        }
      }
    }
  }
}