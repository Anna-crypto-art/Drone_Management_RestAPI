<template>
  <div class="app-table-filter-field-value">
    <b-form-input v-if="isNumericSimple" v-model="filterFieldValue" type="number" 
      size="sm"
      required
      @change="onChange"
    />
    <b-form-input v-if="isNumericExtended" v-model="filterFieldValue" type="text"
      size="sm"
      @change="onChange"
      required
      placeholder="1, -2, 3.14 - 10"
    />
    <b-form-select v-if="isBoolean" v-model="filterFieldValue" 
      size="sm"
      @change="onChange"
      required
      :options="[{ value: true, text: 'true' }, { value: false, text: 'false' }]" 
    />
    <b-form-select v-if="isArray" v-model="filterFieldValue" 
      size="sm"
      @change="onChange"
      required
      :options="filterFieldOptions"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { FilterField, FilterFieldType, FilterFieldValueType } from "./types";

@Component({
  name: "app-filter-field-value",
  components: {},
})
export default class AppFilterFieldValue extends Vue {
  @Prop({ required: true }) filterField!: FilterField;
  @Prop({ default: null }) value!: FilterFieldValueType;

  filterFieldValue: FilterFieldValueType = null;

  filterFieldOptions: { value: unknown, text?: string }[] = [];

  @Watch('filterField') async filterFieldChanged() {
    this.filterFieldOptions = await this.getfilterFieldOptions();
  }

  @Watch("value") onValueChanged() {
    this.filterFieldValue = this.value;
  }

  async created() {
    this.filterFieldValue = this.value;

    this.filterFieldOptions = await this.getfilterFieldOptions();
  }

  get isNumericSimple(): boolean {
    return this.filterField.type === FilterFieldType.NUMERIC_SIMPLE;
  }

  get isNumericExtended(): boolean {
    return this.filterField.type === FilterFieldType.NUMERIC_EXTENDED;
  }

  get isBoolean(): boolean {
    return this.filterField.type === FilterFieldType.BOOLEAN;
  }

  get isArray(): boolean {
    return this.filterField.type === FilterFieldType.ARRAY;
  }

  private async getfilterFieldOptions(): Promise<{ value: unknown, text?: string }[]> {
    return this.filterField.getValues && (await this.filterField.getValues()) || [];
  }

  onChange() {
    this.$emit("input", this.filterFieldValue);
  }
  
}
</script>

<style lang="scss">
</style>