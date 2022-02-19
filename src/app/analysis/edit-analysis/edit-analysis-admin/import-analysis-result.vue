<template>
  <div class="admin-box">
    <h4>{{ $t("manage-result-files") }}</h4>
    <b-form @submit.prevent="saveManageResultFiles">
      <b-form-group v-show="analysis.analysis_result" :label="$t('download-existing-result-files')">
        <a
          href="#"
          v-for="resultFile in importedResultFiles"
          :key="resultFile.id"
          @click="onResultFileClick(resultFile)"
        >
          {{ resultFile.filename }}
        </a>
      </b-form-group>
      <b-form-group v-show="analysis.analysis_result">
        <b-form-checkbox id="removeAllAnalysisResultFiles" v-model="removeAllAnalysisResultFiles">
          {{ $t("remove-result-files") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-json-result-file-import')">
        <b-form-file v-model="jsonFile" accept=".json"></b-form-file>
      </b-form-group>
      <b-form-group :label="$t('select-result-image-files')">
        <b-form-file v-model="imageFiles" accept="image/png, image/jpeg" multiple></b-form-file>
      </b-form-group>
      <app-button type="submit" :loading="loading" >{{ $t("apply") }}</app-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisResultFileSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-file-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { ApiTasks } from "@/app/shared/services/volateq-api/api-tasks";

@Component({
  name: "app-import-analysis-result",
  components: {
    AppButton,
  },
})
export default class AppImportAnalysisResult extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  loading = false;
  importedResultFiles: AnalysisResultFileSchema[] = [];
  removeAllAnalysisResultFiles = false;
  jsonFile: File | null = null;
  imageFiles: File[] | null = null;

  async created() {
    await this.setManageImportFiles();

    AnalysisEventService.on(this.analysis.id, AnalysisEvent.RUN_ANALYSIS_TASK, (task: TaskSchema) => {
      if (task.name === ApiTasks.importAnalysisResult) {
        this.loading = true;
      }
    });
    AnalysisEventService.on(this.analysis.id, AnalysisEvent.FINISHED_ANALYSIS_TASK, (task: TaskSchema) => {
      if (task.name === ApiTasks.importAnalysisResult) {
        this.loading = false;

        if (task.state === "SUCCESS") {
          this.successfullyFinished();
        }
      }
    })
  }

  @Watch('analysis') async onUpdateAnalysis() {
    await this.setManageImportFiles();
  }

  async onResultFileClick(analysisResultFile: AnalysisResultFileSchema) {
    try {
      const downloadUrl = await volateqApi.getAnalysisResultFileUrl(analysisResultFile.id);

      AppDownloader.download(downloadUrl.url, analysisResultFile.filename);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
    
  }

  private async setManageImportFiles() {
    if (this.analysis.analysis_result) {
      this.importedResultFiles = await volateqApi.getAnalysisResultFiles(this.analysis.analysis_result.id);
    }
  }

  async saveManageResultFiles() {
    try {
      this.loading = true;

      if (this.analysis.analysis_result && this.removeAllAnalysisResultFiles) {
        await volateqApi.deleteAnalysisResult(this.analysis.analysis_result.id);
      }

      if (this.jsonFile) {
        appContentEventBus.showInfoAlert("Uploading...");

        await volateqApi.importAnalysisResult(
          this.jsonFile,
          this.analysis!.id,
          this.imageFiles || undefined,
          (progress) => { appContentEventBus.showInfoAlert("Uploading... " + progress + "%") }
        );

        AnalysisEventService.emit(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS);
      } else {
        this.successfullyFinished();
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
      this.loading = false;
    }
  }

  private successfullyFinished() {
    appContentEventBus.showSuccessAlert(this.$t("success-managing-result-files").toString());
    this.loading = false;

    AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
  }
}
</script>
