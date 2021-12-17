<template>
  <div class="app-tables-component">
    <div class="no-data-placeholder" v-show="!analysisResult">
      {{ $t('no-analysis-result-selected') }}
    </div>
    <div v-show="analysisResult">
      <div>
        <div class="pull-left">
          <app-search-input :placeholder="$t('search-pcs')" @search="onSearch"></app-search-input>
        </div>
        <div class="pull-right">
          <app-button ref="csvExportBtn" variant="secondary" :title="$t('export-csv')" @click="onExportCsv">
            <b-icon icon="download"></b-icon> {{ $t("export-csv") }}: {{ activeTabLabel }}
          </app-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <app-table-container>
        <b-tabs v-model="tabIndex" @activate-tab="onTabChanged">
          <b-tab v-for="activeTabComponent in activeTabComponents" :key="analysisResult.id + '_' + activeTabComponent.label">
            <template #title>
              {{ $t(activeTabComponent.label) }}
              <app-explanation v-if="activeTabComponent.descr">
                <span v-html="$t(activeTabComponent.descr)"></span>
              </app-explanation>
            </template>
            <app-table-component :ref="generateRefTableName(activeTabComponent)"
              :analysisResult="analysisResult"
              :activeComponent="activeTabComponent">
            </app-table-component>
          </b-tab>
        </b-tabs>
      </app-table-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { IActiveComponent, IActiveTabComponent, IAnalysisResultSelection } from "../types";
import { ITableComponent } from "./types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import AppTableComponent from "./table-component/table-component.vue";
import { IAppButton } from "@/app/shared/components/app-button/types";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";


@Component({
  name: "app-tables-component",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppExplanation,
    AppTableComponent,
  }
})
export default class AppTablesComponent extends BaseAuthComponent implements IAnalysisResultSelection {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() activeComponents!: IActiveComponent[];
  @Ref() csvExportBtn!: IAppButton;

  tabIndex = 0;
  activeTabLabel = "";
  readonly activeTabComponents: IActiveTabComponent[] = [];

  private analysisResult: AnalysisResultDetailedSchema | null = null;

  selectAnalysisResult(analysisResultId: string | undefined) {
    this.analysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultId) || null;

    this.activeTabComponents.length = 0;

    if (this.analysisResult) {
      let tabIdx = 0;

      for (const activeComponent of this.activeComponents) {
        const keyFigure = this.analysisResult.key_figures
          .find(keyFigure => keyFigure.component.id === activeComponent.componentId);
        if (keyFigure) {
          this.activeTabComponents.push({
            ...activeComponent,
            tabIndex: tabIdx++,
          });
        }
      }
    }

    this.onTabChanged(0);
  }

  onSearch(searchText: string) {
    for (const activeComponent of this.activeComponents) {
      const tableComponent = this.getRefTableComponent(activeComponent)
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
        this.csvExportBtn.startLoading();

        const tableComponent = this.getRefTableComponent(activeComponent);

        const authCsvDownloadUrl = volateqApi.getSpecificAnalysisResultCsvUrl(
          this.analysisResult!.id,
          activeComponent.componentId,
          tableComponent.getTableRequestParam(),
          tableComponent.getCsvColumnMappingsParam()
        );

        const csvFileName = dateHelper.toDateTime(new Date()) + "_" + this.plant.name + "_" + 
          new Date(Date.parse(this.analysisResult!.csp_ptc.created_at)).toLocaleDateString() + "_" + activeComponent.label + ".csv";

        AppDownloader.download(await volateqApi.generateDownloadUrl(authCsvDownloadUrl, csvFileName), csvFileName);
      } catch (e) {
        appContentEventBus.showError(e as ApiException);
      } finally {
        this.csvExportBtn.stopLoading();
      }
    }
  }

  private getRefTableComponent(activeTabComponent: IActiveComponent): ITableComponent {
    return (this.$refs[this.generateRefTableName(activeTabComponent)] as any[])[0];
  }

  private generateRefTableName(activeTabComponent: IActiveComponent): string {
    return ["tableComponent", this.analysisResult!.id, activeTabComponent.componentId].join("_");
  }

  private getSelectedActiveComponent(): IActiveTabComponent | undefined {
    return Object.values(this.activeTabComponents).find(comp => comp.tabIndex === this.tabIndex);
  }
}
</script>
<style lang="scss">
.app-tables-component {
  padding: 60px 20px;

  .no-data-placeholder {
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>