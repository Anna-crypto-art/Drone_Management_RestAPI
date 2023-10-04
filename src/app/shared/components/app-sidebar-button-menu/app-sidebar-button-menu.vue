<template>
  <div class="app-sidebar-button-menu">
    <b-button 
      :variant="variantAnalysis"
      size="sm"
      tool="analysis"
      :class="'toggle-button analysis'"
      @click="onToggle('analysis')"
    >
      <app-icon-analysis />
    </b-button>
    <b-button 
      :variant="variantObservations"
      size="sm"
      tool="observations"
      :class="'toggle-button observations'"
      @click="onToggle('observations')"
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
import store from "@/app/app-state";

@Component({
  name: "app-sidebar-button-menu",
  components: {
    AppIconAnalysis,
    AppIconObservations,
  }
})
export default class AppSidebarButtonMenu extends Vue {

  get variantAnalysis(): string { return this.$store.direct.state.sidebar.analysis ? "primary" : "secondary"; }
  get variantObservations(): string { return this.$store.direct.state.sidebar.observations ? "primary" : "secondary"; }

  onToggle(tool: string) {
    switch (tool) {
      case "analysis":
        this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
        if (this.$store.direct.state.sidebar.observations) {
          this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        }
        break;
      case "observations":
        this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        if (this.$store.direct.state.sidebar.analysis) {
          this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
        }
        break;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-sidebar-button-menu {
  width: 50px;

  .toggle-button {
    position: absolute;
    border: 1px solid $border-color-grey;
    white-space: nowrap;
    z-index: 10;

    &.analysis {
      top: 41.2px;
    }
    &.observations {
      top: 76.2px;
    }

    // &.opens-left {
    //   right: calc(100% - 1px);
    //   border-right-color: $white;

    //   .plant-view-csp-ptc:not(.mobile) & {
    //     &:hover,
    //     &.show-label {
    //       .toggle-button-text {
    //         padding-right: 0.5em;
    //       }
    //     }
    //   }
    // }

    // &:hover {
    //   // background-color: $background-grey;

    //   @extend .show-label;
    // }
  }
}
</style>