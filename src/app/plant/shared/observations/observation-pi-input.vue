<template>
  <div class="app-observation-pi-input">
    <b-form-group label-cols="6" label-size="sm" style="margin-bottom: 0.25em">
      <template #label>
        <div class="app-observation-pi-input-label">
          <app-expl-wrap :expl="entry.description">{{ $t(entry.transName) }}</app-expl-wrap>
        </div>
      </template>
      <b-form-checkbox v-if="isDataTypeBoolean"
        v-model="inputValue"
        switch
        size="lg"
        style="margin-top: 3px;"
      />
      <b-form-input v-if="isDataTypeNumber"
        v-model="inputValue"
        type="number"
        size="sm"
      />
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import AppColorSquare from '@/app/shared/components/app-colorpicker/app-color-square.vue';
import AppMultiselect from '@/app/shared/components/app-multiselect/app-multiselect.vue';
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import { AnalysisResultMappingEntry, PIDataType } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";

@Component({
  name: "app-observation-pi-input",
  components: {
    AppColorSquare,
    AppMultiselect,
    AppExplWrap,
  },
})
export default class AppObservationPiInput extends BaseAuthComponent {
  @Prop({ default: true }) entry!: AnalysisResultMappingEntry;
  @Prop() value!: string;

  inputValue: string | number | boolean | null = null;

  async created() {
    this.inputValue = this.value;
  }

  @Watch("inputValue") 
  onInputValueChanged() {
    this.$emit("input", this.inputValue?.toString() || undefined);
  }

  get isDataTypeBoolean(): boolean {
    return this.entry.dataType === PIDataType.BOOLEAN;
  }

  get isDataTypeNumber(): boolean {
    return this.entry.dataType === PIDataType.NUMERIC;
  }
}
</script>

<style lang="scss">
.app-observation-pi-input {
  &-label {
    border: 2px solid transparent;
    border-radius: 100px;
  }
}
</style>