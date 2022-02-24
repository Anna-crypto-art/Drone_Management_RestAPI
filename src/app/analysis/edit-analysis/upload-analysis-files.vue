<template>
  <div>
    <app-analysis-upload
    :analysis="analysis"
    @startUpload="onStartUpload"
    @cancelUpload="onCancelUpload"
    @retryUpload="onRetryUpload" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { AnalysisEventService } from "@/app/analysis/shared/analysis-event-service";
import { AnalysisEvent } from "@/app/analysis/shared/types";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";

@Component({
  name: "app-upload-analysis-files",
  components: {
    AppAnalysisUpload,
  },
})
export default class AppUploadAnalysisFiles extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  async onStartUpload(files: string[], resume: boolean, done: (analysis: AnalysisSchema) => void) {
    try {
      // If the upload resumes, we don't want to delete the already uploaded files
      const filenames = resume ? [] : files;

      await volateqApi.prepareAnalysisUpload(this.analysis.id, filenames);
      
      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

      done(this.analysis);
    } catch (e) {
      AppContentEventService.showError(this.analysis.id, e as ApiException);
    }
  }

  async onCancelUpload(done: (failed: boolean) => void) {
    try {
      await volateqApi.cancelAnalysisUpload(this.analysis.id);
      await volateqApi.updateAnalysisState(this.analysis.id, { state_id: ApiStates.UPLOAD_FAILED, message: 'Upload canceled' });

      done(false);
    } catch (e) {
      AppContentEventService.showError(this.analysis.id, e as ApiException);

      done(true);
    }
  }

  onRetryUpload() {
    // Reload page
    this.$router.go(0);
  }
}
</script>

<style lang="scss">
</style>
