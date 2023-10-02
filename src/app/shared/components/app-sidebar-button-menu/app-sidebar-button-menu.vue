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
  test = console.log("mobile: "+store.state.mobile.mobile);
  test2 = console.log("state analysis sidebar:",this.$store.direct.state.sidebar.analysis);
  test3 = console.log("state observation sidebar:",this.$store.direct.state.sidebar.observations);
  sidebarClosed = this.$store.direct.commit.sidebar.set({ name: "observations", state: false });
  test4 = console.log("state observation sidebar:",this.$store.direct.state.sidebar.observations);

  variantAnalysis = this.setButtonVariant(this.$store.direct.state.sidebar.analysis);
  variantObservations = this.setButtonVariant(this.$store.direct.state.sidebar.observations);

  setButtonVariant(sidebar: boolean) {
    if (sidebar) {
      return "primary";
    } else {
      return "secondary";
    }
  }

  onToggle(tool: string) {
    switch (tool) {
      case "analysis":
        console.log("toggle analysis...")
        this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
        this.variantAnalysis = this.setButtonVariant(this.$store.direct.state.sidebar.analysis)
        if (this.$store.direct.state.sidebar.observations) {
          this.$store.direct.commit.sidebar.toggle({ name: "observations" });
          this.variantObservations = this.setButtonVariant(this.$store.direct.state.sidebar.observations)
        }
        break;
      case "observations":
        console.log("toggle observations...")
        this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        this.variantObservations = this.setButtonVariant(this.$store.direct.state.sidebar.observations)
        if (this.$store.direct.state.sidebar.analysis) {
          this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
          this.variantAnalysis = this.setButtonVariant(this.$store.direct.state.sidebar.analysis)
        }
        break;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.toggle-button {
  position: absolute;
  // color: $blue;
  border: 1px solid $border-color-grey;
  white-space: nowrap;
  z-index: 10;

  // &:active:hover {
  //   color: $hover-blue !important;
  // }

  &.analysis {
    // margin-left: -50px;    
    top: 41.2px;
  }
  &.observations {
    // margin-left: -50px;
    top: 76.2px;
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

  // &:hover {
  //   // background-color: $background-grey;

  //   @extend .show-label;
  // }
}
</style>