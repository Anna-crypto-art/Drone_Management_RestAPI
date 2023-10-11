<template>
    <div class="app-map-view-layer-selection" :class="{ 'sidebar-open': sidebarOpen}">
      <div class="grayed app-map-view-popup-close-button" @click="onClose">x</div>
      <p class="grayed mar-bottom-half"><slot name="title" /></p>
        <slot />    
    </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-map-view-layer-selection",
  components: {},
})
export default class AppMapViewLayerSelection extends BaseComponent {
  @Prop({ default: false }) visible!: boolean;

  get sidebarOpen(): boolean {
    return this.visible;
  }

  @CatchError()
  onClose() {
    this.visible = false;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-layer-selection {
  position: absolute;
  height: 100%;
  width: 250px;
  left: calc($sidebar-width * -2);  
  transition: all 0.4s ease-in;
  top: 0;
  background-color: $white;
  padding: 1em;
  overflow-y: auto;

  &.sidebar-open {
    left: 0px;
  }
}
</style>