<template>
  <div class="plant-view-csp-ptc" v-if="analysisResults">
    <app-analysis-selection-sidebar
      ref="analysisSelectionSidebar"
      :plant="plant"
      :analysisResults="analysisResults"
      :open="false"
      :getPIColor="getPiColor"
      @sidebarToggled="onSidebarToggled"
      @analysisResultSelected="onAnalysisResultSelected"
    />
    <div :class="'plant-view-csp-ptc-rightside ' + (sidebarOpen ? 'open' : '')">
      <h2 :class="'plant-view-csp-ptc-title ' + (sidebarOpen ? 'open' : '')">{{ plant.name }}</h2>
      <b-tabs align="center" @activate-tab="onTabChanged">
        <b-tab>
          <template #title><b-icon icon="map" /></template>
          <app-visual-csp-ptc ref="visualCspPtc" :analysisResults="analysisResults" :plant="plant" @sidebarToggle="onRightSidebarToggle" />
        </b-tab>
        <b-tab v-if="hasResults">
          <template #title><b-icon icon="table" /></template>
          <app-tables-csp-ptc ref="tablesCspPtc" :analysisResults="analysisResults" :plant="plant" />
        </b-tab>
        <b-tab v-if="isSuperAdmin">
          <template #title><b-icon icon="braces" /></template>
          <b-container>
            <b-row>
              <b-col>
                <div class="plant-view-csp-ptc-admin-panel">
                  <h3>{{ $t("admin-panel") }}</h3>
                  <hr />
                  <h4>{{ $t("analysis-visibility") }}</h4>
                  <b-form-checkbox v-show="analysisResultReleased !== null" v-model="analysisResultReleased" switch @change="onReleaseChanged">
                    {{ analysisResultReleased ? $t("released") : $t("invisible-for-customer") }}
                  </b-form-checkbox>
                  <!--<h4>{{ $t("digital-twin") }}</h4>
                  coming soon-->
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import AppVisualCspPtc from "@/app/plant/csp-ptc/visualization/visual-csp-ptc.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import AppTablesCspPtc from "@/app/plant/csp-ptc/tables/tables-csp-ptc.vue";
import { IAnalysisSelectionSidebar } from "@/app/plant/shared/analysis-selection-sidebar/types";
import { IAnalysisResultSelection } from "../shared/types";
import AppAnalysisSelectionSidebar from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-sidebar.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { cspPtcKeyFigureColors } from "./csp-ptc-key-figure-colors";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";

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

  private analysisResults: AnalysisResultDetailedSchema[] | null = null;

  private analysisResultReleased: boolean | null = null;

  private sidebarOpen = false;

  async created() {
    this.analysisResults = await volateqApi.getAnalysisResults(this.plant.id);
  }

  get hasResults(): boolean {
    return (this.analysisResults && this.analysisResults.length > 0) || false;
  }

  async onReleaseChanged() {
    if (this.visualCspPtc?.selectedAnalysisResult) {
      await volateqApi.updateAnalysisResult(this.visualCspPtc?.selectedAnalysisResult.id, { release: this.analysisResultReleased as boolean });
    }
  }

  onAnalysisResultSelected(selectedAnalysisResultId: string | undefined): void {
    this.visualCspPtc.selectAnalysisResult(selectedAnalysisResultId);
    this.tablesCspPtc.selectAnalysisResult(selectedAnalysisResultId);

    this.analysisResultReleased = this.visualCspPtc?.selectedAnalysisResult ? this.visualCspPtc?.selectedAnalysisResult.released : null;

    this.rerenderOLCanvas();
  }

  onSidebarToggled(open: boolean): void {
    this.sidebarOpen = open;

    this.rerenderOLCanvas(300);
  }

  onRightSidebarToggle(toggleState: boolean): void {
    this.rerenderOLCanvas(300);
  }

  onTabChanged(tabIndex: number): void {
    this.rerenderOLCanvas();
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
    transition: left 0.3s ease-in-out;
    font-size: 1.5rem;
    display: block;
    position: absolute;
    top: 0.3em;
    left: 0.5em;

    &.open {
      left: calc(0.5em + $left-width);
    }
  }

  &-rightside {
    height: 100%;
    width: 100%;

    &.open {
      width: calc(100% - #{$left-width});
    }
  }

  &-admin-panel {
    padding: 1em;
    background-color: $grey;

    h4 {
      margin: 1.5em 0 0.5em 0;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
