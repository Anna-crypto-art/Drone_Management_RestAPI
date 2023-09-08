<template>
  <div class="app-color-square" :style="'background-color: ' + cssColor + ';'"></div>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import { hex8ToRgba } from "../../services/helper/color-helper";

@Component({ name: "app-color-square" })
export default class AppColorSquare extends Vue {
  @Prop({ default: "" }) color!: string;

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
  margin-top: 5px;
  width: 20px;
  height: 20px;
  border: 1px solid $dark;
  margin-right: 5px;
}
</style>