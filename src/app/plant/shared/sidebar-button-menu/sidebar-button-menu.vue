<template>
  <div class="app-sidebar-button-menu">
    <b-button-group vertical>
      <b-button 
        :variant="variantAnalyses"
        size="sm"
        tool="analyses"
        class="sidebar-button"
        @click="onToggle('analyses')"
      >
        <app-icon-analysis />
      </b-button>
      <b-button 
        :variant="variantObservations"
        size="sm"
        tool="observations"
        class="sidebar-button"
        @click="onToggle('observations')"
      >
        <app-icon-observations />
      </b-button>
    </b-button-group>
    <b-button 
      variant="secondary"
      size="sm"
      class="toggle-button"
      @click="onToggleAll()"
    >
      <b-icon :icon="open ? 'hevron-compact-left' : 'hevron-compact-right'"></b-icon>
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { SidebarNames } from "@/app/shared/stores/sidebar";
import { State } from "vuex-class";

@Component({
  name: "app-sidebar-button-menu",
  components: {
    AppIconAnalysis,
    AppIconObservations,
  }
})
export default class AppSidebarButtonMenu extends Vue {
  @State(state => state.sidebar["analyses"]) openA!: boolean;
  @State(state => state.sidebar["observations"]) openO!: boolean;

  get variantAnalyses(): string { return this.$store.direct.state.sidebar.analyses ? "primary" : "secondary"; }
  get variantObservations(): string { return this.$store.direct.state.sidebar.observations ? "primary" : "secondary"; }

  get open(): boolean { return (this.openA || this.openO) }

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

  @CatchError()
  onToggleAll() {
    this.$store.direct.commit.sidebar.toggle({ name: "analyses" });
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-sidebar-button-menu {
  width: $button-menu-width;
  height: 100%;
  background-color: $white;
  border: 1px solid $border-color-grey;
  z-index: 10;

  .sidebar-button {
    width: 40px;
    height: 40px;
    margin-left: -1px;
    border-right: 1px solid $border-color-grey;

    &:hover {
      background-color: $background-grey;
    }
  }

  .toggle-button {
    position: relative;
    width: 30px;
    height: 40px;
  }
}
</style>