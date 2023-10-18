<template>
  <div class="app-sidebar" :class="{open:open}">
    <app-analysis-selection-sidebar :plant="plant" :analyses="analyses" />
    <app-observation-selection-sidebar :plant="plant" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";
import { State } from "vuex-class";
import AppAnalysisSelectionSidebar from "../selection-sidebar/analysis-selection/analysis-selection-sidebar.vue";
import AppObservationSelectionSidebar from "../selection-sidebar/observation-selection/observation-selection-sidebar.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

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

  @State(state => state.sidebar["observations"]) observSidebarOpen!: boolean;
  @State(state => state.sidebar["analyses"]) analysesSidebarOpen!: boolean;

  get open(): boolean {
    return this.observSidebarOpen || this.analysesSidebarOpen;
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
  // overflow: hidden;
  flex-shrink: 0;

  &.open {
    margin-left: 0;
  }
}

</style>