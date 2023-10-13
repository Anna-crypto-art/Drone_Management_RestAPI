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
      @openChanged="onLayerSelectionOpenChanged"
    />
    <app-map-view-observ-layer-selection 
      :map="map"
      :plant="plant"
      @openChanged="onLayerSelectionOpenChanged"
    />
    <app-map-view-legend :plant="plant" :analyses="analyses" :map="map" :layerSelectionOpen="layerSelectionOpen" />
    <app-map-view-popup :plant="plant" :analyses="analyses" :mapFeature="clickedMapFeature" :map="map" />
  </div>
</template>

<script lang="ts">
import AppMapControls from "@/app/shared/components/app-map/app-map-controls.vue";
import AppMap from "@/app/shared/components/app-map/app-map.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map, View } from "ol";
import { Component, Prop, Watch } from "vue-property-decorator";
import AppMapPopButtons from "@/app/shared/components/app-map/app-map-pop-buttons.vue";
import AppMapViewSettings from "./map-view-settings.vue";
import { ComponentLayer } from "./layers/component-layer";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppMapViewComponents from "./map-view-components.vue";
import AppMapViewKeyFigureLayerSelection from "./map-view-layer-selection/map-view-key-figure-layer-selection.vue";
import AppMapViewObservLayerSelection from "./map-view-layer-selection/map-view-observ-layer-selection.vue";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { KeyFigureTypeMap } from "./layers/types";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import AppMapViewLegend from "./map-view-legend.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { FeatureLike } from "ol/Feature";
import AppMapViewPopup from "./map-view-popup.vue";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { LayersService } from "./layers/layers-service";
import { RefMeasureLayersService } from "./layers/ref-measure-layers-service";

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
    AppMapViewObservLayerSelection,
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

  layerSelectionOpen = false;

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

  @CatchError()
  onLayerSelectionOpenChanged(open: boolean) {
    this.layerSelectionOpen = open;
  }

  async onAnalysisSelected() {
    await this.refMeasureLayersService.loadLayersForAnalysis(this.analysisSelectionService.firstAnalysis || undefined);
    this.layersService.rerenderLoadedLayers();
  }

  get sidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.analyses || this.$store.direct.state.sidebar.observations;
  }

  @Watch("sidebarOpen")
  rerenderMap() {
    setTimeout(() => window.dispatchEvent(new UIEvent("resize")), 400);
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
  overflow: hidden;
}
</style>