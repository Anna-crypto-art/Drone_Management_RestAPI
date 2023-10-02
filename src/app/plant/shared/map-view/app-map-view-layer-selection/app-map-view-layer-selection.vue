<template>
  <div class="app-map-view-layer-selection" v-show="visible">
    <p class="grayed mar-bottom-half"><slot name="title" /></p>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";

@Component({
  name: "app-map-view-layer-selection",
  components: {},
})
export default class AppMapViewLayerSelection extends BaseComponent {
  @Prop({ default: false }) visible!: boolean;

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-layer-selection {
  position: absolute;
  height: 100%;
  width: 300px;
  left: 400px;
  top: 0;
  background-color: $white;
  padding: 1em;
}
</style>