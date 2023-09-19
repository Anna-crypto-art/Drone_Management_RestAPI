<template>
  <div class="openlayers-map">
    <div class="openlayers-map-content" />

    <app-geovisual-layer-switcher
      ref="appLayerSwitcher"
      :layers="layers"
      :map="map"
      :title="title"
      @loading="toggleLoading"
    >
      <!-- Pass slots through -->
      <template v-for="(_, slot) in $slots" :slot="slot">
        <slot :name="slot" />
      </template>
    </app-geovisual-layer-switcher>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Ref } from "vue-property-decorator";

import Map from "ol/Map";
import View from "ol/View";
import Select, { SelectEvent } from "ol/interaction/Select";
import { click } from "ol/events/condition";
import "ol/ol.css";

import AppGeovisualLayerSwitcher from "./components/layer-switcher.vue";
import { LayerType } from "./types/layers";
import { IAppLayerSWitcher, IOpenLayersComponent } from "./types/components";
import { LoadingEvent } from "./types/events";
import { plantViewEventService } from "@/app/plant/plant-view-event-service";
import { PlantViewEvent } from "@/app/plant/types";

@Component({
  name: "app-geovisualization",
  components: {
    AppGeovisualLayerSwitcher,
  },
})
export default class AppGeovisualization extends Vue implements IOpenLayersComponent {
  @Prop() plantId!: string;
  @Prop() layers!: LayerType[];
  @Prop() zoom?: number;
  @Prop() center?: [number, number];
  @Prop({ default: "" }) title!: string;
  @Prop({ default: false }) loading!: boolean;

  @Ref() appLayerSwitcher!: IAppLayerSWitcher;

  map: Map | null = null;
  
  layerLoading = false;
  loadingStatus = "";

  created(): void {
    this.mapSetup();
  }

  mounted(): void {
    this.map?.setTarget(this.$el.firstChild as HTMLElement);
  }

  updateLayers() {
    this.appLayerSwitcher.updateLayers()
  }

  async toggleLoading(e: LoadingEvent) {
    this.layerLoading = e.loading;
    this.loadingStatus = e.loading && e.state || "";

    await plantViewEventService.emit(this.plantId, PlantViewEvent.TOGGLE_LOADING, this.isLoading, this.loadingStatus);
  }

  get isLoading(): boolean {
    return this.layerLoading || this.loading;
  }

  @Watch("loading") async onLoadingChanged() {
    await plantViewEventService.emit(this.plantId, PlantViewEvent.TOGGLE_LOADING, this.isLoading);
  }

  private mapSetup(): void {
    const selectClick = new Select({ condition: click });
    selectClick.on("select", (e: SelectEvent) => {
      this.$emit("click", e.selected);
    });

    this.map = new Map({
      layers: [],
      view: new View({
        center: this.center || [0, 0],
        zoom: this.zoom || 2,
      }),
    });
    this.map.addInteraction(selectClick);
  }

  public getMap(): Map {
    return this.map as Map;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$open-width: 300px;
$header-height: 50px;

.openlayers-map {
  position: relative;

  box-sizing: border-box;
  overflow: hidden;

  &-content {
    width: 100%;
    height: 100%;
  }

  &-loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
}

.ol-control.ol-zoom {
  border-radius: 0;
  padding: 0;
  background-color: transparent;
  top: auto;
  left: auto;
  right: 0.5em;
  bottom: calc(0.5em + 30px);

  button {
    color: $blue;
    background-color: $white;
    border: none; // 1px solid $blue;
    border-radius: 0;
    font-weight: normal;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: $background-grey;
    }
  }
}
</style>
