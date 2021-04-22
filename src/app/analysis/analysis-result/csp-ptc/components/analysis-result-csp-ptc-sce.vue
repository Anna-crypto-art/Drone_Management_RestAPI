<template>
  <div class="app-analysis-result-csp-ptc-sce">
    <app-analysis-result-csp-ptc-container ref="container" tableName="cspPtcSceTable" :pagination="pagination">
      <b-table id="cspPtcSceTable" hover :fields="columns" :items="dataProvider" class="bordered" ref="table"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template #head(pcs)="column">
          {{ column.label }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
        </template>
        <template #head(angleValue)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("angle-value_expl") }}</app-explanation>
        </template>
        <template #head(actualAngle)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("actual-angle_expl") }}</app-explanation>
        </template>
        <template #head(angleDeviation)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("angle-deviation_expl") }}</app-explanation>
        </template>
        <template #head(uncertainty)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("uncertainty_expl") }}</app-explanation>
        </template>
        <template #head(deviationToDrive)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("deviation-to-drive_expl") }}</app-explanation>
        </template>
      </b-table>
    </app-analysis-result-csp-ptc-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { BvTableCtxObject, BvTableFieldArray } from "bootstrap-vue";
import { AnalysisResultCspPtcSceAngleSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-angle-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import AppAnalysisResultCspPtcContainer from "@/app/analysis/analysis-result/csp-ptc/components/shared/analysis-result-csp-ptc-container.vue";
import { AppAnalysisResultCspPtcBase } from "./shared/analysis-result-csp-ptc-base";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { MathHelper } from "@/app/shared/services/helper/math-helper";

@Component({
  name: "app-analysis-result-csp-ptc-sce",
  components: {
    AppAnalysisResultCspPtcContainer,
    AppExplanation
  }
})
export default class AppAnalysisResultCspPtcSce extends AppAnalysisResultCspPtcBase {
  created() {
    this.columns = [
      { key: "pcs", label: this.$t("pcs").toString(), sortable: true },
      { key: "setAngle", label: this.$t("set-angle").toString(), sortable: true },
      { key: "angleValue", label: this.$t("angle-value").toString(), sortable: true },
      { key: "actualAngle", label: this.$t("actual-angle").toString(), sortable: true },
      { key: "angleDeviation", label: this.$t("angle-deviation").toString(), sortable: true },
      { key: "uncertainty", label: this.$t("uncertainty").toString(), sortable: true },
      { key: "deviationToDrive", label: this.$t("deviation-to-drive").toString(), sortable: true }
    ];
  }

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    return {
      [this.$t("pcs").toString()]: 'fieldgeometry_component.kks',
      [this.$t("set-angle").toString()]: 'set_angle',
      [this.$t("angle-value").toString()]: 'angle_value',
      [this.$t("actual-angle").toString()]: 'actual_angle',
      [this.$t("angle-deviation").toString()]: 'angle_deviation',
      [this.$t("uncertainty").toString()]: 'uncertainty',
      [this.$t("deviation-to-drive").toString()]: 'deviation_to_drive',
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
        setAngle: "set_angle",
        angleValue: "angle_value",
        actualAngle: "actual_angle",
        angleDeviation: "angle_deviation",
        uncertainty: "uncertainty",
        deviationToDrive: "deviation_to_drive"
      }[this.last_ctx.sortBy],
      order_direction: this.last_ctx.sortDesc ? 'desc' : 'asc',
      filter: this.searchText
    }
  }

  async dataProvider(ctx: BvTableCtxObject) {
    this.startLoading();
    this.last_ctx = ctx;

    try {
      const tableResult = (await volateqApi.getSpecificAnalysisResult<AnalysisResultCspPtcSceAngleSchema>(
        this.analysisResultId, 
        this.componentKeyFigures[0].id, 
        this.getTableRequestParam()
      ));
      const items = tableResult.items.map((sceDataRow: AnalysisResultCspPtcSceAngleSchema) => ({
        pcs: sceDataRow.fieldgeometry_component.kks,
        setAngle: Math.round(sceDataRow.set_angle),
        angleValue: MathHelper.roundTo(sceDataRow.angle_value, 2),
        actualAngle: MathHelper.roundTo(sceDataRow.actual_angle, 2),
        angleDeviation: MathHelper.roundTo(sceDataRow.angle_deviation, 2),
        uncertainty: MathHelper.roundTo(sceDataRow.uncertainty, 2),
        deviationToDrive: MathHelper.roundTo(sceDataRow.deviation_to_drive, 2),
      }));
      
      this.pagination.total = tableResult.total;

      return items;
    } catch (e) {
      appContentEventBus.showError(e)
    } finally {
      this.stopLoading();
    }

    return [];
  }
}
</script>