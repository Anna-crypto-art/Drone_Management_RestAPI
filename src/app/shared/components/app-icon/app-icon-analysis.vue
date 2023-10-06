<template>
  <b-iconstack :class="cls">
    <b-icon stacked icon="search" scale="1.2" shift-h="-1" />
    <b-icon stacked icon="bar-chart-fill" shift-v="2" shift-h="-3" scale="0.5" />
  </b-iconstack>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-icon-analysis",
})
export default class AppIconAnalysis extends Vue {
  @Prop({ default: "" }) cls!: string;
  @Prop({ default: true }) fill!: boolean;
}
</script>

<style lang="scss">
</style>
