<template>
  <b-button :variant="variant" :type="type" :class="'app-button ' + cls" :disabled="isDisabled" :size="size" @click="onClick">
    <span class="app-button-loading" v-show="loading"><b-spinner small></b-spinner></span>
    <b-icon v-if="icon" :icon="icon" class="app-button-icon" />
    <span :class="'app-button-content' + (hideText ? ' text-hidden' : '') + (icon ? ' has-icon' : '')">
      <slot />
    </span>
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
  @Prop({ default: "" }) size!: string;
  @Prop({ default: null }) icon!: string | null;
  @Prop({ default: false }) hideText!: boolean;

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

.app-button {
  &-loading {
    margin-right: 5px;
  }

  &-content.has-icon {
    padding-left: 5px;
    vertical-align: text-bottom;
    display: inline-block;
  }

  &-content.text-hidden {
    transition: all 0.3s ease-in-out;
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 0;
  }

  &:hover &-content.text-hidden {
    max-width: 350px;
    padding-left: 5px;
  }
}

</style>
