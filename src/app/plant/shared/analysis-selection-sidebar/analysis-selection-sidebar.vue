<template>
  <div :class="'analysis-selection-sidebar' + (absolute ? ' absolute' : '')">
    <app-sidebar :open="sidebarOpen" @toggled="onSidebarToggled">
      <div class="analysis-selection-sidebar-leftside">
        <h2 class="analysis-selection-sidebar-leftside-title">
          {{ plant.name }}
        </h2>
        <div class="analysis-selection-sidebar-leftside-settings" v-if="analysisResults.length > 1">
          <b-checkbox switch v-model="compareMode" @change="onCompareModeChanged">
            {{ $t("compare-mode") }}
            <app-explanation>{{ $t("compare-mode_descr") }}</app-explanation>
          </b-checkbox>
        </div>
        <app-table-container>
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
            <template #cell(name)="row">
              {{ row.item.date }}
              <br>
              <small class="grayed">{{ row.item.name }}</small>
              <div :class="{ 'mar-top': row.item.orderPPs && row.item.orderPPs.length > 0 }">
                <app-order-pps-view :orderProductPackages="row.item.orderPPs" :lefted="true" />
              </div>
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
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { AnalysisSelectionService } from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-service";
import { AnalysisSelectionEvent } from "./types";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { RouteQueryHelper } from "../helper/route-query-helper";
import AppOrderPpsView from "@/app/shared/components/app-order-pps-view/app-order-pps-view.vue";

@Component({
  name: "app-analysis-selection-sidebar",
  components: {
    AppTableContainer,
    AppExplanation,
    AppSidebar,
    AppOrderPpsView,
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
    { key: "selected", label: "",  },
    { key: "name", label: this.$t("analysis").toString() },
  ];
  analysisResultsTableItems: Record<string, unknown>[] = [];

  compareMode = false;
  selectMode = "single";
  lastSelectedAnalysisResults: { id: string }[] = [];

  private routeQueryHelper = new RouteQueryHelper(this);

  async created() {
    for (const analysisResult of this.analysisResults) {
      this.analysisResultsTableItems.push({
        id: analysisResult.id,
        name: analysisResult.analysis.name,
        date: dateHelper.toDate(analysisResult.analysis.flown_at),
        orderPPs: analysisResult.analysis.order_product_packages,
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

  @Watch("$route.query.result", { deep: true })
  async onResultChanged() {
    await this.routeQueryHelper.queryChanged(async () => {
      await this.selectAnalysis();
    });
  }

  onAnalysisResultSelected(selectedAnalysisResult: { id: string }[]): void {
    if (selectedAnalysisResult.length > 2) {
      const newSelected = selectedAnalysisResult
        .find(selected => !this.lastSelectedAnalysisResults.find(lastSelected => lastSelected.id === selected.id))
      
      if (newSelected) {
        const newSelectedIndex = this.analysisResultsTableItems.findIndex(row => row.id === newSelected.id);
        this.analysisResultsTable.unselectRow(newSelectedIndex)
      }
      
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

        this.routeQueryHelper.replaceRoute({ result: selectedAnalysisResultIds });
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

      this.routeQueryHelper.replaceRoute({ result: selectedAnalysisResultId });
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
    } else {
      this.$store.direct.commit.sidebar.set({ name: "analysis", state: false });
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
    height: 100%;
    width: 100%;
    border-right: $border-color-grey 1px solid;

    .app-table-container {
      margin-top: 0;
    }

    &-settings {
      margin: 15px 0;
    }

    &-title {
      margin-bottom: 1em;
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
