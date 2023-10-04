<template>
  <b-button
    :class="'toggle-button btn-sm layer-sidebar-toggle opens-left ' + (open ? 'show-label' : '')"
    @click="toggle"
  >
    <span class="toggle-button-text">{{ $t("layers") }} &nbsp;</span>
    <b-icon :icon="open ? 'layers-half' : 'layers'"></b-icon>
  </b-button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  name: "app-geovisual-toggle-layer",
})
export default class AppGeovisualToggleLayer extends Vue {
  @State(state => state.sidebar["layer-switcher"]) open!: boolean;

  toggle() {
    this.$store.direct.commit.sidebar.toggle({ name: "layer-switcher" });
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

button.layer-sidebar-toggle {
  top: 0.5em;

  &.opens-left {
    right: calc(100% - 1px);
    border-right-color: $white;

    .plant-view-csp-ptc:not(.mobile) & {
      &:hover,
      &.show-label {
        .toggle-button-text {
          padding-right: 0.5em;
        }
      }
    }
  }

  &:hover {
    // background-color: $background-grey;

    @extend .show-label;
  }

  &-content {
    padding: 10px;

    .layer-sublayers {
      padding-left: 10px;
    }
  }
}
</style>
