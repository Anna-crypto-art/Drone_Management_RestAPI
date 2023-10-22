<template>
  <div class="app-geo-json-layer-checkbox" v-show="geoLayer.visible">
    <b-form-checkbox v-model="geoLayer.selected" @change="onChange">
      <slot :name="geoLayer.name">
        <app-expl-wrap :expl="geoLayer.description" :placement="descrPlacement">
          {{ geoLayer.getDisplayName() }}
        </app-expl-wrap>
      </slot>
    </b-form-checkbox>
  </div>
</template>

<script lang="ts">
import Map from "ol/Map";
import { Component, Prop } from "vue-property-decorator";
import { IGeoLayer, VectorGeoLayer, IAppGeoJsonLayerCheckbox } from "./types";
import { CatchError } from "../../services/helper/catch-helper";
import { FeatureLike } from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { EVENT_ZOOM_TO_HOME } from "./events";
import { BaseAuthComponent } from "../base-auth-component/base-auth-component";
import AppExplanation from "../app-explanation/app-explanation.vue";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import { GEO_JSON_OPTIONS } from "./constants";

@Component({
  name: "app-geo-json-layer-checkbox",
  components: {
    AppExplanation,
    AppExplWrap,
  },
})
export default class selectedByQueryRoute extends BaseAuthComponent implements IAppGeoJsonLayerCheckbox {
  @Prop({ required: true }) geoLayer!: IGeoLayer;
  @Prop({ required: true }) map!: Map;
  @Prop({ default: "top" }) descrPlacement!: string;

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
        
        if (this.geoLayer.autoZoom) {
          const waitForRendered = () => this.map.isRendered() ? this.zoomToHome() : setTimeout(() => waitForRendered(), 50);
          waitForRendered();
        }
      }

      this.geoLayer.loadedLayer?.setVisible(true);
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
      await this.geoLayer.setLoading(true, this.$t("fetching-data").toString());

      const features = await this.geoLayer.loadGeoJSON();
      if (features === undefined) {
        return undefined;
      }

      await this.geoLayer.setLoading(true, this.$t("drawing-features", { features: features.features.length }).toString());

      const source = new VectorSource({
        features: new GeoJSON().readFeatures(features, GEO_JSON_OPTIONS),
      });
      
      const vectorGeoLayer = new VectorImageLayer({ // More performant, but less accurate, rendering than "VectorLayer"
        properties: { id: this.geoLayer.id },
        source,
        // A larger ratio avoids cut images during panning, but will cause a decrease in performance.
        // See https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorImage-VectorImageLayer.html
        imageRatio: 1,
        minZoom: this.geoLayer.minZoomLevel,
      });
      
      vectorGeoLayer.setStyle((feature: FeatureLike) => this.geoLayer.style(feature));

      if (this.geoLayer.zIndex) {
        vectorGeoLayer.setZIndex(this.geoLayer.zIndex);
      }

      this.map.addLayer(vectorGeoLayer);

      // Automatic zoom to features
      if (this.geoLayer.autoZoom === true) {
        window.addEventListener(EVENT_ZOOM_TO_HOME, this.zoomToHomeEvent);
      }

      return vectorGeoLayer;
    } finally {
      await this.geoLayer.setLoading(false);
    } 
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
