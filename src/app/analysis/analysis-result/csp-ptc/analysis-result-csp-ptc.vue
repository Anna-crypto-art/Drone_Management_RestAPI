<template>
  <div class="app-analysis-result-csp-ptc">
    <div>
      <div class="pull-left">
        <app-search-input :placeholder="$t('search-pcs')" @search="onSearch"></app-search-input>
      </div>
      <div class="pull-right">
        <app-button variant="secondary" :title="$t('export-csv')" @click="onExportCsv">
          <b-icon icon="download"></b-icon> {{ $t("export-csv") }}: {{ activeTabLabel }}
        </app-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <app-table-container>
      <b-tabs v-model="tabIndex" @activate-tab="onTabChanged">
        <b-tab v-if="activeComponents.cspPtcAbsorber.exists" :title="$t('absorber-tubes')">
          <app-analysis-result-csp-ptc-absorber ref="absorberComponent"
            :analysisResultId="analysisResult.id" 
            :componentKeyFigures="activeComponents.cspPtcAbsorber.componentKeyFigures">
          </app-analysis-result-csp-ptc-absorber>
        </b-tab>
        <b-tab v-if="activeComponents.cspPtcSce.exists" :title="$t('single-collector-elements')">
          <template #title>
            {{ $t('single-collector-elements') }}
            <app-explanation>{{ $t('sce_expl') }}</app-explanation>
          </template>
          <app-analysis-result-csp-ptc-sce ref="sceComponent"
            :analysisResultId="analysisResult.id" 
            :componentKeyFigures="activeComponents.cspPtcSce.componentKeyFigures">
          </app-analysis-result-csp-ptc-sce>
        </b-tab>
        <b-tab v-if="activeComponents.cspPtcSca.exists" :title="$t('solar-collector-assembly')">
          <template #title>
            {{ $t('solar-collector-assembly') }}
            <app-explanation>{{ $t('sca_expl') }}</app-explanation>
          </template>
          <app-analysis-result-csp-ptc-sca ref="scaComponent"
            :analysisResultId="analysisResult.id" 
            :componentKeyFigures="activeComponents.cspPtcSca.componentKeyFigures">
          </app-analysis-result-csp-ptc-sca>
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
import { IAnalysisResultComponent } from "@/app/analysis/analysis-result/analysis-result";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { IActiveComponent} from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import AppAnalysisResultCspPtcAbsorber from "@/app/analysis/analysis-result/csp-ptc/components/analysis-result-csp-ptc-absorber.vue";
import AppAnalysisResultCspPtcSce from "@/app/analysis/analysis-result/csp-ptc/components/analysis-result-csp-ptc-sce.vue";
import AppAnalysisResultCspPtcSca from "@/app/analysis/analysis-result/csp-ptc/components/analysis-result-csp-ptc-sca.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { IAnalysisResultCspPtcComponent } from "./components/shared/analysis-result-csp-ptc-base";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import dateHelper from "@/app/shared/services/helper/date-helper";

@Component({
  name: "app-analysis-result-csp-ptc",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppAnalysisResultCspPtcAbsorber,
    AppAnalysisResultCspPtcSce,
    AppAnalysisResultCspPtcSca,
    AppExplanation
  }
})
export default class AppAnalysisResultCspPtc extends BaseAuthComponent implements IAnalysisResultComponent {
  @Prop() analysis!: AnalysisSchema;
  @Prop() analysisResult!: AnalysisResultDetailedSchema;

  @Ref() absorberComponent: IAnalysisResultCspPtcComponent | undefined;
  @Ref() sceComponent: IAnalysisResultCspPtcComponent | undefined;
  @Ref() scaComponent: IAnalysisResultCspPtcComponent | undefined;

  tabIndex = 0;
  activeTabLabel = "";

  activeComponents: { [comp_key: string]: IActiveComponent } = {
    cspPtcAbsorber: { 
      componentId: AnalysisResultComponent.CSP_PTC_ABSORBER,
      label: "absorber-tubes",
      refComponentName: 'absorberComponent',
      componentKeyFigures: [], 
      tabIndex: -1,
      exists: false,
    },
    cspPtcSce: {
      componentId: AnalysisResultComponent.CSP_PTC_SCE,
      label: "single-collector-elements",
      refComponentName: 'sceComponent',
      componentKeyFigures: [],
      tabIndex: -1,
      exists: false,
    },
    cspPtcSca: {
      componentId: AnalysisResultComponent.CSP_PTC_SCA,
      label: "solar-collector-assembly",
      refComponentName: 'scaComponent',
      componentKeyFigures: [],
      tabIndex: -1,
      exists: false,
    },
  };

  async created() {
    this.setSubtitle();

    let tabIdx = 0;
    for (const comp_key_figure of this.analysisResult.component_key_figures) {
      for (const comp_key in this.activeComponents) {
        const activeComponent = this.activeComponents[comp_key];
        if (activeComponent.componentId === comp_key_figure.component.id) {
          activeComponent.componentKeyFigures.push(comp_key_figure);

          if (!activeComponent.exists) {
            activeComponent.exists = true;
            activeComponent.tabIndex = tabIdx++;
          }
        }
      }
    }

    this.onTabChanged(0);
  }

  onSearch(searchText: string) {
    console.log(searchText);
    this.absorberComponent && this.absorberComponent.search(searchText);
    this.sceComponent && this.sceComponent.search(searchText);
    this.scaComponent && this.scaComponent.search(searchText);
  }

  onTabChanged(newTabIndex: number) {
    const activeComponent = Object.values(this.activeComponents).find(comp => comp.tabIndex === newTabIndex);
    if (activeComponent) {
      this.activeTabLabel = this.$t(activeComponent.label).toString();
    }
  }

  async onExportCsv() {
    const activeComponent = Object.values(this.activeComponents).find(comp => comp.tabIndex === this.tabIndex);
    if (activeComponent) {
      const refComponent: IAnalysisResultCspPtcComponent = this[activeComponent.refComponentName]; 

      const authCsvDownloadUrl = volateqApi.getSpecificAnalysisResultCsvUrl(
        this.analysisResult.id, 
        activeComponent.componentKeyFigures[0].id,
        refComponent.getTableRequestParam(),
        refComponent.getCsvColumnMappingsParam()
      );

      const csvFileName = dateHelper.toDateTime(new Date()) + "_" + this.analysis.plant.name + "_" + new Date(Date.parse(this.analysisResult.csp_ptc.time)).toLocaleDateString() + "_" + activeComponent.label + ".csv";

      try {
        appButtonEventBus.startLoading();
        AppDownloader.download(await volateqApi.generateDownloadUrl(authCsvDownloadUrl, csvFileName), csvFileName);
      } catch (e) {
        appContentEventBus.showError(e);
      } finally {
        appButtonEventBus.stopLoading();
      }
    }
  }

  setSubtitle() {
    const subtitle = [
      this.$t("oil-temp-of-absorber-tube").toString() + ": <b>&oslash; " + Math.round(this.analysisResult.csp_ptc.absorber_temperatur) + " ° C</b>",
      this.$t("ambient-temperature").toString() + ": <b>" + (this.analysisResult.csp_ptc.ambient_temperatur || "-") + "</b>",
      this.$t("time").toString() + ": <b>" + new Date(Date.parse(this.analysisResult.csp_ptc.time)).toLocaleString() + "</b>"
    ].join("<br>");

    this.$emit('setSubtitle', subtitle);
  }
}
</script>
