<template>
  <div :class="'app-sidebar ' + (open ? 'open' : '')">
    <div class="app-sidebar-container">
      <div class="app-sidebar-inner">
        <slot></slot>
      </div>
    </div>

    <b-button
      variant="secondary"
      size="sm"
      :class="'toggle-button opens-right ' + (open ? 'show-label' : '')"
      @click="onToggle()"
    >
      <app-icon-analysis :fill="open" />
      <span class="toggle-button-text">&nbsp; {{ $t("analysis") }}</span>
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";

@Component({
  name: "app-sidebar",
  components: {
    AppIconAnalysis,
  }
})
export default class AppSidebar extends Vue {
  @Prop({ default: true }) open!: boolean;

  onToggle(): void {
    this.$emit("toggled");
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-sidebar {
  position: relative;
  box-sizing: border-box;
  width: 0;
  height: 100%;
  transition: width 0.3s ease-in-out;
  background-color: $white;
  z-index: 10;

  // @supports (backdrop-filter: blur(5px)) {
  //   backdrop-filter: blur(5px);
  //   background: $white-70pc;
  // }
  // @supports not (backdrop-filter: blur(5px)) {
  //   background: $white-70pc;
  // }

  .app-sidebar-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .app-sidebar-inner {
      position: absolute;
      top: 0;
      left: calc($sidebar-width * -1);
      width: $sidebar-width;
      height: 100%;
      transition: all 0.3s ease-in-out;

      --sidebar-width: $sidebar-width;
    }
  }

  &.open {
    width: $sidebar-width;

    .app-sidebar-container .app-sidebar-inner {
      left: 0;
    }
  }

  .toggle-button {
    top: 3.5em;
  }
}

.toggle-button {
  position: absolute;
  color: $blue;
  border: 1px solid $border-color-grey;
  white-space: nowrap;

  &:active:hover {
    color: $hover-blue !important;
  }

  &.opens-right {
    left: calc(100% - 1px);
    border-left-color: $white;

    .plant-view-csp-ptc:not(.mobile) & {
      &:hover,
      &.show-label {
        .toggle-button-text {
          padding-left: 0.5em;
        }
      }
    }
  }

  &.opens-left {
    right: calc(100% - 1px);
    border-right-color: $white;

    .plant-view-csp-ptc:not(.mobile) & {
      &:hover,
      &.show-label {
        .toggle-button-text {
          padding-right: 0.5em;
        }
      }
    }
  }

  &-text {
    transition: all 0.3s ease-in-out;
    max-width: 0;
    display: inline-block;
    overflow: hidden;
    vertical-align: text-bottom;
    line-height: 1.3em;
  }

  .plant-view-csp-ptc:not(.mobile) &.show-label {
    .toggle-button-text {
      max-width: 150px;
    }
  }

  &:hover {
    background-color: $background-grey;

    @extend .show-label;
  }
}
</style>
