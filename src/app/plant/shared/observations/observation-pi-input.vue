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
    <b-alert variant="info" :show="showRefMeasureAnalysisInfoText">
      {{ refMeasureAnalysisInfoText }}
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import { AnalysisResultMappingEntry, PIDataType } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { ObservationModel } from "./types";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { SimpleAnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-observation-pi-input",
  components: {
    AppExplWrap,
  },
})
export default class AppObservationPiInput extends BaseAuthComponent {
  @Prop({ required: true }) entry!: AnalysisResultMappingEntry;
  @Prop({ required: true }) observation!: ObservationModel;
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop() value!: string;

  inputValue: string | number | boolean | null = null;

  refMeasureAnalysisInfoText: string | null = null;
  mappedAnalysis: SimpleAnalysisSchema | undefined = undefined;

  async created() {
    this.inputValue = this.value;

    await this.updateMappedAnalysis();
    await this.updateRefMeasureAnalysisInfoText();
  }

  @Watch("inputValue") 
  onInputValueChanged() {
    this.$emit("input", this.inputValue?.toString() || undefined);

    this.updateRefMeasureAnalysisInfoText();
  }

  @Watch("observation.observedAt")
  async onObservedAtChanged() {
    await this.updateMappedAnalysis();
    await this.updateRefMeasureAnalysisInfoText();
  }

  get isDataTypeBoolean(): boolean {
    return this.entry.dataType === PIDataType.BOOLEAN;
  }

  get isDataTypeNumber(): boolean {
    return this.entry.dataType === PIDataType.NUMERIC;
  }

  get showRefMeasureAnalysisInfoText(): boolean {
    return this.refMeasureAnalysisInfoText !== null;
  }

  private async updateRefMeasureAnalysisInfoText() {
    if (this.isGlassTubeTempEntry) {
      if (this.mappedAnalysis && this.inputValue !== "" && this.inputValue !== undefined && this.inputValue !== null) {
        this.refMeasureAnalysisInfoText = this.$t("ref-measure-for-analysis", { analysis: this.mappedAnalysis.name }).toString();
      } else {
        this.refMeasureAnalysisInfoText = null;
      }
    }
  }

  private async updateMappedAnalysis(): Promise<void> {
    if (this.isGlassTubeTempEntry) {
      this.mappedAnalysis = this.observation.id ? 
        this.observation.analysis :
        await volateqApi.getLastAnalysis(this.plant.id, this.observation.observedAt);
    }
  }

  private get isGlassTubeTempEntry(): boolean {
    return this.entry.keyFigureId === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID &&
      this.entry.transName === "glass-tube-temperature"
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