import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, SimpleGeometry } from "ol/geom";
import { State } from "ol/render";
import * as ExtentFunctions from "ol/extent";
import { Style } from "ol/style";
import { layerEvents } from "../layer-events";
import { GEO_JSON_OPTIONS, LayerBase } from "../layers/layer-base";
import { OrthoImage } from "../layers/types";
import { FeatureAction, FeatureInfos } from "../types";
import { IOrthoImageMixin } from "./types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";

export class OrhtoImageMixin {
  constructor(
    private readonly layer: LayerBase & IOrthoImageMixin,
  ) {
    this.layer.orthoImages = [
      { name: "RGB_ONLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID, available: false },
      { name: "RGB_OFFLINE", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID, available: false },
      { name: "IR", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID, available: false },
      { name: "SDX", keyFigureId: ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID, available: false },
    ];

    this.setOrthoImageAvailable();
  }

  private setOrthoImageAvailable() {
    if (this.layer.orthoImages !== null) {
      for (const orthoImage of this.layer.orthoImages) {
        orthoImage.available = !!this.layer.analysisResult.key_figures.find(keyFigure => keyFigure.id === orthoImage.keyFigureId);
      }
    }
  }

  public addShowOrthoImageActions(featureInfos: FeatureInfos | undefined) {
    if (featureInfos && this.layer.orthoImages) {
      const actions: FeatureAction[] = this.layer.orthoImages.filter(orthoImage => orthoImage.available)
        .map(orthoImage => ({
          name: orthoImage.name,
          action: async () => { await this.loadOrthoImage(orthoImage, featureInfos); }
        }));
      
      if (actions.length > 0) {
        featureInfos.actions = {
          name: this.layer.vueComponent.$t("show-ortho-image").toString(),
          buttonVariant: 'secondary',
          actions: actions,
        };
      }
    }

    return featureInfos;
  }

  protected async loadOrthoImage(orthoImage: OrthoImage, featureInfos: FeatureInfos): Promise<void> {
    try {
      const geoJSON = await volateqApi.getKeyFiguresGeoVisual(
        this.layer.vueComponent.plant.id,
        this.layer.analysisResult.id,
        orthoImage.keyFigureId,
        {
          child_component_id: this.layer.getComponentId(),
          child_pcs: featureInfos.title
        }
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
        this.setImageFeatureStyle(feature);
      }

      // Ortho images will be added into the SCA component layer
      layerEvents.emitOrthoImageLoaded(features);

      this.layer.vueComponent.hideToast();
    } catch (e) {
      this.layer.vueComponent.showError(e);
    }
  }

  protected setImageFeatureStyle(feature: Feature<Geometry>) {
    const plantRotation = (Math.PI / 180) * (this.layer.vueComponent.plant.fieldgeometry?.orientation || 0);

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
          zIndex: this.layer.getOrthoImageZIndex(),
        })
      );
    };

    img.src = feature.get("image");
  }

  protected getOrthoImageZIndex(): number {
    return -1;
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