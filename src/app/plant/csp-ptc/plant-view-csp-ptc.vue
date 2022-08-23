<template>
  <div :class="'plant-view-csp-ptc' + (isMobile ? ' mobile' : '')" v-if="analysisResults">
    <app-analysis-selection-sidebar
      ref="analysisSelectionSidebar"
      :plant="plant"
      :analysisResults="analysisResults"
      :getPIColor="getPiColor"
      :absolute="leftSidebarAbsolute"
    />
    <div class="plant-view-csp-ptc-rightside">
      <h2 :class="'plant-view-csp-ptc-title ' + (sidebarStates['analysis'] ? 'open' : '')">
        {{ plant.name }}
      </h2>
      <b-tabs align="center" @activate-tab="onTabChange">
        <b-tab>
          <template #title>
            <b-icon icon="map" />
          </template>
          <app-visual-csp-ptc :analysisResults="analysisResults" :plant="plant" />
        </b-tab>
        <b-tab v-if="hasResults">
          <template #title><b-icon icon="table" /></template>
          <app-tables-csp-ptc v-if="loadTables" :analysisResults="analysisResults" :plant="plant" />
        </b-tab>
        <b-tab v-if="hasResults">
          <template #title><b-icon icon="bar-chart-fill" /></template>
          <app-plant-diagram-view-csp-ptc v-if="loadDiagrams" :analysisResults="analysisResults" :plant="plant" />
        </b-tab>
        <b-tab v-if="isSuperAdmin">
          <template #title><b-icon icon="shield-shaded" /></template>
          <app-plant-admin-view-csp-ptc :selectedAnalysisResult="selectedAnalysisResult" :plant="plant" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import AppPlantAdminViewCspPtc from "@/app/plant/csp-ptc/plant-admin-view-csp-ptc.vue";
import AppTablesCspPtc from "@/app/plant/csp-ptc/tables/tables-csp-ptc.vue";
import AppVisualCspPtc from "@/app/plant/csp-ptc/visualization/visual-csp-ptc.vue";
import AppAnalysisSelectionSidebar from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-sidebar.vue";
import { AnalysisSelectionEvent, IAnalysisSelectionSidebar } from "@/app/plant/shared/analysis-selection-sidebar/types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ISidebarModule } from "@/app/shared/stores/sidebar";
import { Component, Prop, Ref } from "vue-property-decorator";
import { State } from "vuex-class";
import { AnalysisSelectionService } from "../shared/analysis-selection-sidebar/analysis-selection-service";
import { cspPtcKeyFigureRainbowColors } from "./csp-ptc-key-figure-colors";
import AppPlantDiagramViewCspPtc from "@/app/plant/csp-ptc/plant-diagram-view-csp-ptc.vue";
import { AnalysisSelectionBaseComponent } from "../shared/analysis-selection-sidebar/analysis-selection-base-component";

@Component({
  name: "app-plant-view-csp-ptc",
  components: {
    AppVisualCspPtc,
    AppTableContainer,
    AppExplanation,
    AppTablesCspPtc,
    AppSidebar,
    AppAnalysisSelectionSidebar,
    AppPlantAdminViewCspPtc,
    AppPlantDiagramViewCspPtc,
  },
})
export default class AppPlantViewCspPtc extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Ref() analysisSelectionSidebar!: IAnalysisSelectionSidebar;

  analysisResults: AnalysisResultDetailedSchema[] | null = null;

  @State(state => state.sidebar) sidebarStates!: ISidebarModule;
  preMobileSidebarState: ISidebarModule | null = null;

  leftSidebarAbsolute = true; // TODO: Make it absolute on all tabs?
  currentTab = 0;
  // Load table data if user switches to table view, only
  // So we avoid keeping REST-API busy for no reason.
  loadTables = false;
  loadDiagrams = false; // same for diagrams

  private isMobile!: boolean; // TODO: Replace this with the new mobile store
  private isMobileQuery!: MediaQueryList;
  private isMobileListener<Evt extends { matches: boolean }>(e: Evt) {
    this.isMobile = e.matches;

    this.$store.direct.commit.sidebar.setAll(!this.isMobile);
    this.updateLeftSidebarAbsolute();
  }

  async created(): Promise<void> {
    await super.created();

    try {
      this.analysisResults = await volateqApi.getAnalysisResults(this.plant.id);
    } catch (e) {
      this.showError(e);
    }

    this.isMobileQuery = window.matchMedia("screen and (max-width: 1000px)");
    this.isMobileQuery.addEventListener("change", this.isMobileListener);
    this.isMobileListener(this.isMobileQuery);
  }

  protected async onAnalysisSelected() {
    this.rerenderOLCanvas();
  }

  protected async onMultiAnalysesSelected() {
    this.rerenderOLCanvas();
  }

  unmounted() {
    this.isMobileQuery.removeEventListener("change", this.isMobileListener);
  }

  get hasResults(): boolean {
    return this.analysisResults ? this.analysisResults?.length > 0 : false;
  }

  async onTabChange(tab: number) {
    this.currentTab = tab;
    this.updateLeftSidebarAbsolute();

    if (this.hasResults) {
      if (this.currentTab === 1) { // 1 = tables
        this.loadTables = true; 
      } else if (this.currentTab === 2) { // 2 = diagrams
        this.loadDiagrams = true; 
      }

      if (this.currentTab === 1 || this.currentTab === 0 || this.currentTab === 2) { // 0 = map
        // wait for tables or map component to be loaded and
        // fire last Analysis event to load data or rerender
        if (this.firstAnalysisResult) {
          await this.$nextTick();
          AnalysisSelectionService.whazzup(this.plant.id);
        }
      }
    }
  }

  private rerenderOLCanvas(timeout = 0): void {
    setTimeout(() => {
      // triggers openlayers canvas element to rerender
      window.dispatchEvent(new UIEvent("resize"));
    }, timeout);
  }

  getPiColor(keyFigure: KeyFigureSchema): string {
    return cspPtcKeyFigureRainbowColors[keyFigure.id];
  }

  updateLeftSidebarAbsolute() {
    this.leftSidebarAbsolute = this.isMobile || this.currentTab === 0;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

$left-width: 400px;

.plant-view-csp-ptc {
  height: calc(100vh - #{$header-height});
  width: 100%;
  display: flex;
  position: relative;

  &-title {
    position: relative;
    z-index: 100;
    font-size: 1.5rem;
    display: block;
    position: absolute;
    top: 0.3em;
    left: 0.5em;
  }

  &-rightside {
    height: 100%;
    width: 100%;
  }

  &-admin-panel {
    &-tab {
      padding: 0 50px;
    }

    &-container {
      padding: 0;
    }
  }
}
</style>
