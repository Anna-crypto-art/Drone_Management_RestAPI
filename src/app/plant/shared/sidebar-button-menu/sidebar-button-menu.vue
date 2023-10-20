<template>
  <div class="app-sidebar-button-menu" :class="{ openAnalyses:openAnalyses, openObservations:openObservations }">
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
        :disabled="!hasObservAction"
      >
        <b-icon icon="clipboard-data" scale="1.1" shift-h="-2" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { SidebarNames } from "@/app/shared/stores/sidebar";
import { State } from "vuex-class";
import AppMapView from "../map-view/map-view.vue";
import { CcpService } from "../plant-settings/ccp-service";
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';

@Component({
  name: "app-sidebar-button-menu",
  components: {
    AppIconAnalysis,
    AppIconObservations,
    AppMapView,
  }
})
export default class AppSidebarButtonMenu extends Vue {
  @Prop({ required: true }) plant!: PlantSchema;
  @State(state => state.sidebar["analyses"]) openAnalyses!: boolean;
  @State(state => state.sidebar["observations"]) openObservations!: boolean;

  get variantAnalyses(): string { return this.$store.direct.state.sidebar.analyses ? "primary" : "secondary"; }
  get variantObservations(): string { return this.$store.direct.state.sidebar.observations ? "primary" : "secondary"; }

  hasObservAction = false;

  async created() {
    this.hasObservAction = (await CcpService.get(this.plant.id).getCcps()).length > 0;
  }

  @CatchError()
  onToggle(tool: SidebarNames) {
    switch (tool) {
      case "analyses":
        this.$store.direct.commit.sidebar.toggle({ name: "analyses" });
        if (this.openObservations) {
          this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        }
        break;
      case "observations":
        this.$store.direct.commit.sidebar.toggle({ name: "observations" });
        if (this.openAnalyses) {
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
  width: $button-menu-width;
  height: 100%;
  background-color: $white;
  border: 1px solid $border-color-grey;
  z-index: 10;
  box-shadow: 3px 3px 5px $dark-40pc;

  &.openObservations {
    box-shadow: none;
  }

  &.openAnalyses {
    box-shadow: none;
  }

  .sidebar-button {
    width: 40px;
    height: 40px;
    margin-left: -1px;
    border-right: 1px solid $border-color-grey !important;
    border-color: transparent;

    &:hover {
      background-color: $background-grey;
    }

    &:disabled {
      border-color: transparent;
      color: grey;
    }
  }
}
</style>
