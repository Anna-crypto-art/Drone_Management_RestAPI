<template>
  <div class="app-analysis-result-csp-ptc-sce">
    <app-analysis-result-csp-ptc-container ref="container" tableName="cspPtcSceTable" :pagination="pagination">
      <b-table id="cspPtcSceTable" hover :fields="columns" :items="dataProvider" class="bordered"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template #head(setAngle)="column">
          {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
        </template>
        <template #head(angleValue)="column">
          {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
        </template>
        <template #head(actualAngle)="column">
          {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
        </template>
        <template #head(angleDeviation)="column">
          {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
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

@Component({
  name: "app-analysis-result-csp-ptc-sce",
  components: {
    AppAnalysisResultCspPtcContainer
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
    ];
  }

  async dataProvider(ctx: BvTableCtxObject) {
    this.startLoading();

    try {
      const tableResult = (await volateqApi.getSpecificAnalysisResult<AnalysisResultCspPtcSceAngleSchema>(
        this.analysisResultId, 
        this.componentKeyFigure.id, 
        {
          limit: ctx.perPage,
          page: ctx.currentPage,
          order_by: ctx.sortBy && {
            pcs: "kks", 
            setAngle: "set_angle",
            angleValue: "angle_value",
            actualAngle: "actual_angle",
            angleDeviation: "angle_deviation"
          }[ctx.sortBy],
          order_direction: ctx.sortDesc ? 'desc' : 'asc'
        }
      ));
      const items = tableResult.items.map((sceDataRow: AnalysisResultCspPtcSceAngleSchema) => ({
        pcs: sceDataRow.fieldgeometry_component.kks,
        setAngle: Math.round(sceDataRow.set_angle),
        angleValue: sceDataRow.angle_value,
        actualAngle: sceDataRow.actual_angle,
        angleDeviation: sceDataRow.angle_deviation
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