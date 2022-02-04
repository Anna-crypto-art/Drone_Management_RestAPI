<template>
  <b-button :variant="variant" :type="type" :class="cls" :disabled="isDisabled" @click="onClick">
    <span class="app-button-loading" v-show="loading"><b-spinner small></b-spinner></span><slot></slot>
  </b-button>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
  name: "app-button",
})
export default class AppButton extends Vue {
  @Prop({ default: "button" }) type!: string;
  @Prop({ default: "" }) cls!: string;
  @Prop({ default: "primary" }) variant!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) loading!: boolean;

  get isDisabled() {
    return this.loading || this.disabled;
  }

  onClick(e: Event) {
    this.$emit("click", e);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-button-loading {
  margin-right: 5px;
}
</style>
