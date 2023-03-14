<template>
  <div v-show="refMeasureId">
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
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { RefMeasureMappingEntryValue } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-reference-measurement-values",
  components: {
    AppTableContainer,
    AppTable,
    AppButton,
  }
})
export default class AppReferenceMeasurementValues extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
  @Prop({ default: null }) refMeasureId!: string | null;

  loading = false;

  refMeasureValueItems: Array<any> = [];
  refMeasureValueColumns: AppTableColumns = [
    { key: "pcs", label: this.$t("pcs").toString() },
    { key: "notes", label: this.$t("notes").toString() },
    { key: "values", label: this.$t("values").toString() },
    { key: "ignored", label: this.$t("ignored").toString() },
  ];

  async created() {
    await this.updateRefMeasurementValues();
  }

  @Watch('refMeasureId')
  async onRefMeasureChanged() {
    await this.updateRefMeasurementValues();
  }

  @CatchError()
  async onIgnoreClick(refMeasureItem: any) {
    await volateqApi.ignoreReferenceMeasurementEntry(refMeasureItem.id, !refMeasureItem.ignored);

    refMeasureItem.ignored = !refMeasureItem.ignored;

    this.showSuccess(this.$t("reference-measurement-value-change-success").toString());
  }

  @CatchError("loading")
  private async updateRefMeasurementValues() {
    if (!this.refMeasureId) {
      this.refMeasureValueItems = [];
      return;
    }

    const entries = await volateqApi.getReferenceMeasurementEntries(this.analysis.id, {
      reference_measurement_id: this.refMeasureId,
    });

    const allKeyFigures = await volateqApi.getAllKeyFigures();

    const refMeasureValueItems: Array<any> = [];
    for (const entry of entries.entries) {
      const entryValues = this.getRefMeasureEntryValues(allKeyFigures, entry, entries.key_figures);
      const values = entryValues.map(ev => `${this.$t(ev.entry.transName).toString()}: ${ev.value}`).join('<br>');
      
      refMeasureValueItems.push({
        id: entry.entry_id,
        pcs: entry.pcs,
        notes: entry.notes,
        ignored: entry.ignore,
        values: values,
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

  private getRefMeasureEntryValues(
    allKeyFigures: KeyFigureSchema[],
    refMeasureEntry: RefMeasureEntry,
    refMeasureKeyFigures: RefMeasureEntryKeyFigureSchema[]
  ) {
    const entryValues: RefMeasureMappingEntryValue[] = [];

    if (refMeasureEntry.values) {
      const fetchedComponentIds: number[] = [];

      for (const rmKeyFigure of refMeasureKeyFigures) {
        if (rmKeyFigure.entry_key_name in refMeasureEntry.values) {
          const componentId = allKeyFigures.find(kf => kf.id === rmKeyFigure.key_figure_id)!.component_id;
          if (!fetchedComponentIds.includes(componentId)) {
            fetchedComponentIds.push(componentId);
            
            const mappings = AnalysisResultMappingHelper.getMappingsByComponentId(componentId)!;
            const mappingHelper = new AnalysisResultMappingHelper(mappings);

            entryValues.push(...mappingHelper.getRefMeasureEntries(refMeasureEntry, refMeasureKeyFigures));
          }
        }
      }
    }

    return entryValues;
  }
}
</script>

<style lang="scss">
</style>
