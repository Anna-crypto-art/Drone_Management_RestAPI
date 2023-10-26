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
    <app-map-view-observ-layer-selection 
      :map="map"
      :plant="plant"
    />
    <app-map-view-legend :plant="plant" :analyses="analyses" :map="map" />
    <app-map-view-popup :plant="plant" :analyses="analyses" :mapFeature="clickedMapFeature" :map="map" />
    <b-button 
      variant="secondary"
      size="sm"
      class="toggle-button"
      :class="{ open: sidebarOpen, selectionOpen: selectionSidebarOpen, invisible: invisible }"
      @click="onToggleAll()"
    >
      <b-icon :icon="sidebarOpen ? 'chevron-compact-left' : 'chevron-compact-right'"></b-icon>
    </b-button>
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
import AppMapViewPopup from "./map-view-popup/map-view-popup.vue";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { LayersService } from "./layers/layers-service";
import { RefMeasureLayersService } from "./layers/ref-measure-layers-service";
import { State } from "vuex-class";

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

  invisible = false;
  
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
    await this.analysisSelectionService.register();
  }
  
  async unmounted() {
    this.analysisSelectionService.unregister();
  }

  get selectionSidebarOpen(): boolean { return this.openAnalysesSelection || this.openObservationsSelection; }
  get openAnalysesSelection(): boolean { return this.$store.direct.state.sidebar.analysesSelection }
  get openObservationsSelection(): boolean { return this.$store.direct.state.sidebar.observationsSelection }

  @CatchError()
  onMapClick(features: FeatureLike[]) {
    // Multiselection is not supported
    if (features.length > 1 || features.length === 0) {
      this.clickedMapFeature = null;
    }

    this.clickedMapFeature = features[0];
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
    // ToggleButton Fade on SidebarOpen only, no Observation selected
    this.fadeInOutToggleButton();
  }

  @Watch("openAnalysesSelection")
  onOpenAnalysesSelectionChanged() {
    this.fadeInOutToggleButton();
  }

  @Watch("openObservationsSelection")
  onOpenObservationSelectionChanged() {
    this.fadeInOutToggleButton();
  }

  @CatchError()
  onToggleAll() {
    this.fadeInOutToggleButton();
    if (this.sidebarOpen) {
      if (this.$store.direct.state.sidebar.analyses) {
        this.$store.direct.commit.sidebar.toggle({ name: "analyses" });
      }
      if (this.$store.direct.state.sidebar.observations) {
        this.$store.direct.commit.sidebar.toggle({ name: "observations" });
      }
    } else {
      const lastActiveSidebarName = this.$store.direct.state.sidebar.lastActiveSidebarName || "analyses";
      this.$store.direct.commit.sidebar.toggle({ name: lastActiveSidebarName });
    }
  }

  private fadeInOutToggleButton() {
    this.invisible = true;
    setTimeout(() => {
      this.invisible = false;
    }, 500);
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

.toggle-button {
    position: absolute;
    top: calc(50% - 20px);
    width: 15px;
    height: 40px;
    border: 1px solid $border-color-grey;
    justify-content: center;
    align-items: center;
    display: flex;
    opacity: 1;
    transition: opacity 1s ease-in-out;
    box-shadow: 3px 3px 5px $dark-40pc;

    &.invisible {
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    &.selectionOpen {
      left: $layer-selection-width;
      transition: left 0.4s ease-in;

      @media(max-width: 1000px) {
        transition: left 0.4s ease-in;
        left: 0px;
      }
    }
    
  }

.app-map-view {
  position: relative;
  height: calc(100vh - $header-height - $tab-height);
  width: 100%;
  overflow: hidden;

  @media(max-width: 1000px) {
    z-index: 100;
    overflow: visible;
  }
}
</style>