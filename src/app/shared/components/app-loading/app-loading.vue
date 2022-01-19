<template>
  <div class="app-loading">
    <div class="app-loading-container">
      <b-spinner></b-spinner>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "app-loading",
})
export default class AppLoading extends Vue {}
</script>

<style lang="scss">
.app-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
