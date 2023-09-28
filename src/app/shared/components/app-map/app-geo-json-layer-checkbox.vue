<template>
  <div class="app-geo-json-layer-checkbox" v-show="geoLayer.visible">
    <b-form-checkbox v-model="geoLayer.selected" @change="onChange">
      <slot :name="geoLayer.name">
        {{ geoLayer.name }}
        <app-explanation v-if="geoLayer.description"><span v-html="geoLayer.description"></span></app-explanation>
      </slot>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
import Map from "ol/Map";
import { Component, Prop, Watch, Ref } from "vue-property-decorator";
import { IGeoLayer, VectorGeoLayer } from "./types";
import { CatchError } from "../../services/helper/catch-helper";
import { LoadingEvent } from "../app-geovisualization/types/events";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Geometry from "ol/geom/Geometry";
import SimpleGeometry from "ol/geom/SimpleGeometry";
import VectorImageLayer from "ol/layer/VectorImage";
import { State } from "ol/render";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import * as ExtentFunctions from "ol/extent";
import { IAppGeoJsonLayerCheckbox } from "../app-geovisualization/types/components";
import { BaseComponent } from "../base-component/base-component";
import { EVENT_ZOOM_TO_HOME } from "./events";


export const GEO_JSON_OPTIONS = { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" };


@Component({
  name: "app-geo-json-layer-checkbox",
  components: {
  },
})
export default class AppGeoJsonLayerCheckbox extends BaseComponent implements IAppGeoJsonLayerCheckbox {
  @Prop({ required: true }) geoLayer!: IGeoLayer;
  @Prop({ required: true }) map!: Map;

  private readonly zoomToHomeEvent = () => { this.zoomToHome() };

  @CatchError()
  async mounted() {
    this.geoLayer.appLayerCheckbox = this;

    await this.loadGeoLayer();
  }

  unmounted() {
    this.unloadLayer();
    this.geoLayer.appLayerCheckbox = undefined;
  }

  async setSelected(selected: boolean) {
    this.geoLayer.selected = selected;

    await this.loadGeoLayer();
    await this.geoLayer.onSelectedChanged();
  }

  @CatchError()
  async onChange() {
    await this.loadGeoLayer();
    await this.geoLayer.onSelectedChanged();
  }

  private async loadGeoLayer(): Promise<void> {
    if (this.geoLayer.reloadLayerOnNextSelection) {
      this.unloadLayer();
      this.geoLayer.reloadLayerOnNextSelection = false;
    }

    if (this.geoLayer.selected) {
      if (!this.geoLayer.loadedLayer) {
        this.geoLayer.loadedLayer = await this.loadVectorGeoLayer();
      }

      this.geoLayer.loadedLayer!.setVisible(true);
    } else {
      if (this.geoLayer.loadedLayer) {
        this.geoLayer.loadedLayer.setVisible(false);
      }
    }
  }

  private unloadLayer() {
    if (this.geoLayer.loadedLayer) {
      this.geoLayer.loadedLayer.setVisible(false);
      this.map.removeLayer(this.geoLayer.loadedLayer);
      this.geoLayer.loadedLayer = undefined;

      if (this.geoLayer.autoZoom) {
        window.removeEventListener(EVENT_ZOOM_TO_HOME, this.zoomToHomeEvent);
      }
    }
  }

  private async loadVectorGeoLayer(): Promise<VectorGeoLayer | undefined> {
    try {
      this.loadingCallback!({
        loading: true,
        state: this.$t("fetching-data").toString(),
      });

      const features = await this.geoLayer.loadGeoJSON();
      if (features === undefined) {
        return undefined;
      }

      this.loadingCallback!({
        loading: true,
        state: this.$t("drawing-features", { features: features.features.length }).toString()
      });

      // We have to wait for the $emit call of the loadingCallback with drawing features message. 
      // Otherwise the loading state will not be updated
      await this.$nextTick();

      const source = new VectorSource({
        features: new GeoJSON().readFeatures(features, GEO_JSON_OPTIONS),
      });
      source.getFeatures().forEach(feature => {
        this.setFeatureStyle(feature);
      });
      
      const vectorGeoLayer = new VectorImageLayer({ // More performant, but less accurate, rendering than "VectorLayer"
        properties: { id: this.geoLayer.id },
        source,
        // A larger ratio avoids cut images during panning, but will cause a decrease in performance.
        // See https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorImage-VectorImageLayer.html
        imageRatio: 1,
        minZoom: this.geoLayer.minZoomLevel,
      });
      
      vectorGeoLayer.setStyle(this.geoLayer.getStyle);

      if (this.geoLayer.zIndex) {
        vectorGeoLayer.setZIndex(this.geoLayer.zIndex);
      }

      this.map.addLayer(vectorGeoLayer);

      // Automatic zoom to features
      if (this.geoLayer.autoZoom === true) {
        this.zoomToHome();

        window.addEventListener(EVENT_ZOOM_TO_HOME, this.zoomToHomeEvent);
      }

      return vectorGeoLayer;
    } finally {
      this.loadingCallback({ loading: false });
    } 
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

  private loadingCallback(e: LoadingEvent) {
    this.$emit("loading", e);
  }

  private zoomToHome() {
    if (this.geoLayer.loadedLayer) {
      const padding = 100;
  
      this.map.getView().fit(this.geoLayer.loadedLayer.getSource()!.getExtent(), {
        duration: 200,
        padding: [padding, padding, padding, padding],
      });
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

</style>
