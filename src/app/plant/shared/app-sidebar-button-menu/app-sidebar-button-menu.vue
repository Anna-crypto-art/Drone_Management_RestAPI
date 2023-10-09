<template>
  <div class="app-sidebar-button-menu">
    <b-button-group vertical>
      <b-button 
        :variant="variantAnalyses"
        size="sm"
        tool="analyses"
        class="toggle-button"
        @click="onToggle('analyses')"
      >
        <app-icon-analysis />
      </b-button>
      <b-button 
        :variant="variantObservations"
        size="sm"
        tool="observations"
        class="toggle-button"
        @click="onToggle('observations')"
      >
        <app-icon-observations />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { SidebarNames } from "@/app/shared/stores/sidebar";

@Component({
  name: "app-sidebar-button-menu",
  components: {
    AppIconAnalysis,
    AppIconObservations,
  }
})
export default class AppSidebarButtonMenu extends Vue {

  get variantAnalyses(): string { return this.$store.direct.state.sidebar.analyses ? "primary" : "secondary"; }
  get variantObservations(): string { return this.$store.direct.state.sidebar.observations ? "primary" : "secondary"; }

  @CatchError()
  onToggle(tool: SidebarNames) {
    switch (tool) {
      case "analyses":
        this.$store.direct.commit.sidebar.toggle({ name: "analyses" });
        if (this.$store.direct.state.sidebar.observations) {
          this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        }
        break;
      case "observations":
        this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        if (this.$store.direct.state.sidebar.analyses) {
          this.$store.direct.commit.sidebar.toggle({ name: "analyses" });
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

  .toggle-button {
    width: 40px;
    height: 40px;
    margin-left: -1px;

    &:hover {
      background-color: $background-grey;
    }
  }
}
</style>