<template>
  <b-iconstack :class="cls">
    <b-icon stacked icon="clipboard-data" scale="1.5" shift-h="-1"/>
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
