<template>
  <div class="app-file-upload">
    <div id="file-upload-dropzone-id" class="app-file-upload-dropzone">
      <div class="app-file-upload-dropzone-content">
        <h3 v-if="title" class="app-file-upload-dropzone-content-title">{{ title }}</h3>
        <slot></slot>
      </div>
      <div class="app-file-upload-dropzone-browsebutton">
        <b-button variant="primary" id="file-upload-browsebutton-id">{{ $t("browse...") }}</b-button>
      </div>
      <div
        class="app-file-upload-dropzone-files"
        style="margin-top: 30px"
        :key="keyResumFiles"
        v-show="keyResumFiles > 0"
      >
        <app-file-upload-file
          v-for="file in files"
          :key="file.uniqueIdentifier"
          ref="uploadFiles"
          :uploadService="uploadService"
          :uploading="uploading"
          :file="file"
        >
        </app-file-upload-file>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import AppFileUploadFile from "@/app/shared/components/app-file-upload/app-file-upload-file.vue";
import { IAppFileUpload, IAppFileUploadFile } from "@/app/shared/components/app-file-upload/types";
import { UploadService } from "@/app/shared/services/upload-service/upload-service";
import { IResumableFile, IUploadListener, UploadEvent, UploadState } from "../../services/upload-service/types";

@Component({
  name: "app-file-upload",
  components: {
    AppFileUploadFile,
  },
})
export default class AppFileUpload extends Vue implements IAppFileUpload, IUploadListener {
  @Ref() uploadFiles!: IAppFileUploadFile[];

  @Prop({ required: true }) uploadService!: UploadService;
  @Prop() title: string | undefined;

  keyResumFiles = 0; // changing the value forces vue to rerender the element with :key="keyResumFiles"
  uploading = false;

  mounted(): void {
    this.checkUploadState();
    this.registerUploadEvents();
  }

  checkUploadState() {
    if (this.uploadService.hasState(UploadState.UPLOADING)) {
      this.uploading = true;
      this.keyResumFiles = this.uploadService.files.length;
    } else {
      this.uploadService.init("file-upload-dropzone-id", "file-upload-browsebutton-id");
    }
  }

  registerUploadEvents() {
    this.uploadService.on(UploadEvent.FILE_SUCCESS, (file: IResumableFile) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitSuccess();
      }
    });
    this.uploadService.on(UploadEvent.FILE_ERROR, (file: IResumableFile, msg: string) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitError(msg);
      }
    });
    this.uploadService.on(UploadEvent.FILE_PROGRESS, (file: IResumableFile) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitProgress();
      }
    });
    this.uploadService.on(UploadEvent.FILE_RETRY, (file: IResumableFile, retries: number) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitRetry();
      }
    });
    this.uploadService.on(UploadEvent.FILE_ADDED, (file: IResumableFile) => {
      this.keyResumFiles += 1;
    });
    this.uploadService.on(UploadEvent.FILE_REMOVED, (file: IResumableFile) => {
      this.keyResumFiles -= 1;
    });
  }

  upload<T>(target: string, metadata?: T): void {
    this.uploading = true;
    this.keyResumFiles += 100;

    this.uploadService.upload<T>(target, metadata);
  }

  get files(): IResumableFile[] {
    return this.uploadService.files;
  }

  cancel(): void {
    this.uploadService.cancel();

    this.uploading = false;
    this.keyResumFiles -= 100;
  }

  getFileUploadFile(file: IResumableFile): IAppFileUploadFile | undefined {
    return this.uploadFiles?.find(uploadFile => uploadFile.uniqueIdentifier === file.uniqueIdentifier);
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
