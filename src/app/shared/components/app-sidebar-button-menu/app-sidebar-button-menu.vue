<template>
  <div class="app-sidebar-button-menu">
    <b-button-group vertical>
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
    </b-button-group>
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
  width: 41px;
  position: absolute;
  height: calc(100% - 41.4px);
  top: 41.4px;
  z-index: 100;
  background-color: $white;
  border: 1px solid $border-color-grey;
  // margin-left: -1px;

  .toggle-button {
    width: 40px;
    height: 40px;
    margin-left: -1px;

    &:hover {
      background-color: $background-grey;

    //   @extend .show-label;
    }
  }
}
</style>