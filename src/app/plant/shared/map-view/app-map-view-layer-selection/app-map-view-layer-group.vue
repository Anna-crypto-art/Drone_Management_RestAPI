<template>
  <div @click="onCollapse" class="app-map-view-layer-group">
    <div class="app-map-view-layer-group-title">
      <slot name="title" />
      <small v-if="open" class="font-xs pad-left-half">
        <app-icon :icon="collapsed ? 'chevron-up' : 'chevron-down'" :class="{ 'blue': open }" />
      </small>
    </div>
    <b-collapse v-model="open">
      <slot />
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";

@Component({
  name: "app-map-view-layer-group",
  components: {
    AppIcon,
  },
})
export default class AppMapViewLayerGroup extends BaseComponent {  
  @Prop({ default: false }) value!: boolean;

  open!: boolean;

  @Watch("value", { immediate: true })
  onValueChanged() {
    this.open = this.value;
  }

  @CatchError()
  onCollapse() {
    this.open = !this.open;

    this.$emit("input", this.open);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-layer-group {
  &-title {
    cursor: pointer;
  }
}
</style>