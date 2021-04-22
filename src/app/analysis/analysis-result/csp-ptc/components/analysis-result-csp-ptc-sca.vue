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
        <template #head(uncertainty)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("uncertainty_expl") }}</app-explanation>
        </template>
        <template v-if="hasKeyFigureFriction" #head(torsionCausedFrictionMean)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("torsion-caused-friction-mean_expl") }}</app-explanation>
        </template>
        <template v-if="hasKeyFigureFriction" #head(torsionCausedFrictionNorth)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("torsion-caused-friction-north_expl") }}</app-explanation>
        </template>
        <template v-if="hasKeyFigureFriction" #head(torsionCausedFrictionSouth)="column">
          {{ column.label }} (<b>°</b>)<app-explanation>{{ $t("torsion-caused-friction-south_expl") }}</app-explanation>
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
import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures"

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

    if (this.hasKeyFigureFriction) {
      this.columns.push({ key: "torsionCausedFrictionMean", label: this.$t("torsion-caused-friction-mean").toString(), sortable: true });
      this.columns.push({ key: "torsionCausedFrictionSouth", label: this.$t("torsion-caused-friction-south").toString(), sortable: true });
      this.columns.push({ key: "torsionCausedFrictionNorth", label: this.$t("torsion-caused-friction-north").toString(), sortable: true });
    }
  }

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    const csvColumnMappings = {
      [this.$t("pcs").toString()]: 'fieldgeometry_component.kks',
      [this.$t("orientation-at-drive").toString()]: 'orientation_at_drive',
      [this.$t("uncertainty").toString()]: 'uncertainty',
    };

    if (this.hasKeyFigureFriction) {
      csvColumnMappings[this.$t("torsion-caused-friction-mean").toString()] = 'torsion_caused_friction_mean';
      csvColumnMappings[this.$t("torsion-caused-friction-south").toString()] = 'torsion_caused_friction_south';
      csvColumnMappings[this.$t("torsion-caused-friction-north").toString()] = 'torsion_caused_friction_north';
    }

    return csvColumnMappings;
  }

  getTableRequestParam(): TableRequest {
    if (!this.last_ctx) {
      throw Error('Missing last_ctx');
    }

    const columns_mapping = {
      pcs: "kks",
      orientationAtDrive: "orientation_at_drive",
      uncertainty: "uncertainty",
    };
    if (this.hasKeyFigureFriction) {
      columns_mapping['torsionCausedFrictionMean'] = 'torsion_caused_friction_mean';
      columns_mapping['torsionCausedFrictionSouth'] = 'torsion_caused_friction_south';
      columns_mapping['torsionCausedFrictionNorth'] = 'torsion_caused_friction_north';
    }

    return {
      limit: this.last_ctx.perPage,
      page: this.last_ctx.currentPage,
      order_by: this.last_ctx.sortBy && columns_mapping[this.last_ctx.sortBy],
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
        this.componentKeyFigures[0].id, 
        this.getTableRequestParam()
      ));
      const items = tableResult.items.map((sceDataRow: AnalysisResultCspPtcScaOrientationSchema) => ({
        pcs: sceDataRow.fieldgeometry_component.kks,
        orientationAtDrive: MathHelper.roundTo(sceDataRow.orientation_at_drive, 2),
        uncertainty: MathHelper.roundTo(sceDataRow.uncertainty, 2),
        torsionCausedFrictionMean: sceDataRow.torsion_caused_friction_mean,
        torsionCausedFrictionSouth: sceDataRow.torsion_caused_friction_south,
        torsionCausedFrictionNorth: sceDataRow.torsion_caused_friction_north,
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

  private get hasKeyFigureFriction(): boolean {
    return this.componentKeyFigures.filter(
      (comp_key_figure) => comp_key_figure.key_figure.id === AnalysisResultKeyFigure.SCA_FRICTION_ID
    ).length > 0
  }
}
</script>