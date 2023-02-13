<template>
  <div class="app-table-filter-fields">
    <b-row class="mar-bottom" v-for="filterField in filterFieldValues" :key="filterField.id">
      <b-col cols="10">
        <app-filter-field
          v-model="filterField.value"
          :filterFields="filterFields"
          @input="onInput"
          :placeholder="filterSelectPlaceholder"
          :compareView="compareView"
        />
      </b-col>
      <b-col cols="2">
        <app-button variant="outline-danger" size="sm" @click="onRemove(filterField)" icon="x" />
      </b-col>
    </b-row>
    <b-row class="mar-bottom">
      <b-col v-show="addable">
        <app-button variant="secondary" @click="onAdd" size="sm" icon="plus">
          <slot name="addButton" />
        </app-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { FilterField, FilterFieldType, FilterFieldValue } from "./types";
import AppFilterField from "@/app/plant/shared/filter-fields/filter-field.vue";

@Component({
  name: "app-filter-fields",
  components: {
    AppButton,
    AppFilterField,
  },
})
export default class AppFilterFields extends Vue {
  @Prop({ required: true }) filterFields!: FilterField[];
  @Prop({ default: () => [] }) value!: FilterFieldValue[];
  @Prop({ default: true }) extendable!: boolean;
  @Prop({ default: "" }) filterSelectPlaceholder!: string;
  @Prop({ default: false }) compareView!: boolean;

  filterFieldValues: { value: FilterFieldValue, id: number, }[] = [];

  @Watch('value') onValueChanged() {
    this.setFilterFieldValues();
  }

  @Watch('compareView') onCompareViewChanged() {
    const rmIdx: number[] = [];
    for (let i = 0; i < this.filterFieldValues.length; i++) {
      const filterFieldValue = this.filterFieldValues[i];
      if (filterFieldValue.value?.filterField?.type === FilterFieldType.BOOLEAN) {
        rmIdx.push(i);
      }
    }
  
    for (const i of rmIdx) {
      this.filterFieldValues.splice(i, 1);
    }

    this.onInput();
  }

  created() {
    this.setFilterFieldValues();
  }

  get addable(): boolean {
    return this.extendable || this.filterFieldValues.length === 0;
  }

  onInput() {
    this.$emit("input", this.filterFieldValues.map(filterFieldValue => filterFieldValue.value));
  }

  onAdd() {
    this.filterFieldValues.push({
      value: { filterField: null, value: null },
      id: this.filterFieldValues.length > 0 ? 
        this.filterFieldValues[this.filterFieldValues.length - 1].id + 1 :
        1
    });
  }

  onRemove(filterField: { value: FilterFieldValue, id: number }) {
    this.filterFieldValues.splice(
      this.filterFieldValues.findIndex(filterFieldValue => filterFieldValue.id === filterField.id),
      1
    );

    this.onInput();
  }

  private setFilterFieldValues() {
    this.filterFieldValues = this.value.length > 0 ? 
      this.value.map((value, index) => ({ value, id: index + 1 })) : 
      [{ value: { filterField: null, value: null }, id: 1 }];
  }
}
</script>

<style lang="scss">
</style>