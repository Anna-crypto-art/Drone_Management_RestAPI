<template>
  <app-content :title="$t('results-of-analysis')" :navback="true" :subtitle="subtitle">
    <div v-if="analysisResult" class="app-analysis-result">
      <app-analysis-result-csp-ptc v-if="analysisResult.csp_ptc" @setSubtitle="onSetSubtitle"></app-analysis-result-csp-ptc>
    </div>
  </app-content>
</template>

<script lang="ts">
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppAnalysisResultCspPtc from "@/app/analysis/analysis-result/csp-ptc/analysis-result-csp-ptc.vue";

@Component({
  name: "app-analysis-result",
  components: {
    AppAnalysisResultCspPtc
  }
})
export default class AppAnalysisResult extends Vue {
  subtitle = "";

  protected analysisResult!: AnalysisResultDetailedSchema;

  async created() {
    try {
      this.analysisResult = await volateqApi.getAnalysisResult(this.$route.params.id);
    } catch (e) {
      appContentEventBus.showError(e);
    }
  }

  onSetSubtitle(subtitle: string): void {
    this.subtitle = subtitle;
  }
}
</script>

