<template>
  <div class="app-modal-form-info-area">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({ name: "app-modal-form-info-area" })
export default class AppModalFormInfoArea extends Vue {}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-modal-form-info-area {
  background-color: $background-grey;
  margin: 0 -1.5rem 1.5rem;
  padding: 1.5rem;
}
</style>
