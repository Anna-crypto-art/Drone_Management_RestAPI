<template>
  <li class="app-checklist-item" v-bind:class="{ grayed: checked }">
    <b-icon :icon="checked ? 'check2-circle' : 'circle'"></b-icon>
    <slot></slot>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({ name: "app-checklist-item" })
export default class AppChecklistItem extends Vue {
  @Prop({ default: false }) checked!: boolean;
}

</script>

<style lang="scss">
.app-checklist-item {
  margin-bottom: 5px;
  .b-icon {
    margin-right: 10px;
  }
}
</style>