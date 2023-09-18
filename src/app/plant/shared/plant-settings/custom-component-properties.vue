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
            <ul v-if="row.item.dataTypeValueList" class="app-custom-component-properties-value-range">
              <li v-for="(vl, i) in row.item.dataTypeValueList" :key="i">
                <app-color-square v-if="vl.color" :color="vl.color" />
                <i>{{ vl.option }}</i> &nbsp;
                <span v-if="vl.label"> | <b>{{ vl.label }}</b></span> &nbsp;
                <app-explanation v-if="vl.description">{{ vl.description }}</app-explanation> &nbsp;
              </li>
            </ul>
            <ul v-if="row.item.dataTypeNumberRange" class="app-custom-component-properties-value-range">
              <li v-for="(nr, i) in row.item.dataTypeNumberRange" :key="i">
                <app-color-square v-if="nr.color" :color="nr.color" />
                <i>{{ nr.number_from }} - {{ nr.number_to }}</i> &nbsp;
                <span v-if="nr.label"> | <b>{{ nr.label }}</b></span> &nbsp;
                <app-explanation v-if="nr.description">{{ nr.description }}</app-explanation> &nbsp;
              </li>
            </ul>
            <app-color-square v-if="!row.item.dataTypeValueList && !row.item.dataTypeNumberRange" :color="row.item.color" />
          </template>

          <template #cell(description)="row">
            <small>
              {{ row.item.description }}
            </small>
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
      :cancelTitle="ccpModalCancelTitle"
      :modalLoading="modalLoading"
      size="lg"
      @submit="onAddOrUpdateCCPSubmit"
      @cancel="onAddOrUpdateCCPCancel">
      <div v-if="ccpModel">
        <b-row>
          <b-col>
            <b-form-group :label="$t('component')">
              <b-form-select v-model="ccpModel.componentId" :options="componentOptions" />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="$t('name')">
              <b-form-input v-model="ccpModel.name" />
            </b-form-group>
          </b-col>
        </b-row>
        <app-modal-form-info-area>
          <b-form-group :label="$t('data-type')">
            <b-form-select v-model="ccpModel.dataType" :options="dataTypeOptions" @change="onDataTypeChanged" />
          </b-form-group>
          <b-form-group v-show="isDataTypeValueList">
            <label class="pad-top"><b>{{ $t('manage-options') }}</b></label>
            <app-ccp-data-type-value-list v-model="ccpModel.valueListInfos" />
          </b-form-group>
          <b-form-group v-show="isDataTypeNumberRange">
            <label class="pad-top"><b>{{ $t('manage-number-ranges') }}</b></label>
            <app-ccp-data-type-number-range v-model="ccpModel.numberRangeInfos" />
          </b-form-group>
          <b-form-group :label="$t('color')" v-show="isSimpleDataType">
            <app-colorpicker v-model="ccpModel.color" />
          </b-form-group>
        </app-modal-form-info-area>
        <b-row>
          <b-col>
          <b-form-group :label="$t('description')">
            <b-form-textarea v-model="ccpModel.description" />
          </b-form-group>
          </b-col>
        </b-row>
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
import AppModalFormInfoArea from "@/app/shared/components/app-modal/app-modal-form-info-area.vue";
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { AppTableColumns } from '@/app/shared/components/app-table/types';
import { CCPDataType, ccpDataTypeNames, CustomComponentPropertySchema, DataTypeValueRangeSchema, NumberRangeInfosSchema } from '@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema';
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { IAppModalForm } from '@/app/shared/components/app-modal/types';
import { ApiComponent, apiTechnologyComponents } from '@/app/shared/services/volateq-api/api-components/api-components';
import { BvSelectOption } from '@/app/shared/types';
import { apiComponentNames } from '@/app/shared/services/volateq-api/api-components/api-components-name';
import { ApiException } from '@/app/shared/services/volateq-api/api-errors';
import { CCPModel } from "./types";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { getUserName } from "@/app/shared/services/helper/user-helper";
import { CustomComponentPropertyRequest, DataTypeNumberRangeRequest, DataTypeValueListRequest, NumberRangeInfoRequest, ValueListInfoRequest } from '@/app/shared/services/volateq-api/api-requests/custom-component-property-request';
import AppColorpicker from '@/app/shared/components/app-colorpicker/app-colorpicker.vue';
import AppCcpDataTypeValueList from './ccp-data-type-value-list.vue';
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import AppColorSquare from '@/app/shared/components/app-colorpicker/app-color-square.vue';
import AppCcpDataTypeNumberRange from './ccp-data-type-number-range.vue';
import { CcpService } from "@/app/plant/shared/plant-settings/ccp-service";

@Component({
  name: "app-custom-component-properties",
  components: {
    AppBox,
    AppButton,
    AppTable,
    AppTableContainer,
    AppModalForm,
    AppColorpicker,
    AppModalFormInfoArea,
    AppCcpDataTypeValueList,
    AppExplanation,
    AppColorSquare,
    AppCcpDataTypeNumberRange,
  }
})
export default class AppCustomComponentProperties extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;

  @Ref() addOrUpdateCCPModal!: IAppModalForm;

  @Ref() colorpicker!: any

  tableLoading = false;
  modalLoading = false;

  showCancelButton = true;

  ccpRows: any[] = [];
  ccpColumns: AppTableColumns = [];

  componentOptions: BvSelectOption[] | null = null;
  dataTypeOptions: BvSelectOption[] | null = null;

  ccpModel: CCPModel | null = null;

  ccpService!: CcpService;

  async created() {
    this.ccpColumns = [
      { key: "component", label: this.$t("component").toString() },
      { key: "name", label: this.$t("name").toString() },
      { key: "dataTypeName", label: this.$t("data-type").toString() },
      { key: "dataTypeValueRange", label: this.$t("data-type-value-range").toString() },
      { key: "description", label: this.$t("description").toString() },
      { key: "user", label: this.$t("user").toString() },
    ];

    this.componentOptions = apiTechnologyComponents[this.plant.technology_id].map((comp: ApiComponent) => ({ 
      value: comp, text: this.$t(apiComponentNames[comp]).toString(),
    }));

    this.dataTypeOptions = Object.keys(ccpDataTypeNames).map(k => ({ value: k, text: this.$t(ccpDataTypeNames[k]).toString() }));

    this.ccpService = CcpService.get(this.plant.id);

    await this.updateCCPRows();
  }

  @CatchError("tableLoading")
  async updateCCPRows() {
    await this.ccpService.update();
    
    this.ccpRows = (await this.ccpService.getCcps()).map((ccp: CustomComponentPropertySchema) => {
      const dataTypeValueList = ccp.data_type === CCPDataType.VALUE_LIST ? 
        this.convertValueRangeToValueList(ccp.data_type_value_range) : undefined;
      const dataTypeNumberRange = ccp.data_type === CCPDataType.NUMBER_RANGE ?
        this.convertValueRangeToNumberRange(ccp.data_type_value_range) : undefined;

      return {
        id: ccp.id,
        componentId: ccp.component.id,
        component: this.$t(apiComponentNames[ccp.component.id]).toString(),
        name: ccp.name,
        dataType: ccp.data_type,
        dataTypeName: this.$t(ccpDataTypeNames[ccp.data_type]).toString(),
        dataTypeValueList: dataTypeValueList,
        dataTypeNumberRange: dataTypeNumberRange,
        description: ccp.description,
        user: getUserName(ccp.updated_by_user || ccp.created_by_user),
        color: ccp.color || "",
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

  get ccpModalCancelTitle(): string {
    return this.ccpModel?.modalCancelTitle || "";
  }

  get isDataTypeValueList(): boolean {
    return this.ccpModel && this.ccpModel.dataType === CCPDataType.VALUE_LIST || false;
  }

  get isDataTypeNumberRange(): boolean {
    return this.ccpModel && this.ccpModel.dataType === CCPDataType.NUMBER_RANGE || false;
  }

  get isSimpleDataType(): boolean {
    return this.ccpModel && [CCPDataType.BOOLEAN, CCPDataType.NUMBER, CCPDataType.TEXT].includes(this.ccpModel.dataType!) || false;
  }

  createEmptyCCPModel(): CCPModel {
    return {
      modalOkTitle: "",
      modalCancelTitle: "",
      modalTitle: "",
      name: "",
      id: null,
      componentId: null,
      dataType: null,
      valueListInfos: [],
      numberRangeInfos: [],
    } 
  }

  @CatchError()
  onAddCCPClick() {
    this.ccpModel = this.createEmptyCCPModel();
    this.ccpModel!.modalTitle = this.$t("add-component-property").toString();
    this.ccpModel!.modalOkTitle = this.$t("create").toString();
    this.ccpModel!.modalCancelTitle = this.$t("cancel").toString();

    this.addOrUpdateCCPModal.show();
  }

  @CatchError()
  onEditCCPClick(row: any) {
    this.ccpModel = {
      modalTitle: this.$t("edit-component-property", { name: row.name }).toString(),
      modalOkTitle: this.$t("apply").toString(),
      modalCancelTitle: this.$t("cancel").toString(),
      id: row.id,
      componentId: row.componentId,
      name: row.name,
      dataType: row.dataType,
      valueListInfos: row.dataTypeValueList,
      numberRangeInfos: row.dataTypeNumberRange,
      description: row.description,
      color: row.color,
    }
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

  @CatchError()
  async onAddOrUpdateCCPCancel() {
    this.addOrUpdateCCPModal.hide();
    await this.updateCCPRows();
  }

  @CatchError()
  onDataTypeChanged() {
    switch (this.ccpModel!.dataType) {
      case CCPDataType.BOOLEAN:
      case CCPDataType.NUMBER:
      case CCPDataType.TEXT:
        break;

      case CCPDataType.VALUE_LIST:
        if (!this.ccpModel!.valueListInfos) {
          this.ccpModel!.valueListInfos = [];
        }
        break;

    }
  }

  private convertCCPModelToRequest(): CustomComponentPropertyRequest {
    return {
      component_id: this.ccpModel!.componentId!,
      name: this.ccpModel!.name,
      data_type: this.ccpModel!.dataType!,
      data_type_value_list: this.convertAndValidateValueListsRequest(this.ccpModel!.dataType!, this.ccpModel!.valueListInfos),
      data_type_numer_range: this.convertAndValidateNumberRangesRequest(this.ccpModel!.dataType!, this.ccpModel!.numberRangeInfos),
      description: this.ccpModel!.description || undefined,
      color: this.ccpModel!.color || undefined,
    };
  }

  private convertAndValidateValueListsRequest(
    ccpDataType: CCPDataType,
    valueListsRequest: ValueListInfoRequest[] | undefined
  ): DataTypeValueListRequest | undefined {
    if (!valueListsRequest || valueListsRequest.length === 0) {
      if (ccpDataType === CCPDataType.VALUE_LIST) {
        throw { error: "OPTIONS_REQUIRED", message: "Please add options for data type \"Option\"" } as ApiException
      }

      return undefined;
    }

    for (const option of valueListsRequest) {
      if (option.option == undefined || option.option.trim() === "") {
        throw { error: "OPTION_NAME_REQUIRED", message: "Please type a name for each option" } as ApiException;
      }
    }

    return {
      options: valueListsRequest.map(o => o.option),
      infos: valueListsRequest,
    };
  }

  private convertAndValidateNumberRangesRequest(
    ccpDataType: CCPDataType,
    numberRangesRequest: NumberRangeInfoRequest[] | undefined,
  ): DataTypeNumberRangeRequest | undefined {
    if (!numberRangesRequest || numberRangesRequest.length === 0) {
      if (ccpDataType === CCPDataType.NUMBER_RANGE) {
        throw { error: "NUMBER_RANGES_REQUIRED", message: "Please add number ranges for data type \"Number Range\"" } as ApiException
      }

      return undefined;
    }

    for (const nr of numberRangesRequest) {
      if (nr.number_from !== 0 && !nr.number_from) {
        throw { error: "NUMBER_FROM_REQUIRED", message: "Please type a number from value" } as ApiException
      }
      if (nr.number_to !== 0 && !nr.number_to) {
        throw { error: "NUMBER_TO_REQUIRED", message: "Please type a number to value" } as ApiException
      }
    }

    return {
      number_from: numberRangesRequest[0].number_from,
      number_to: numberRangesRequest[numberRangesRequest.length - 1].number_to,
      infos: numberRangesRequest
    };
  }

  private convertValueRangeToValueList(valueRange: DataTypeValueRangeSchema): ValueListInfoRequest[] {
    const valueList: ValueListInfoRequest[] = [];
    for (const option of valueRange.options) {
      valueList.push({
        option: option,
        ...(valueRange.infos && option in valueRange.infos && valueRange.infos[option] || {}),
      });
    }

    return valueList
  }

  private convertValueRangeToNumberRange(valueRange: DataTypeValueRangeSchema): NumberRangeInfoRequest[] {
    let numberRanges: NumberRangeInfoRequest[];
    if (valueRange.infos) {
      numberRanges = (valueRange.infos as NumberRangeInfosSchema).map(info => ({ 
        number_from: info.number_range[0],
        number_to: info.number_range[1],
        ...info.info,
      }));
    } else {
      numberRanges = [{ number_from: valueRange.options[0] as number, number_to: valueRange.options[1] as number }];
    }

    return numberRanges;
  }
}
</script>

<style lang="scss">
.app-custom-component-properties {
  .input-group-color-picker{
    flex-direction: column;
  }
  &-value-range {
    list-style-type: none;
  }
}

</style>