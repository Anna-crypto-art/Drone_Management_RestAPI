<template>
  <div class="app-color-square" :class="{ circle }">
    <div class="app-color-square-inner" :class="{ circle }" :style="'background-color: ' + cssColor + ';'"></div>
  </div>
  
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import { hex8ToRgba } from "../../services/helper/color-helper";

@Component({ name: "app-color-square" })
export default class AppColorSquare extends Vue {
  @Prop({ default: "" }) color!: string;
  @Prop({ default: false }) circle!: boolean;

  cssColor = "";

  created() {
    this.convertToCssColor();
  }

  @Watch("color") onColorChanged() {
    this.convertToCssColor();
  }

  private convertToCssColor() {
    if (this.color.length === 9) {
      this.cssColor = hex8ToRgba(this.color);
    } else {
      this.cssColor = this.color;
    }
  } 
}
</script>
<style lang="scss">
@import "@/scss/_colors.scss";

.app-color-square {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid $dark-40pc;
  margin-right: 5px;
  box-sizing: border-box;
  margin-bottom: -2px;

  &.circle {
    border-radius: 10px;
  }

  &-inner {
    border: 1px solid $white;
    width: 100%;
    height: 100%;

    &.circle {
      border-radius: 10px;
    }
  }
}
</style>