<template>
  <div class="app-analysis-upload">
    <b-form-checkbox v-show="analysis" v-model="dataComplete" @change="onChangeDataComplete">
      {{ $t("data-complete") }} <app-explanation>{{ $t("data-complete_expl") }}</app-explanation>
    </b-form-checkbox>
    <b-form @submit.prevent="onSubmit" style="margin: 30px 0" v-if="uploadService">
      <slot name="uploadForm" />
      <app-file-upload ref="appFileUpload" :uploadService="uploadService" :title="$t('select-files')" />
      <app-button type="submit" :loading="uploadButtonLoading" :disabled="uploadButtonDisabled" cls="pull-right">{{
        uploadButtonTxt
      }}</app-button>
      <app-button
        v-show="showCancelButton"
        variant="secondary"
        :loading="cancelButtonLoading"
        type="button"
        @click="onCancelUpload"
      >
        <slot name="cancelButton">
          {{ $t("cancel") }}
        </slot>
      </app-button>
      <div class="clearfix"></div>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppFileUpload from "@/app/shared/components/app-file-upload/app-file-upload.vue";
import { IAppFileUpload } from "@/app/shared/components/app-file-upload/types";
import { IAnalysisId, IAppNewAnalysisFetched } from "@/app/analysis/new-analysis/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { apiStateNames, ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { IFetchComponent } from "@/app/shared/components/fetch-component/fetch-component";
import { UploadService } from "@/app/shared/services/upload-service/upload-service";
import { IUploadListener, IResumableFile, UploadState, UploadEvent } from "@/app/shared/services/upload-service/types";
import { UPLOAD_ANALYSIS_STORAGE_KEY } from "@/app/shared/components/fetch-component/storage-keys";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { AnalysisEventService } from "./analysis-event-service";
import { AnalysisEvent } from "./types";

@Component({
  name: "app-analysis-upload",
  components: {
    AppContent,
    AppFileUpload,
    AppButton,
    AppExplanation,
  },
})
export default class AppAnalysisUpload
  extends BaseAuthComponent
  implements IFetchComponent<IAppNewAnalysisFetched>, IUploadListener
{
  @Ref() appFileUpload!: IAppFileUpload;

  @Prop({ default: null }) analysis!: AnalysisSchema | null;

  storageKey = "";
  dataComplete = false;
  waitForFiles: string[] | null = null;

  uploadService: UploadService | null = null;

  uploadButtonDisabled = false;
  uploadButtonLoading = false;
  uploadButtonTxt = "";

  showCancelButton = false;
  cancelButtonLoading = false;

  async mounted() {
    this.uploadService = UploadService.findOrCreate(this.analysis?.id);

    this.setStorageKey(this.analysis);

    this.dataComplete = this.analysis ? this.analysis.data_complete : false;

    this.registerUploadEvents();
  }

  async created() {
    await super.created();

    this.uploadButtonTxt = this.$t("upload").toString();

    const data = this.fetchData();
    if (data) {
      this.waitForFiles = data.fileNames;
    }
  }

  @Watch("analysis") onAnalysisChanged() {
    this.dataComplete = this.analysis ? this.analysis.data_complete : false;
  }

  updated() {
    this.checkUploadState();
  }

  registerUploadEvents() {
    this.uploadService!.on(UploadEvent.COMPLETED, async (metadata: IAnalysisId) => {
      try {
        const analysis = await volateqApi.getAnalysis(this.analysis!.id);
        const dataComplete = analysis.data_complete;

        this.waitForFiles = null;

        await volateqApi.updateAnalysisState(metadata.id, {
          state_id: dataComplete ? ApiStates.DATA_COMPLETE : ApiStates.DATA_INCOMPLETE,
          do_send_mail: true,
        });

        AnalysisEventService.emit(analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

        appLocalStorage.removeItem(this.storageKey);

        appContentEventBus.showSuccessAlert(this.$t("upload-completed-successfully").toString());
      } catch (e) {
        appContentEventBus.showError(e as ApiException);
      }

      if (this.isCreated) {
        this.uploadButtonLoading = false;
        this.uploadButtonDisabled = false;
        this.uploadButtonTxt = this.$t("upload").toString();

        this.showCancelButton = false;
      }
    });
    this.uploadService!.on(UploadEvent.FAILED, async (message: string) => {
      appContentEventBus.showErrorAlert(this.$t(apiStateNames[ApiStates.UPLOAD_FAILED]).toString());
      console.error(message);

      try {
        await volateqApi.updateAnalysisState(this.uploadService!.getMetadata<IAnalysisId>().id, {
          state_id: ApiStates.UPLOAD_FAILED,
          message: message,
        });
      } catch (e) {
        // Well, that is not a surprise...
        console.error(e);
      }

      if (this.isCreated) {
        this.onFailed();
      }
    });
    this.uploadService!.on(UploadEvent.FILE_RETRY, (file: IResumableFile, retries: number) => {
      appContentEventBus.showWarningAlert(
        `${this.$t("upload-error-retry").toString()} ${retries}/${this.uploadService!.getMaxRetries()}`,
        "resumable-upload-error-retry"
      );
    });
    this.uploadService!.on(UploadEvent.FILE_ADDED, (file: IResumableFile) => {
      if (this.isCreated) {
        this.checkFileCompleteness();
      }
    });
    this.uploadService!.on(UploadEvent.FILE_REMOVED, (file: IResumableFile) => {
      if (this.isCreated) {
        this.checkFileCompleteness();
      }
    });
  }

  checkUploadState() {
    if (this.uploadService!.hasState(UploadState.UPLOADING)) {
      this.uploadButtonLoading = true;
    } else if (this.waitForFiles && this.waitForFiles.length > 0) {
      // Upload has been interrupted
      appContentEventBus.showInfoAlert(
        this.$t("need-files-to-upload_descr").toString() +
          '<ul style="margin: 5px 0 0 40px;"><li>' +
          this.waitForFiles.join("</li><li>") +
          "</li></ul>"
      );

      this.uploadButtonTxt = this.$t("resume-upload").toString();
      this.uploadButtonDisabled = true;

      this.showCancelButton = true;
    }
  }

  checkFileCompleteness() {
    if (this.waitForFiles) {
      this.waitForFiles = this.waitForFiles.filter(
        fileName => !this.appFileUpload.files.find(file => file.fileName === fileName)
      );
      if (this.waitForFiles.length === 0) {
        this.waitForFiles = null;
        appContentEventBus.clearAlert();
        this.uploadButtonDisabled = false;
      }
    }
  }

  fetchData(): IAppNewAnalysisFetched | undefined {
    return appLocalStorage.getItem(this.storageKey);
  }
  storeData() {
    const data = this.getStorageData();
    if (data) {
      appLocalStorage.setItem(this.storageKey, data);
    } else {
      appLocalStorage.removeItem(this.storageKey);
    }
  }
  getStorageData(): IAppNewAnalysisFetched | undefined {
    return { fileNames: this.appFileUpload.files.map(file => file.fileName) };
  }

  async onSubmit() {
    if (this.uploadService!.hasState(UploadState.FAILED)) {
      // Retry upload...

      // Pings to the server. If the server is not responding, do nothing
      if (!(await volateqApi.isLoggedIn())) { 
        return;
      }

      this.$emit("retryUpload");
      return;
    }

    try {
      const resumeUpload = this.uploadButtonTxt === this.$t("resume-upload").toString();

      this.onUploading();

      const analysis = await new Promise<AnalysisSchema>(resolve => {
        this.$emit(
          "startUpload",
          this.appFileUpload.files.map(file => file.fileName),
          resumeUpload,
          (analysis: AnalysisSchema) => {
            resolve(analysis);
          }
        );
      });
      if (!analysis) {
        return;
      }

      this.setStorageKey(analysis);
      this.storeData();

      this.appFileUpload.upload<IAnalysisId>(volateqApi.getAnalysisFileUploadUrl(analysis.id), { id: analysis.id });
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  onFailed() {
    this.uploadButtonLoading = false;
    this.uploadButtonTxt = this.$t("retry-upload").toString();

    this.showCancelButton = true;
  }
  onUploading() {
    this.uploadButtonLoading = true;
    this.showCancelButton = false;
  }

  async onCancelUpload() {
    this.cancelButtonLoading = true;

    try {
      const failed = await new Promise<boolean>(resolve => {
        this.$emit("cancelUpload", failed => resolve(failed));
      });

      if (!failed) {
        this.appFileUpload.cancel();
        appLocalStorage.removeItem(this.storageKey);
        this.uploadButtonLoading = false;
        this.uploadButtonDisabled = false;
        this.uploadButtonTxt = this.$t("upload").toString();

        appContentEventBus.clearAlert();

        this.showCancelButton = false;
      }
    } finally {
      this.cancelButtonLoading = false;
    }
  }

  async onChangeDataComplete() {
    try {
      await volateqApi.updateAnalysis(this.analysis!.id, { data_complete: this.dataComplete });

      AnalysisEventService.emit(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  private setStorageKey(analysis: AnalysisSchema | null) {
    this.storageKey = UPLOAD_ANALYSIS_STORAGE_KEY + ((analysis && "-" + analysis.id) || "");
  }
}
</script>

<style lang="scss"></style>
