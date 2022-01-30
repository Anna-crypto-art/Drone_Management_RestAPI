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
          <b-container>
            <div class="plant-view-csp-ptc-admin-panel">
              <h2>{{ $t("admin-panel") }}</h2>
              <div class="admin-box">
                <h4>{{ $t("analysis-visibility") }}</h4>
                <b-form-checkbox
                  v-show="analysisResultReleased !== null"
                  v-model="analysisResultReleased"
                  switch
                  @change="onReleaseChanged"
                >
                  {{ analysisResultReleased ? $t("released") : $t("invisible-for-customer") }}
                </b-form-checkbox>
              </div>
            </div>
          </b-container>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
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
import { BvTableFieldArray } from "bootstrap-vue";
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
  },
})
export default class AppPlantViewCspPtc extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Ref() analysisSelectionSidebar!: IAnalysisSelectionSidebar;
  @Ref() visualCspPtc!: IAnalysisResultSelection;
  @Ref() tablesCspPtc!: IAnalysisResultSelection;

  analysisResultsTableColumns: BvTableFieldArray = [
    { key: "selected", label: "" },
    { key: "id", label: "ID" },
    { key: "createdAt", label: this.$t("created-at").toString() },
    { key: "kpis", label: this.$t("pi").toString() },
  ];
  analysisResultsTableItems: Record<string, unknown>[] = [];
  private analysisResults: AnalysisResultDetailedSchema[] | null = null;

  private analysisResultReleased: boolean | null = null;

  @State(state => state.sidebar) sidebarStates!: ISidebarModule;
  preMobileSidebarState: ISidebarModule | null = null;

  leftSidebarAbsolute = true; // TODO: Make it absolute on all tabs?

  private isMobile!: boolean;
  private isMobileQuery!: MediaQueryList;
  private isMobileListener<Evt extends { matches: boolean }>(e: Evt) {
    this.isMobile = e.matches;

    this.$store.direct.commit.sidebar.setAll(!this.isMobile);
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

  async onReleaseChanged() {
    if (this.visualCspPtc?.selectedAnalysisResult) {
      await volateqApi.updateAnalysisResult(this.visualCspPtc?.selectedAnalysisResult.id, {
        release: this.analysisResultReleased as boolean,
      });
    }
  }

  onAnalysisResultSelected(selectedAnalysisResultId: string | undefined): void {
    this.visualCspPtc.selectAnalysisResult(selectedAnalysisResultId);
    this.tablesCspPtc.selectAnalysisResult(selectedAnalysisResultId);

    this.analysisResultReleased = this.visualCspPtc?.selectedAnalysisResult
      ? this.visualCspPtc?.selectedAnalysisResult.released
      : null;

    this.rerenderOLCanvas();
  }

  onTabChange(tab: number) {
    if (tab === 0) {
      this.rerenderOLCanvas();
    }

    this.leftSidebarAbsolute = tab === 0;
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
    padding: 1em;
    background-color: $grey;

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
