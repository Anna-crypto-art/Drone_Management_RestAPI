<template>
  <div :class="'plant-view-csp-ptc' + (isMobile ? ' mobile' : '')" v-if="analysisResults">
    <app-analysis-selection-sidebar
      ref="analysisSelectionSidebar"
      :plant="plant"
      :analysisResults="analysisResults"
      :getPIColor="getPiColor"
      :absolute="leftSidebarAbsolute"
      @analysisResultSelected="onAnalysisResultSelected"
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
          <app-visual-csp-ptc ref="visualCspPtc" :analysisResults="analysisResults" :plant="plant" />
        </b-tab>
        <b-tab v-if="hasResults">
          <template #title><b-icon icon="table" /></template>
          <app-tables-csp-ptc ref="tablesCspPtc" :analysisResults="analysisResults" :plant="plant" />
        </b-tab>
        <b-tab v-if="isSuperAdmin">
          <template #title><b-icon icon="braces" /></template>
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
import { IAnalysisSelectionSidebar } from "@/app/plant/shared/analysis-selection-sidebar/types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ISidebarModule } from "@/app/shared/stores/sidebar";
import { Component, Prop, Ref } from "vue-property-decorator";
import { State } from "vuex-class";
import { IAnalysisResultSelection } from "../shared/types";
import { cspPtcKeyFigureColors } from "./csp-ptc-key-figure-colors";

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
  },
})
export default class AppPlantViewCspPtc extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Ref() analysisSelectionSidebar!: IAnalysisSelectionSidebar;
  @Ref() visualCspPtc!: IAnalysisResultSelection;
  @Ref() tablesCspPtc!: IAnalysisResultSelection;

  selectedAnalysisResult: AnalysisResultDetailedSchema | null = null;

  private analysisResults: AnalysisResultDetailedSchema[] | null = null;

  @State(state => state.sidebar) sidebarStates!: ISidebarModule;
  preMobileSidebarState: ISidebarModule | null = null;

  leftSidebarAbsolute = true; // TODO: Make it absolute on all tabs?
  currentTab = 0;

  private isMobile!: boolean; // TODO: Replace this with the new mobile store
  private isMobileQuery!: MediaQueryList;
  private isMobileListener<Evt extends { matches: boolean }>(e: Evt) {
    this.isMobile = e.matches;

    this.$store.direct.commit.sidebar.setAll(!this.isMobile);
    this.updateLeftSidebarAbsolute();
  }

  async created(): Promise<void> {
    this.analysisResults = await volateqApi.getAnalysisResults(this.plant.id);

    this.isMobileQuery = window.matchMedia("screen and (max-width: 1000px)");
    this.isMobileQuery.addEventListener("change", this.isMobileListener);
    this.isMobileListener(this.isMobileQuery);
  }

  unmounted() {
    this.isMobileQuery.removeEventListener("change", this.isMobileListener);
  }

  get hasResults(): boolean {
    return this.analysisResults ? this.analysisResults?.length > 0 : false;
  }

  onAnalysisResultSelected(selectedAnalysisResultId: string | undefined): void {
    this.visualCspPtc.selectAnalysisResult(selectedAnalysisResultId);
    this.tablesCspPtc.selectAnalysisResult(selectedAnalysisResultId);

    this.selectedAnalysisResult = this.visualCspPtc?.selectedAnalysisResult || null;

    this.rerenderOLCanvas();
  }

  onTabChange(tab: number) {
    this.currentTab = tab;
    this.updateLeftSidebarAbsolute();
  }

  private rerenderOLCanvas(timeout = 0): void {
    setTimeout(() => {
      // triggers openlayers canvas element to rerender
      window.dispatchEvent(new UIEvent("resize"));
    }, timeout);
  }

  getPiColor(keyFigure: KeyFigureSchema): string {
    return cspPtcKeyFigureColors[keyFigure.id];
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

    h4 {
      margin: 1.5em 0 0.5em 0;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
