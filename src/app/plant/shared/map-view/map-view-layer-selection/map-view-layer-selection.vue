<template>
    <div class="app-map-view-layer-selection" :class="{ 'sidebar-open': visible }">
      <div class="grayed app-map-view-popup-close-button" @click="onClose">x</div>
      <p class="grayed mar-bottom-half"><slot name="title" /></p>
        <slot />    
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-map-view-layer-selection",
  components: {},
})
export default class AppMapViewLayerSelection extends BaseComponent {
  @Prop({ default: false }) value!: boolean;
  
  visible = false;

  @Watch("value")
  onValueChanged() {
    this.visible = this.value;
  }

  @CatchError()
  onClose() {
    this.visible = false;

    this.$emit("input", this.visible);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-layer-selection {
  position: absolute;
  height: 100%;
  overflow-y: auto;
  width: 250px;
  left: calc($sidebar-width * -2);  
  transition: all 0.4s ease-in;
  top: 0;
  background-color: $white;
  padding: 1em;
  box-shadow: 3px 3px 5px $dark-40pc;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.7);
  }
  @supports not (backdrop-filter: blur(5px)) {
    background: rgba(255, 255, 255, 0.8);
  }

  &.sidebar-open {
    left: 0px;
  }
}
</style>