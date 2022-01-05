<template>
  <div :class="'layer-switcher' + (sidebarOpen ? ' open' : '')">
    <app-geovisual-toggle-layer :isOpen="sidebarOpen" :toggle="toggle" />

    <div class="content">
      <div class="content-top">
        <slot name="topContent" />
      </div>

      <app-geovisual-layer-display :layer="rootLayer">
        <!-- Pass slots through -->
        <template v-for="(_, slot) in $slots">
          <template :slot="slot">
            <slot :name="slot" />
          </template>
        </template>
      </app-geovisual-layer-display>
    </div>
  </div>
</template>

<script lang="ts">
import { Map } from "ol";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { LayerStructure } from "../layer-structure";
import { CustomLoader } from "../loader/custom-loader";
import { GeoJSONLoader } from "../loader/geojson-loader";
import { OSMLoader } from "../loader/osm-loader";
import { LoadingEvent } from "../types/events";
import { LayerType } from "../types/layers";
import AppGeovisualLayerDisplay from "./layer-display.vue";
import AppGeovisualToggleLayer from "./toggle-layer.vue";

@Component({
  name: "app-geovisual-layer-switcher",
  components: {
    AppGeovisualLayerDisplay,
    AppGeovisualToggleLayer
  }
})
export default class AppGeovisualLayerSwitcher extends Vue {
  private static layerUIs: AppGeovisualLayerSwitcher[] = [];

  public static toggle(id: number): void {
    this.layerUIs[id].toggle();
  }

  public static isOpen(id: number): boolean {
    return this.layerUIs[id].isOpen();
  }

  @Prop() map!: Map;
  @Prop() layers!: LayerType[];
  @Prop({ default: "" }) title = "";
  @Prop() sidebarOpen!: boolean;

  readonly layerIndex: number;
  readonly rootLayer = new LayerStructure();

  constructor() {
    super();

    this.layerIndex = AppGeovisualLayerSwitcher.layerUIs.length;
    AppGeovisualLayerSwitcher.layerUIs[this.layerIndex] = this;
  }

  mounted(): void {
    this.layerSetup(this.rootLayer, this.layers);
  }

  private layerSetup(parentLayer: LayerStructure, layers: LayerType[]) {
    const setLoadigState = (e: LoadingEvent) => {
      this.$emit("loading", e);
    };

    for (const layer of layers) {
      const name = layer.name;

      switch (layer.type) {
        case "osm": {
          parentLayer.addChildLayer(
            new LayerStructure(
              new OSMLoader(layer, this.map, setLoadigState),
              name
            )
          );

          break;
        }

        case "geojson": {
          const geoLayerStruct = new LayerStructure(
            new GeoJSONLoader(layer, this.map, setLoadigState),
            name
          );

          parentLayer.addChildLayer(geoLayerStruct);

          break;
        }

        case "group": {
          const groupLayerStruct = new LayerStructure(
            undefined,
            name || layer.name,
            layer
          );
          parentLayer.addChildLayer(groupLayerStruct);

          this.layerSetup(groupLayerStruct, layer.childLayers);

          break;
        }

        case "custom": {
          const customLayerStruct = new LayerStructure(
            new CustomLoader(layer, this.map, setLoadigState),
            name
          );
          parentLayer.addChildLayer(customLayerStruct);

          break;
        }
      }
    }
  }

  public toggle(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.$forceUpdate(); // Why vue?

    this.$emit("sidebarToggle", this.sidebarOpen);
  }

  public isOpen(): boolean {
    return this.sidebarOpen;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$sidebar-width: 400px;

.layer-switcher {
  position: absolute;
  right: -$sidebar-width;
  top: 0;
  height: 100%;
  width: $sidebar-width;
  padding: 20px;

  background: white;

  transition: right 0.2s ease-in-out;
  border-left: $border-color-grey 1px solid;

  &.open {
    right: 0;
  }
}
</style>
