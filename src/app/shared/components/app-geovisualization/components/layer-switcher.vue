<template>
  <div :class="'layer-switcher' + (open ? ' open' : '')">
    <div class="content">
      <app-geovisual-layer-display :layer="rootLayer"></app-geovisual-layer-display>
    </div>
  </div>
</template>

<script lang="ts">
import { Map } from "ol";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { LoadingEvent } from "../types/events";
import { LayerStructure } from "../layer-structure";
import { OSMLoader } from "../loader/osm-loader";
import { GeoJSONLoader } from "../loader/geojson-loader";
import { CustomLoader } from "../loader/custom-loader";
import LayerDisplay from "./layer-display.vue";
import { LayerType } from "../types/layers";

@Component({
  name: "app-geovisual-layer-switcher",
  components: {
    LayerDisplay
  }
})
export default class LayerSwitcher extends Vue {
  private static layerUIs: LayerSwitcher[] = [];

  public static toggle(id: number): void {
    this.layerUIs[id].toggle();
  }

  public static isOpen(id: number): boolean {
    return this.layerUIs[id].isOpen();
  }

  @Prop() map!: Map;
  @Prop() layers!: LayerType[];
  @Prop({ default: "" }) title = "";
  @Prop() layerIdx?: (idx: number) => void;

  mounted() {
    this.layerSetup(this.rootLayer, this.layers);
    this.layerIdx && this.layerIdx(this.layerIndex);
  }
  readonly layerIndex = (() => {
    const id = LayerSwitcher.layerUIs.length;
    LayerSwitcher.layerUIs[id] = this;
    return id;
  })();

  readonly rootLayer = new LayerStructure();
  open = true;


  private layerSetup(parentLayer: LayerStructure, layers: LayerType[]) {
    const setLoadigState = (e: LoadingEvent) => {
      this.$emit("loading", e);
    };

    for (const layer of layers) {
      const name = layer.name

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

          console.log("group layer name:");
          console.log(groupLayerStruct.name);

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
    this.open = !this.open;
    this.$forceUpdate(); // VUE why?, in React this would be: this.setState(state => ({open: !state.open}))

    this.$emit("sidebarToggle", this.open);
  }

  public isOpen(): boolean {
    return this.open;
  }
}
</script>

<style lang="scss">
$sidebar-width: 400px;

.layer-switcher {
  flex: 0 0 0;
  width: 0;

  box-sizing: content-box;

  background: white;
  overflow-x: hidden;

  box-shadow: 0 0 5px lightgray;

  $animation: 0.2s ease-in-out;
  transition: flex-basis $animation;

  > * {
    margin: 10px;
  }

  &.open {
    flex-basis: $sidebar-width;
  }

  .content {
    margin-top: 20px;
    margin-left: -20px;
    width: $sidebar-width;
  }
}

</style>