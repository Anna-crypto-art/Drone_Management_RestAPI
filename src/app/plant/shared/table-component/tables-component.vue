<template>
  <div class="app-tables-component">
    <div class="no-data-placeholder" v-if="!firstAnalysisResult && isAnalysisSidebarActive">
      {{ $t("no-analysis-result-selected") }}
    </div>
    <div class="no-data-placeholder" v-if="!dateRange && isObservationsSidebarActive">
      {{ $t("no-observation-selected") }}
    </div>
    <div v-if="(firstAnalysisResult && isAnalysisSidebarActive) || (dateRange && isObservationsSidebarActive)" class="app-table-root-container">
      <div class="pull-left">
        <app-search-input :placeholder="$t('search-pcs')" @search="onSearch"></app-search-input>
      </div>
      <div class="pull-right" v-show="!hideCsvExport">
        <app-button variant="secondary" :title="$t('export-csv')" :loading="csvExportLoading" @click="onExportCsv">
          <b-icon icon="download"></b-icon> {{ $t("export-csv") }}: {{ activeTabLabel }}
        </app-button>
      </div>

      <app-table-container>
        <b-tabs v-model="analysisTabIndex" @activate-tab="onAnalysisTabChanged" v-show="isAnalysisSidebarActive">
          <b-tab v-for="(activeTabComponent, index) in activeAnalysisTabComponents" :key="index">
            <template #title>
              <app-expl-wrap :expl="activeTabComponent.descr && $t(activeTabComponent.descr)">{{ $t(activeTabComponent.label) }}</app-expl-wrap>
            </template>
            <app-analysis-result-table-component
              :ref="activeTabComponent.tableRefName"
              :analysisResult="firstAnalysisResult"
              :compareAnalysisResult="compareAnalysisResult"
              :activeComponent="activeTabComponent"
              :plant="plant"
            />
          </b-tab>
        </b-tabs>
        <b-tabs v-model="observationTabIndex" @activate-tab="onObservationTabChanged" v-show="isObservationsSidebarActive">
          <b-tab v-for="(activeTabComponent, index) in activeObservTabComponents" :key="index">
            <template #title>
              <app-expl-wrap :expl="activeTabComponent.descr && $t(activeTabComponent.descr)">{{ $t(activeTabComponent.label) }}</app-expl-wrap>
            </template>
            <app-observation-table-component v-if="dateRange"
              :ref="activeTabComponent.tableRefName"
              :activeComponent="activeTabComponent"
              :ccps="ccps"
              :pis="pis"
              :plant="plant"
              :dateRange="dateRange"
            />
          </b-tab>
        </b-tabs>
      </app-table-container>
    </div>
  </div>
</template>

<script lang="ts">
import AppAnalysisResultTableComponent from "@/app/plant/shared/table-component/analysis-result-table-component.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { ComponentResultMappings, PI } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop, Watch } from "vue-property-decorator";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { ObservationSelectionService } from "../selection-sidebar/observation-selection/observation-selection-service";
import { IObservationSelectionComponent } from "../selection-sidebar/observation-selection/types";
import { ITableComponent, TableTabComponent, ResultMappingTableTabComponent, LabelledTableTabComponent } from "./types";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import AppObservationTableComponent from "./observation-table-component.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { CustomComponentPropertySchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { DateRange } from "../observations/types";

@Component({
  name: "app-tables-component",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppExplWrap,
    AppAnalysisResultTableComponent,
    AppObservationTableComponent,
  },
})
export default class AppTablesComponent extends BaseAuthComponent implements IAnalysisSelectionComponent, IObservationSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) componentResultMappings!: ComponentResultMappings[];
  @Prop({ required: true }) tableTabComponents!: TableTabComponent[];

  analysisSelectionService: AnalysisSelectionService | null = null;
  observationSelectionService: ObservationSelectionService | null = null;
  
  hideCsvExport = false;
  csvExportLoading = false;
  activeTabLabel = "";
  
  analysisTabIndex = 0;
  observationTabIndex = 0;

  readonly activeAnalysisTabComponents: ResultMappingTableTabComponent[] = [];
  readonly activeObservTabComponents: LabelledTableTabComponent[] = [];

  async created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.observationSelectionService = new ObservationSelectionService(this);
  }

  async mounted() {
    await this.analysisSelectionService!.register();
    await this.observationSelectionService!.register();
  }

  async unmounted() {
    this.analysisSelectionService?.unregister();
    this.observationSelectionService?.unregister();
  }

  get analysesSidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.analyses;
  }

  get observationsSidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.observations;
  }

  get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.firstAnalysisResult || null;
  }

  get compareAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.compareAnalysisResult || null;
  }

  get ccps(): CustomComponentPropertySchema[] | null {
    return this.observationSelectionService && this.observationSelectionService.selectedCcps;
  }

  get pis(): PI[] | null {
    return this.observationSelectionService && this.observationSelectionService.selectedPIs;
  }

  get dateRange(): DateRange | null {
    return this.observationSelectionService && this.observationSelectionService.dateRange;
  }

  get isAnalysisSidebarActive(): boolean {
    return this.analysesSidebarOpen || (!this.observationsSidebarOpen &&
      this.$store.direct.state.sidebar.lastActiveSidebarName === "analyses");
  }

  get isObservationsSidebarActive(): boolean {
    return this.observationsSidebarOpen || (!this.analysesSidebarOpen &&
      this.$store.direct.state.sidebar.lastActiveSidebarName === "observations");
  }

  getKeyFigures(): KeyFigureSchema[] {
    return this.analysisSelectionService?.getKeyFigures() || [];
  }

  @Watch("analysesSidebarOpen")
  @Watch("observationsSidebarOpen")
  onSidebarOpenChanged() {
    this.hideCsvExport = this.observationsSidebarOpen;

    this.setActiveTabLabel();
  }

  async onAnalysisSelected() {
    await this.setActiveAnalysisTabComponents();
  }

  async onMultiAnalysesSelected() {
    await this.setActiveAnalysisTabComponents();
  }

  async onObservationSelected() {
    await this.setActiveObservTabComonents();
  }

  onSearch(searchText: string) {
    for (const activeComponent of (this.getActiveTabComponents() || [])) {
      const tableComponent = this.getRefTableComponent(activeComponent);
      if (tableComponent) {
        tableComponent.search(searchText);
      }
    }
  }

  onAnalysisTabChanged(newTabIndex: number) {
    this.analysisTabIndex = newTabIndex;

    this.setActiveTabLabel();
  }

  onObservationTabChanged(newTabIndex: number) {
    this.observationTabIndex = newTabIndex;

    this.setActiveTabLabel();
  }

  @CatchError("csvExportLoading")
  async onExportCsv() {
    const activeComponent = this.getSelectedActiveComponent();
    if (activeComponent) {
      const tableComponent = this.getRefTableComponent(activeComponent);
      const authCsvDownloadUrl = tableComponent.getCsvDownloadUrl();

      AppDownloader.download(await volateqApi.generateDownloadUrl(authCsvDownloadUrl));
    }
  }

  private async setActiveAnalysisTabComponents() {
    this.activeAnalysisTabComponents.length = 0;

    await this.$nextTick(); // wait for vue recognizing no components are set

    if (this.analysisSelectionService?.hasAnyAnalysisSelected()) {
      let tabIdx = 0;

      for (const tableTabComponent of this.tableTabComponents) {
        const keyFigure = this.getKeyFigures().find(
          keyFigure => keyFigure.component.id === tableTabComponent.componentId
        );
        if (keyFigure) {
          this.activeAnalysisTabComponents.push({
            ...tableTabComponent,
            mapping: this.componentResultMappings
              .find(m => m.componentId === tableTabComponent.componentId)!.resultMapping,
            label: apiComponentNames[tableTabComponent.componentId],
            tabIndex: tabIdx++,
            tableRefName: ["tableTabComponentAnalysis", this.firstAnalysisResult!.id, tableTabComponent.componentId].join("_"),
          });
        }
      }
    }

    this.onAnalysisTabChanged(0);
  }

  private async setActiveObservTabComonents() {
    this.activeObservTabComponents.length = 0;

    await this.$nextTick(); // wait for vue recognizing no components are set

    if (this.observationSelectionService?.hasSelectedObservations) {
      let tabIdx = 0;

      for (const tableTabComponent of this.tableTabComponents) {
        if (this.observationSelectionService.components?.find(c => c.component_id === tableTabComponent.componentId)) {
          this.activeObservTabComponents.push({
            ...tableTabComponent,
            label: apiComponentNames[tableTabComponent.componentId],
            tabIndex: tabIdx++,
            tableRefName: [
              "tableTabComponentObservation",
              this.observationSelectionService.date,
              tableTabComponent.componentId
            ].join("_"),
          });
        }
      }
    }

    this.onAnalysisTabChanged(0);
  }

  private getRefTableComponent(activeTabComponent: LabelledTableTabComponent): ITableComponent {
    return (this.$refs[activeTabComponent.tableRefName] as any[])[0];
  }

  private getActiveTabComponents(): LabelledTableTabComponent[] | undefined {
    if (this.isAnalysisSidebarActive) {
      return this.activeAnalysisTabComponents;
    }

    if (this.isObservationsSidebarActive) {
      return this.activeObservTabComponents;
    }
  }

  private getSelectedActiveComponent(): LabelledTableTabComponent | undefined {
    return this.getActiveTabComponents()?.find(comp => comp.tabIndex === this.getActiveTabIndex());
  }

  private getActiveTabIndex(): number {
    if (this.isAnalysisSidebarActive) {
      return this.analysisTabIndex;
    }

    if (this.isObservationsSidebarActive) {
      return this.observationTabIndex;
    }

    throw new Error("No active tab index");
  }

  private setActiveTabLabel() {
    const activeComponent = this.getSelectedActiveComponent();
    if (activeComponent) {
      this.activeTabLabel = this.$t(activeComponent.label).toString();
    }
  }
}
</script>
<style lang="scss">
.app-tables-component {
  padding: 1em;

  .app-table-root-container {
    display: grid;
    grid-template-rows: max-content auto;
    gap: 10px;

    grid-template-areas:
      "pull-left pull-right"
      "table table";

    .pull-left {
      grid-area: pull-left;
    }

    .pull-right {
      grid-area: pull-right;
      justify-self: end;
    }

    .app-table-container {
      grid-area: table;
    }

    @media (max-width: 576px) {
      grid-template-areas:
        "pull-left"
        "pull-right"
        "table";

      .pull-left,
      .pull-right {
        justify-self: stretch;

        > :first-child:last-child {
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }

  .no-data-placeholder {
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>
