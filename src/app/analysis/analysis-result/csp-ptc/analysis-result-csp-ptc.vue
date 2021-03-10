<template>
  <div class="app-analysis-result-csp-ptc">
    <div>
      <div class="pull-left">
        <app-search-input :placeholder="$t('search-kks')" @search="onSearch"></app-search-input>
      </div>
      <div class="pull-right">
        <app-button variant="secondary" :title="$t('export-csv')"><b-icon icon="download"></b-icon> {{ $t("export-csv") }}</app-button>
      </div>
      <div class="clearfix"></div>
    </div>
    <app-table-container>
      <b-tabs v-model="tabIndex">
        <b-tab v-if="activeComponents.cspPtcAbsorber.exists" :title="$t('absorber-tubes')">
          <app-analysis-result-csp-ptc-absorber 
            :analysisResultId="analysisResult.id" 
            :componentKeyFigure="activeComponents.cspPtcAbsorber.componentKeyFigure">
          </app-analysis-result-csp-ptc-absorber>
        </b-tab>
        <b-tab v-if="activeComponents.cspPtcSce.exists" :title="$t('single-collector-elements')">
          <app-analysis-result-csp-ptc-sce 
            :analysisResultId="analysisResult.id" 
            :componentKeyFigure="activeComponents.cspPtcSce.componentKeyFigure">
          </app-analysis-result-csp-ptc-sce>
        </b-tab>
      </b-tabs>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import { IAnalysisResultComponent } from "@/app/analysis/analysis-result/analysis-result";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { IActiveComponent} from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import AppAnalysisResultCspPtcAbsorber from "@/app/analysis/analysis-result/csp-ptc/components/analysis-result-csp-ptc-absorber.vue";
import AppAnalysisResultCspPtcSce from "@/app/analysis/analysis-result/csp-ptc/components/analysis-result-csp-ptc-sce.vue";

@Component({
  name: "app-analysis-result-csp-ptc",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppAnalysisResultCspPtcAbsorber,
    AppAnalysisResultCspPtcSce,
    AppLoading
  }
})
export default class AppAnalysisResultCspPtc extends BaseAuthComponent implements IAnalysisResultComponent {
  @Prop() analysisResult!: AnalysisResultDetailedSchema;

  tabIndex = 0;

  activeComponents: { [comp_key: string]: IActiveComponent } = {
    cspPtcAbsorber: { exists: false },
    cspPtcSce: { exists: false }
  };

  async created() {
    this.setSubtitle();

    for (const comp_key_figure of this.analysisResult.component_key_figures) {
      switch (comp_key_figure.component.id) {
        case AnalysisResultComponent.CSP_PTC_ABSORBER:
          this.activeComponents.cspPtcAbsorber.exists = true;
          this.activeComponents.cspPtcAbsorber.componentKeyFigure = comp_key_figure
          break;

        case AnalysisResultComponent.CSP_PTC_SCE:
          this.activeComponents.cspPtcSce.exists = true;
          this.activeComponents.cspPtcSce.componentKeyFigure = comp_key_figure
          break;
      }
    }
  }

  onSearch(searchText: string) {
    console.log("search: " + searchText);
  }

  setSubtitle() {
    const subtitle = [
      this.$t("oil-temp-of-absorber-tube").toString() + ": <b>&oslash; " + Math.round(this.analysisResult.csp_ptc.absorber_temperatur) + " °</b>",
      this.$t("ambient-temperature").toString() + ": <b>" + (this.analysisResult.csp_ptc.ambient_temperatur || "-") + "</b>",
      this.$t("time").toString() + ": <b>" + new Date(Date.parse(this.analysisResult.csp_ptc.time)).toLocaleTimeString() + "</b>"
    ].join("<br>");

    this.$emit('setSubtitle', subtitle);
  }
}
</script>
