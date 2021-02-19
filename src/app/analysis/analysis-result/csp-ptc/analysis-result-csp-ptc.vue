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
      <b-tabs @activate-tab="loadComponentData">
        <b-tab v-if="activeComponents.cspPtcAbsorber" :title="$t('absorber-tubes')" active>
          <app-analysis-result-csp-ptc-absorber v-if="activeComponents.cspPtcAbsorber.results" :results="activeComponents.cspPtcAbsorber.results">
          </app-analysis-result-csp-ptc-absorber>
          <app-loading v-if="!activeComponents.cspPtcAbsorber.results"></app-loading>
        </b-tab>
        <!-- <b-tab :title="$t('single-collector-elements')">
        </b-tab>
        <b-tab :title="$t('mirrors')">
        </b-tab> -->
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
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAnalysisResultComponent } from "@/app/analysis/analysis-result/analysis-result";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { IActiveComponent} from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import AppAnalysisResultCspPtcAbsorber from "@/app/analysis/analysis-result/csp-ptc/analysis-result-csp-ptc-absorber.vue";

@Component({
  name: "app-analysis-result-csp-ptc",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
    AppAnalysisResultCspPtcAbsorber,
    AppLoading
  }
})
export default class AppAnalysisResultCspPtc extends BaseAuthComponent implements IAnalysisResultComponent {
  @Prop() analysisResult!: AnalysisResultDetailedSchema;

  activeComponents: { [comp_key: string]: IActiveComponent } = {
    cspPtcAbsorber: { tabIndex: 0, results: null }
  }

  async created() {
    this.setSubtitle();

    
    for (const comp_key_figure of this.analysisResult.component_key_figures) {
      switch (comp_key_figure.component.id) {
        case AnalysisResultComponent.CSP_PTC_ABSORBER:
          this.activeComponents.cspPtcAbsorber.active = true;
          this.activeComponents.cspPtcAbsorber.componentKeyFigureId = comp_key_figure.id
          break;
      }
    }

    await this.loadComponentData(0);
  }

  async loadComponentData(newTabIndex: number) {
    try {
      let activeComponent: IActiveComponent | undefined;
      for (const component_key in this.activeComponents) {
        if (this.activeComponents[component_key].tabIndex === newTabIndex) {
          activeComponent = this.activeComponents[component_key];
        }
      }

      if (!activeComponent) {
        throw new Error("tabindex " + newTabIndex + " not mapped to a component")
      }

      if (!activeComponent.results) {
        activeComponent.results = await volateqApi.getSpecificAnalysisResult(this.analysisResult.id, activeComponent.componentKeyFigureId!);
      }
    } catch (e) {
      appContentEventBus.showError(e)
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

<style lang="scss">
@import "@/scss/_colors.scss";
.app-analysis-results {
  .help-icon {
    color: $blue;
    margin-left: 5px;
  }

  .app-analysis-results-toolbox-search {
  max-width: 300px;
  margin-right: 10px;

  &-input {
    input {
      border-right: none;
    }
    .input-group-append {
      margin-left: 0;
      border: 1px solid $blue-60pc;
      border-left: none;
      background-color: $white;
      padding: 10px;
      color: $blue;
    }
  }
}
}


</style>
