<template>
  <div class="layer-switcher-toggle">
    <b-button class="toggle-button btn-sm" @click="toggleLayerSwitcher()">
      <b-icon :icon="'arrow-bar-' + (isLayerSwitcherOpen ? 'right' : 'left')"></b-icon>
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Map from "ol/Map";
import { CustomControl } from "../custom-ol-control";
import AppGeovisualLayerSwitcher from "./layer-switcher.vue";

@Component({
  name: "app-geovisual-toggle-layer"
})
export default class AppGeovisualToggleLayer extends Vue {
  @Prop() layerIndex!: number;
  @Prop() map!: Map;

  mounted(): void {
    const layerToggle = new CustomControl(this.$el as HTMLElement);
    this.map.addControl(layerToggle);
  }

  toggleLayerSwitcher(): void {
    AppGeovisualLayerSwitcher.toggle(this.layerIndex);
  }

  get isLayerSwitcherOpen(): boolean {
    return AppGeovisualLayerSwitcher.isOpen(this.layerIndex)
  }
}
</script>

<style lang="scss">
.layer-switcher-toggle {
  pointer-events: all;
  position: absolute;
  right: 0;
  top: 0.5em;

  .toggle-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &-content {
    padding: 10px;
    .layer-sublayers {
      padding-left: 10px;
    }
  }
}
</style>