<template>
  <div :class="'analysis-selection-sidebar' + (absolute ? ' absolute' : '')">
    <app-sidebar :open="sidebarOpen" @toggled="onSidebarToggled">
      <div class="analysis-selection-sidebar-leftside">
        <h2 class="analysis-selection-sidebar-leftside-title" translate="no">
          {{ plant.name }}
        </h2>
        <div class="analysis-selection-sidebar-leftside-settings" v-if="analyses.length > 1">
          <b-checkbox switch v-model="compareMode" @change="onCompareModeChanged">
            {{ $t("compare-mode") }}
            <app-explanation>{{ $t("compare-mode_descr") }}</app-explanation>
          </b-checkbox>
        </div>
        <app-table-container>
          <app-table
            ref="analysesTable"
            :rows="analysesTableItems"
            :columns="analysesTableColumns"
            :selectMode="selectMode"
            @rowSelected="onAnalysisSelected"
          >
            <template #cell(name)="row">
              {{ row.item.date }} 
              <app-icon v-if="!row.item.hasResults"
                icon="cone-striped" 
                class="mar-left-half orange" 
                v-b-popover.hover.top="$t('no-pis-available-yet')"
              />
              <app-icon v-if="row.item.refMeasureCount > 0"
                icon="clipboard-check"
                class="mar-left-half blue"
                v-b-popover.hover.top="$t('has-ref-measures', { count: row.item.refMeasureCount })"
              />
              <app-super-admin-marker v-if="row.item.analysisResultReleased === false" />
              <br>
              <small class="grayed">{{ row.item.name }}</small>
              <div :class="{ 'mar-top': row.item.orderPPs && row.item.orderPPs.length > 0 }">
                <app-order-pps-view :orderProductPackages="row.item.orderPPs" :lefted="true" />
              </div>
            </template>
          </app-table>
        </app-table-container>
      </div>
    </app-sidebar>
  </div>
</template>

<script lang="ts">
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { State } from "vuex-class";
import { analysisSelectEventService } from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-service";
import { AnalysisSelectionEvent } from "./types";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { RouteQueryHelper } from "../helper/route-query-helper";
import AppOrderPpsView from "@/app/shared/components/app-order-pps-view/app-order-pps-view.vue";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns, IAppSelectTable } from "@/app/shared/components/app-table/types";

@Component({
  name: "app-analysis-selection-sidebar",
  components: {
    AppTableContainer,
    AppExplanation,
    AppSidebar,
    AppOrderPpsView,
    AppIcon,
    AppSuperAdminMarker,
    AppTable,
  },
})
export default class AppAnalysisSelectionSidebar extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @Ref() analysesTable!: IAppSelectTable;
  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;

  analysesTableColumns: AppTableColumns = [
    { key: "name", label: this.$t("analysis").toString() },
  ];
  analysesTableItems: Record<string, unknown>[] = [];

  absolute = true;

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
        analysisResultReleased: analysis.analysis_result?.released,
        hasResults: this.isSuperAdmin ? !!analysis.analysis_result : (analysis.analysis_result?.released || false)
      });
    }

    await this.selectAnalysis();

    analysisSelectEventService.on(this.plant.id, AnalysisSelectionEvent.UNSELECT_ALL, async () => {
      this.analysesTable.clearSelected();
    });

    analysisSelectEventService.on(this.plant.id, AnalysisSelectionEvent.SELECT_FIRST, async () => {
      await this.selectAnalysis(true);
    });

    analysisSelectEventService.on(this.plant.id, AnalysisSelectionEvent.SIDEBAR_ABSOLUTE, async (absolute) => {
      this.absolute = absolute;
    });

    this.routeQueryHelper.queryChanged(async () => {
      await this.selectAnalysis();
    });
  }

  async onAnalysisSelected(selectedAnalyses: { id: string }[]) {
    if (selectedAnalyses.length > 2) {
      const newSelected = selectedAnalyses
        .find(selected => !this.lastSelectedAnalyses.find(lastSelected => lastSelected.id === selected.id))
      
      if (newSelected) {
        this.unselectAnalysis(newSelected.id);
      }
      
      return;
    }

    const compareViewFinished = !this.compareMode && this.lastSelectedAnalyses.length === 2;
    if (compareViewFinished && selectedAnalyses.length === 0) {
      selectedAnalyses = [this.lastSelectedAnalyses[0]];
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

        await this.routeQueryHelper.replaceRoute({ result: selectedAnalysisIds });

        await analysisSelectEventService.emit(
          this.plant.id,
          AnalysisSelectionEvent.MULTI_ANALYSES_SELECTED,
          selectedAnalysisIds
        );
      }
    } else {
      let selectedAnalysisId: string | undefined = undefined
      if (selectedAnalyses && selectedAnalyses.length > 0) {
        selectedAnalysisId = selectedAnalyses[0].id;
      } else if (compareViewFinished) {
        selectedAnalysisId = this.lastSelectedAnalyses[0].id;
      }

      await this.routeQueryHelper.replaceRoute({ result: selectedAnalysisId });

      if (compareViewFinished) {
        // Programmatically select the last newer analysis, if the compare view has been finished by the user
        this.selectAnalysis();
        // "selectAnalysis()" reraises onAnalysisSelected. Leave the function here to avoid double emitting.
        return;
      }

      await analysisSelectEventService.emit(
        this.plant.id,
        AnalysisSelectionEvent.ANALYSIS_SELECTED,
        selectedAnalysisId
      );
    }
  }

  onSidebarToggled(): void {
    this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
  }

  async onCompareModeChanged() {
    this.selectMode = this.compareMode ? "multi" : "single";
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
      } else if (!analysisId && !selectFirst) {
        // Select an analysis with results raither then an analysis only with reference measurements
        for (let i = 0; i < this.analyses.length; i++) {
          if (this.analyses[i].analysis_result) {
            tableRowIndex = i;
            break;
          }
        }
      }

      await this.$nextTick();
      this.analysesTable.selectRow(tableRowIndex);
    } else {
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();

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
    display: flex;
    flex-flow: column;

    .app-table-container {
      margin-top: 0;
    }

    &-settings {
      margin-bottom: 15px;
    }

    &-title {
      margin-bottom: 1em;
    }
  }
  &-kpi-badge {
    padding-right: 5px;
  }
}
</style>
