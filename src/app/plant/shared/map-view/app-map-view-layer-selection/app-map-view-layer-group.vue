<template>
  <div class="app-map-view-layer-group">
    <div class="app-map-view-layer-group-title" @click="onCollapse">
      <h5>
        <slot name="title"><span class="app-map-view-layer-group-title-text">{{ title }}</span></slot>
        <small class="font-xs pad-left-half">
          <app-icon :icon="open ? 'chevron-up' : 'chevron-down'" class="blue" />
        </small>
      </h5>
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
  @Prop({ default: "" }) title!: string;

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

    &-text {
      color: $blue;
    }
  }
}
</style>