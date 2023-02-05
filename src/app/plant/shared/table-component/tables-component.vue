<template>
  <div class="app-tables-component">
    <div class="no-data-placeholder" v-if="!firstAnalysisResult">
      {{ $t("no-analysis-result-selected") }}
    </div>
    <div v-if="firstAnalysisResult" class="app-table-root-container">
      <div class="pull-left">
        <app-search-input :placeholder="$t('search-pcs')" @search="onSearch"></app-search-input>
      </div>
      <div class="pull-right">
        <app-button variant="secondary" :title="$t('export-csv')" :loading="csvExportLoading" @click="onExportCsv">
          <b-icon icon="download"></b-icon> {{ $t("export-csv") }}: {{ activeTabLabel }}
        </app-button>
      </div>

      <app-table-container>
        <b-tabs v-model="tabIndex" @activate-tab="onTabChanged">
          <b-tab
            v-for="activeTabComponent in activeTabComponents"
            :key="firstAnalysisResult.id + '_' + activeTabComponent.label"
          >
            <template #title>
              {{ $t(activeTabComponent.label) }}
              <app-explanation v-if="activeTabComponent.descr">
                <span v-html="$t(activeTabComponent.descr)"></span>
              </app-explanation>
            </template>
            <app-table-component
              :ref="generateRefTableName(activeTabComponent)"
              :analysisResult="firstAnalysisResult"
              :compareAnalysisResult="compareAnalysisResult"
              :activeComponent="activeTabComponent"
              :plant="plant"
            >
            </app-table-component>
          </b-tab>
        </b-tabs>
      </app-table-container>
    </div>
  </div>
</template>

<script lang="ts">
import AppTableComponent from "@/app/plant/shared/table-component/table-component.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { ComponentResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop } from "vue-property-decorator";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import { ITableComponent, TableResultComponent, TableResultMappingTabComponent } from "./types";

@Component({
  name: "app-tables-component",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppExplanation,
    AppTableComponent,
  },
})
export default class AppTablesComponent extends AnalysisSelectionBaseComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) componentResultMappings!: ComponentResultMappings[];
  @Prop({ required: true }) tableResultComponents!: TableResultComponent[];

  csvExportLoading = false;
  tabIndex = 0;
  activeTabLabel = "";
  readonly activeTabComponents: TableResultMappingTabComponent[] = [];

  async created() {
    await super.created();
  }

  protected async onAnalysisSelected() {
    this.setActiveTabComponents();
  }

  protected async onMultiAnalysesSelected() {
    this.setActiveTabComponents();
  }

  private setActiveTabComponents() {
    this.activeTabComponents.length = 0;

    if (this.hasAnyAnalysisSelected()) {
      let tabIdx = 0;

      for (const tableResultComponent of this.tableResultComponents) {
        const keyFigure = this.getKeyFigures().find(
          keyFigure => keyFigure.component.id === tableResultComponent.componentId
        );
        if (keyFigure) {
          this.activeTabComponents.push({
            ...tableResultComponent,
            mapping: this.componentResultMappings
              .find(m => m.componentId === tableResultComponent.componentId)!.resultMapping,
            label: apiComponentNames[tableResultComponent.componentId],
            tabIndex: tabIdx++,
          });
        }
      }
    }

    this.onTabChanged(0);
  }

  onSearch(searchText: string) {
    for (const activeComponent of this.tableResultComponents) {
      const tableComponent = this.getRefTableComponent(activeComponent);
      if (tableComponent) {
        tableComponent.search(searchText);
      }
    }
  }

  onTabChanged(newTabIndex: number) {
    this.tabIndex = newTabIndex;

    const activeComponent = this.getSelectedActiveComponent();
    if (activeComponent) {
      this.activeTabLabel = this.$t(activeComponent.label).toString();
    }
  }

  async onExportCsv() {
    const activeComponent = this.getSelectedActiveComponent();
    if (activeComponent) {
      try {
        this.csvExportLoading = true;

        const tableComponent = this.getRefTableComponent(activeComponent);

        const authCsvDownloadUrl = volateqApi.getSpecificAnalysisResultCsvUrl(
          this.firstAnalysisResult!.id,
          activeComponent.componentId,
          tableComponent.getTableRequestParam(),
          tableComponent.getTableFilterParam(),
          tableComponent.getCsvColumnMappingsParam()
        );

        const csvFileName =
          dateHelper.toNumericDateTime(new Date()) +
          "_" +
          this.plant.name +
          "_" +
          dateHelper.toDate(this.firstAnalysisResult!.created_at) +
          "_" +
          activeComponent.label +
          ".csv";

        AppDownloader.download(await volateqApi.generateDownloadUrl(authCsvDownloadUrl), csvFileName);
      } catch (e) {
        this.showError(e);
      } finally {
        this.csvExportLoading = false;
      }
    }
  }

  private getRefTableComponent(activeTabComponent: TableResultComponent): ITableComponent {
    return (this.$refs[this.generateRefTableName(activeTabComponent)] as any[])[0];
  }

  private generateRefTableName(activeTabComponent: TableResultComponent): string {
    return ["tableComponent", this.firstAnalysisResult!.id, activeTabComponent.componentId].join("_");
  }

  private getSelectedActiveComponent(): TableResultMappingTabComponent | undefined {
    return Object.values(this.activeTabComponents).find(comp => comp.tabIndex === this.tabIndex);
  }
}
</script>
<style lang="scss">
.app-tables-component {
  padding: 60px 20px;

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
