<template>
  <div class="app-reference-measurements">
    <app-modal-form
      id="reference-measurement-modal"
      ref="refMeasureModal"
      :title="title"
      :subtitle="fieldgeometryComponent && fieldgeometryComponent.kks || ''"
      :ok-title="$t('apply')"
      :cancel-title="$t('cancel')"
      :modalLoading="loading"
      @submit="onAddRefMeasure"
    >
      <div v-if="entryModel">
        <b-form-group :label="$t('measure-timestamp')">
          <app-datetimepicker v-model="entryModel.measureTime" />
        </b-form-group>
        <b-form-group :label="$t('notes')">
          <b-textarea v-model="entryModel.notes" />
        </b-form-group>
        <app-modal-form-info-area>
          <b-form-group :label="$t('reference-measurements')">
            <app-filter-fields :filterFields="filterFields" v-model="entryModel.values" />
          </b-form-group>
        </app-modal-form-info-area>
        <div v-if="entry">
          <app-button variant="danger" icon="trash" @click="onRmRefMeasure">
            {{ $t("delete-reference-measurement") }}
          </app-button>
        </div>        
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { IAppModalForm } from '@/app/shared/components/app-modal/types';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { Component, Ref } from "vue-property-decorator";
import { IAppRefMeasure, RefMeasureEntryModel } from './types';
import AppButton from '@/app/shared/components/app-button/app-button.vue';
import AppModalForm from '@/app/shared/components/app-modal/app-modal-form.vue';
import AppModalFormInfoArea from '@/app/shared/components/app-modal/app-modal-form-info-area.vue';
import AppDatetimepicker from '@/app/shared/components/app-datetimepicker/app-datetimepicker.vue';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from '@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema';
import AppFilterFields from '@/app/plant/shared/filter-fields/filter-fields.vue';
import { FilterField, FilterFieldType } from '../filter-fields/types';
import { FieldgeometryComponentSchema } from '@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema';
import { AnalysisResultMappingHelper } from '@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper';
import dateHelper from '@/app/shared/services/helper/date-helper';

@Component({
  name: "app-reference-measurements",
  components: {
    AppButton,
    AppModalForm,
    AppDatetimepicker,
    AppFilterFields,
    AppModalFormInfoArea,
  },
})
export default class AppReferenceMeasurements extends BaseAuthComponent implements IAppRefMeasure {
  @Ref() refMeasureModal!: IAppModalForm;
  
  analysisId: string | null = null;
  fieldgeometryComponent: FieldgeometryComponentSchema | null = null;
  entry: RefMeasureEntry | null = null;
  keyFigures: RefMeasureEntryKeyFigureSchema[] | null = null;

  loading = false;
  loadingRemoveButton = false;

  entryModel: RefMeasureEntryModel | null = null;
  filterFields: FilterField[] = [];

  async created() {
    super.created()
  }
  
  get title(): string {
    return this.entry === null ? this.$t("add-reference-measurement").toString() : 
      this.$t("edit-reference-measurement").toString();
  }

  @CatchError("loading")
  async onAddRefMeasure() {
    const mappingHelper = this.getMappingHelper();

    await volateqApi.addReferenceMeasurement(this.analysisId!, {
      measure_time: this.entryModel!.measureTime,
      pcs: this.fieldgeometryComponent!.kks,
      notes: this.entryModel!.notes || undefined,
      key_figure_ids: this.entryModel!.values
        .map(v => mappingHelper.getEntries().find(e => e.transName === v.filterField!.key)!.keyFigureId!),
      key_figure_names: this.entryModel!.values
        .map(v => mappingHelper.getPropertyName(mappingHelper.getEntries().find(e => e.transName === v.filterField!.key)!)),
      key_figure_values: this.entryModel!.values
        .map(v => v.value!.toString()),
    });

    this.showSuccess(this.$t("ref-measures-created-success").toString());

    this.$emit("referenceMeasurmentAdded", this.fieldgeometryComponent);

    this.refMeasureModal.hide();
  }

  @CatchError("loadingRemoveButton")
  async onRmRefMeasure() {
    if (!confirm(this.$t("sure-delete-ref-measure-entry").toString())) {
      return;
    }

    await volateqApi.deleteReferenceMeasurementEntry(this.entry!.entry_id);

    this.showSuccess(this.$t("ref-measures-removed-success").toString());

    this.$emit("referenceMeasurmentRemoved", this.fieldgeometryComponent);

    this.refMeasureModal.hide();
  }

  show(
    analysisId: string,
    fieldgeometryComponent: FieldgeometryComponentSchema,
    entry: RefMeasureEntry | null,
    keyFigures: RefMeasureEntryKeyFigureSchema[] | null,
  ) {
    this.analysisId = analysisId;
    this.fieldgeometryComponent = fieldgeometryComponent;
    this.entry = entry;
    this.keyFigures = keyFigures;

    this.updateFilterFields();

    if (this.entry) {
      this.entryModel = {
        measureTime: this.entry.measure_time,
        notes: this.entry.notes || null,
        values: this.getMappingHelper().getRefMeasureEntries(this.entry, this.keyFigures!).map(e => ({
          filterField: this.filterFields.find(f => f.key === e.entry.transName)!,
          value: e.value,
        })),
      };
    } else {
      this.entryModel = {
        measureTime: dateHelper.now(),
        notes: null,
        values: [],
      };

      const preselectedFilterFieldNames = ["glass-tube-temperature"];
      const preFilterField = this.filterFields.find(f => preselectedFilterFieldNames.includes(f.key.toString()));
      if (preFilterField) {
        this.entryModel.values = [{ filterField: preFilterField, value: null }];
      }
    }

    this.refMeasureModal.show();
  }

  private updateFilterFields() {
    this.filterFields = this.getMappingHelper().getEntries()
      .filter(e => e.enableForRefMeasure && e.filterType !== undefined)
      .map(e => ({
        key: e.transName,
        name: this.$t(e.transName).toString(),
        type: e.filterType == FilterFieldType.NUMERIC_EXTENDED ? FilterFieldType.NUMERIC_SIMPLE : e.filterType!,
      }));
  }

  private getMappingHelper(): AnalysisResultMappingHelper<any> {
    const mappings = AnalysisResultMappingHelper.getMappingsByComponentId(this.fieldgeometryComponent!.component_id);
    const mappingHelper = new AnalysisResultMappingHelper(mappings!);

    return mappingHelper;
  }
}
</script>

<style lang="scss">
</style>