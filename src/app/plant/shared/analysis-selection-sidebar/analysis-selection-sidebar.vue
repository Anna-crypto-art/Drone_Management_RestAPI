<template>
  <div :class="'analysis-selection-sidebar' + (absolute ? ' absolute' : '')">
    <app-sidebar :open="sidebarOpen" @toggled="onSidebarToggled">
      <div class="analysis-selection-sidebar-leftside">
        <h2 class="analysis-selection-sidebar-leftside-title">
          {{ plant.name }}
        </h2>
        <div class="analysis-selection-sidebar-leftside-settings" v-if="analyses.length > 1">
          <b-checkbox switch v-model="compareMode" @change="onCompareModeChanged">
            {{ $t("compare-mode") }}
            <app-explanation>{{ $t("compare-mode_descr") }}</app-explanation>
          </b-checkbox>
        </div>
        <app-table-container>
          <b-table
            ref="analysesTable"
            :items="analysesTableItems"
            :fields="analysesTableColumns"
            :select-mode="selectMode"
            selectable
            hover
            head-variant="light"
            @row-selected="onAnalysisSelected"
          >
            <template #head(selected)></template>
            <template #cell(selected)="{ rowSelected }">
              <b-checkbox v-if="compareMode" :checked="rowSelected" disabled class="b-table-selectable-checkbox"></b-checkbox>
            </template>
            <template #cell(name)="row">
              {{ row.item.date }} 
              <app-icon v-if="row.item.refMeasureCount > 0"
                icon="clipboard-check"
                class="mar-left-half blue"
                v-b-popover.hover.top="$t('has-ref-measures', { count: row.item.refMeasureCount })"
              />
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
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";

@Component({
  name: "app-analysis-selection-sidebar",
  components: {
    AppTableContainer,
    AppExplanation,
    AppSidebar,
    AppOrderPpsView,
    AppIcon,
  },
})
export default class AppAnalysisSelectionSidebar extends Vue {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @Prop() getPIColor!: (keyFigure: KeyFigureSchema) => string;
  @Prop() absolute!: boolean;
  @Ref() analysesTable!: any; // b-table
  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;

  analysesTableColumns: BvTableFieldArray = [
    { key: "selected", label: "",  },
    { key: "name", label: this.$t("analysis").toString() },
  ];
  analysesTableItems: Record<string, unknown>[] = [];

  compareMode = false;
  selectMode = "single";
  lastSelectedAnalyses: { id: string }[] = [];

  private routeQueryHelper = new RouteQueryHelper(this);

  async created() {
    for (const analysis of this.analyses) {
      this.analysesTableItems.push({
        id: analysis.id,
        name: analysis.name,
        date: dateHelper.toDate(analysis.flown_at),
        orderPPs: analysis.order_product_packages,
        refMeasureCount: analysis.reference_measurements.length,
      });
    }

    await this.selectAnalysis();

    AnalysisSelectionService.on(this.plant.id, AnalysisSelectionEvent.UNSELECT_ALL, () => {
      this.analysesTable.clearSelected();
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

  onAnalysisSelected(selectedAnalyses: { id: string }[]): void {
    if (selectedAnalyses.length > 2) {
      const newSelected = selectedAnalyses
        .find(selected => !this.lastSelectedAnalyses.find(lastSelected => lastSelected.id === selected.id))
      
      if (newSelected) {
        this.unselectAnalysis(newSelected.id);
      }
      
      return;
    }
    this.lastSelectedAnalyses = selectedAnalyses;

    if (this.compareMode) {
      if (selectedAnalyses.length > 0) {
        const selectedAnalysesWithoutResults = this.analyses.filter(analysis => 
          selectedAnalyses.find(selectedAnalysis => selectedAnalysis.id === analysis.id) && !analysis.analysis_result);
        
        if (selectedAnalysesWithoutResults.length > 0) {
          for (const selectedAnalysisWithoutResults of selectedAnalysesWithoutResults) {
            this.unselectAnalysis(selectedAnalysisWithoutResults.id);
          }

          return;
        }
      }

      let selectedAnalysisIds: string[] | undefined = undefined;
      if (selectedAnalyses && selectedAnalyses.length === 2) {
        selectedAnalysisIds = [selectedAnalyses[0].id, selectedAnalyses[1].id];

        AnalysisSelectionService.emit(
          this.plant.id,
          AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED,
          selectedAnalysisIds
        );

        this.routeQueryHelper.replaceRoute({ result: selectedAnalysisIds });
      }
    } else {
      let selectedAnalysisId: string | undefined = undefined
      if (selectedAnalyses && selectedAnalyses.length > 0) {
        selectedAnalysisId = selectedAnalyses[0].id;
      }

      AnalysisSelectionService.emit(
        this.plant.id,
        AnalysisSelectionEvent.ANALYSIS_SELECTED,
        selectedAnalysisId
      );

      this.routeQueryHelper.replaceRoute({ result: selectedAnalysisId });
    }
  }

  onSidebarToggled(): void {
    this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
  }

  async onCompareModeChanged() {
    let selectIndex = -1;

    if (!this.compareMode) {
      selectIndex = 0;
      if (this.lastSelectedAnalyses && this.lastSelectedAnalyses.length > 0) {
        selectIndex = this.analysesTableItems.findIndex(row => row.id === this.lastSelectedAnalyses[0].id);
      }
    }

    this.selectMode = this.compareMode ? "multi" : "single";

    if (selectIndex >= 0) {
      // Wait for table reselection
      for (let i = 0; i < 10; i++) {
        await this.$nextTick();
      }

      this.analysesTable.selectRow(selectIndex);
    }
  }

  getKpiColor(keyFigure: KeyFigureSchema): string {
    return this.getPIColor(keyFigure);
  }

  private async selectAnalysis(selectFirst = false): Promise<void> {
    if (this.analyses.length > 0) {
      let tableRowIndex = 0;
      const analysisId = this.$route.query.result;

      if (analysisId && !selectFirst) {
        if (typeof analysisId === "string") {
          tableRowIndex = this.analyses.findIndex(analysis => analysis.id === analysisId);
        } else if (Array.isArray(analysisId) && analysisId.length === 2) {
          const firstAnalysisId = analysisId[0];
          const seconedAnalysisId = analysisId[1];
          const firstTableRowIndex = this.analyses.findIndex(analysis => analysis.id === firstAnalysisId);
          const secondTableRowIndex = this.analyses.findIndex(analysis => analysis.id === seconedAnalysisId);

          if (firstTableRowIndex >= 0 && secondTableRowIndex >= 0) {
            this.compareMode = true;
            await this.onCompareModeChanged();
            await this.$nextTick();
            this.analysesTable.selectRow(firstTableRowIndex);

            tableRowIndex = secondTableRowIndex;
          }
        }        
      }

      await this.$nextTick();
      this.analysesTable.selectRow(tableRowIndex);
    } else {
      this.$store.direct.commit.sidebar.set({ name: "analysis", state: false });
    }
  }

  private unselectAnalysis(analysisId: string) {
    const selectedIndex = this.analysesTableItems.findIndex(row => row.id === analysisId);
    this.analysesTable.unselectRow(selectedIndex);
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
