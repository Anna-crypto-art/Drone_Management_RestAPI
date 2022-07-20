<template>
  <div :class="'analysis-selection-sidebar' + (absolute ? ' absolute' : '')">
    <app-sidebar :open="sidebarOpen" @toggled="onSidebarToggled">
      <div class="analysis-selection-sidebar-leftside">
        <div class="analysis-selection-sidebar-leftside-settings" v-if="analysisResults.length > 1">
          <b-checkbox switch v-model="compareMode" @change="onCompareModeChanged">
            {{ $t("compare-mode") }}
            <app-explanation>{{ $t("compare-mode_descr") }}</app-explanation>
          </b-checkbox>
        </div>
        <app-table-container size="sm">
          <b-table
            ref="analysisResultsTable"
            :items="analysisResultsTableItems"
            :fields="analysisResultsTableColumns"
            :select-mode="selectMode"
            selectable
            hover
            head-variant="light"
            @row-selected="onAnalysisResultSelected"
          >
            <template #head(selected)></template>
            <template #cell(selected)="{ rowSelected }">
              <b-checkbox v-if="compareMode" :checked="rowSelected" disabled class="b-table-selectable-checkbox"></b-checkbox>
            </template>
            <template #row-details="row">
              <span class="analysis-selection-sidebar-kpi-badge" v-for="kpi in row.item.kpis" :key="kpi.id">
                <b-badge variant="primary" :style="'background-color: ' + getKpiColor(kpi)">{{ kpi.name }}</b-badge>
              </span>
            </template>
          </b-table>
        </app-table-container>
      </div>
    </app-sidebar>
  </div>
</template>

<script lang="ts">
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { BvTableFieldArray } from "bootstrap-vue";
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { State } from "vuex-class";
import { AnalysisSelectionService } from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-service";
import { AnalysisSelectionEvent } from "./types";
import dateHelper from "@/app/shared/services/helper/date-helper";

@Component({
  name: "app-analysis-selection-sidebar",
  components: {
    AppTableContainer,
    AppExplanation,
    AppSidebar,
  },
})
export default class AppAnalysisSelectionSidebar extends Vue {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() getPIColor!: (keyFigure: KeyFigureSchema) => string;
  @Prop() absolute!: boolean;
  @Ref() analysisResultsTable!: any; // b-table
  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;

  analysisResultsTableColumns: BvTableFieldArray = [
    { key: "selected", label: "" },
    { key: "name", label: this.$t("name").toString() },
    { key: "date", label: this.$t("acquisition-date").toString() },
  ];
  analysisResultsTableItems: Record<string, unknown>[] = [];

  compareMode = false;
  selectMode = "single";
  lastSelectedAnalysisResults: { id: string }[] = [];

  async created() {
    for (const analysisResult of this.analysisResults) {
      this.analysisResultsTableItems.push({
        id: analysisResult.id,
        name: analysisResult.analysis.name,
        date: dateHelper.toDate(analysisResult.analysis.flown_at),
        kpis: analysisResult.key_figures,
        // only show details for history mode .. that will be implemented in near future
        _showDetails: false,
      });
    }

    await this.selectAnalysis();

    AnalysisSelectionService.on(this.plant.id, AnalysisSelectionEvent.UNSELECT_ALL, () => {
      this.analysisResultsTable.clearSelected();
    });

    AnalysisSelectionService.on(this.plant.id, AnalysisSelectionEvent.SELECT_FIRST, async () => {
      await this.selectAnalysis(true);
    });
  }

  onAnalysisResultSelected(selectedAnalysisResult: { id: string }[]): void {
    if (selectedAnalysisResult.length > 2) {
      const newSelectedIndex = selectedAnalysisResult
        .findIndex(selected => !this.lastSelectedAnalysisResults.find(lastSelected => lastSelected.id === selected.id))
      
      this.analysisResultsTable.unselectRow(newSelectedIndex)
      return;
    }
    this.lastSelectedAnalysisResults = selectedAnalysisResult;

    if (this.compareMode) {
      let selectedAnalysisResultIds: string[] | undefined = undefined;
      if (selectedAnalysisResult && selectedAnalysisResult.length === 2) {
        selectedAnalysisResultIds = [selectedAnalysisResult[0].id, selectedAnalysisResult[1].id];

        AnalysisSelectionService.emit(
          this.plant.id,
          AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED,
          selectedAnalysisResultIds
        );
      }
    } else {
      let selectedAnalysisResultId: string | undefined = undefined
      if (selectedAnalysisResult && selectedAnalysisResult.length > 0) {
        selectedAnalysisResultId = selectedAnalysisResult[0].id;
      }

      AnalysisSelectionService.emit(
        this.plant.id,
        AnalysisSelectionEvent.ANALYSIS_SELECTED,
        selectedAnalysisResultId
      );
    }
  }

  onSidebarToggled(): void {
    this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
  }

  async onCompareModeChanged() {
    this.selectMode = this.compareMode ? "multi" : "single";

    if (!this.compareMode) {
      // if compare mode has been finished, select first row again
      await this.$nextTick();
      this.analysisResultsTable.selectRow(0);
    }
  }

  getKpiColor(keyFigure: KeyFigureSchema): string {
    return this.getPIColor(keyFigure);
  }

  private async selectAnalysis(selectFirst = false): Promise<void> {
    if (this.analysisResults.length > 0) {
      let tableRowIndex = 0;
      const analysisResultId = this.$route.query.result;

      if (analysisResultId && !selectFirst) {
        if (typeof analysisResultId === "string") {
          console.log("analysisResultId")
          console.log(analysisResultId)
          console.log(this.analysisResults)

          tableRowIndex = this.analysisResults.findIndex(analysisResult => analysisResult.id === analysisResultId);
        } else if (Array.isArray(analysisResultId) && analysisResultId.length === 2) {
          const firstAnalysisId = analysisResultId[0];
          const seconedAnalysisId = analysisResultId[1];
          const firstTableRowIndex = this.analysisResults.findIndex(analysisResult => analysisResult.id === firstAnalysisId);
          const secondTableRowIndex = this.analysisResults.findIndex(analysisResult => analysisResult.id === seconedAnalysisId);

          if (firstTableRowIndex >= 0 && secondTableRowIndex >= 0) {
            this.compareMode = true;
            await this.onCompareModeChanged();
            await this.$nextTick();
            this.analysisResultsTable.selectRow(firstTableRowIndex);

            tableRowIndex = secondTableRowIndex;
          }
        }        
      }

      await this.$nextTick();
      this.analysisResultsTable.selectRow(tableRowIndex);
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix sidebar overlays toaster
.b-popover {
  z-index: 1101;
}

.analysis-selection-sidebar {
  height: calc(100vh - #{$header-height});
  display: flex;

  &.absolute {
    position: absolute;
  }

  &-leftside {
    padding: 0.5em;
    padding-top: 40px;
    height: 100%;
    width: 100%;
    border-right: $border-color-grey 1px solid;

    .app-table-container {
      margin-top: 0;
    }

    &-settings {
      margin: 15px 0;
    }
  }
  &-kpi-badge {
    padding-right: 5px;
  }

  .b-table-details {
    cursor: default !important;
  }
}
</style>
