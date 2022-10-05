<template>
  <b-iconstack :class="cls">
    <b-icon stacked icon="search" scale="1.2" />
    <b-icon stacked :icon="fill ? 'bar-chart-fill' : 'bar-chart'" shift-v="2" shift-h="-2" scale="0.5" />
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
