<template>
  <div class="app-map-view" v-if="map">
    <app-map :map="map" @click="onMapClick" />
    <app-map-controls :map="map" />
    <app-map-pop-buttons>
      <app-map-view-settings :plant="plant" :map="map" :analyses="analyses" />
      <app-map-view-components :componentLayerTypes="componentLayerTypes" :map="map" :plant="plant" />
    </app-map-pop-buttons>
    <app-map-view-key-figure-layer-selection 
      :analyses="analyses"
      :keyFigureLayers="keyFigureLayers"
      :map="map"
      :plant="plant"
    />
    <app-map-view-legend :plant="plant" :analyses="analyses" />
    <app-map-view-popup :plant="plant" :analyses="analyses" :mapFeature="clickedMapFeature" :map="map" />
  </div>
</template>

<script lang="ts">
import AppMapControls from "@/app/shared/components/app-map/app-map-controls.vue";
import AppMap from "@/app/shared/components/app-map/app-map.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map, View } from "ol";
import { Component, Prop } from "vue-property-decorator";
import AppMapPopButtons from "@/app/shared/components/app-map/app-map-pop-buttons.vue";
import AppMapViewSettings from "./app-map-view-settings.vue";
import { ComponentLayer } from "../visualization/layers/component-layer";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppMapViewComponents from "./app-map-view-components.vue";
import AppMapViewKeyFigureLayerSelection from "./app-map-view-layer-selection/app-map-view-key-figure-layer-selection.vue";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { KeyFigureTypeMap } from "./layers/types";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import AppMapViewLegend from "./app-map-view-legend.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { FeatureLike } from "ol/Feature";
import AppMapViewPopup from "./app-map-view-popup.vue";

@Component({
  name: "app-map-view",
  components: {
    AppMap,
    AppMapControls,
    AppMapPopButtons,
    AppMapViewSettings,
    AppMapViewComponents,
    AppMapViewKeyFigureLayerSelection,
    AppMapViewLegend,
    AppMapViewPopup,
  },
})
export default class AppMapView extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) keyFigureLayers!: KeyFigureTypeMap<GeoVisualQuery>[];
  @Prop({ required: true }) componentLayerTypes!: typeof ComponentLayer[];

  map: Map | null = null;

  clickedMapFeature: FeatureLike | null = null;

  async created() {
    this.map = new Map({
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  @CatchError()
  onMapClick(features: FeatureLike[]) {
    // Multiselection is not supported
    if (features.length > 1 || features.length === 0) {
      return;
    }

    this.clickedMapFeature = features[0];
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix that toaster overlays popover
.b-popover {
  z-index: 1101;
}

.app-map-view {
  position: relative;
  height: calc(100vh - $header-height - $tab-height);
  width: 100%;
}
</style>