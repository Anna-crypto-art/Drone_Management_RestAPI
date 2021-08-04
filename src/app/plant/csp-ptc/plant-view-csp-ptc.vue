<template>
  <div class="plant-view-csp-ptc">
    <app-sidebar :open="sidebarOpen" @toggled="onSidebarToggled">
      <div class="plant-view-csp-ptc-leftside">
        <h2 class="plant-view-csp-ptc-title">{{ this.plant.name }}</h2>
        <div class="plant-view-csp-ptc-subtitle">{{ $t('view-analysed-data-of-your-plant') }}</div>
        <div class="plant-view-csp-ptc-view">
          <div class="plant-view-csp-ptc-view-text">
            {{ $t('view') }}:
          </div>
          <div class="plant-view-csp-ptc-view-buttons">
            <b-button-group size="sm">
              <b-button :pressed="mapView" @click="changeView('map')"><b-icon icon="map" /></b-button>
              <b-button :pressed="tableView" @click="changeView('table')"><b-icon icon="table" /></b-button>
            </b-button-group>
          </div>
        </div>
        <app-table-container size="sm">
          <b-table ref="analysisResultsTable"
          :items="analysisResultsTableItems" 
          :fields="analysisResultsTableColumns"
          select-mode="single"
          selectable
          hover
          head-variant="light"
          @row-selected="onAnalysisResultSelected">
            <template #head(selected)></template>
            <template #head(kpis)="column">
              {{ column.label }} <app-explanation>{{ $t('performance-indicators') }}</app-explanation>
            </template>
            <template #cell(selected)="{ rowSelected }">
              <b-checkbox :checked="rowSelected" disabled class="b-table-selectable-checkbox"></b-checkbox>
            </template>
            <template #cell(kpis)="row">
              <div v-for="kpi in row.item.kpis" :key="kpi">
                <b-badge variant="primary">{{ kpi }}</b-badge>
              </div>
            </template>
          </b-table>
        </app-table-container>
      </div>
    </app-sidebar>
    <div :class="'plant-view-csp-ptc-rightside ' + (sidebarOpen ? 'open' : '')">
      <app-visual-csp-ptc v-if="hasResults" ref="visualCspPtc" :analysisResults="analysisResults" :plant="plant" v-show="mapView" @sidebarToggle="onRightSidebarToggle" />
      <app-tables-csp-ptc v-if="hasResults" ref="tablesCspPtc" :analysisResults="analysisResults" :plant="plant" v-show="tableView" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'vue-property-decorator';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import AppVisualCspPtc from '@/app/plant/csp-ptc/visualization/visual-csp-ptc.vue';
import { IAnalysisResultSelection } from './types';
import { BvTableFieldArray } from 'bootstrap-vue';
import AppTableContainer from '@/app/shared/components/app-table-container/app-table-container.vue';
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import AppSidebar from '@/app/shared/components/app-sidebar/app-sidebar.vue';
import AppTablesCspPtc from '@/app/plant/csp-ptc/tables/tables-csp-ptc.vue';


@Component({
  name: 'app-plant-view-csp-ptc',
  components: {
    AppVisualCspPtc,
    AppTableContainer,
    AppExplanation,
    AppTablesCspPtc,
    AppSidebar,
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;
  @Ref() analysisResultsTable!: any; // b-table
  @Ref() visualCspPtc!: IAnalysisResultSelection;
  @Ref() tablesCspPtc!: IAnalysisResultSelection;

  analysisResultsTableColumns: BvTableFieldArray = [
    { key: 'selected', label: '' },
    { key: 'id', label: 'ID' },
    { key: 'createdAt', label: this.$t('created-at').toString() },
    { key: 'kpis', label: this.$t('pi').toString() },
  ];
  analysisResultsTableItems: Record<string, unknown>[] = [];

  analysisResults: AnalysisResultDetailedSchema[] | null = null;

  sidebarOpen = true;

  private view: 'map' | 'table' = 'map';

  async created(): Promise<void> {
    this.analysisResults = await volateqApi.getAnalysisResults(this.plant.id);

    for (const analysisResult of this.analysisResults) {
      this.analysisResultsTableItems.push({
        id: analysisResult.id,
        createdAt: new Date(Date.parse(analysisResult.created_at)).toLocaleDateString(),
        kpis: analysisResult.key_figures.map(keyFigure => keyFigure.name)
      })
    }

    if (this.analysisResults.length > 0) {
      let tableRowIndex = 0;
      const analysisResultId = this.$route.query.result;
      if (analysisResultId && typeof analysisResultId === "string") {
        tableRowIndex = this.analysisResults.findIndex(analysisResult => analysisResult.id === analysisResultId);
      }

      setTimeout(() => this.analysisResultsTable.selectRow(tableRowIndex), 1000); // wait for DOM
    }

    const view = this.$route.query.view;
    if (view === 'map' || view === 'table') {
      setTimeout(() => this.changeView(view), 1000); // first load openlayers else openlayers keeps blank... (bug!?)
    }
  }

  get hasResults(): boolean {
    return !!this.analysisResults;
  }

  get mapView(): boolean {
    return this.view === 'map';
  }

  get tableView(): boolean {
    return this.view === 'table';
  }

  onAnalysisResultSelected(selectedAnalysisResult: { id: string }[]): void {
    const selectedAnalysisResultId = selectedAnalysisResult && selectedAnalysisResult.length > 0 && 
      selectedAnalysisResult[0].id || undefined;

    this.visualCspPtc.selectAnalysisResult(selectedAnalysisResultId);
    this.tablesCspPtc.selectAnalysisResult(selectedAnalysisResultId);
  }

  changeView(view: 'map' | 'table'): void {
    this.view = view;

    if (this.view === 'map') {
      this.rerenderOLCanvas();
    }
  }

  onSidebarToggled(open: boolean): void {
    this.sidebarOpen = open;

    if (!this.sidebarOpen) {
      this.rerenderOLCanvas(300);
    }
  }

  onRightSidebarToggle(toggleState: boolean): void {
    console.log("blub3");

    this.rerenderOLCanvas(300);
  }

  private rerenderOLCanvas(timeout = 0): void {
    setTimeout(() => {
      // triggers openlayers canvas element to rerender
      window.dispatchEvent(new UIEvent("resize"));
    }, timeout)
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

  &-title {
    font-size: 3rem;
    margin-bottom: 0px;
  }
  &-subtitle {
    color: $dark-60pc;
    font-size: 1.25rem;
    margin-bottom: 30px;
  }

  &-leftside {
    padding: 20px;
    height: 100%;
    width: $left-width;
    border-right: $border-color-grey 1px solid;
  }

  &-rightside {
    height: 100%;
    width: 100%;

    &.open {
      width: calc(100% - #{$left-width});
    }
  }


  &-view {
    display: flex;

    &-text {
      margin-right: 10px;
      line-height: 30px;
    }
  }
}
</style>