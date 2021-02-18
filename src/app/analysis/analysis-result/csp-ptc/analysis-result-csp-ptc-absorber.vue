<template>
  <b-table hover :fields="columns" :items="rows" class="bordered"
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
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppSearchInput from "@/app/shared/components/app-search-input/app-search-input.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAnalysisResultComponent } from "@/app/analysis/analysis-result/analysis-result";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { IComponentTab } from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";

@Component({
  name: "app-analysis-result-csp-ptc-absorber",
  components: {
  }
})
export default class AppAnalysisResultCspPtcAbsorber extends Vue {
  @Prop() results!: AnalysisResultCspPtcIrIntensitySchema[];

  columns: BvTableFieldArray = [];
  rows: Array<any> = [];


  created() {
    this.columns = [
      { key: "pcs", label: this.$t("pcs").toString(), sortable: true },
      { key: "absorberTemperature", label: this.$t("absorber-temperature").toString(), sortable: true },
      { key: "irIntensity", label: this.$t("ir-intensity").toString(), sortable: true },
      // { key: "classSubfield", label: this.$t("class-subfield").toString(), sortable: true },
      // { key: "classSca", label: this.$t("class-sca").toString(), sortable: true },
      // { key: "orderSubfield", label: this.$t("order-subfield").toString(), sortable: true },
      // { key: "orderSca", label: this.$t("order-sca").toString(), sortable: true },
    ];

    this.rows = this.results.map((result) => ({
      pcs: result.fieldgeometry_component.kks,
      absorberTemperature: result.absorber_temperature,
      irIntensity: result.ir_intensity
    }))
  }
}
</script>