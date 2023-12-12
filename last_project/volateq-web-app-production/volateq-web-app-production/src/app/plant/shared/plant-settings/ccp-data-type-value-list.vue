<template>
  <div class="app-ccp-data-type-value-list">
    <app-ccp-data-type-info
      v-for="(vl, i) in valueList"
      :key="i" 
      :index="i" 
      :value="vl" 
      @input="onValueListChanged"
      @delete="onDeleteValueListItem">
      <b-form-group :label="$t('name')">
        <b-form-input v-model="vl.option" :placeholder="$t('option-name')" @change="onOptionChanged" />
      </b-form-group>
    </app-ccp-data-type-info>
    <app-button variant="secondary" icon="plus" @click="onAddValueListItemClicked" size="sm">
      {{ $t('add-option') }}
    </app-button>
  </div>
</template>
<script lang="ts">
import AppButton from '@/app/shared/components/app-button/app-button.vue';
import { ValueListInfoRequest } from '@/app/shared/services/volateq-api/api-requests/custom-component-property-request';
import Vue from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppCcpDataTypeInfo from './ccp-data-type-info.vue';

@Component({
  name: "app-ccp-data-type-value-list",
  components: {
    AppCcpDataTypeInfo,
    AppButton, 
  }
})
export default class AppCcpDataTypeValueList extends Vue {
  @Prop({ required: true }) value!: ValueListInfoRequest[];

  valueList: ValueListInfoRequest[] = [];

  created() {
    this.valueList = this.value;
  }

  @Watch("value") onValueChanged() {
    this.valueList = this.value;
  }

  onValueListChanged(valueList: ValueListInfoRequest, index: number) {
    this.valueList[index] = valueList;

    this.$emit("input", this.valueList);
  }

  onOptionChanged() {
    this.$emit("input", this.valueList);
  }

  onAddValueListItemClicked() {
    this.valueList.push({ option: "" });
  }

  onDeleteValueListItem(index: number) {
    this.valueList.splice(index, 1);
  }
}
</script>