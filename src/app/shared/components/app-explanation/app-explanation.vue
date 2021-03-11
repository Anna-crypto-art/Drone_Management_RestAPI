<template>
  <span class="app-explanation">
    <span class="app-explanation-container" ref="appExplTarget">
      <b-icon icon="question-circle-fill"></b-icon>
    </span>
    <b-popover :target="() => $refs.appExplTarget" triggers="hover" placement="top">
      <slot></slot>
    </b-popover>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "app-explanation",
})
export default class AppExplanation extends Vue {}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-explanation {
  color: $blue;
  margin-left: 5px;
}
</style>