<template>
  <div class="app-observation-ccp-input">
    <b-form-group label-cols="4" style="margin-bottom: 0.5em;">
      <template #label>
        <div class="app-observation-ccp-input-label">
          <span>{{ ccp.name }}</span>
          <app-explanation v-if="ccp.description">{{ ccp.description }}</app-explanation>
        </div>
      </template>
      <b-form-text v-if="isDataTypeText" 
        v-model="inputValue" 
      />
      <b-form-checkbox v-if="isDataTypeBoolean"
        v-model="inputValue"
        switch
        size="lg"
        style="margin-top: 3px;"
      />
      <b-form-input v-if="isDataTypeNumber"
        v-model="inputValue"
        type="number"
      />
      <b-form-input v-if="isDataTypeNumberRange"
        v-model="inputValue"
        type="number"
        :min="getNumberRangeMin()"
        :max="getNumberRangeMax()"
        :placeholder="getNumberRangeMin() + ' - ' + getNumberRangeMax()"
      />
      <app-multiselect v-if="isDataTypeValueList"
        v-model="inputValue"
        :options="getValueListOptions()"
        :singleSelect="true"
        :allowEmpty="true"
      >
        <template #option="props">
          <div class="pull-left" style="width: calc(100% - 50px)">
            <div>{{ props.option.label }}</div>
            <div v-if="props.option.description" class="mar-top-half grayed">
              <small>{{ props.option.description }}</small>
            </div>
          </div>
          <div class="pull-right">
            <app-color-square v-if="props.option.color" :color="props.option.color" />
          </div>
          <div class="clear"></div>
        </template>
      </app-multiselect>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { CCPDataType, CustomComponentPropertySchema, ValueListInfosSchema } from '@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema';
import { CcpDataTypeValueListOption } from "./types";
import AppColorSquare from '@/app/shared/components/app-colorpicker/app-color-square.vue';
import AppMultiselect from '@/app/shared/components/app-multiselect/app-multiselect.vue';
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";

@Component({
  name: "app-observation-ccp-input",
  components: {
    AppColorSquare,
    AppMultiselect,
    AppExplanation,
  },
})
export default class AppObservationCcpInput extends BaseAuthComponent {
  @Prop({ default: true }) ccp!: CustomComponentPropertySchema;
  @Prop() value!: string;

  color = "";
  inputValue: string | number | boolean | null = null;

  async created() {
    this.inputValue = this.value;
  }

  @Watch("inputValue") 
  onInputValueChanged() {
    // Would be nice if we are able to visualize the color here somehow...
    // if (this.inputValue) {
    //   if (this.isDataTypeBoolean || this.isDataTypeNumber || this.isDataTypeText || !this.ccp.data_type_value_range.infos) {
    //     this.color = this.ccp.color || "";
    //   } else if (this.isDataTypeNumberRange) {
    //     const infos = this.ccp.data_type_value_range.infos as NumberRangeInfosSchema;
    //     const numValue: number = this.inputValue as number;
    //     for (const info of infos) {
    //       if (numValue >= info.number_range[0] && numValue <= info.number_range[1]) {
    //         this.color = info.info.color || "";
    //         break;
    //       }
    //     }
    //   } else if (this.isDataTypeValueList) {
    //     const infos = this.ccp.data_type_value_range.infos as ValueListInfosSchema;
    //     this.color = infos[this.inputValue as string].color || "";
    //   }
    // } else {
    //   this.color = "";
    // }

    this.$emit("input", this.inputValue?.toString() || undefined);
  }

  get isDataTypeBoolean(): boolean {
    return this.ccp.data_type === CCPDataType.BOOLEAN;
  }

  get isDataTypeNumber(): boolean {
    return this.ccp.data_type === CCPDataType.NUMBER;
  }

  get isDataTypeText(): boolean {
    return this.ccp.data_type === CCPDataType.TEXT;
  }

  get isDataTypeNumberRange(): boolean {
    return this.ccp.data_type === CCPDataType.NUMBER_RANGE;
  }

  get isDataTypeValueList(): boolean {
    return this.ccp.data_type === CCPDataType.VALUE_LIST;
  }

  getNumberRangeMin(): number {
    return this.ccp.data_type_value_range.options[0] as number;
  }

  getNumberRangeMax(): number {
    return this.ccp.data_type_value_range.options[1] as number;
  }

  getValueListOptions(): CcpDataTypeValueListOption[] {
    if (this.ccp.data_type_value_range.infos) {
      const infos = this.ccp.data_type_value_range.infos as ValueListInfosSchema;

      return [
        ...Object.keys(infos).map(k => ({ id: k, label: infos[k].label || k, ...infos[k] })), 
      ]
    }

    return [
      ...(this.ccp.data_type_value_range.options as string[]).map(o => ({ id: o, label: o })),
    ]
  }
}
</script>

<style lang="scss">
.app-observation-ccp-input {
  &-label {
    border: 2px solid transparent;
    border-radius: 100px;
  }
}
</style>