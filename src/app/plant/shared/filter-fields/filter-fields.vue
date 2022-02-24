<template>
  <div class="app-table-filter-fields">
    <b-row class="mar-bottom" v-for="filterField in filterFieldValues" :key="filterField.id">
      <b-col cols="10">
        <app-filter-field
          v-model="filterField.value"
          :filterFields="filterFields"
          @input="onInput"
        />
      </b-col>
      <b-col cols="2" v-if="extendable">
        <b-button variant="secondary" size="sm" @click="onRemove(filterField)"><b-icon icon="x" /></b-button>
      </b-col>
    </b-row>
    <b-row class="mar-bottom">
      <b-col v-if="extendable">
        <b-button variant="secondary" size="sm" @click="onAdd"><b-icon icon="plus" /></b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { FilterField, FilterFieldValue } from "./types";
import AppFilterField from "@/app/plant/shared/filter-fields/filter-field.vue";

@Component({
  name: "app-filter-fields",
  components: {
    AppButton,
    AppFilterField
  },
})
export default class AppFilterFields extends Vue {
  @Prop({ required: true }) filterFields!: FilterField[];
  @Prop({ default: () => [] }) value!: FilterFieldValue[];
  @Prop({ default: true }) extendable!: boolean;

  filterFieldValues: { value: FilterFieldValue, id: number, }[] = [];

  created() {
    this.filterFieldValues = this.value.length > 0 ? 
      this.value.map(value => ({ value, id: 1 })) : 
      [{ value: { filterField: null, value: null }, id: 1 }];
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
  }
}
</script>

<style lang="scss">
</style>