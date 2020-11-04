<template>
  <div class="app-table-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, PropSync } from "vue-property-decorator";

@Component
export default class AppTableContainer extends Vue {}
</script>

<style lang="scss">
.app-table-container {
  margin-top: 30px;
}

</style>
