<template>
  <div class="app-observation-modal">
    <app-modal-form
      id="observModal"
      ref="observModal"
      :title="title"
      :subtitle="fieldgeometryComponent && fieldgeometryComponent.kks || ''"
      :ok-title="$t('apply')"
      :modalLoading="loading"
      :showCancelButton="false"
      @submit="onSubmitObserv"
      :submitOnButtonClickOnly="true"
    >
      <div v-if="observation">
        <b-form-group :label="$t('timestamp')">
          <app-datetimepicker v-model="observation.observedAt" />
        </b-form-group>
        <app-modal-form-info-area>
          <app-observation-ccp-input v-for="ccpVal in ccpValues" :key="ccpVal.ccp.id"
            :ccp="ccpVal.ccp"
            v-model="ccpVal.value" 
          />
        </app-modal-form-info-area>
        <b-form-group :label="$t('notes')">
          <b-textarea v-model="observation.notes" />
        </b-form-group>
        <b-form-group :label="$t('ticket-id')">
          <b-form-input v-model="observation.ticketId" />
        </b-form-group>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { IAppModalForm } from '@/app/shared/components/app-modal/types';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { Component, Prop, Ref } from "vue-property-decorator";
import AppButton from '@/app/shared/components/app-button/app-button.vue';
import AppModalForm from '@/app/shared/components/app-modal/app-modal-form.vue';
import AppModalFormInfoArea from '@/app/shared/components/app-modal/app-modal-form-info-area.vue';
import AppDatetimepicker from '@/app/shared/components/app-datetimepicker/app-datetimepicker.vue';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { CcpService } from '../plant-settings/ccp-service';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { FieldgeometryComponentSchema } from '@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema';
import AppObservationCcpInput from './observation-ccp-input.vue';
import { CCPValue, IAppObservationModal, ObservationModel } from './types';
import dateHelper from '@/app/shared/services/helper/date-helper';

@Component({
  name: "app-observation-modal",
  components: {
    AppButton,
    AppModalForm,
    AppDatetimepicker,
    AppModalFormInfoArea,
    AppObservationCcpInput,
  },
})
export default class AppObservationModal extends BaseAuthComponent implements IAppObservationModal {
  @Prop({ required: true }) plant!: PlantSchema;
  
  @Ref() observModal!: IAppModalForm;

  fieldgeometryComponent: FieldgeometryComponentSchema | null = null;

  loading = false;

  ccpService!: CcpService;
  ccpValues: CCPValue[] = [];

  observation: ObservationModel | null = null;

  @CatchError()
  async created() {
    this.ccpService = CcpService.get(this.plant.id);
  }
  
  get title(): string {
    return this.$t("add-observation").toString();
  }

  async show(fieldgeometryComponent: FieldgeometryComponentSchema) {
    this.fieldgeometryComponent = fieldgeometryComponent;

    this.ccpValues = (await this.ccpService.getCcpsByComponent(this.fieldgeometryComponent.component_id))
      .map(ccp => ({ value: "", ccp }));

    this.observation = {
      observedAt: dateHelper.now(),
    }

    this.observModal.show();
  }

  @CatchError("loading")
  async onSubmitObserv() {
    console.log("ccpValues:")
    console.log(this.ccpValues)
    // blub
  }
}
</script>

<style lang="scss">
</style>