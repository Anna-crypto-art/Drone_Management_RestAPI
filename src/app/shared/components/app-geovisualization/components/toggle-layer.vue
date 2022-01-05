<template>
  <b-button
    :class="
      'toggle-button btn-sm layer-sidebar-toggle opens-left ' +
        (isOpen ? 'show-label' : '')
    "
    @click="toggleLayerSwitcher()"
  >
    <span class="toggle-button-text">{{ $t("layers") }} &nbsp;</span>
    <b-icon :icon="isOpen ? 'layers-half' : 'layers'"></b-icon>
  </b-button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-geovisual-toggle-layer"
})
export default class AppGeovisualToggleLayer extends Vue {
  @Prop() isOpen!: number;
  @Prop() toggle!: () => void;

  toggleLayerSwitcher(): void {
    this.toggle();
  }
}
</script>

<style lang="scss">
button.layer-sidebar-toggle {
  top: 0.5em;

  &-content {
    padding: 10px;

    .layer-sublayers {
      padding-left: 10px;
    }
  }
}
</style>
