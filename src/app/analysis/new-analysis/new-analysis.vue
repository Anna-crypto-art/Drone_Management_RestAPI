<template>
  <app-content :title="$t('new-data-upload')" :navback="true" :subtitle="$t('create-new-analysis_descr')">
    <div class="app-new-analysis">
      <b-form @submit.prevent="onSubmit" style="margin-bottom: 50px;">
        <b-row style="margin-bottom: 25px;">
          <b-col sm="4">
            <b-form-group label-cols="auto" :label="$t('plant')">
              <b-form-select required v-model="newAnalysis.plant_id" :options="plantOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <app-file-upload ref="appFileUpload" :title="$t('upload-your-files')">
          <app-checklist>
            <app-checklist-item :checked="checkListItems.videoFiles">{{ $t("video-files_descr") }}</app-checklist-item>
            <app-checklist-item :checked="checkListItems.droneMetaFile">{{ $t("drone-metadata-file_descr") }}</app-checklist-item>
            <app-checklist-item :checked="checkListItems.plantMetaFile">{{ $t("plant-metadata-file_descr") }}</app-checklist-item>
          </app-checklist>
        </app-file-upload>
        <app-button ref="uploadButton" type="submit" cls="pull-right">{{ uploadButtonTxt }}</app-button>
        <app-button ref="cancelUploadButton" v-show="showCancelButton" variant="secondary" type="button" @click="onCancelUpload">{{ $t("cancel") }}</app-button>
        <div class="clearfix"></div>
      </b-form>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";
import AppFileUpload from "@/app/shared/components/app-file-upload/app-file-upload.vue";
import { IAppFileUpload } from "@/app/shared/components/app-file-upload/types";
import AppChecklist from "@/app/shared/components/app-checklist/app-checklist.vue"
import AppChecklistItem from "@/app/shared/components/app-checklist/app-checklist-item.vue"
import { CheckListItems, IAnalysisId, IAppNewAnalysisFetched } from "@/app/analysis/new-analysis/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { IAppButton } from "@/app/shared/components/app-button/types";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { IFetchComponent } from "@/app/shared/components/fetch-component/fetch-component";
import uploadService from "@/app/shared/services/upload-service/upload-service";
import { IUploadListener, IResumableFile, UploadState, UploadEvent } from "@/app/shared/services/upload-service/types";
import { NEW_ANALYSIS_STORAGE_KEY } from "@/app/shared/components/fetch-component/storage-keys";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";


@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppFileUpload,
    AppChecklist,
    AppChecklistItem,
    AppButton
  }
})
export default class AppNewAnalysis extends BaseAuthComponent implements IFetchComponent<IAppNewAnalysisFetched>, IUploadListener {
  @Ref() appFileUpload!: IAppFileUpload;
  @Ref() uploadButton!: IAppButton;
  @Ref() cancelUploadButton!: IAppButton;
  uploadButtonTxt = "";
  showCancelButton = false;
  
  plantOptions: Array<any> = [];

  newAnalysis: NewAnalysis = { files: [], plant_id: "" };
  checkListItems: CheckListItems = {
    videoFiles: false,
    droneMetaFile: false,
    plantMetaFile: false
  }

  protected waitForFiles: string[] | undefined;

  analysis: { id: string } | undefined;

  storageKey = NEW_ANALYSIS_STORAGE_KEY;

  mounted() {
    this.registerUploadEvents();
  }

  async created() {
    await super.created();

    this.uploadButtonTxt = this.$t("upload").toString();

    try {
      const plants = await volateqApi.getAllPlants();
      this.plantOptions = plants.map(plant => ({ value: plant.id, text: plant.name }));
      if (plants.length === 1) {
        this.newAnalysis.plant_id = plants[0].id;
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }

    const data = this.fetchData();
    if (data) {
      this.analysis = data.analysis;
      this.newAnalysis = data.newAnalysis;
      this.waitForFiles = data.fileNames;
    }
  }

  updated() {
    this.checkUploadState();
  }

  registerUploadEvents() {
    uploadService.on(UploadEvent.COMPLETED, async (metadata: IAnalysisId) => {
      try {
        await volateqApi.updateAnalysisState(metadata.id, { state: ApiStates.PICK_ME_UP })
        appLocalStorage.removeItem(NEW_ANALYSIS_STORAGE_KEY);

        appContentEventBus.showSuccessAlert(this.$t("upload-completed-successfully").toString());
      } catch (e) {
        appContentEventBus.showError(e as ApiException);
      }

      if (this.isCreated) {
        this.uploadButton.stopLoading();
        this.uploadButton.disable();

        this.analysis = undefined;

        this.showCancelButton = false;
      }
    });
    uploadService.on(UploadEvent.FAILED, async (message: string) => {
      appContentEventBus.showErrorAlert(this.$t(ApiStates.UPLOAD_FAILED).toString());
      console.error(message);

      try {
        await volateqApi.updateAnalysisState(uploadService.getMetadata<IAnalysisId>().id, { state: ApiStates.UPLOAD_FAILED, message: message })
      } catch (e) {
        // Well, that is not a surprise...
        console.error(e);
      }

      if (this.isCreated) {
        this.onFailed();
      }
    });
    uploadService.on(UploadEvent.FILE_RETRY, (file: IResumableFile, retries: number) => {
      appContentEventBus.showWarningAlert(`${this.$t("upload-error-retry").toString()} ${retries}/${uploadService.getMaxRetries()}`, "resumable-upload-error-retry");
    });
    uploadService.on(UploadEvent.FILE_ADDED, (file: IResumableFile) => {
      if (this.isCreated) {
        this.checkFileCompleteness();
      }
    });
    uploadService.on(UploadEvent.FILE_REMOVED, (file: IResumableFile) => {
      if (this.isCreated) {
        this.checkFileCompleteness();
      }
    });
  }

  checkUploadState() {
    if (uploadService.hasState(UploadState.UPLOADING)) {
      this.uploadButton.startLoading();
    } else if (uploadService.hasState(UploadState.FAILED)) {
      this.onFailed();
    } else if (this.analysis && this.waitForFiles) { // Upload has been interrupted
      this.checkFileCompleteness();
      if (this.waitForFiles.length > 0) {
        appContentEventBus.showInfoAlert(this.$t("need-files-to-upload_descr").toString() + 
          "<ul style=\"margin: 5px 0 0 40px;\"><li>" + this.waitForFiles.join("</li><li>") + "</li></ul>");
        
        this.uploadButtonTxt = this.$t("resume-upload").toString();
        this.uploadButton.disable();

        this.showCancelButton = true;
      }
    }
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
    return this.analysis && {
      newAnalysis: {
        files: [],
        plant_id: this.newAnalysis.plant_id,
      },
      analysis: this.analysis,
      fileNames: this.appFileUpload.files.map(file => file.fileName)
    } || undefined;
  }

  checkFileCompleteness() {
    if (this.waitForFiles) {
      this.waitForFiles = this.waitForFiles.filter(fileName => !this.appFileUpload.files.find(file => file.fileName === fileName))      
      if (this.waitForFiles.length === 0) {
        this.waitForFiles = undefined;
        appContentEventBus.clearAlert();
        this.uploadButton.enable();
      }
    }

    this.checkListItems.droneMetaFile = false;
    this.checkListItems.videoFiles = false;
    this.checkListItems.plantMetaFile = false;

    // For some reason this.appFileUpload is undefined, sometimes.. feel free to do further investigation
    if (this.appFileUpload) {
      this.newAnalysis.files = this.appFileUpload.files.map(file => file.fileName);

      for (const file of this.newAnalysis.files) {
        const ext = (file.split(".").pop() || "").toLowerCase();
  
        if (ext === "mp4" || ext == "mov") {
          this.checkListItems.videoFiles = true;
        } else if (ext === "srt") {
          this.checkListItems.droneMetaFile = true;
        } else if (ext === "xslx" || ext === "mdb") {
          this.checkListItems.plantMetaFile = true;
        }
      }
    }
  }

  async onSubmit() {
    if (uploadService.hasState(UploadState.FAILED)) {
      this.$router.go(0);
      return;
    }

    this.checkFileCompleteness();
    if (!this.checkListItems.droneMetaFile || !this.checkListItems.videoFiles/* || !this.checkListItems.plantMetaFile*/) {
      appContentEventBus.showErrorAlert("MISSING_FILES");
      this.uploadButton.stopLoading();
      return;
    }

    try {
      this.onUploading();

      if (!this.analysis) {
        this.analysis = await volateqApi.createAnalysis(this.newAnalysis);
      }
            
      this.storeData();

      this.appFileUpload.upload<IAnalysisId>(volateqApi.getAnalysisFileUploadUrl(this.analysis.id), { id: this.analysis.id });
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
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
    if (!this.analysis) {
      return;
    }

    this.cancelUploadButton.startLoading();

    this.appFileUpload.cancel();
    appLocalStorage.removeItem(this.storageKey);
    this.uploadButton.stopLoading();
    this.uploadButton.enable();
    this.uploadButtonTxt = this.$t("upload").toString();
    
    appContentEventBus.clearAlert();

    try {
      await volateqApi.cancelAnalysisUpload(this.analysis.id)
    } catch (e) {
      // and that is neither a surprise...
      console.error(e);
    } finally {
      this.analysis = undefined;
      this.checkFileCompleteness();

      this.cancelUploadButton.stopLoading();
      this.showCancelButton = false;

      // Reload page
      this.$router.go(0);
    }
  }
}
</script>

<style lang="scss">

</style>
