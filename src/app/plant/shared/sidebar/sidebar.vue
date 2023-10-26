<template>
  <div class="app-sidebar" :class="{ open: open, 'selection-open': selectionOpen }">
    <app-analysis-selection-sidebar :plant="plant" :analyses="analyses" />
    <app-observation-selection-sidebar :plant="plant" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";
import AppAnalysisSelectionSidebar from "../selection-sidebar/analysis-selection/analysis-selection-sidebar.vue";
import AppObservationSelectionSidebar from "../selection-sidebar/observation-selection/observation-selection-sidebar.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { SidebarNames, sidebars } from "@/app/shared/stores/sidebar";

@Component({
  name: "app-sidebar",
  components: {
    AppIconAnalysis,
    AppIconObservations,
    AppAnalysisSelectionSidebar,
    AppObservationSelectionSidebar,
  }
})
export default class AppSidebar extends Vue {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  private routeQueryHelper = new RouteQueryHelper(this);

  created() {
    this.routeQueryHelper.queryChanged(async () => {
      this.openSidebarByQueryRoute();
    });
  }

  mounted() {
    this.openSidebarByQueryRoute();
  }

  get open(): boolean {
    return this.$store.direct.state.sidebar.analyses || this.$store.direct.state.sidebar.observations;
  }

  get selectionOpen(): boolean {
    return this.$store.direct.state.sidebar.analysesSelection || this.$store.direct.state.sidebar.observationsSelection;
  }

  private openSidebarByQueryRoute() {
    if (this.$route.query.sidebar && typeof this.$route.query.sidebar === "string") {
      const sidebarName = this.$route.query.sidebar as SidebarNames;
      if (sidebars.includes(sidebarName)) {
        this.$store.direct.commit.sidebar.set({ name: sidebarName, state: true });
        sidebars.filter(s => s !== sidebarName).forEach(s => {
          this.$store.direct.commit.sidebar.set({ name: s, state: false });
        });
      }
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
  margin-left: calc($sidebar-width * -1);
  width: $sidebar-width;
  height: 100%;
  transition: all 0.3s ease-in-out;
  background-color: $white;
  flex-shrink: 0;

  &.open {
    margin-left: 0;
    box-shadow: 3px 3px 5px $dark-40pc;
    z-index: 1; // overlays map
  }
  &.open.selection-open {
    box-shadow: none;
  }
}

</style>