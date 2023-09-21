<template>
  <div :class="'app-sidebar ' + (open ? 'open' : '')">
    <div class="app-sidebar-container">
      <div class="app-sidebar-inner">
        <slot></slot>
      </div>
    </div>

    <b-button 
      :variant="variant"
      size="sm"
      :class="'toggle-button analysis'"
      @click="onToggle()"
    >
      <app-icon-analysis :fill="open" />
    </b-button>
    <b-button 
      :variant="variant"
      size="sm"
      :class="'toggle-button observations'"
      @click="onToggle()"
    >
      <b-icon-clipboard-data />
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";


@Component({
  name: "app-sidebar",
  components: {
    AppIconAnalysis,
    AppIconObservations,
  }
})
export default class AppSidebar extends Vue {
  @Prop({ default: true }) open!: boolean;

  variant = "secondary"

  onToggle(): void {
    this.$emit("toggled");
    
    if (this.variant === "primary") {
      this.variant = "secondary"
    }
    if (this.variant === "secondary") {
      this.variant = "primary"
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-sidebar {
  position: relative;
  box-sizing: border-box;
  margin-left: 50px;
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
    &.analysis {
      top: 3.5em;
    }
    &.observations {
      top: 6em;
    }
  }
}

.toggle-button {
  position: absolute;
  color: $blue;
  border: 1px solid $border-color-grey;
  white-space: nowrap;


  // &:active:hover {
  //   color: $hover-blue !important;
  // }

  &.analysis {
    margin-left: -50px;    
  }
  &.observations {
    margin-left: -50px;
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