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
      <app-button ref="manageResultFilesSubmitButton" type="submit">{{ $t("apply") }}</app-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IUpdateEditAnalysis } from "@/app/analysis/edit-analysis/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { IAppButton } from "@/app/shared/components/app-button/types";
import { AnalysisResultFileSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-file-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiErrors, ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-import-analysis-result",
  components: {
    AppButton,
  },
})
export default class AppImportAnalysisResult extends BaseAuthComponent implements IUpdateEditAnalysis {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() manageResultFilesSubmitButton!: IAppButton;
    
  importedResultFiles: AnalysisResultFileSchema[] = [];
  removeAllAnalysisResultFiles = false;
  jsonFile: File | null = null;
  imageFiles: File[] | null = null;

  async created() {
    this.updateAnalysis(this.analysis);
  }

  async updateAnalysis(analysis: AnalysisSchema) {
    this.analysis = analysis;
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
      this.manageResultFilesSubmitButton.startLoading();

      const successfullyFinished = () => {
        appContentEventBus.showSuccessAlert(this.$t("success-managing-result-files").toString());
        this.manageResultFilesSubmitButton.stopLoading();

        this.$emit("updateAnalysis");
      };

      if (this.analysis.analysis_result && this.removeAllAnalysisResultFiles) {
        await volateqApi.deleteAnalysisResult(this.analysis.analysis_result.id);
      }

      if (this.jsonFile) {
        appContentEventBus.showInfoAlert("Uploading...");

        const task = await volateqApi.importAnalysisResult(
          this.jsonFile,
          this.analysis!.id,
          this.imageFiles || undefined,
          (progress) => { appContentEventBus.showInfoAlert("Uploading... " + progress + "%") }
        );

        volateqApi.waitForTask(
          task.id,
          task => {
            this.manageResultFilesSubmitButton.stopLoading();

            if (task.state === "SUCCESS") {
              successfullyFinished();
            } else if (task.state === "FAILURE") {
              appContentEventBus.showError({
                error: ApiErrors.SOMETHING_WENT_WRONG,
                message: task.result,
              });
            }
          },
          info => {
            appContentEventBus.showInfoAlert(info);
          }
        );
      } else {
        successfullyFinished();
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
      this.manageResultFilesSubmitButton.stopLoading();
    }
  }
}
</script>
