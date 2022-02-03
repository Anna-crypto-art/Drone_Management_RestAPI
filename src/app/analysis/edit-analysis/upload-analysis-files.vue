<template>
  <div>
    <app-analysis-upload
    ref="analysisUpload"
    :analysis="analysis"
    @startUpload="onStartUpload"
    @cancelUpload="onCancelUpload"
    @updateAnalysis="onUpdateAnalysis" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IUpdateEditAnalysis } from "./types";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-upload-analysis-files",
  components: {
    AppAnalysisUpload,
  },
})
export default class AppUploadAnalysisFiles extends BaseAuthComponent implements IUpdateEditAnalysis {
  @Ref() analysisUpload!: IUpdateEditAnalysis;
  
  @Prop({ required: true }) analysis!: AnalysisSchema;

  async updateAnalysis(analysis: AnalysisSchema) {
    this.analysis = analysis;

    if (this.analysisUpload) {
      this.analysisUpload.updateAnalysis(analysis);
    }
  }

  async onStartUpload(files: string[], done: (analysis: AnalysisSchema) => void) {
    try {
      await volateqApi.prepareAnalysisUpload(this.analysis.id, files);

      done(this.analysis);
  
      this.$emit("updateAnalysis");
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onCancelUpload(done: () => void) {
    try {
      await volateqApi.cancelAnalysisUpload(this.analysis.id);

      done();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  onUpdateAnalysis(): void {
    this.$emit("updateAnalysis");
  }
}
</script>

<style lang="scss">
</style>
