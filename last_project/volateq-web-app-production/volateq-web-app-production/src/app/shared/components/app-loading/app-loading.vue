<template>
  <div class="app-loading" :class="{ background: loadingStatus }">
    <div class="app-loading-container">
      <b-spinner></b-spinner>
      <span v-if="loadingStatus" class="pad-left font-bold">
        {{ loadingStatus }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-loading",
})
export default class AppLoading extends Vue {
  @Prop({ default: "" }) loadingStatus!: string;
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  &.background {
    background-color: rgba(255,255,255,0.3);
  }

  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .spinner-border {
      color: $blue;
    }
  }
}
</style>
