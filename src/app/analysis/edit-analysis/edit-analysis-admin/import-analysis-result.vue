<template>
  <app-box :title="$t('manage-result-files')">
    <b-alert v-model="showAlertInfo" variant="info">
      {{ $t('import-task-running-on-qfly-server') }}
    </b-alert>
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
        <b-alert :show="isAnalysisResultReleased" variant="info">
          {{ $t("remove-result-files-not-allowed_descr") }}
        </b-alert>
        <b-form-checkbox id="removeAllAnalysisResultFiles" v-model="removeAllAnalysisResultFiles" :disabled="isAnalysisResultReleased">
          {{ $t("remove-result-files") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-json-result-file-import')">
        <b-form-file v-model="jsonFile" accept=".json"></b-form-file>
      </b-form-group>
      <b-form-group :label="$t('select-result-image-files-zip')">
        <app-simple-file-upload v-model="imageFilesZip" :uploadProgress="uploadProgress" accept=".zip" />
      </b-form-group>
      <b-alert :show="!hasStateCompleteVerified" variant="info">
        {{ $t("import-result-files-not-allowed_descr") }}
      </b-alert>
      <app-button type="submit" :loading="loading" :disabled="applyButtonDisabled">{{ $t("apply") }}</app-button>
    </b-form>
  </app-box>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisResultFileSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-file-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import { analysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { ApiTasks } from "@/app/shared/services/volateq-api/api-tasks";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { QFlyServerState } from "@/app/shared/services/volateq-api/api-schemas/server-schemas";
import AppSimpleFileUpload from "@/app/shared/components/app-simple-file-upload/app-simple-file-upload.vue";
import { UploadProgress } from "@/app/shared/components/app-simple-file-upload/types";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-import-analysis-result",
  components: {
    AppButton,
    AppBox,
    AppSimpleFileUpload,
  },
})
export default class AppImportAnalysisResult extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  loading = false;
  importedResultFiles: AnalysisResultFileSchema[] = [];
  removeAllAnalysisResultFiles = false;
  jsonFile: File | null = null;
  imageFilesZip: File | null = null;

  uploadProgress: UploadProgress | null = null;

  showAlertInfo = false;

  async created() {
    await this.setManageImportFiles();

    analysisEventService.on(this.analysis.id, AnalysisEvent.RUN_ANALYSIS_TASK, (task: TaskSchema) => {
      if (task.name === ApiTasks.import_analysis_results) {
        this.loading = true;
      }
    });
    analysisEventService.on(this.analysis.id, AnalysisEvent.FINISHED_ANALYSIS_TASK, (task: TaskSchema) => {
      if (task.name === ApiTasks.import_analysis_results) {
        this.loading = false;

        if (task.state === "SUCCESSFUL") {
          this.successfullyFinished();
        }
      }
    });
    analysisEventService.on(this.analysis.id, AnalysisEvent.QFLY_SERVER_STATE_CHANGED, (state: QFlyServerState) => {
      this.showAlertInfo = state === QFlyServerState.RUNNING;
    })
  }

  @Watch("analysis") async onUpdateAnalysis() {
    await this.setManageImportFiles();
  }

  async onResultFileClick(analysisResultFile: AnalysisResultFileSchema) {
    try {
      const downloadUrl = await volateqApi.getAnalysisResultFileUrl(analysisResultFile.id);

      AppDownloader.download(downloadUrl.url, analysisResultFile.filename);
    } catch (e) {
      this.showError(e);
    }
  }

  get applyButtonDisabled(): boolean {
    return !this.hasStateCompleteVerified || this.isAnalysisResultReleased || (!this.jsonFile && !this.removeAllAnalysisResultFiles);
  }

  get hasStateCompleteVerified(): boolean {
    return this.analysis.current_state.state.id >= ApiStates.DATA_COMPLETE_VERIFIED;
  }

  get isAnalysisResultReleased(): boolean {
    return this.analysis.analysis_result?.released || false;
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
        AppContentEventService.showInfo(this.analysis.id, "Uploading result file...");

        await volateqApi.importAnalysisResult(
          this.jsonFile,
          this.analysis!.id,
          this.imageFilesZip?.name,
        );

        analysisEventService.emit(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS);

        if (this.imageFilesZip) {
          await volateqApi.uploadImportAnalysisResultImageFiles(
            this.analysis!.id,
            this.imageFilesZip,
            (progressEvent) => {
              this.uploadProgress = { total: progressEvent.total, loaded: progressEvent.loaded };
            }
          );
        }
      } else {
        this.successfullyFinished();
      }
    } catch (e) {
      this.showError(e);
      this.loading = false;
    } finally {
      this.uploadProgress = null;
    }
  }

  private successfullyFinished() {
    this.showSuccess(this.$t("success-managing-result-files").toString());
    this.loading = false;

    analysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
  }
}
</script>
