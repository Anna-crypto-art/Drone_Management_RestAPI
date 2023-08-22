<template>
  <div class="app-custom-component-properties">
    <app-box :title="$t('edit-component-properties')">
      <app-button @click="onAddCCP">{{ $t('add-component-property') }}</app-button>
      <app-table-container>
        <app-table 
          :loading="tableLoading"
          :columns="ccpColumns"
          :rows="ccpRows">
        </app-table>
      </app-table-container>
    </app-box>

    <app-modal-form
      id="addOrUpdateCCPModal"
      ref="addOrUpdateCCPModal"
      :title="ccpModalTitle"
      :okTitle="ccpModalOkTitle"
      :modalLoading="modalLoading"
      @submit="onAddOrUpdateCCPSubmit">
      <div v-if="ccpModel">
        <b-form-group :label="$t('component')">
          <b-form-select v-model="ccpModel.componentId" :options="componentOptions" />
        </b-form-group>
        <b-form-group :label="$t('name')">
          <b-form-text v-model="ccpModel.name" />
        </b-form-group>
        <b-form-group>
          <b-form-select v-model="ccpModel.dataType" :options="dataTypeOptions" />
        </b-form-group>
        <b-form-group v-show="isValueRangeRequired" :label="$t('data-type-value-range')">
          <b-form-text v-model="ccpModel.dataTypeValueRange" :placeholder="valueRangePlaceholder" />
        </b-form-group>
        <b-form-group :label="$t('description')">
          <b-form-textarea v-model="ccpModel.description" />
        </b-form-group>
        <b-form-group :label="$t('color')">
          <b-from-input v-model="ccpModel.color" placeholder="#00000000" />
        </b-form-group>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component'
import { Component, Prop, Ref } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { AppTableColumns } from '@/app/shared/components/app-table/types';
import { CCPDataType, ccpDataTypeNames, CCPDataTypeValueRange, CustomComponentPropertySchema } from '@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { IAppModalForm } from '@/app/shared/components/app-modal/types';
import { ApiComponent, apiTechnologyComponents } from '@/app/shared/services/volateq-api/api-components/api-components';
import { BvSelectOption } from '@/app/shared/types';
import { apiComponentNames } from '@/app/shared/services/volateq-api/api-components/api-components-name';
import { ApiException } from '@/app/shared/services/volateq-api/api-errors';
import { CCPModel } from "./types";


@Component({
  name: "app-custom-component-properties",
  components: {
    AppBox,
    AppButton,
    AppTable,
    AppTableContainer,
    AppModalForm,
  }
})
export default class AppCustomComponentProperties extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;

  @Ref() addOrUpdateCCPModal!: IAppModalForm;

  tableLoading = false;
  modalLoading = false;

  ccpRows: any[] = [];
  ccpColumns: AppTableColumns = [];

  componentOptions: BvSelectOption[] | null = null;
  dataTypeOptions: BvSelectOption[] | null = null;

  readonly initCCPModel: CCPModel = {
    modalOkTitle: "",
    modalTitle: "",
    name: "",
    id: null,
    componentId: null,
    dataType: null,
  } 
  ccpModel: CCPModel | null = null;

  async created() {
    this.ccpColumns = [
      { key: "component", label: this.$t("component").toString() },
      { key: "name", label: this.$t("name").toString() },
      { key: "dataType", label: this.$t("data-type").toString() },
      { key: "dataTypeValueRange", label: this.$t("data-type-value-range").toString() },
      { key: "description", label: this.$t("description").toString() },
      { key: "user", label: this.$t("user").toString() },
    ];

    this.componentOptions = apiTechnologyComponents[this.plant.technology_id].map((comp: ApiComponent) => ({ 
      value: comp, text: this.$t(apiComponentNames[comp]).toString(),
    }));

    this.dataTypeOptions = Object.keys(ccpDataTypeNames).map(k => ({ value: k, text: this.$t(ccpDataTypeNames[k]).toString() }));

    this.ccpModel = this.initCCPModel;

    await this.updateCCPRows();
  }

  @CatchError("tableLoading")
  async updateCCPRows() {
    this.ccpRows = (await volateqApi.getCustomComponentProperties(this.plant.id)).map((ccp: CustomComponentPropertySchema) => {
      return {
        component: this.$t(apiComponentNames[ccp.component.id]).toString(),
        name: ccp.name,
        dataType: this.$t(ccpDataTypeNames[ccp.data_type]).toString(),
        dataTypeValueRange: this.convertValueRangeToString(ccp.data_type, ccp.data_type_value_range),
        description: ccp.description,
        user: ccp.updated_by_user || ccp.created_by_user,
        changedAt: ccp.updated_at || ccp.created_at,
        updated: !!ccp.updated_at,
      }
    });
  }

  get ccpModalTitle(): string {
    return this.ccpModel?.modalTitle || "";
  }

  get ccpModalOkTitle(): string {
    return this.ccpModel?.modalOkTitle || "";
  }

  get isValueRangeRequired(): boolean {
    return this.ccpModel && this.ccpModel.dataType && 
      [CCPDataType.NUMBER_RANGE, CCPDataType.VALUE_LIST].includes(this.ccpModel!.dataType!) || false;
  }

  get valueRangePlaceholder(): string {
    if (this.ccpModel?.dataType === CCPDataType.NUMBER_RANGE) {
      return "1 - 42"
    } else if (this.ccpModel?.dataType === CCPDataType.VALUE_LIST) {
      return "A, B, OptionZ, 42"
    }

    return "";
  }

  @CatchError()
  onAddCCP() {
    this.ccpModel = this.initCCPModel;
    this.ccpModel.modalTitle = this.$t("add-component-property").toString();
    this.ccpModel.modalOkTitle = this.$t("create").toString();

    this.addOrUpdateCCPModal.show();
  }

  @CatchError("modalLoading")
  async onAddOrUpdateCCPSubmit() {
    await volateqApi.createCustomComponentProperty(this.plant.id, {
      component_id: this.ccpModel!.componentId!,
      name: this.ccpModel!.name,
      data_type: this.ccpModel!.dataType!,
      data_type_value_range: this.ccpModel!.dataTypeValueRange,
      description: this.ccpModel!.description,
      color: this.ccpModel!.color,
    });

    this.addOrUpdateCCPModal.hide();

    this.showSuccess(this.$t("component-property-created-success").toString());
  }

  private convertValueRangeToString(dataType: CCPDataType, valueRange: CCPDataTypeValueRange): string | null {
    if (dataType === CCPDataType.NUMBER_RANGE) {
      if (!Array.isArray(valueRange) || valueRange.length !== 2) {
        throw { error: "INVALID_VALUE_RANGE", message: `The value range ${valueRange} is invalid for the data type ${dataType}` } as ApiException
      }

      return `${valueRange[0]} - ${valueRange[1]}`;
    } else if (dataType === CCPDataType.VALUE_LIST) {
      if (!Array.isArray(valueRange) || valueRange.length === 0) {
        throw { error: "INVALID_VALUE_RANGE", message: `The value range ${valueRange} is invalid for the data type ${dataType}` } as ApiException
      }

      return valueRange.join(", ");
    }

    return null;
  }
}
</script>