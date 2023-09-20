<template>
  <div :class="'layer-switcher' + (sidebarOpen ? ' open' : '')">
    <app-geovisual-toggle-layer />

    <div class="controls">
      <!-- IDEA: Bootstrap thought it was a good idea to use a transparent
           background for hovered buttons, in this case not, use a white
           or gray one instead -->

      <b-button size="sm" @click="showMyLocation">
        <b-icon-geo-alt />
      </b-button>

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
import { Component, Prop, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { LayerStructure } from "../layer-structure";
import { CustomLoader } from "../loader/custom-loader";
import { GeoJSONLoader } from "../loader/geojson-loader";
import { OSMLoader } from "../loader/osm-loader";
import { IAppLayerSWitcher } from "../types/components";
import { LoadingEvent } from "../types/events";
import { LayerType, VectorGeoLayer } from "../types/layers";
import AppGeovisualLayerDisplay from "./layer-display.vue";
import AppGeovisualToggleLayer from "./toggle-layer.vue";

@Component({
  name: "app-geovisual-layer-switcher",
  components: {
    AppGeovisualLayerDisplay,
    AppGeovisualToggleLayer,
  },
})
export default class AppGeovisualLayerSwitcher extends Vue implements IAppLayerSWitcher {
  @Prop() map!: Map;
  @Prop() layers!: LayerType[];
  @Prop({ default: "" }) title = "";

  rootLayer = new LayerStructure();
  loadedLayers: Record<string, VectorGeoLayer> = {};

  public zoomDelta = 1;
  public animationDuration = 200;

  @State(state => state.sidebar["layer-switcher"]) sidebarOpen!: boolean;

  mounted(): void {
    this.updateLayers();

    this.map.getControls().forEach(control => {
      if (control instanceof Zoom) {
        this.map.removeControl(control);
      }
    });
  }

  updateLayers() {
    this.keepAndUnregisterLoadedLayers();

    this.rootLayer = new LayerStructure();

    this.setupLayers(this.rootLayer, this.layers);
  }

  private keepAndUnregisterLoadedLayers() {
    this.loadedLayers = {};

    const getLoadedLayersAndUnregsiter = (parentLayer: LayerStructure) => {
      for (const childLayer of parentLayer.getChildLayers()) {
        if (childLayer.layerLoader instanceof GeoJSONLoader && childLayer.layerLoader.loaded) {
          this.loadedLayers[childLayer.id as string] = childLayer.layerLoader.getLoadedLayer()! as VectorGeoLayer;
        }

        if (childLayer.hasChildrens) {
          getLoadedLayersAndUnregsiter(childLayer);
        } else {
          childLayer.unregisterEvents();
        }
      }

      parentLayer.unregisterEvents();
    }

    getLoadedLayersAndUnregsiter(this.rootLayer);
  }

  private getLoadedLayer(layerId: string): VectorGeoLayer | undefined {
    if (layerId in this.loadedLayers) {
      return this.loadedLayers[layerId];
    }

    return undefined;
  }

  private setupLayers(parentLayer: LayerStructure, layers: LayerType[]) {
    const setLoadigState = (e: LoadingEvent) => {
      this.$emit("loading", e);
    };

    for (const layer of layers) {
      const layerId: string = layer.id || layer.name;
      
      switch (layer.type) {
        case "osm": {
          if (!parentLayer.hasChildLayer(layerId)) {
            parentLayer.addChildLayer(new LayerStructure(new OSMLoader(layer, this.map, setLoadigState), layer.name));
          }

          break;
        }

        case "geojson": {
          if (!parentLayer.hasChildLayer(layerId)) {
            parentLayer.addChildLayer(
              new LayerStructure(new GeoJSONLoader(layer, this.map, setLoadigState, this.getLoadedLayer(layerId)), layer.name)
            );
          }

          break;
        }

        case "group": {
          let groupLayerStruct = parentLayer.getChildLayer(layerId);
          if (!groupLayerStruct) {
            groupLayerStruct = new LayerStructure(undefined, layer.name, layer);
            parentLayer.addChildLayer(groupLayerStruct);
          }

          this.setupLayers(groupLayerStruct, layer.childLayers);

          break;
        }

        case "custom": {
          if (!parentLayer.hasChildLayer(layerId)) {
            parentLayer.addChildLayer(
              new LayerStructure(new CustomLoader(layer, this.map, setLoadigState), layer.name),
            );
          }

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

  showMyLocation() {
    window.dispatchEvent(new CustomEvent("app-visualization:go-to-me"));
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

$sidebar-width: min(425px, min(70vw, calc(100vw - 50px)));

.layer-switcher {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: $sidebar-width;
  z-index: 1;

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
      height: 35px;
      width: 35px;
      padding: 0;
    }

    button:hover {
      background: $hover-light-blue;
    }
  }

  .content {
    padding: 0 0.5em 0.5em;
    overflow: auto;
    height: 100%;
  }

  &.open {
    transform: translateX(0);
  }
}
</style>
