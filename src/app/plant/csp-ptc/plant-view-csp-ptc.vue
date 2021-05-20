<template>
  <div>
    <b-button @click="selectAnalysisResult">select analysis result</b-button>
    <app-visual-csp-ptc v-if="hasResults" ref="visualCspPtc" :analysisResults="analysisResults" :plant="plant" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'vue-property-decorator';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import AppVisualCspPtc from '@/app/plant/csp-ptc/visualization/visual-csp-ptc.vue';
import { IAppVisualCspPtc } from './visualization/types';


@Component({
  name: 'app-plant-view-csp-ptc',
  components: {
    AppVisualCspPtc
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;
  @Ref() visualCspPtc!: IAppVisualCspPtc;

  analysisResults: AnalysisResultDetailedSchema[] | null = null;

  async created() {
    this.analysisResults = await volateqApi.getAnalysisResults(this.plant.id);
  }

  get hasResults(): boolean {
    return !!this.analysisResults;
  }

  selectAnalysisResult(e: Event) {
    this.visualCspPtc.selectAnalysisResult(this.analysisResults![0].id);
  }
}
</script>

<style lang="scss">
</style>