<template>
  <div class="app-table-filter">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class AppTableFilter extends Vue { 
}
</script>

<style lang="scss">
.app-table-filter {
  float: right;
  margin-left: 2em;

  .custom-select {
    float: left;
    width: 200px !important;
  }
  
  label {
    float: left;
    margin-top: 5px;
    padding-right: 1em;
  }
}
</style>
