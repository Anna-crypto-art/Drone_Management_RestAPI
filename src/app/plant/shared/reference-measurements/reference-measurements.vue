<template>
  <div class="app-reference-measurements">
    <app-modal-form
      id="reference-measurement-modal"
      ref="refMeasureModal"
      :title="$t('add-reference-measurement')"
      :subtitle="pcs || ''"
      :ok-title="$t('apply')"
      :modalLoading="loading"
      @submit="onAddRefMeasure"
    >
      <div v-if="pcs && analysisId">
        <b-form-group :label="$t('measure-timestamp')">
          <app-datetimepicker v-model="refMeasureEntryModel.measureTime" />
        </b-form-group>
        <b-form-group :label="$t('notes')">
          <b-textarea v-model="refMeasureEntryModel.notes" />
        </b-form-group>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { IAppModalForm } from '@/app/shared/components/app-modal/types';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { Component, Prop, Ref } from "vue-property-decorator";
import { IAppRefMeasure, RefMeasureEntryModel } from './types';
import AppButton from '@/app/shared/components/app-button/app-button.vue';
import AppModalForm from '@/app/shared/components/app-modal/app-modal-form.vue';
import AppDatetimepicker from '@/app/shared/components/app-datetimepicker/app-datetimepicker.vue';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { RefMeasureEntry } from '@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema';

@Component({
  name: "app-reference-measurements",
  components: {
    AppButton,
    AppModalForm,
    AppDatetimepicker,
  },
})
export default class AppReferenceMeasurements extends BaseAuthComponent implements IAppRefMeasure {
  @Prop({ default: null }) analysisId!: string | null;
  @Prop({ default: null }) pcs!: string | null;
  @Prop({ default: null }) refMeasureEntry!: RefMeasureEntry | null;

  @Ref() refMeasureModal!: IAppModalForm;

  loading = false;
  loadingRemoveButton = false;

  refMeasureEntryModel: RefMeasureEntryModel | null = null;

  async created() {
    super.created()
  }
  
  get title(): string {
    return this.refMeasureEntry === null ? this.$t('add-reference-measurement').toString() : 
      this.$t('edit-reference-measurement').toString();
  }

  @CatchError("loading")
  async onAddRefMeasure() {
    // TODO

    this.$emit("referenceMeasurmentAdded", this.pcs);
  }

  @CatchError("loadingRemoveButton")
  async onRmRefMeasure() {
    // TODO

    this.$emit("referenceMeasurmentRemoved", this.pcs);
  }

  show() {
    if (this.refMeasureEntry) {
      this.refMeasureEntryModel = {
        measureTime: this.refMeasureEntry.measure_time,
        notes: this.refMeasureEntry.notes || null,
        values: this.refMeasureEntry.values || null,
      };
    } else {
      this.refMeasureEntryModel = {
        measureTime: (new Date()).toISOString(),
        notes: null,
        values: null,
      };
    }

    this.refMeasureModal.show();
  }
}
</script>

<style lang="scss">
</style>