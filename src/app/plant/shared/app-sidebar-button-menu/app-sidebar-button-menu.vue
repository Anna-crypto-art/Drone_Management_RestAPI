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
        <b-icon icon="clipboard-data" scale="1.1" shift-h="-2" />
      </b-button>
    </b-button-group>
    <b-button 
      variant="secondary"
      size="sm"
      class="toggle-button"
      :class="{ openAnalyses:openAnalyses, openObservations:openObservations, invisible:invisible }"
      @click="onToggleAll()"
      >
        <b-icon :icon="open ? 'chevron-compact-left' : 'chevron-compact-right'"></b-icon>
      </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
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
  @State(state => state.sidebar["analyses"]) openAnalyses!: boolean;
  @State(state => state.sidebar["observations"]) openObservations!: boolean;

  get variantAnalyses(): string { return this.$store.direct.state.sidebar.analyses ? "primary" : "secondary"; }
  get variantObservations(): string { return this.$store.direct.state.sidebar.observations ? "primary" : "secondary"; }

  get open(): boolean { return (this.openAnalyses || this.openObservations) }

  invisible = false;

  @Watch('open')
  onOpenChanged() {
    this.invisible = true;
    setTimeout(() => {
      this.invisible = false;
    }, 500);
  }
  
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
    console.log(this.open)
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
    border-right: 1px solid $border-color-grey !important;
    border-color: transparent;

    &:hover {
      background-color: $background-grey;
    }
  }

  .toggle-button {
    position: absolute;
    top: 50%;
    width: 15px;
    height: 40px;
    border: 1px solid $border-color-grey;
    left: $button-menu-width;
    justify-content: center;
    align-items: center;
    display: flex;
    opacity: 1;
    transition: opacity 1s;

    &.invisible {
      opacity: 0;
      transition: opacity 5s;
    }

    &.openAnalyses {
      left: calc($button-menu-width + $layer-selection-width + $sidebar-width);
      // transition: opacity 5s ease-in-out;
      transition-delay: 0.4s;
    }

    &.openObservations {
      left: calc($button-menu-width + $sidebar-width);
      // transition: opacity 5s ease-in-out;
      transition-delay: 0.3s;
    }
  }
}
</style>