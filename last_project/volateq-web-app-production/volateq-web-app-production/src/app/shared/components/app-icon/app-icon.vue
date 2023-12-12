<template>
  <b-icon :icon="icon" :class="cls" />
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-icon",
})
export default class AppIcon extends Vue {
  @Prop({ required: true }) icon!: string;
  @Prop({ default: "" }) cls!: string;
}
</script>

<style lang="scss">
</style>
