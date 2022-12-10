<template>
  <div class="app-file-upload">
    <b-alert v-model="resuming" :variant="info" fade>
      {{ missingUploadFilesTxt }}
    </b-alert>

    <app-files-selection @filesSelected="onFilesSelected">
    
      <div class="app-file-upload-content mar-bottom">
        <h3 v-if="title" class="app-file-upload-content-title">{{ title }}</h3>
        <slot />
      </div>
      
      <template #files>
        <div class="app-file-upload-files" v-show="files.length > 0">
          <app-file-uploader
            v-for="file in files"
            :key="file.fileName"
            :uploaderService="uploaderService"
            :uploading="uploading"
            :file="file"
          />
        </div>
      </template>
    </app-files-selection>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { UploaderService } from "@/app/shared/services/upload-service/uploader-service";
import AppFileUploader from "./app-file-uploader.vue"
import AppFilesSelection from "./app-files-selection.vue";
import { UploaderState } from "./types";
import { ApiException } from "../../services/volateq-api/api-errors";
import { FileUploader } from "../../services/upload-service/file-uploader";
import { AnalysisUploaderService } from "../../services/upload-service/analysis-uploader-service";
import appContentEventBus from "../app-content/app-content-event-bus";

@Component({
  name: "app-uploader",
  components: {
    AppFileUploader,
    AppFilesSelection,
  },
})
export default class AppUploader extends Vue {
  @Prop({ required: true }) uploaderService!: UploaderService;
  @Prop() title: string | undefined;

  uploaderState = UploaderState.SELECTING;
  uploading = false;
  resuming = false;
  error: ApiException | null = null;

  async created() {
    this.registerUploaderEvents();

    await this.checkMyUploadingUpload();
  }

  hasStateSelecting(): boolean {
    return this.uploaderState === UploaderState.SELECTING;
  }
  hasStateResuming(): boolean {
    return this.uploaderState === UploaderState.RESUMING;
  }
  hasStateUploading(): boolean {
    return this.uploaderState === UploaderState.UPLOADING;
  }
  hasStateRetrying(): boolean {
    return this.uploaderState === UploaderState.RETRYING;
  }

  async onFilesSelected(files: File[]): Promise<void> {
    this.uploaderService.fileUploaders = [];
    await this.uploaderService.addFiles(files);
  }

  async onStartUpload(): Promise<void> {
    
  }

  get files(): FileUploader[] {
    return this.uploaderService.fileUploaders;
  }

  async onCancelUpload(): Promise<void> {
  }

  async onResumeUpload(): Promise<void> {

  }

  private async checkMyUploadingUpload() {
    const uploadingUpload = await this.uploaderService.getMyUploadingUpload();

    if (uploadingUpload?.upload_id) {
      this.uploaderService.setUpload(uploadingUpload?.upload_id);

      if (this.uploaderService instanceof AnalysisUploaderService && uploadingUpload.analysis_id) {
        this.uploaderService.setAnalysisId(uploadingUpload.analysis_id);
      }

      this.uploaderState = UploaderState.RESUMING;

      this.uploaderStateChanged();
    }
  }

  private registerUploaderEvents() {
    this.uploaderService.onStartUpload(() => {
      this.uploaderState = UploaderState.UPLOADING;

      this.uploaderStateChanged();
    });
    this.uploaderService.onProgress(() => {
      this.uploaderState = UploaderState.UPLOADING;

      this.uploaderStateChanged();
    });
    this.uploaderService.onError(e => {
      this.uploaderState = UploaderState.RETRYING;
      this.error = e;

      this.uploaderStateChanged();
    });
    this.uploaderService.onUploadComplete(() => {
      this.uploaderState = UploaderState.COMPLETED;

      this.uploaderStateChanged();
    });
  }

  private uploaderStateChanged(): void {
    if (this.hasStateUploading() || this.hasStateRetrying()) {
      this.uploading = true;
    }

    if (this.hasStateUploading()) {
      this.error = null;
    }

    if (this.hasStateResuming()) {
      this.resuming = true;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.app-file-upload {
  margin-bottom: 30px;
  &-dropzone {
    background-color: $background-grey;
    padding: 20px;
    &-content {
      &-title {
        margin-bottom: 15px;
      }
      margin-bottom: 30px;
    }
  }
}
</style>
