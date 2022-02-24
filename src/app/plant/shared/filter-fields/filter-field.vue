<template>
  <div class="app-table-filter-field">
    <b-row>
      <b-col>
        <b-form-select v-model="selectedKey" :options="selectOptions" size="sm"></b-form-select>
      </b-col>
      <b-col>
        <app-filter-field-value v-if="filterField" v-model="innerValue" @input="onInput" :filterField="filterField" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { FilterField, FilterFieldValue, FilterFieldValueType } from "./types";
import AppFilterFieldValue from "@/app/plant/shared/filter-fields/filter-field-value.vue";

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
  selectedKey = "";
  filterFieldValue: FilterFieldValue | null = null;

  get selectOptions(): { value: string, text: string }[] {
    return this.filterFields.map(filterField => ({
      value: filterField.key,
      text: filterField.name
    }));
  }

  get filterField(): FilterField | undefined {
    return this.filterFields.find(filterField => filterField.key === this.selectedKey);
  }

  onInput() {
    this.filterFieldValue = { 
      filterField: this.filterField || null,
      value: this.innerValue,
    }

    this.$emit("input",  this.filterFieldValue);
  }
}
</script>

<style lang="scss">
</style>