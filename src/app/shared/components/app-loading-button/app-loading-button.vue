<template>
  <b-button variant="primary" class="app-loading-button" @click="onClick">
    <span v-show="loading"><b-icon icon="arrow-clockwise" animation="spin"></b-icon></span>
    <slot></slot>
  </b-button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IAppLoadingButton } from "./types";

@Component({
  name: "app-loading-button",
  // computed: {
  //   loadingComputed: function() {
  //     return (this as any).loading;
  //   }
  // }
})
export default class AppLoadingButton extends Vue implements IAppLoadingButton {
  loading: boolean | undefined;
  txt: string | undefined

  created() {
    this.loading = false;
    this.txt = 'hello';
  }

  onClick() {
    this.$data.loading = true;
    // this.loading = true;
    // this.txt = 'blub';

    console.log('loading-btn clicked! ' + this.loading);

    this.$emit('click');
  }

  stopLoading() {
    this.loading = false;
  }
}
</script>

<style lang="scss">
</style>
