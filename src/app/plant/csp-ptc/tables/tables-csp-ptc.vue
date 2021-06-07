<template>
  <div class="app-tables-csp-ptc">
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
          <app-table-csp-ptc :ref="generateRefTableName(activeTabComponent)"
            :analysisResult="analysisResult"
            :activeComponent="activeTabComponent">
          </app-table-csp-ptc>
        </b-tab>
      </b-tabs>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { IActiveComponent, IActiveTabComponent, ITableComponent} from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import dateHelper from "@/app/shared/services/helper/date-helper";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-ir-intensity";
import analysisResultCspPtcMappingSceAngle from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-sce-angle";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { IAnalysisResultSelection } from "../types";
import AppTableCspPtc from "./table-component/table-csp-ptc.vue";
import { IAppButton } from "@/app/shared/components/app-button/types";


const ACTIVE_COMPONENTS: IActiveComponent[] = [
  {
    componentId: AnalysisResultComponent.CSP_PTC_ABSORBER,
    mapping: analysisResultCspPtcMappingIrIntensity as any,
    label: "absorber-tubes",
  }, 
  {
    label: "single-collector-elements",
    componentId: AnalysisResultComponent.CSP_PTC_SCE,
    mapping: analysisResultCspPtcMappingSceAngle as any,
    descr: "sce_expl",
  }
];


@Component({
  name: "app-tables-csp-ptc",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppExplanation,
    AppTableCspPtc,
  }
})
export default class AppTablesCspPtc extends BaseAuthComponent implements IAnalysisResultSelection {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() csvExportBtn!: IAppButton;

  tabIndex = 0;
  activeTabLabel = "";
  readonly activeTabComponents: IActiveTabComponent[] = [];

  private analysisResult?: AnalysisResultDetailedSchema;

  selectAnalysisResult(analysisResultId: string) {
    this.analysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultId);

    if (this.analysisResult) {
      let tabIdx = 0;
      this.activeTabComponents.length = 0;

      for (const activeComponent of ACTIVE_COMPONENTS) {
        const compKeyFigure = this.analysisResult.component_key_figures
          .find(compKeyFigure => compKeyFigure.component.id === activeComponent.componentId);
        if (compKeyFigure) {
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
    for (const activeComponent of ACTIVE_COMPONENTS) {
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
          this.analysisResult!.component_key_figures
            .filter(compKeyFigure => compKeyFigure.component.id === activeComponent.componentId)[0].id,
          tableComponent.getTableRequestParam(),
          tableComponent.getCsvColumnMappingsParam()
        );

        const csvFileName = dateHelper.toDateTime(new Date()) + "_" + this.plant.name + "_" + 
          new Date(Date.parse(this.analysisResult!.csp_ptc.time)).toLocaleDateString() + "_" + activeComponent.label + ".csv";

        AppDownloader.download(await volateqApi.generateDownloadUrl(authCsvDownloadUrl, csvFileName), csvFileName);
      } catch (e) {
        appContentEventBus.showError(e);
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
.app-tables-csp-ptc {
  padding: 20px;
}
</style>