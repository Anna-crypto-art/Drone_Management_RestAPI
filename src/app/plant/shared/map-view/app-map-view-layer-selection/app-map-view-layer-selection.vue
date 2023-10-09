<template>
  <Transition>
    <div class="app-map-view-layer-selection" v-if="visible">
        <p class="grayed mar-bottom-half"><slot name="title" /></p>
        <slot />    
    </div>
  </Transition>
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

.v-leave-from {
  width: 300px;
  left: calc($sidebar-width + 40px);
  transition: left 0.3s;
  transition: width 0.3s;
}

.app-map-view-layer-selection {
  position: absolute;
  height: 100%;
  width: 0px;
  left: 0px;
  
  top: 0;
  background-color: $white;
  padding: 1em;
  overflow-y: auto;
}
</style>