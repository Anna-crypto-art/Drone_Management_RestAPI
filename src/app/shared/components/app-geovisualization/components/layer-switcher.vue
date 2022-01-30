<template>
  <div :class="'layer-switcher' + (sidebarOpen ? ' open' : '')">
    <app-geovisual-toggle-layer />

    <div class="controls">
      <!-- IDEA: Bootstrap thought it was a good idea to use a transparent
           background for hovered buttons, in this case not, use a white
           or gray one instead -->

      <b-button size="sm" @click="goHome">
        <b-icon-house />
      </b-button>

      <b-button-group vertical>
        <b-button size="sm" @click="() => handleZoom('in')">
          <b-icon-plus />
        </b-button>
        <b-button size="sm" @click="() => handleZoom('out')">
          <b-icon-dash />
        </b-button>
      </b-button-group>
    </div>

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

        <b-form-checkbox>{{ $t("world-map") }}</b-form-checkbox>
      </app-geovisual-layer-display>
    </div>
  </div>
</template>

<script lang="ts">
import { Map } from "ol";
import { Zoom } from "ol/control";
import { easeOut } from "ol/easing";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
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
    AppGeovisualToggleLayer,
  },
})
export default class AppGeovisualLayerSwitcher extends Vue {
  @Prop() map!: Map;
  @Prop() layers!: LayerType[];
  @Prop({ default: "" }) title = "";

  readonly rootLayer = new LayerStructure();

  public zoomDelta = 1;
  public animationDuration = 200;

  @State(state => state.sidebar["layer-switcher"]) sidebarOpen!: boolean;

  mounted(): void {
    this.layerSetup(this.rootLayer, this.layers);

    this.map.getControls().forEach(control => {
      if (control instanceof Zoom) {
        this.map.removeControl(control);
      }
    });
  }

  private layerSetup(parentLayer: LayerStructure, layers: LayerType[]) {
    const setLoadigState = (e: LoadingEvent) => {
      this.$emit("loading", e);
    };

    for (const layer of layers) {
      const name = layer.name;

      switch (layer.type) {
        case "osm": {
          parentLayer.addChildLayer(new LayerStructure(new OSMLoader(layer, this.map, setLoadigState), name));

          break;
        }

        case "geojson": {
          const geoLayerStruct = new LayerStructure(new GeoJSONLoader(layer, this.map, setLoadigState), name);

          parentLayer.addChildLayer(geoLayerStruct);

          break;
        }

        case "group": {
          const groupLayerStruct = new LayerStructure(undefined, name || layer.name, layer);
          parentLayer.addChildLayer(groupLayerStruct);

          this.layerSetup(groupLayerStruct, layer.childLayers);

          break;
        }

        case "custom": {
          const customLayerStruct = new LayerStructure(new CustomLoader(layer, this.map, setLoadigState), name);
          parentLayer.addChildLayer(customLayerStruct);

          break;
        }
      }
    }
  }

  handleZoom(direction: "out" | "in") {
    const view = this.map.getView();
    const zoom = view.getZoom();

    if (zoom !== undefined) {
      const nextZoom = view.getConstrainedZoom(zoom + (direction === "out" ? -this.zoomDelta : this.zoomDelta));

      if (view.getAnimating()) view.cancelAnimations();

      view.animate({
        zoom: nextZoom,
        duration: this.animationDuration,
        easing: easeOut,
      });
    }
  }

  goHome() {
    window.dispatchEvent(new CustomEvent("app-visualization:go-home"));
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$sidebar-width: min(400px, 70vw);

.layer-switcher {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: min(400px, calc(100vw - 50px));

  background: white;
  transform: translateX(100%);

  transition: transform 0.2s ease-in-out;
  border-left: $border-color-grey 1px solid;

  .controls {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    position: absolute;
    right: 100%;
    bottom: 0;
    padding-right: 0.5em;
    padding-bottom: 2em;

    button {
      backdrop-filter: blur(2.5px);
    }
  }

  .content {
    padding: 20px;
    overflow: auto;
    height: 100%;
  }

  &.open {
    transform: translateX(0);
  }
}
</style>
