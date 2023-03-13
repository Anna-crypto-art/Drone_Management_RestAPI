import { LoadingEvent } from "../types/events";
import { GeoJSONLayer, VectorGeoLayer } from "../types/layers";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Geometry from "ol/geom/Geometry";
import SimpleGeometry from "ol/geom/SimpleGeometry";
import VectorLayer from "ol/layer/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import Map from "ol/Map";
import { State } from "ol/render";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import LayerLoader from "./layer-loader";
import * as ExtentFunctions from "ol/extent";
import { i18n } from "@/main";
import { waitFor } from "@/app/shared/services/helper/debounce-helper";

export class GeoJSONLoader extends LayerLoader<
  VectorLayer<VectorSource<Geometry>> | VectorImageLayer<VectorSource<Geometry>>
> {
  constructor(public readonly layerType: GeoJSONLayer, map: Map, loadingEvent: (e: LoadingEvent) => void) {
    super(layerType, map, loadingEvent);
  }

  async doLoad(): Promise<VectorLayer<VectorSource<Geometry>> | VectorImageLayer<VectorSource<Geometry>> | undefined> {
    this.loadingCallback!({
      loading: true,
      state: i18n.t("fetching-data").toString(),
    });

    const features = await this.layerType.geoJSONLoader();
    if (features === undefined) {
      return undefined;
    }

    this.loadingCallback!({
      loading: true,
      state: i18n.t("drawing-features", { features: features.features.length }).toString()
    });

    // We have to wait for the $emit call of the loadingCallback with drawing features message. 
    // Otherwise the loading state will not be updated
    await waitFor(30);

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(features, {
        ...this.layerType.geoJSONOptions,
      }),
    });
    source.getFeatures().forEach(feature => {
      this.setFeatureStyle(feature);
    });

    let geoLayer: VectorGeoLayer;

    const properties = { id: this.layerType.id };

    if (this.layerType.layerType === undefined || this.layerType.layerType === "VectorLayer") {
      geoLayer = new VectorLayer({ source, properties });
    } else if (this.layerType.layerType === "VectorImageLayer") {
      // More performant, but less accurate, rendering
      geoLayer = new VectorImageLayer({
        properties,
        source,
        // A larger ratio avoids cut images during panning, but will cause a decrease in performance.
        // See https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorImage-VectorImageLayer.html
        imageRatio: 1,
        minZoom: this.layerType.minZoom,
      });
    } else {
      throw new Error("Unknown layerType: " + this.layerType.layerType);
    }

    if (this.layerType.style) {
      geoLayer.setStyle(this.layerType.style);
    }

    if (this.layerType.zIndex) {
      geoLayer.setZIndex(this.layerType.zIndex);
    }

    this.map.addLayer(geoLayer);

    const zoomToHome = () => {
      const padding = 100;

      this.map.getView().fit(geoLayer.getSource()!.getExtent(), {
        duration: 200,
        padding: [padding, padding, padding, padding],
      });
    };

    // Automatic zoom to features
    if (this.layerType.autoZoom === true) {
      zoomToHome();

      window.addEventListener("app-visualization:go-home", zoomToHome);
    }

    return geoLayer;
  }

  private setFeatureStyle(feature: Feature<Geometry>) {
    if (feature.get("image")) {
      const img = new Image();

      img.onload = () => {
        feature.setStyle(
          new Style({
            renderer: (pixelCoordinates, state: State): void => {
              const ctx = state.context;
              const geometry = state.geometry.clone() as SimpleGeometry;
              geometry.setCoordinates(pixelCoordinates);
              geometry.rotate(-state.rotation - (feature.get("rotation") || 0), [0, 0]);
              const extent = geometry.getExtent();

              const width = ExtentFunctions.getWidth(extent);
              const height = ExtentFunctions.getHeight(extent);
              const bottomLeft = ExtentFunctions.getBottomLeft(extent);
              const bottom = bottomLeft[1];
              const left = bottomLeft[0];

              const drawRotation = (feature.get("rotation") ?? 0) + state.rotation;

              ctx.save();
              ctx.rotate(drawRotation);
              ctx.drawImage(img, left, bottom, width, height);
              ctx.restore();
            },
          })
        );
      };

      img.src = feature.get("image");
    }
  }
}
