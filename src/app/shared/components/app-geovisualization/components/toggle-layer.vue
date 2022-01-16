<template>
  <b-button
    :class="
      'toggle-button btn-sm layer-sidebar-toggle opens-left ' +
        (open ? 'show-label' : '')
    "
    @click="toggle()"
  >
    <span class="toggle-button-text">{{ $t("layers") }} &nbsp;</span>
    <b-icon :icon="open ? 'layers-half' : 'layers'"></b-icon>
  </b-button>
</template>

<script lang="ts">
import { mapSidebar } from "@/app/shared/stores/sidebar";
import Vue from "vue";
import {State} from "vuex-class"
import { Component } from "vue-property-decorator";

@Component({
  name: "app-geovisual-toggle-layer"
})
export default class AppGeovisualToggleLayer extends Vue {
  // Fuck VUE!! I might need to use a freaking third party library to get this crap to work (more dependencies 🎉🎉🎉)
  open = mapSidebar.state.open;

  toggle() {
    mapSidebar.commit("toggle");
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
