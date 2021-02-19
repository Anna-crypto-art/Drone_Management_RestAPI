<template>
  <div class="app-loading">
    <b-spinner></b-spinner>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: 'app-loading'
})
export default class AppLoading extends Vue {}
</script>

<style lang="scss">
.app-loading {
  .spinner-border {
    display: block;
    margin: 30px auto;
  }
}
</style>