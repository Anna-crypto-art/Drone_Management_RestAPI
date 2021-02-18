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
      <b-tabs>
        <b-tab :title="$t('absorber-tubes')" active>
          <b-table hover :fields="columns" :items="analysisResultRows" class="bordered"
            head-variant="light"
            :emptyText="$t('no-data')">
            <template #head(irIntensity)="column">
              {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
            </template>
            <template #head(classSubfield)="column">
              {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
            </template>
            <template #head(classSca)="column">
              {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
            </template>
          </b-table>
        </b-tab>
        <b-tab :title="$t('single-collector-elements')">
        </b-tab>
        <b-tab :title="$t('mirrors')">
        </b-tab>
      </b-tabs>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAnalysisResultComponent } from "@/app/analysis/analysis-result/analysis-result";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { IComponentTab } from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";

@Component({
  name: "app-analysis-result-csp-ptc",
  components: {
    AppButton,
    AppTableContainer,
    AppSearchInput,
  }
})
export default class AppAnalysisResultCspPtc extends BaseAuthComponent implements IAnalysisResultComponent {
  @Prop() analysisResult!: AnalysisResultDetailedSchema;

  subtitle = "";

  tabs: IComponentTab[] = [];

  async created() {
    this.setSubtitle();

    this.tabs = this.analysisResult.component_key_figures.map((comp_key_figure) => ({
      name: comp_key_figure.component.abbrev,
      title: this.$t(comp_key_figure.component.abbrev).toString()
    }));

    for (const comp_key_figure of this.analysisResult.component_key_figures) {
      if (comp_key_figure.component.id === AnalysisResultComponent.CSP_PTC_ABSORBER) {

      }
    }
  }

  onSearch() {

  }

  setSubtitle() {
    this.subtitle = [
      this.$t("oil-temp-of-absorber-tube").toString() + ": <b>" + this.analysisResult.csp_ptc.absorber_temperatur + "</b>",
      this.$t("ambient-temperature").toString() + ": <b>" + this.analysisResult.csp_ptc.ambient_temperatur + "</b>",
      this.$t("time").toString() + ": <b>" + new Date(Date.parse(this.analysisResult.csp_ptc.time)).toTimeString() + "</b>"
    ].join("<br>");

    this.$emit('setSubtitle', this.subtitle);
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
