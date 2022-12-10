<template>
  <div class="app-file-upload">
    <b-alert v-show="hasStateRetrying" variant="danger">
      <div v-if="error">
        {{ $t("error-occured-retrying") }}
        <b-spinner />
        <hr>
        <b>{{ error.error }}</b><br>
        {{ error.message }}
      </div>
    </b-alert>

    <app-files-selection @filesSelected="onFilesSelected">
    
      <div class="app-file-upload-content mar-bottom-half">
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

    <app-button :loading="uploading" :disabled="uploadButtonDisabled" cls="pull-right">
      {{ $t("upload") }}
    </app-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { UploaderService } from "@/app/shared/services/upload-service/uploader-service";
import AppFileUploader from "./app-file-uploader.vue"
import AppFilesSelection from "./app-files-selection.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { UploaderState } from "./types";
import { ApiException } from "../../services/volateq-api/api-errors";
import { FileUploader } from "../../services/upload-service/file-uploader";
import { AnalysisUploaderService } from "../../services/upload-service/analysis-uploader-service";
import { CatchError } from "../../services/helper/catch-helper";
import { BaseAuthComponent } from "../base-auth-component/base-auth-component";

@Component({
  name: "app-uploader",
  components: {
    AppFileUploader,
    AppFilesSelection,
    AppButton,
  },
})
export default class AppUploader extends BaseAuthComponent {
  @Prop({ required: true }) uploaderService!: UploaderService;
  @Prop() title: string | undefined;

  uploaderState = UploaderState.SELECTING;
  uploading = false;
  // resuming = false;
  error: ApiException | null = null;

  async created() {
    this.registerUploaderEvents();

    // await this.checkMyUploadingUpload();
  }

  get hasStateSelecting(): boolean {
    return this.uploaderState === UploaderState.SELECTING;
  }
  get hasStateResuming(): boolean {
    return this.uploaderState === UploaderState.RESUMING;
  }
  get hasStateUploading(): boolean {
    return this.uploaderState === UploaderState.UPLOADING;
  }
  get hasStateRetrying(): boolean {
    return this.uploaderState === UploaderState.RETRYING;
  }
  get hasStateCompleted(): boolean {
    return this.uploaderState === UploaderState.COMPLETED;
  }

  async onFilesSelected(files: File[]): Promise<void> {
    this.uploaderService.fileUploaders = [];
    await this.uploaderService.addFiles(files);
  }

  @CatchError()
  async onStartUpload(): Promise<void> {
    await this.uploaderService.doUpload();
  }

  get files(): FileUploader[] {
    return this.uploaderService.fileUploaders;
  }

  uploadButtonDisabled(): boolean {
    return this.files.length === 0 || this.uploading;
  }

  // async onCancelUpload(): Promise<void> {
  // }

  // async onResumeUpload(): Promise<void> {

  // }

  // private async checkMyUploadingUpload() {
  //   const uploadingUpload = await this.uploaderService.getMyUploadingUpload();

  //   if (uploadingUpload?.upload_id) {
  //     this.uploaderService.setUpload(uploadingUpload?.upload_id);

  //     if (this.uploaderService instanceof AnalysisUploaderService && uploadingUpload.analysis_id) {
  //       this.uploaderService.setAnalysisId(uploadingUpload.analysis_id);
  //     }

  //     this.uploaderState = UploaderState.RESUMING;

  //     this.uploaderStateChanged();
  //   }
  // }

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
    if (this.hasStateUploading || this.hasStateRetrying) {
      this.uploading = true;
    }

    if (this.hasStateUploading) {
      this.error = null;
    }

    if (this.hasStateResuming) {
      // this.resuming = true;
    }

    if (this.hasStateCompleted) {
      this.showSuccess(this.$t("upload-completed-successfully").toString());
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
// .app-file-upload {
// }
</style>
