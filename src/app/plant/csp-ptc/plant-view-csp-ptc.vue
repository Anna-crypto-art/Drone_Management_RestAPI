<template>
  <div class="plant-view-csp-ptc">
    <div class="plant-view-csp-ptc-leftside">
      <h2 class="plant-view-csp-ptc-title">{{ this.plant.name }}</h2>
      <b-table 
      :items="analysisResultsTableItems" 
      :fields="analysisResultsTableColumns"
      select-mode="single"
      selectable
      @row-selected="onAnalysisResultSelected">
      </b-table>
    </div>
    <div class="plant-view-csp-ptc-rightside">
      <app-visual-csp-ptc v-if="hasResults" ref="visualCspPtc" :analysisResults="analysisResults" :plant="plant" />
    </div>
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
import { BvTableFieldArray } from 'bootstrap-vue';


@Component({
  name: 'app-plant-view-csp-ptc',
  components: {
    AppVisualCspPtc
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;
  @Ref() visualCspPtc!: IAppVisualCspPtc;

  analysisResultsTableColumns: BvTableFieldArray = [
    { key: 'id', label: 'ID' },
    { key: 'createdAt', label: this.$t('created-at').toString() }
  ];
  analysisResultsTableItems: Record<string, unknown>[] = [];

  analysisResults: AnalysisResultDetailedSchema[] | null = null;

  async created() {
    this.analysisResults = await volateqApi.getAnalysisResults(this.plant.id);

    for (const analysisResult of this.analysisResults) {
      this.analysisResultsTableItems.push({
        id: analysisResult.id,
        createdAt: new Date(Date.parse(analysisResult.created_at)).toLocaleDateString()
      })
    }
  }

  get hasResults(): boolean {
    return !!this.analysisResults;
  }

  onAnalysisResultSelected(selectedAnalysisResult: { id: string, createdAt: string }[]) {
    console.log(selectedAnalysisResult);

    this.visualCspPtc.selectAnalysisResult(selectedAnalysisResult[0].id);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.plant-view-csp-ptc {
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;

  &-title {
    font-size: 3rem;
    margin-bottom: 30px;
  }

  &-leftside {
    padding: 20px;
    height: 100%;
    width: 25%;
    max-width: 400px;
    border-right: $border-color-grey 1px solid; 
    resize: horizontal;
    background-color: $background-grey;
    overflow: auto;
  }
  &-rightside {
    height: 100%;
    width: calc(75% - 1px);
    resize: horizontal;
    overflow: auto;
  }
}
</style>