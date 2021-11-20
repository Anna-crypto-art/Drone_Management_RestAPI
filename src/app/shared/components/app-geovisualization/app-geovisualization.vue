<template>
  <div class="openlayers-map">
    <div class="openlayers-map-content"></div>
    <div v-show="loading" class="openlayers-map-loading">
      <div class="openlayers-map-loading-icon">
        <b-spinner></b-spinner>
      </div>
    </div>

    <app-geovisual-layer-switcher
      :layers="layers"
      :map="map"
      :title="title"
      :layerIdx="intializeToggler"
      @loading="toggleLoading"
      @sidebarToggle="onSidebarToggle"
    >
      <!-- Pass slots through -->
      <template v-for="(_, slot) in $slots">
        <template :slot="slot">
          <slot :name="slot"></slot>
        </template>
      </template>
    </app-geovisual-layer-switcher>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import Map from "ol/Map";
import View from "ol/View";
import Select, { SelectEvent } from "ol/interaction/Select";
import { click } from "ol/events/condition";
import "ol/ol.css";

import AppGeovisualLayerSwitcher from "./components/layer-switcher.vue";
import AppGeovisualToggleLayer from "./components/toggle-layer.vue";
import { LayerType } from "./types/layers";
import { IOpenLayersComponent } from "./types/components";

@Component({
  name: "app-geovisualization",
  components: {
    AppGeovisualLayerSwitcher,
    AppGeovisualToggleLayer,
  },
})
export default class AppGeovisualization extends Vue
  implements IOpenLayersComponent {
  @Prop() layers!: LayerType[];
  @Prop() zoom?: number;
  @Prop() center?: [number, number];
  @Prop({ default: "" }) title!: string;
  @Prop({ default: true }) sidebarOpen!: boolean;

  map: Map | null = null;
  loading = false;

  created(): void {
    this.mapSetup();
  }

  mounted(): void {
    this.map?.setTarget(this.$el.firstChild as HTMLElement);
  }

  intializeToggler(idx: number): void {
    new AppGeovisualToggleLayer({
      propsData: { layerIndex: idx, map: this.map },
    }).$mount();
  }

  toggleLoading(e: any): void {
    this.loading = e.loading;
  }

  onSidebarToggle(toggleState: boolean): void {
    this.$emit("sidebarToggle", toggleState);
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

.volateq-sidebar {
  position: absolute;
  height: 100%;
  width: $open-width;
  right: -$open-width;

  pointer-events: all;
  transition: right 0.2s ease-in-out;

  background-color: white;

  &-header {
    height: $header-height;
    padding: 15px;
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &-close {
      cursor: pointer;
      font-size: 2rem;
    }

    &-title {
      font-size: x-large;
    }
  }

  &-body {
    width: 100%;
    height: 100%;
  }

  &-open {
    right: 0;
    box-shadow: 0 0 10px lightgray;
  }
}

.openlayers-map {
  width: 100%;
  height: 100%;

  display: flex;
  box-sizing: border-box;
  overflow: hidden;

  &-content {
    flex: 1 100%;
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
