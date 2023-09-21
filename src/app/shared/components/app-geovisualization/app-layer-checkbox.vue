<template>
  <div class="app-geo-layer-checkbox" v-show="geoLayer.visible">
    <b-form-checkbox :checked="geoLayer.selected" @change="onChange">
      <slot :name="geoLayer.name">
        {{ geoLayer.name }}
        <app-explanation v-if="geoLayer.description"><span v-html="geoLayer.description"></span></app-explanation>
      </slot>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "ol/Map";
import { Component, Prop, Watch, Ref } from "vue-property-decorator";
import { IGeoLayer, VectorGeoLayer } from "./types/layers";
import { CatchError } from "../../services/helper/catch-helper";
import { LoadingEvent } from "./types/events";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Geometry from "ol/geom/Geometry";
import SimpleGeometry from "ol/geom/SimpleGeometry";
import VectorLayer from "ol/layer/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import { State } from "ol/render";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import * as ExtentFunctions from "ol/extent";


export const GEO_JSON_OPTIONS = { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" };


@Component({
  name: "app-geo-layer-checkbox",
  components: {
  },
})
export default class AppGeoLayerCheckbox extends Vue {
  @Prop({ required: true }) geoLayer!: IGeoLayer;
  @Prop({ required: true }) map!: Map;

  private loadedLayer: VectorGeoLayer | undefined = undefined

  @Watch("geoLayer.selected")
  async onSelectedChanged() {
    await this.geoLayer.onSelectedChanged();
  }

  @CatchError()
  private async loadGeoLayer(): Promise<void> {
    if (this.geoLayer.reloadLayerOnNextSelection) {
      this.loadedLayer = undefined;
    }

    if (this.geoLayer.selected) {
      if (this.loadedLayer) {
        
      }
    } else {
      
    }
  }

  
  private async loadVectorGeoLayer(): Promise<VectorGeoLayer | undefined> {    
    this.loadingCallback!({
      loading: true,
      state: this.$t("fetching-data").toString(),
    });
    try {
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
    // await waitFor(30);

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
      minZoom: this.geoLayer.minZoom,
    });
    
    vectorGeoLayer.setStyle(this.geoLayer.getStyle);

    if (this.geoLayer.zIndex) {
      vectorGeoLayer.setZIndex(this.geoLayer.zIndex);
    }

    this.map.addLayer(vectorGeoLayer);

    // Automatic zoom to features
    if (this.geoLayer.autoZoom === true) {
      this.zoomToHome();

      window.addEventListener("app-visualization:go-home", () => { this.zoomToHome() });
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
    if (this.loadedLayer) {
      const padding = 100;
  
      this.map.getView().fit(this.loadedLayer.getSource()!.getExtent(), {
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
