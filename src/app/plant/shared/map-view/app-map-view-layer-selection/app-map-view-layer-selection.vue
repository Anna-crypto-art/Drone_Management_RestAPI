<template>
    <div class="app-map-view-layer-selection" :class="{ 'sidebar-open': sidebarOpen}">
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

  get sidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.analyses;
  }

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-layer-selection {
  position: absolute;
  height: 100%;
  width: 300px;
  left: calc($sidebar-width * -2);  
  transition: all 0.5s ease-in-out;
  top: 0;
  background-color: $white;
  padding: 1em;
  overflow-y: auto;

  .mar-bottom-half {  
    z-index: 8;
  }

  &.sidebar-open {
    left: 0px;
  }
}
</style>