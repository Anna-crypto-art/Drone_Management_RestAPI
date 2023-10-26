<template>
  <div class="app-observation-modal">
    <app-modal-form
      id="observModal"
      ref="observModal"
      :title="title"
      :subtitle="fieldgeometryComponent && fieldgeometryComponent.kks || ''"
      :ok-title="$t('apply')"
      :cancel-title="$t('cancel')"
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
        <b-from-group v-if="observation.id" :label="$t('delete-observation')">
          <app-button variant="danger" icon="trash" :loading="deleteLoading" @click="onDeleteClick">
            {{ $t("delete-observation") }}
          </app-button>
        </b-from-group>
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
import { ObservationSchema } from '@/app/shared/services/volateq-api/api-schemas/observation-schema';
import { ObservationRequest } from '@/app/shared/services/volateq-api/api-requests/observation-requests';
import { LayersService } from '../map-view/layers/layers-service';
import { observationSelectEventService } from '../selection-sidebar/observation-selection/observation-selection-event-service';
import { ObservationSelectionEvent } from '../selection-sidebar/observation-selection/types';

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
  deleteLoading = false;

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

  async show(fieldgeometryComponent: FieldgeometryComponentSchema, observation?: ObservationSchema) {
    this.fieldgeometryComponent = fieldgeometryComponent;
    
    const ccps = await this.ccpService.getCcpsByComponent(this.fieldgeometryComponent.component_id);

    if (observation) {
      this.ccpValues = ccps.map(ccp => ({ 
        value: ccp.id in observation.column_values ? observation.column_values[ccp.id].toString() : "",
        ccp,
      }));

      this.observation = {
        id: observation.id,
        observedAt: observation.observed_at,
        notes: observation.notes,
        ticketId: observation.external_id,
      };
    } else {
      this.ccpValues = ccps.map(ccp => ({ value: "", ccp }));
  
      this.observation = {
        observedAt: dateHelper.now(),
      }
    }

    this.observModal.show();
  }

  @CatchError("loading")
  async onSubmitObserv() {
    const observReq: ObservationRequest = {
      pcs: this.fieldgeometryComponent!.kks,
      observed_at: this.observation!.observedAt,
      ccp_values: this.ccpValues.filter(ccpVal => !!ccpVal.value)
        .map(ccpVal => ({ ccp_id: ccpVal.ccp.id, value: ccpVal.value })),
      notes: this.observation!.notes || undefined,
      external_id: this.observation!.ticketId || undefined,
    };

    if (this.observation!.id) {
      await volateqApi.updateObservation(this.plant.id, this.observation!.id, observReq);

      this.showSuccess(this.$t('observation-updated-success').toString());
    } else {
      await volateqApi.createObservation(this.plant.id, observReq);
  
      this.showSuccess(this.$t('observation-created-success').toString());
    }

    await observationSelectEventService.emit(this.plant.id, ObservationSelectionEvent.REFRESH);
 
    this.observModal.hide();
  }

  @CatchError("deleteLoading")
  async onDeleteClick() {
    if (!confirm(this.$t("delete-observation_quest").toString())) {
      return;
    }

    await volateqApi.deleteObservation(this.plant.id, this.observation!.id!);

    this.showSuccess(this.$t('observation-deleted-success').toString());

    await observationSelectEventService.emit(this.plant.id, ObservationSelectionEvent.REFRESH);

    this.observModal.hide();
  }

  // private async reselectObservationLayers() {
  //   const loadedObservLayers = LayersService.get(this.plant.id).observationLayers.filter(l => l.loadedLayer);
  //   for (const loadedObservLayer of loadedObservLayers) {
  //     await loadedObservLayer.reselect();
  //   }
  // }
}
</script>

<style lang="scss">
</style>