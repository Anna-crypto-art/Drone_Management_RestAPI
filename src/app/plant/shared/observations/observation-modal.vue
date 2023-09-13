<template>
  <div class="app-observation-modal">
    <app-modal-form
      id="observModal"
      ref="observModal"
      :title="title"
      :subtitle="fieldgeometryComponent && fieldgeometryComponent.kks || ''"
      :ok-title="$t('apply')"
      :modalLoading="loading"
      @submit="onSubmitObserv"
    >
      <app-observation-ccp-input v-for="ccp in ccps" :key="ccp.id" :ccp="ccp"/>
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
import AppFilterFields from '@/app/plant/shared/filter-fields/filter-fields.vue';
import { CcpService } from '../plant-settings/ccp-service';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { FieldgeometryComponentSchema } from '@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema';
import { CustomComponentPropertySchema } from '@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema';
import AppObservationCcpInput from './observation-ccp-input.vue';
import { IAppObservationModal } from './types';

@Component({
  name: "app-observation-modal",
  components: {
    AppButton,
    AppModalForm,
    AppDatetimepicker,
    AppFilterFields,
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
  ccps: CustomComponentPropertySchema[] = [];

  @CatchError()
  async created() {
    this.ccpService = CcpService.get(this.plant.id);
  }
  
  get title(): string {
    return this.$t("add-observation").toString();
  }

  async show(fieldgeometryComponent: FieldgeometryComponentSchema) {
    this.fieldgeometryComponent = fieldgeometryComponent;

    this.ccps = await this.ccpService.getCcpsByComponent(this.fieldgeometryComponent.component_id);

    this.observModal.show();
  }

  @CatchError("loading")
  async onSubmitObserv() {
    // blub
  }
}
</script>

<style lang="scss">
</style>