<template>
  <div class="app-ccp-data-type-number-range">
    <app-ccp-data-type-info
      v-for="(nr, i) in numberRanges"
      :key="i" 
      :index="i" 
      :value="nr" 
      @input="onInfoChanged"
      @delete="onDeleteValueListItem">
      <b-form-group :label="$t('number-range')">
        <b-form-input
          class="app-ccp-data-type-number-range-number"
          type="number"
          v-model="nr.number_from"
          :placeholder="$t('from')"
          @change="onNumberFromChanged(nr, i)" />
        <b-form-input 
          class="app-ccp-data-type-number-range-number"
          type="number" 
          v-model="nr.number_to"
          :placeholder="$t('to')"
          @change="onNumberToChanged(nr, i)" />
        <div class="clear"></div>
      </b-form-group>
    </app-ccp-data-type-info>
    <app-button variant="secondary" icon="plus" @click="onAddNumberRangeClicked" size="sm">
      {{ $t('add-number-range') }}
    </app-button>
  </div>
</template>
<script lang="ts">
import AppButton from '@/app/shared/components/app-button/app-button.vue';
import { NumberRangeInfoRequest } from '@/app/shared/services/volateq-api/api-requests/custom-component-property-request';
import Vue from 'vue'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppCcpDataTypeInfo from './ccp-data-type-info.vue';

@Component({
  name: "app-ccp-data-type-number-range",
  components: {
    AppCcpDataTypeInfo,
    AppButton, 
  }
})
export default class AppCcpDataTypeNumberRange extends Vue {
  @Prop({ required: true }) value!: NumberRangeInfoRequest[];

  numberRanges: NumberRangeInfoRequest[] = [];

  created() {
    this.numberRanges = this.value;
  }

  @Watch("value") onValueChanged() {
    this.numberRanges = this.value;
  }

  onNumberFromChanged(numberRange: NumberRangeInfoRequest, index: number) {
    numberRange.number_from = parseInt(numberRange.number_from as unknown as string)

    if (index > 0 && (
      this.numberRanges[index - 1].number_to >= numberRange.number_from || 
      numberRange.number_from - this.numberRanges[index - 1].number_to > 1)
    ) {
      this.numberRanges[index - 1].number_to = numberRange.number_from - 1;
    }

    if (numberRange.number_from >= numberRange.number_to) {
      numberRange.number_from = numberRange.number_to - 1;
    }

    this.updateNumberRange(numberRange, index);
  }

  onNumberToChanged(numberRange: NumberRangeInfoRequest, index: number) {
    numberRange.number_to = parseInt(numberRange.number_to as unknown as string)

    if (index + 1 < this.numberRanges.length && (
      this.numberRanges[index + 1].number_from <= numberRange.number_to ||
      this.numberRanges[index + 1].number_from - numberRange.number_to > 1)
    ) {
      this.numberRanges[index + 1].number_from = numberRange.number_to + 1;
    }

    if (numberRange.number_to <= numberRange.number_from) {
      numberRange.number_to = numberRange.number_from + 1;
    }

    this.updateNumberRange(numberRange, index);
  }

  private updateNumberRange(numberRange: NumberRangeInfoRequest, index: number) {
    this.numberRanges[index] = numberRange;

    this.$emit("input", this.numberRanges);
  }

  onInfoChanged() {
    this.$emit("input", this.numberRanges);
  }

  onAddNumberRangeClicked() {
    const numFrom = this.numberRanges.length > 0 ? 
      this.numberRanges[this.numberRanges.length - 1].number_to + 1 : 0;

    this.numberRanges.push({ number_from: numFrom, number_to: numFrom + 10 });
  }

  onDeleteValueListItem(index: number) {
    this.numberRanges.splice(index, 1);
  }
}
</script>
<style lang="scss">
.app-ccp-data-type-number-range {
  &-number {
    width: 50%;
    float: left;
  }
}
</style>