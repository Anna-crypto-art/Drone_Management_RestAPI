<template>
  <div class="app-analysis-upload">
    <b-form @submit.prevent="onSubmit" style="margin-bottom: 50px;" v-if="uploadService">
      <slot name="uploadForm" />
      <app-file-upload ref="appFileUpload" :uploadService="uploadService" :title="$t('select-files')" />
      <app-button ref="uploadButton" type="submit" cls="pull-right">{{ uploadButtonTxt }}</app-button>
      <app-button ref="cancelUploadButton" v-show="showCancelButton" variant="secondary" type="button" @click="onCancelUpload">
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
import { IAppButton } from "@/app/shared/components/app-button/types";
import { apiStateNames, ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { IFetchComponent } from "@/app/shared/components/fetch-component/fetch-component";
import { UploadService } from "@/app/shared/services/upload-service/upload-service";
import { IUploadListener, IResumableFile, UploadState, UploadEvent } from "@/app/shared/services/upload-service/types";
import { UPLOAD_ANALYSIS_STORAGE_KEY } from "@/app/shared/components/fetch-component/storage-keys";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { IAppAnalysisUpload } from "./types";


@Component({
  name: "app-analysis-upload",
  components: {
    AppContent,
    AppFileUpload,
    AppButton
  }
})
export default class AppAnalysisUpload extends BaseAuthComponent implements IFetchComponent<IAppNewAnalysisFetched>, IUploadListener, IAppAnalysisUpload {
  @Ref() appFileUpload!: IAppFileUpload;
  @Ref() uploadButton!: IAppButton;
  @Ref() cancelUploadButton!: IAppButton;

  getAnalysisCallback: () => AnalysisSchema | null = () => null;

  storageKey = UPLOAD_ANALYSIS_STORAGE_KEY;

  uploadService: UploadService | null = null;

  uploadButtonTxt = "";
  showCancelButton = false;
  waitForFiles: string[] | null = null;

  async mounted() {
    this.uploadService = UploadService.findOrCreate((await this.getAnalysis())?.id);

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

  updated() {
    this.checkUploadState();
  }

  registerUploadEvents() {
    this.uploadService!.on(UploadEvent.COMPLETED, async (metadata: IAnalysisId) => {
      try {
        const analysis = await this.getAnalysis();
        const dataComplete = analysis ? analysis.data_complete : true;

        this.waitForFiles = null;

        await volateqApi.updateAnalysisState(
          metadata.id, 
          { state_id: (dataComplete ? ApiStates.DATA_COMPLETE : ApiStates.DATA_INCOMPLETE) }
        );
        appLocalStorage.removeItem(UPLOAD_ANALYSIS_STORAGE_KEY);

        appContentEventBus.showSuccessAlert(this.$t("upload-completed-successfully").toString());
      } catch (e) {
        appContentEventBus.showError(e as ApiException);
      }

      if (this.isCreated) {
        this.uploadButton.stopLoading();
        this.uploadButton.disable();

        this.showCancelButton = false;
      }
    });
    this.uploadService!.on(UploadEvent.FAILED, async (message: string) => {
      appContentEventBus.showErrorAlert(this.$t(apiStateNames[ApiStates.UPLOAD_FAILED]).toString());
      console.error(message);

      try {
        await volateqApi.updateAnalysisState(
          this.uploadService!.getMetadata<IAnalysisId>().id,
          { state_id: ApiStates.UPLOAD_FAILED, message: message }
        );
      } catch (e) {
        // Well, that is not a surprise...
        console.error(e);
      }

      if (this.isCreated) {
        this.onFailed();
      }
    });
    this.uploadService!.on(UploadEvent.FILE_RETRY, (file: IResumableFile, retries: number) => {
      appContentEventBus.showWarningAlert(`${this.$t("upload-error-retry").toString()} ${retries}/${this.uploadService!.getMaxRetries()}`, "resumable-upload-error-retry");
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
      this.uploadButton.startLoading();
    } else if (this.uploadService!.hasState(UploadState.FAILED)) {
      this.onFailed();
    } else if (this.waitForFiles && this.waitForFiles.length > 0) { // Upload has been interrupted
      appContentEventBus.showInfoAlert(this.$t("need-files-to-upload_descr").toString() + 
        "<ul style=\"margin: 5px 0 0 40px;\"><li>" + this.waitForFiles.join("</li><li>") + "</li></ul>");
      
      this.uploadButtonTxt = this.$t("resume-upload").toString();
      this.uploadButton.disable();

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
        this.uploadButton.enable();
      }
    }
  }

  setAnalysisCallback(getAnalysis: () => AnalysisSchema | null) {
    this.getAnalysisCallback = getAnalysis;
  }

  async getAnalysis() {
    const analysis: AnalysisSchema | null = await this.getAnalysisCallback();

    if (analysis !== null) {
      this.storageKey = UPLOAD_ANALYSIS_STORAGE_KEY + "-" + analysis.id;
    }

    return analysis;
  }

  fetchData(): IAppNewAnalysisFetched | undefined {
    return appLocalStorage.getItem(this.storageKey);
  }
  storeData() {
    const data = this.getStorageData()
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
      this.$router.go(0);
      return;
    }

    try {
      this.onUploading();

      await this.emit("startUpload", this.appFileUpload.files.map(file => file.fileName));

      const analysis = await this.getAnalysis();
      if (!analysis) {
        return;
      }
      
      this.storeData();

      this.appFileUpload.upload<IAnalysisId>(volateqApi.getAnalysisFileUploadUrl(analysis.id), { id: analysis.id });
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.uploadButton.stopLoading();
    }
  }

  onFailed() {
    this.uploadButton.stopLoading();
    this.uploadButtonTxt = this.$t("retry-upload").toString();
  
    this.showCancelButton = true;
  }
  onUploading() {
    this.uploadButton.startLoading();
    this.showCancelButton = false;
  }

  async onCancelUpload() {
    this.cancelUploadButton.startLoading();

    this.appFileUpload.cancel();
    appLocalStorage.removeItem(this.storageKey);
    this.uploadButton.stopLoading();
    this.uploadButton.enable();
    this.uploadButtonTxt = this.$t("upload").toString();
    
    appContentEventBus.clearAlert();

    try {
      await this.emit("cancelUpload");
    } finally {
      this.cancelUploadButton.stopLoading();
      this.showCancelButton = false;
    }
  }
}
</script>

<style lang="scss">

</style>
