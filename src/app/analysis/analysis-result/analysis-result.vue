<template>
  <app-content :title="$t('results-of-analysis')" :navback="true" :subtitle="subtitle">
    <div class="app-analysis-result">
      <app-analysis-result-csp-ptc v-if="isCspPtc"
        @setSubtitle="onSetSubtitle"
        :analysisResult="analysisResult"
        :analysis="analysis"></app-analysis-result-csp-ptc>
    </div>
  </app-content>
</template>

<script lang="ts">
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppAnalysisResultCspPtc from "@/app/analysis/analysis-result/csp-ptc/analysis-result-csp-ptc.vue";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-analysis-result",
  components: {
    AppAnalysisResultCspPtc,
    AppContent
  }
})
export default class AppAnalysisResult extends Vue {
  subtitle = "";

  analysisResult: AnalysisResultDetailedSchema | null = null;
  analysis: AnalysisSchema | null = null;

  async created() {
    try {
      this.analysis = await volateqApi.getAnalysis(this.$route.params.id);
      this.analysisResult = await volateqApi.getAnalysisResult(this.analysis.analysis_result.id);
    } catch (e) {
      appContentEventBus.showError(e);
    }
  }

  onSetSubtitle(subtitle: string): void {
    this.subtitle = subtitle;
  }

  get isCspPtc() {
    return this.analysisResult && this.analysisResult.csp_ptc;
  }
}
</script>

