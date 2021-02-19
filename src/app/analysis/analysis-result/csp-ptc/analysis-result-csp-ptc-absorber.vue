<template>
  <div>
    <b-table id="cspPtcAbsorberTable" hover :fields="columns" :items="rows" class="bordered"
      head-variant="light"
      :emptyText="$t('no-data')"
      :per-page="pagination.perPage"
      :current-page="pagination.currentPage">
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
    <b-pagination
        v-model="pagination.currentPage"
        :total-rows="pagination.total"
        :per-page="pagination.perPage"
        aria-controls="cspPtcAbsorberTable"
      ></b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BvTableFieldArray } from "bootstrap-vue";
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

  pagination = { currentPage: 1, perPage: 10, total: 0 };

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
    }));

    this.pagination.total = this.rows.length;
  }
}
</script>