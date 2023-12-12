<template>
  <div class="app-analysis-selection-sidebar" :class="{ open: sidebarOpen }">
    <div class="grayed title">
      <app-icon-analysis /><span class="title">{{ $t("analyses") }}</span>
    </div>
    <div class="app-analysis-selection-sidebar-settings" v-if="analyses.length > 1">
      <b-checkbox switch v-model="compareMode" @change="onCompareModeChanged">
        <app-expl-wrap :expl="$t('compare-mode_descr')" placement="right">
          {{ $t("compare-mode") }}
        </app-expl-wrap>
      </b-checkbox>
    </div>
    <div class="app-analysis-selection-sidebar-table">
      <app-table-container>
        <app-table
          ref="analysesTable"
          :rows="analysesTableItems"
          :columns="analysesTableColumns"
          :selectMode="selectMode"
          @rowSelected="onAnalysisSelected"
          :overlayLoading="loading"
          :hideHeader="true"
        >
          <template #cell(name)="row">
            {{ row.item.date }} 
            <app-icon v-if="!isPilot && !row.item.hasResults"
              icon="cone-striped" 
              class="mar-left-half orange" 
              v-b-popover.hover.top="$t('no-pis-available-yet')"
            />
            <app-icon v-if="row.item.hasGoodies" 
              icon="gift"
              class="mar-left-half blue"
              v-b-popover.hover.top="$t('has-additional-pis')"
            />
            <app-expl-wrap placement="top">
              <app-icon v-if="row.item.hasObservations"
                icon="clipboard-check"
                class="mar-left-half blue"
              />
              <template #expl>
                <a :href="row.item.loadRefMeasuresLink">
                  {{ $t("show-reference-measurements") }}
                </a>
              </template>
            </app-expl-wrap>
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
  </div>
</template>

<script lang="ts">
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { analysisSelectEventService } from "@/app/plant/shared/selection-sidebar/analysis-selection/analysis-selection-event-service";
import { AnalysisSelectionEvent } from "./types";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { RouteQueryHelper } from "../../helper/route-query-helper";
import AppOrderPpsView from "@/app/shared/components/app-order-pps-view/app-order-pps-view.vue";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns, IAppSelectTable } from "@/app/shared/components/app-table/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { State } from "vuex-class";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import { SimpleObservationSchema } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";
import { ObservationSelectionService } from "../observation-selection/observation-selection-service";
import { ApiTechnology } from "@/app/shared/services/volateq-api/api-technologies";


@Component({
  name: "app-analysis-selection-sidebar",
  components: {
    AppIcon,
    AppIconAnalysis,
    AppTableContainer,
    AppOrderPpsView,
    AppSuperAdminMarker,
    AppTable,
    AppExplWrap,
  },
})
export default class AppAnalysisSelectionSidebar extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @State(state => state.sidebar["analyses"]) sidebarOpen!: boolean;
  @Ref() analysesTable!: IAppSelectTable;

  analysesTableColumns: AppTableColumns = [
    { key: "name", label: this.$t("analyses").toString() },
  ];
  analysesTableItems: Record<string, unknown>[] = [];

  compareMode = false;
  selectMode = "single";
  lastSelectedAnalyses: { id: string }[] = [];

  loading = false;

  private routeQueryHelper = new RouteQueryHelper(this);

  selectedByQueryRoute = false;

  created() {
    for (const analysis of this.analyses) {
      this.analysesTableItems.push({
        id: analysis.id,
        name: analysis.name,
        date: dateHelper.toDate(analysis.flown_at),
        orderPPs: analysis.order_product_packages,
        analysisResultReleased: analysis.analysis_result?.released,
        hasResults: this.isSuperAdmin ? !!analysis.analysis_result : (analysis.analysis_result?.released || false),
        hasGoodies: analysis.has_key_figures,
        hasObservations: analysis.observations.length > 0,
        loadRefMeasuresLink: this.generateRefMeasuresLink(analysis.observations),
      });
    }

    this.$store.direct.commit.sidebar.set({ name: "analyses", state: true });

    analysisSelectEventService.on(this.plant.id, AnalysisSelectionEvent.UNSELECT_ALL, async () => {
      this.analysesTable.clearSelected();
    });

    this.routeQueryHelper.queryChanged(async () => {
      await this.selectAnalysisByQueryRoute();
    });
  }

  async mounted() {
    await this.selectAnalysisByQueryRoute();
  }

  @CatchError("loading")
  async onAnalysisSelected(selectedAnalyses: { id: string }[]) {
    if (selectedAnalyses.length > 2) { 
      // Too many analyses have been selected
      // Unselect the last added analysis and ignore the evil user habit

      const newSelected = selectedAnalyses
        .find(selected => !this.lastSelectedAnalyses.find(lastSelected => lastSelected.id === selected.id))
      
      if (newSelected) {
        this.unselectAnalysis(newSelected.id);
      }
      
      return;
    }

    // Change the selectMode triggers the table to unselect all rows.. 
    // and so we get an empty selection here... 
    // At least this helps us to find out and handle the special cases:
    // 1. Compare view has been finished
    // 2. Compare view has been started

    const compareViewFinishedOrNoSelection = !this.compareMode && 
      (this.lastSelectedAnalyses.length === 2 || selectedAnalyses.length === 0);

    const compareViewStarted = this.compareMode && selectedAnalyses.length === 0 &&
      this.lastSelectedAnalyses.length < 2;

    if (compareViewFinishedOrNoSelection || compareViewStarted) {
      // 1. Compare view has been finished: Let's select the last first analysis again
      //    to avoid to left the user with no selected analysis
      // or 
      // 2. Compare view has been started: Let's select the last selected analysis
      //    so the user doesn't have to select the already selected analysis again...

      const lastFirstSelectedAnalysis = this.lastSelectedAnalyses.length > 0 ?
        this.lastSelectedAnalyses[0] : undefined;

      if (lastFirstSelectedAnalysis) {
        this.lastSelectedAnalyses = [lastFirstSelectedAnalysis];
      }

      await this.routeQueryHelper.replaceRoute({ result: lastFirstSelectedAnalysis?.id });
      await this.selectAnalysisByQueryRoute();

      return; // Bye. "this.selectAnalysisByQueryRoute()" reraises "onAnalysisSelected" again!
    }

    this.lastSelectedAnalyses = selectedAnalyses;

    // await this.$nextTick(); // Make loading animation working

    if (this.compareMode) {
      if (selectedAnalyses.length > 0) {
        // If the user selects an analysis without results,
        // we need to unselect that analysis again and ignore the users bad habit...
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
          selectedAnalysisIds,
          this.selectedByQueryRoute,
        );

        this.selectedByQueryRoute = false;
      }
    } else {
      let selectedAnalysisId: string | undefined = undefined
      if (selectedAnalyses && selectedAnalyses.length > 0) {
        selectedAnalysisId = selectedAnalyses[0].id;
      }

      await this.routeQueryHelper.replaceRoute({ result: selectedAnalysisId });

      await analysisSelectEventService.emit(
        this.plant.id,
        AnalysisSelectionEvent.ANALYSIS_SELECTED,
        selectedAnalysisId,
        this.selectedByQueryRoute
      );

      this.selectedByQueryRoute = false;
    }
  }

  async onCompareModeChanged() {
    this.selectMode = this.compareMode ? "multi" : "single";
  }

  private async selectAnalysisByQueryRoute(): Promise<void> {
    if (this.analyses.length > 0) {
      let tableRowIndex = 0;
      const analysisId = this.$route.query.result;

      if (analysisId) {
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

            await this.$nextTick(); // Wait for app-table component selectMode change

            this.analysesTable.selectRow(firstTableRowIndex);

            tableRowIndex = secondTableRowIndex;
          }
        }        
      } else {
        // Select an analysis with results raither then an analysis only with reference measurements
        for (let i = 0; i < this.analyses.length; i++) {
          if (this.analyses[i].analysis_result) {
            tableRowIndex = i;
            break;
          }
        }
      }

      await this.$nextTick();
      
      this.selectedByQueryRoute = true;

      this.analysesTable.selectRow(tableRowIndex);
    } else {
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();

      this.$store.direct.commit.sidebar.set({ name: "analyses", state: false });
    }
  }

  private unselectAnalysis(analysisId: string) {
    const selectedIndex = this.analysesTableItems.findIndex(row => row.id === analysisId);
    this.analysesTable.unselectRow(selectedIndex);
  }

  private generateRefMeasuresLink(observations: SimpleObservationSchema[]): string {
    if (observations.length > 0) {
      const observedAt = dateHelper.getDate(observations[0].observed_at);
      const diffDays = Math.ceil(((new Date()).getTime() - observedAt.getTime()) / (24*60*60*1000));
      const trOption = ObservationSelectionService.timeRangeOptions.find(o => o.value > diffDays)!;

      let observation = "";
      if (trOption.value <= 30) {
        observation = dateHelper.toDate(observedAt);
      } else if (trOption.value > 30 && trOption.value <= 90) {
        observation = observedAt.getUTCFullYear() + "-W" + dateHelper.getWeekNumber(observedAt).toString().padStart(2, "0");
      } else if (trOption.value > 90 && trOption.value <= 365) {
        observation = observedAt.getUTCFullYear() + "-" + (observedAt.getMonth() + 1).toString().padStart(2, "0");
      } else {
        observation = observedAt.getUTCFullYear().toString();
      }

      const route = this.$route.fullPath.replace(/(\?|&)sidebar=[^&]*/g, "")
        .replace(/(\?|&)observation=[^&]*/g, "")
        .replace(/(\?|&)observFilter=[^&]*/g, "")
        .replace(/(\?|&)piId=[^&]*/g, "");
      return route + (route.includes("?") ? "&" : "?") + "sidebar=observations"
        + "&observation=" + observation
        + "&observFilter=" + trOption.value
        + (this.plant.technology_id === ApiTechnology.CSP_PTC ? "&piId=__9__glass_tube_temperature__" : "");
    }

    return "";
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-analysis-selection-sidebar {
  height: 100%;
  width: 100%;
  position: absolute;
  left: calc($sidebar-width * -1);
  border-right: 1px solid $border-color-grey;
  transition: all 0.3s ease-in-out;

  &.open {
    left: 0;
    display: block;
    z-index: 9;
  }
  &-table {
    height: calc(100% - 78px); // Such a nice magic number

    .app-table-container {
      height: 100%;
      margin-top: 10px;  
      overflow-y: auto;
    }
  }
  
  &-settings {
    margin-left: 8px;
  }

  .title {
    margin: 10px;
  }
    
  &-kpi-badge {
    padding-right: 5px;
  }
}

</style>
