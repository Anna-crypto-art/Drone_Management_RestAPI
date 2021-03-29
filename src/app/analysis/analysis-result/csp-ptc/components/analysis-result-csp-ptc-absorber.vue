<template>
  <div class="app-analysis-result-csp-ptc-absorber">
    <app-analysis-result-csp-ptc-container ref="container" tableName="cspPtcAbsorberTable" :pagination="pagination">
      <b-table id="cspPtcAbsorberTable" hover :fields="columns" :items="dataProvider" class="bordered" ref="table"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template #head(pcs)="column">
          {{ column.label }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
        </template>
        <template #head(irIntensity)="column">
          {{ column.label }} <app-explanation>{{ $t("ir-intensity_expl") }}</app-explanation>
        </template>
        <template #head(classSubfield)="column">
          {{ column.label }} <app-explanation><span v-html="$t('class-sca_expl')"></span></app-explanation>
        </template>
        <!-- <template #head(classSca)="column">
          {{ column.label }} <app-explanation>test</app-explanation>
        </template> -->
      </b-table>
    </app-analysis-result-csp-ptc-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BvTableCtxObject, BvTableFieldArray } from "bootstrap-vue";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import AppAnalysisResultCspPtcContainer from "@/app/analysis/analysis-result/csp-ptc/components/shared/analysis-result-csp-ptc-container.vue";
import { AppAnalysisResultCspPtcBase } from "@/app/analysis/analysis-result/csp-ptc/components/shared/analysis-result-csp-ptc-base";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";

@Component({
  name: "app-analysis-result-csp-ptc-absorber",
  components: {
    AppAnalysisResultCspPtcContainer,
    AppExplanation,
  }
})
export default class AppAnalysisResultCspPtcAbsorber extends AppAnalysisResultCspPtcBase {
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

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    return {
      [this.$t("pcs").toString()]: 'fieldgeometry_component.kks',
      [this.$t("absorber-temperature").toString()]: 'absorber_temperature',
      [this.$t("ir-intensity").toString()]: 'ir_intensity',
      [this.$t("class-subfield").toString()]: 'class_subfield'
    }
  }

  getTableRequestParam(): TableRequest {
    if (!this.last_ctx) {
      throw Error('Missing last_ctx');
    }

    return {
      limit: this.last_ctx.perPage,
      page: this.last_ctx.currentPage,
      order_by: this.last_ctx.sortBy && {
        pcs: "kks", 
        absorberTemperature: "absorber_temperature",
        irIntensity: "ir_intensity",
        classSubfield: "class_subfield"
      }[this.last_ctx.sortBy],
      order_direction: this.last_ctx.sortDesc ? 'desc' : 'asc',
      filter: this.searchText
    }
  }

  async dataProvider(ctx: BvTableCtxObject) {
    this.startLoading()
    this.last_ctx = ctx;

    try {
      const tableResult = (await volateqApi.getSpecificAnalysisResult<AnalysisResultCspPtcIrIntensitySchema>(
        this.analysisResultId, 
        this.componentKeyFigure.id, 
        this.getTableRequestParam()
      ));
      const items = tableResult.items.map((absorberDataRow: AnalysisResultCspPtcIrIntensitySchema) => ({
        pcs: absorberDataRow.fieldgeometry_component.kks,
        absorberTemperature: absorberDataRow.absorber_temperature,
        irIntensity: absorberDataRow.ir_intensity,
        classSubfield: absorberDataRow.class_subfield
      }));
      
      this.pagination.total = tableResult.total;

      return items;
    } catch (e) {
      appContentEventBus.showError(e)
    } finally {
      this.stopLoading()
    }

    return [];
  }
}
</script>