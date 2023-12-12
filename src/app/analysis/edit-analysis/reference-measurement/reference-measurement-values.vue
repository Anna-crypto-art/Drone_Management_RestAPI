<template>
  <div class="app-reference-measurement-values">
    <app-table-container>
      <app-table
        :rows="refMeasureValueItems"
        :columns="refMeasureValueColumns"
        :loading="loading"
        :hoverActions="true"
      >
        <template #cell(values)="row">
          <span v-html="row.item.values"></span>
        </template>

        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin"
            @click="onIgnoreClick(row.item)"
            variant="secondary"
            size="sm"
            :title="row.item.ignored ? $t('ignore-value-undo') : $t('ignore-value')"
            :icon="row.item.ignored ? 'plus-circle' : 'dash-circle'"
          />
        </template>
      </app-table>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { IAppReferenceMeasurementValues } from "./types";

@Component({
  name: "app-reference-measurement-values",
  components: {
    AppTableContainer,
    AppTable,
    AppButton,
  }
})
export default class AppReferenceMeasurementValues extends BaseAuthComponent implements IAppReferenceMeasurementValues {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  loading = false;

  refMeasureValueItems: Array<any> = [];
  refMeasureValueColumns: AppTableColumns = [
    { key: "pcs", label: this.$t("pcs").toString() },
    { key: "notes", label: this.$t("notes").toString() },
    { key: "values", label: this.$t("values").toString() },
    { key: "ignored", label: this.$t("ignored").toString() },
  ];

  async created() {
    await this.updateRefMeasurements();
  }

  @CatchError()
  async onIgnoreClick(refMeasureItem: any) {
    await volateqApi.ignoreReferenceMeasurement(refMeasureItem.id, !refMeasureItem.ignored);

    refMeasureItem.ignored = !refMeasureItem.ignored;

    this.showSuccess(this.$t("reference-measurement-value-change-success").toString());
  }

  async refresh() {
    await this.updateRefMeasurements();
  }

  @CatchError("loading")
  private async updateRefMeasurements() {
    const refMeasures = await volateqApi.getReferenceMeasurements(this.analysis.id);

    const pis = AnalysisResultMappingHelper.getPIs(
      refMeasures.columns.map(c => ({ keyFigureId: c.pi_column!.key_figure_id, piFieldName: c.pi_column!.pi_field_name }))
    );

    const refMeasureValueItems: Array<any> = [];
    for (const observation of refMeasures.items) {
      const piValues: string[] = [];
      for (const columnId in observation.column_values) {
        const column = refMeasures.columns.find(c => c.id === columnId)!;
        const pi = pis.find(pi => pi.keyFigureId === column.pi_column!.key_figure_id &&
          pi.piFieldName === column.pi_column!.pi_field_name)!;
        
        piValues.push(`${this.$t(pi.transName).toString()}: ${observation.column_values[columnId]}`);
      }

      refMeasureValueItems.push({
        id: observation.id,
        pcs: observation.fieldgeometry_component.kks,
        notes: observation.notes,
        ignored: observation.ignore_as_ref_measure,
        values: piValues.join('<br>'),
      });
    }

    this.refMeasureValueItems = refMeasureValueItems.sort((a, b) => {
      const nameA = a.pcs.toLowerCase();
      const nameB = b.pcs.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
}
</script>

<style lang="scss">
</style>
