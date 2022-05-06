<template>
  <div class="app-table-filter-field">
    <b-row>
      <b-col>
        <b-form-select v-model="selectedKey" :options="selectOptions" @change="onSelectChange" size="sm">
        </b-form-select>
      </b-col>
      <b-col>
        <app-filter-field-value v-if="filterField" v-model="innerValue" @input="onInput" :filterField="filterField" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { FilterField, FilterFieldValue, FilterFieldValueType } from "./types";
import AppFilterFieldValue from "@/app/plant/shared/filter-fields/filter-field-value.vue";
import { BvSelectOption } from "@/app/shared/types";

@Component({
  name: "app-filter-field",
  components: {
    AppButton,
    AppFilterFieldValue,
  },
})
export default class AppFilterField extends Vue {
  @Prop({ required: true }) filterFields!: FilterField[];
  @Prop({ default: null }) value!: FilterFieldValue | null;

  innerValue: FilterFieldValueType | null = null;
  selectedKey: string | number = "";
  filterFieldValue: FilterFieldValue | null = null;

  @Watch("value") onValueChanged() {
    this.setFilterFieldValue();
  }

  created() {
    this.setFilterFieldValue();
  }

  get selectOptions(): BvSelectOption[] {
    return this.filterFields.map(filterField => ({
      value: filterField.key,
      text: filterField.name
    }));
  }

  get filterField(): FilterField | undefined {
    return this.filterFields.find(filterField => filterField.key === this.selectedKey);
  }

  onSelectChange() {
    this.innerValue = null;
    this.onInput();
  }

  onInput() {
    this.filterFieldValue = { 
      filterField: this.filterField || null,
      value: this.innerValue,
    }

    this.$emit("input",  this.filterFieldValue);
  }

  private setFilterFieldValue() {
    this.selectedKey = this.value?.filterField?.key || "";
    this.innerValue = this.value?.value || null;
    
    this.filterFieldValue = { 
      filterField: this.filterField || null,
      value: this.innerValue,
    }
  }
}
</script>

<style lang="scss">
</style>