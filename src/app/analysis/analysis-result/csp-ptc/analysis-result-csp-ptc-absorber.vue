<template>
  <div>
    <b-table id="cspPtcAbsorberTable" hover :fields="columns" :items="absorberDataProvider" class="bordered"
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
      aria-controls="cspPtcAbsorberTable">
    </b-pagination>
    <app-loading v-show="loading"></app-loading>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BvTableCtxObject, BvTableFieldArray } from "bootstrap-vue";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";

@Component({
  name: "app-analysis-result-csp-ptc-absorber",
  components: {
  }
})
export default class AppAnalysisResultCspPtcAbsorber extends Vue {
  @Prop() analysisResultId!: string;
  @Prop() componentKeyFigure!: ComponentKeyFigureSchema;

  columns: BvTableFieldArray = [];
  rows: Array<any> = [];

  loading = true;

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  created() {
    this.columns = [
      { key: "pcs", label: this.$t("pcs").toString(), sortable: true },
      { key: "absorberTemperature", label: this.$t("absorber-temperature").toString(), sortable: true },
      { key: "irIntensity", label: this.$t("ir-intensity").toString(), sortable: true },
      { key: "classSubfield", label: this.$t("class-subfield").toString(), sortable: true },
      // { key: "classSca", label: this.$t("class-sca").toString(), sortable: true },
      // { key: "orderSubfield", label: this.$t("order-subfield").toString(), sortable: true },
      // { key: "orderSca", label: this.$t("order-sca").toString(), sortable: true },
    ];
  }

  async absorberDataProvider(ctx: BvTableCtxObject, callback: (items: Array<any>) => void) {
    try {
      const items = (await volateqApi.getSpecificAnalysisResult(
          this.analysisResultId, 
          this.componentKeyFigure.id, 
          {
            limit: ctx.perPage,
            page: ctx.currentPage,
            order_by: ctx.sortBy && {
              pcs: "kks", 
              absorberTemperature: "absorber_temperature",
              irIntensity: "ir_intensity",
              classSubfield: "class_subfield"
            }[ctx.sortBy],
            order_direction: ctx.sortDesc ? 'desc' : 'asc'
          }
        )).map((absorberDataRow: AnalysisResultCspPtcIrIntensitySchema) => ({
          pcs: absorberDataRow.fieldgeometry_component.kks,
          absorberTemperature: absorberDataRow.absorber_temperature,
          irIntensity: absorberDataRow.ir_intensity,
          classSubfield: absorberDataRow.class_subfield
        }));
      
      this.pagination.total = items.length;

      callback(items)
    } catch (e) {
      appContentEventBus.showError(e)
    }
  }
}
</script>