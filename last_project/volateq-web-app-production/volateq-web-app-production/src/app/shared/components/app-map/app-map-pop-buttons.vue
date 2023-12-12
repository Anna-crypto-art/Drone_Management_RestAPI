<template>
  <div class="app-map-pop-buttons">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "../base-component/base-component";

@Component({
  name: "app-map-pop-buttons",
  components: {},
})
export default class AppMapPopButtons extends BaseComponent {}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-map-pop-buttons {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 0.5em;
  padding-top: 0.5em;
  overflow: visible;
}
</style>
