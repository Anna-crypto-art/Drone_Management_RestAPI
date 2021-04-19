<template>
  <div class="app-analysis-result-csp-ptc-sca">
    <app-analysis-result-csp-ptc-container ref="container" tableName="cspPtcScaTable" :pagination="pagination">
      <b-table id="cspPtcScaTable" hover :fields="columns" :items="dataProvider" class="bordered" ref="table"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template #head(pcs)="column">
          {{ column.label }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
        </template>
        <template #head(OrientationAtDrive)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("orientation-at-drive_expl") }}</app-explanation>
        </template>
        <template #head(uncertainty)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("uncertainty_expl") }}</app-explanation>
        </template>
      </b-table>
    </app-analysis-result-csp-ptc-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { BvTableCtxObject } from "bootstrap-vue";
import { AnalysisResultCspPtcScaOrientationSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-orientation-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import AppAnalysisResultCspPtcContainer from "@/app/analysis/analysis-result/csp-ptc/components/shared/analysis-result-csp-ptc-container.vue";
import { AppAnalysisResultCspPtcBase } from "./shared/analysis-result-csp-ptc-base";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { MathHelper } from "@/app/shared/services/helper/math-helper";

@Component({
  name: "app-analysis-result-csp-ptc-sca",
  components: {
    AppAnalysisResultCspPtcContainer,
    AppExplanation
  }
})
export default class AppAnalysisResultCspPtcSca extends AppAnalysisResultCspPtcBase {
  created() {
    this.columns = [
      { key: "pcs", label: this.$t("pcs").toString(), sortable: true },
      { key: "orientationAtDrive", label: this.$t("orientation-at-drive").toString(), sortable: true },
      { key: "uncertainty", label: this.$t("uncertainty").toString(), sortable: true },
    ];
  }

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    return {
      [this.$t("pcs").toString()]: 'fieldgeometry_component.kks',
      [this.$t("orientation-at-drive").toString()]: 'orientation_at_drive',
      [this.$t("uncertainty").toString()]: 'uncertainty',
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
        orientationAtDrive: "orientation_at_drive",
        uncertainty: "uncertainty",
      }[this.last_ctx.sortBy],
      order_direction: this.last_ctx.sortDesc ? 'desc' : 'asc',
      filter: this.searchText
    }
  }

  async dataProvider(ctx: BvTableCtxObject) {
    this.startLoading();
    this.last_ctx = ctx;

    try {
      const tableResult = (await volateqApi.getSpecificAnalysisResult<AnalysisResultCspPtcScaOrientationSchema>(
        this.analysisResultId, 
        this.componentKeyFigure.id, 
        this.getTableRequestParam()
      ));
      const items = tableResult.items.map((sceDataRow: AnalysisResultCspPtcScaOrientationSchema) => ({
        pcs: sceDataRow.fieldgeometry_component.kks,
        orientationAtDrive: MathHelper.roundTo(sceDataRow.orientation_at_drive, 2),
        uncertainty: MathHelper.roundTo(sceDataRow.uncertainty, 2),
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