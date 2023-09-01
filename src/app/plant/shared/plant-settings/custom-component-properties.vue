<template>
  <div class="app-custom-component-properties">
    <app-box :title="$t('edit-component-properties')">
      <app-button @click="onAddCCPClick">{{ $t('add-component-property') }}</app-button>
      <app-table-container>
        <app-table 
          :loading="tableLoading"
          :columns="ccpColumns"
          :rows="ccpRows"
          :hoverActions="true">

          <template #cell(dataTypeValueRange)="row">
            <ul v-if="row.item.dataType === 'VALUE_LIST'">
              <li v-for="val in row.item.dataTypeValueRange.split(',')" :key="val">{{ val.trim() }}</li>
            </ul>
            <i v-if="row.item.dataType !== 'VALUE_LIST'">{{ row.item.dataTypeValueRange }}</i>
          </template>

          <template #cell(description)="row">
            <small>
              {{ row.item.description }}
            </small>
          </template>

          <template #cell(color)="row">
            <div v-if="row.item.color" :style="'background-color: ' + row.item.color + '; width: 20px; height: 20px;'">
            </div>
          </template>

          <template #cell(user)="row">
            <small class="grayed">
              <span v-if="row.item.updated">{{ $t("updated-by") }}&nbsp;</span>
              <span v-if="!row.item.updated">{{ $t("created-by") }}&nbsp;</span>
              <b>{{ row.item.user }}</b> {{ row.item.changedAt }}
            </small>
          </template>

          <template #hoverActions="row">
            <app-button icon="pencil-square" size="sm" variant="secondary" @click="onEditCCPClick(row.item)" />
            <app-button icon="trash" size="sm" variant="outline-danger" @click="onDeleteCCPClick(row.item)" />
          </template>

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
          <b-form-input v-model="ccpModel.name" />
        </b-form-group>
        <b-form-group :label="$t('data-type')">
          <b-form-select v-model="ccpModel.dataType" :options="dataTypeOptions" />
        </b-form-group>
        <b-form-group v-show="isValueRangeRequired" :label="$t('data-type-value-range')">
          <b-form-input v-model="ccpModel.dataTypeValueRange" :placeholder="valueRangePlaceholder" />
        </b-form-group>
        <b-form-group :label="$t('description')">
          <b-form-textarea v-model="ccpModel.description" />
        </b-form-group>
        <b-form-group id="color" :label="$t('color')">
          <div class="input-group-color-picker" ref="colorpicker">
            <input type="text" class="form-control" v-model="ccpModel.color" @focus="onInputColorFocus" readonly/>
              <div class="current-color">
                <chrome-picker :value="colors" @input="onChromePickerChanged" v-if="displayPicker"/>
              </div>
            </div>
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
import dateHelper from "@/app/shared/services/helper/date-helper";
import { getUserName } from "@/app/shared/services/helper/user-helper";
import { CustomComponentPropertyRequest } from '@/app/shared/services/volateq-api/api-requests/custom-component-property-request';
import { Chrome } from 'vue-color';
import { tinycolor } from 'tinycolor2';

@Component({
  name: "app-custom-component-properties",
  components: {
    AppBox,
    AppButton,
    AppTable,
    AppTableContainer,
    AppModalForm,
    'chrome-picker': Chrome,
  }
})
export default class AppCustomComponentProperties extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;

  @Ref() addOrUpdateCCPModal!: IAppModalForm;

  @Ref() colorpicker!: any

  tableLoading = false;
  modalLoading = false;

  colors: any = {hex: '#194d33', hex8: '#194D33A8'};
  colorValue = '';
  displayPicker = false;

  ccpRows: any[] = [];
  ccpColumns: AppTableColumns = [];

  componentOptions: BvSelectOption[] | null = null;
  dataTypeOptions: BvSelectOption[] | null = null;

  readonly CCPModel = {
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
      { key: "dataTypeName", label: this.$t("data-type").toString() },
      { key: "dataTypeValueRange", label: this.$t("data-type-value-range").toString() },
      { key: "color", label: this.$t("color").toString() },
      { key: "description", label: this.$t("description").toString() },
      { key: "user", label: this.$t("user").toString() },
    ];

    this.componentOptions = apiTechnologyComponents[this.plant.technology_id].map((comp: ApiComponent) => ({ 
      value: comp, text: this.$t(apiComponentNames[comp]).toString(),
    }));

    this.dataTypeOptions = Object.keys(ccpDataTypeNames).map(k => ({ value: k, text: this.$t(ccpDataTypeNames[k]).toString() }));

    await this.updateCCPRows();
  }

  @CatchError("tableLoading")
  async updateCCPRows() {
    this.ccpRows = (await volateqApi.getCustomComponentProperties(this.plant.id)).map((ccp: CustomComponentPropertySchema) => {
      return {
        id: ccp.id,
        componentId: ccp.component.id,
        component: this.$t(apiComponentNames[ccp.component.id]).toString(),
        name: ccp.name,
        dataType: ccp.data_type,
        dataTypeName: this.$t(ccpDataTypeNames[ccp.data_type]).toString(),
        dataTypeValueRange: this.convertValueRangeToString(ccp.data_type, ccp.data_type_value_range),
        description: ccp.description,
        user: getUserName(ccp.updated_by_user || ccp.created_by_user),
        color: ccp.color && "#" + ccp.color || "",
        changedAt: this.$t(...dateHelper.getTimeDiff(ccp.updated_at || ccp.created_at)).toString(),
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
  onInputColorFocus() {
    document.addEventListener('click', this.onDocumentClicked);
    this.displayPicker = true;
  }

  hidePicker() {
    document.removeEventListener('click', this.onDocumentClicked);
    this.displayPicker = false;
  }

  @CatchError()
  onChromePickerChanged(color: tinycolor) {
    this.colors = color;
    if(color.rgba.a == 1) {
      this.ccpModel!.color = color.hex;
    }
    else {
      this.ccpModel!.color = color.hex8;
    }
  }

  @CatchError()
  onDocumentClicked(e: Event) {
    const el = this.$refs.colorpicker as HTMLElement,
      target = e.target;
    if(el !== target && !el!.contains(target as HTMLElement)) {
      this.hidePicker()
    }
  }

  createEmptyCCPModel(): CCPModel {
    return {
      modalOkTitle: "",
      modalTitle: "",
      name: "",
      id: null,
      componentId: null,
      dataType: null,
    } 
  }

  @CatchError()
  onAddCCPClick() {
    this.ccpModel = this.createEmptyCCPModel();
    this.ccpModel!.modalTitle = this.$t("add-component-property").toString();
    this.ccpModel!.modalOkTitle = this.$t("create").toString();

    this.addOrUpdateCCPModal.show();
  }

  @CatchError()
  onEditCCPClick(row: any) {
    this.ccpModel = {
      modalTitle: this.$t("edit-component-property", { name: row.name }).toString(),
      modalOkTitle: this.$t("apply").toString(),
      id: row.id,
      componentId: row.componentId,
      name: row.name,
      dataType: row.dataType,
      dataTypeValueRange: row.dataTypeValueRange,
      description: row.description,
      color: row.color,
    }
    this.colors = row.color;
    this.addOrUpdateCCPModal.show();
  }

  @CatchError()
  async onDeleteCCPClick(row: any) {
    if (confirm(this.$t("sure-delete-ccp-quest", { name: row.name }).toString())) {
      await volateqApi.deleteCustomComponentProperty(this.plant.id, row.id);

      this.showSuccess(this.$t("ccp-deleted-success").toString());

      await this.updateCCPRows();
    }
  }

  @CatchError("modalLoading")
  async onAddOrUpdateCCPSubmit() {
    if (this.ccpModel!.id) { // Update
      await volateqApi.updateCustomComponentProperty(this.plant.id, this.ccpModel!.id, this.convertCCPModelToRequest());

      this.showSuccess(this.$t("component-property-updated-success").toString())
    } else { // Create
      await volateqApi.createCustomComponentProperty(this.plant.id, this.convertCCPModelToRequest());

      this.showSuccess(this.$t("component-property-created-success").toString());
    }

    this.addOrUpdateCCPModal.hide();

    await this.updateCCPRows();
  }

  private convertCCPModelToRequest(): CustomComponentPropertyRequest {
    return {
      component_id: this.ccpModel!.componentId!,
      name: this.ccpModel!.name,
      data_type: this.ccpModel!.dataType!,
      data_type_value_range: this.ccpModel!.dataTypeValueRange || undefined,
      description: this.ccpModel!.description || undefined,
      color: this.ccpModel!.color || undefined,
    };
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

<style lang="scss">
.app-custom-component-properties {
  .input-group-color-picker{
    flex-direction: column;
  }
}

</style>