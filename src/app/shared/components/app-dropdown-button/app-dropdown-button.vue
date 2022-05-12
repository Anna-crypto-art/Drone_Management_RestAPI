<template>  
  <b-dropdown :variant="variant" :class="cls" :disabled="isDisabled" :size="size">
    <template #button-content>
      <slot name="title">{{ title }}</slot>
      <span class="app-button-loading" v-show="loading"><b-spinner small></b-spinner></span>
    </template>
    <slot />
  </b-dropdown>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
  name: "app-dropdown-button",
})
export default class AppDropdownButton extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "" }) cls!: string;
  @Prop({ default: "primary" }) variant!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "" }) size!: string;

  get isDisabled() {
    return this.loading || this.disabled;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-button-loading {
  margin-right: 5px;
}
</style>
