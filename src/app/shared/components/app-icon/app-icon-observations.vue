<template>
  <b-iconstack :class="cls">
    <b-icon icon="clipboard-data" scale="0.8" shift-v="2" shift-h="-3" />
  </b-iconstack>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-icon-observations",
})
export default class AppIconObservations extends Vue {
  @Prop({ default: "" }) cls!: string;
  @Prop({ default: true }) fill!: boolean;
}
</script>

<style lang="scss">
</style>
