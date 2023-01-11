<template>
  <div class="app-file-upload">
    <b-alert v-model="showErrorAlert" variant="danger">
      <div v-if="error">
        {{ $t("error-occured-retrying") }}
        <span class="pad-left">
          <b-spinner small />
          ({{ errorTrials }} {{ $t('trials') }})
        </span>
        <div class="mar-top" v-if="errorTrials > 10">
          <app-button variant="secondary" size="sm" @click="onCancelUploadClick" :loading="cancelLoading">
            {{ $t("cancel-upload") }}
          </app-button>
        </div>
        <div class="mar-top font-xs">
          {{ $t("details") }}: <b>{{ error.error }}</b><br>
          {{ error.message }}
        </div>
      </div>
    </b-alert>

    <app-files-selection @filesSelected="onFilesSelected" :disabled="disableFilesSelection">
    
      <div class="app-file-upload-content mar-bottom">
        <h3 v-if="title" class="app-file-upload-content-title">{{ title }}</h3>
        <slot />
      </div>
      
      <template #files>
        <div class="app-file-upload-files mar-top" v-show="files.length > 0">
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

    <app-button v-show="showUploadButton" :loading="uploading" :disabled="uploadButtonDisabled" @click="onStartUpload" cls="pull-right mar-top mar-bottom">
      {{ $t("upload") }}
    </app-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { UploaderService } from "@/app/shared/services/upload-service/uploader-service";
import AppFileUploader from "./app-file-uploader.vue"
import AppFilesSelection from "./app-files-selection.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { UploaderState } from "./types";
import { ApiException } from "../../services/volateq-api/api-errors";
import { FileUploader } from "../../services/upload-service/file-uploader";
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
  @Prop({ default: false }) disableAfterUpload!: boolean;

  uploaderState = UploaderState.SELECTING;
  uploading = false;
  
  error: ApiException | null = null;
  showErrorAlert = false;
  
  showUploadButton = true;

  cancelLoading = false;

  async created() {
    this.registerUploaderEvents();
  }

  get hasStateSelecting(): boolean {
    return this.uploaderState === UploaderState.SELECTING;
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
  get hasStateCanceled(): boolean {
    return this.uploaderState === UploaderState.CANCELED;
  }

  @CatchError()
  async onFilesSelected(files: File[] | null): Promise<void> {
    this.uploaderService.fileUploaders = [];
    if (files) {
      await this.uploaderService.addFiles(files);
    }
  }

  @CatchError()
  async onStartUpload(): Promise<void> {
    await this.uploaderService.doUpload();
  }

  @CatchError("cancelLoading")
  async onCancelUploadClick(): Promise<void> {
    if (!confirm(this.$t("sure-to-cancel-upload").toString())) {
      return;
    }

    await this.uploaderService.cancelUpload();
  }

  get files(): FileUploader[] {
    return this.uploaderService.fileUploaders;
  }

  get uploadButtonDisabled(): boolean {
    return this.files.length === 0 || this.uploading;
  }

  get disableFilesSelection(): boolean {
    return this.uploading || !this.showUploadButton;
  }

  get errorTrials(): number {
    return this.uploaderService.getTrials();
  }

  private registerUploaderEvents() {
    this.uploaderService.onStartUpload(() => {
      this.uploaderState = UploaderState.UPLOADING;

      this.uploading = true;

      this.error = null;
      this.showErrorAlert = false;
    });

    this.uploaderService.onResume(() => {
      this.uploaderState = UploaderState.UPLOADING;

      this.error = null;
      this.showErrorAlert = false;
    });

    this.uploaderService.onError(e => {
      this.uploaderState = UploaderState.RETRYING;

      this.uploading = true;
      this.error = e;
      this.showErrorAlert = true;
    });

    this.uploaderService.onUploadComplete(() => {
      this.uploaderState = UploaderState.COMPLETED;

      this.showUploadButton = !this.disableAfterUpload;
      this.uploading = false;

      this.showSuccess(this.$t("upload-completed-successfully").toString(), false);
    });

    this.uploaderService.onUploadCanceled(() => {
      this.uploaderState = UploaderState.CANCELED;

      this.showUploadButton = !this.disableAfterUpload;
      this.uploading = false;
      this.error = null;
      this.showErrorAlert = false;
    });
  }
}
</script>
