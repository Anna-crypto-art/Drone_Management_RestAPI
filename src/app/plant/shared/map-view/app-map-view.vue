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
    <app-map-view-legend :plant="plant" :analyses="analyses" :map="map" />
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
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { LayersService } from "./layers/layers-service";
import { RefMeasureLayersService } from "./layers/ref-measure-layers-service";
import { waitFor } from "@/app/shared/services/helper/debounce-helper";

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
export default class AppMapView extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) keyFigureLayers!: KeyFigureTypeMap<GeoVisualQuery>[];
  @Prop({ required: true }) componentLayerTypes!: typeof ComponentLayer[];

  analysisSelectionService!: AnalysisSelectionService;
  layersService!: LayersService;
  refMeasureLayersService!: RefMeasureLayersService;

  map: Map | null = null;

  clickedMapFeature: FeatureLike | null = null;

  async created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);
    
    this.map = new Map({
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    this.refMeasureLayersService = RefMeasureLayersService.get(this.plant, this.map);
  }

  async mounted() {
    this.analysisSelectionService.register();
  }
  
  async unmounted() {
    this.analysisSelectionService.unregister();
  }

  @CatchError()
  onMapClick(features: FeatureLike[]) {
    // Multiselection is not supported
    if (features.length > 1 || features.length === 0) {
      this.clickedMapFeature = null;
    }

    this.clickedMapFeature = features[0];
  }

  async onAnalysisSelected() {
    // using "await" leads to blocking open layers code execution (somehow!?) -> zoomToHome does not work!
    // Load ref measure layers for analysis takes a while because it loads geoJSON.
    // So we avoid "blocking the thread" this way....
    this.refMeasureLayersService.loadLayersForAnalysis(this.analysisSelectionService.firstAnalysis || undefined).then(() => {
      this.layersService.rerenderLoadedLayers();
    });
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