<template>
  <div class="app-file-upload">
    <div id="file-upload-dropzone-id" class="app-file-upload-dropzone">
      <div class="app-file-upload-dropzone-content">
        <h3 v-if="title" class="app-file-upload-dropzone-content-title">{{ title }}</h3>
        <slot></slot>
      </div>
      <div class="app-file-upload-dropzone-browsebutton">
        <b-button variant="primary" id="file-upload-browsebutton-id">{{ $t('browse...') }}</b-button>
      </div>
      <div class="app-file-upload-dropzone-files" style="margin-top: 30px;" :key="keyResumFiles" v-show="keyResumFiles > 0">
        <app-file-upload-file v-for="file in files" :key="file.uniqueIdentifier" ref="uploadFiles"
          :uploading="uploading"
          :file="file"
          @fileRemoved="onFileRemoved">
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
import resumable from "@/app/shared/services/resumable/resumable";
import { IResumableFile, ResumableEvent, ResumableState } from "../../services/resumable/types";

@Component({
  name: "app-file-upload",
  components: {
    AppFileUploadFile
  }
})
export default class AppFileUpload extends Vue implements IAppFileUpload {
  @Ref() uploadFiles!: IAppFileUploadFile[];
  @Prop() title: string | undefined;
  
  keyResumFiles = 0; // changing the value forces vue to rerender the element with :key="keyResumFiles"
  uploading = false;

  mounted(): void {
    if (resumable.hasState(ResumableState.UPLOADING)) {
      this.uploading = true;
      this.keyResumFiles = resumable.files.length;
    } else {
      resumable.init("file-upload-dropzone-id", "file-upload-browsebutton-id");
    }
    
    resumable.on(ResumableEvent.FILE_SUCCESS, (file: IResumableFile) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitSuccess();
      }
    });
    resumable.on(ResumableEvent.FILE_ERROR, (file: IResumableFile, msg: string) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitError(msg);
      }
    });
    resumable.on(ResumableEvent.FILE_PROGRESS, (file: IResumableFile) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitProgress();
      }
    });
    resumable.on(ResumableEvent.FILE_RETRY, (file: IResumableFile) => {
      const uploadFile = this.getFileUploadFile(file);
      if (uploadFile) {
        uploadFile.emitRetry();
      }
    });
    resumable.on(ResumableEvent.FILE_ADDED, (file: IResumableFile) => {
      this.keyResumFiles += 1;
      this.$emit("fileAdded")
    });
    resumable.on(ResumableEvent.COMPLETED, () => {
      this.$emit("completed");
    });
    resumable.on(ResumableEvent.FAILED, () => {
      this.$emit("failed");
    });
  }

  upload<T>(target: string, metadata?: T): void {
    this.uploading = true;
    this.keyResumFiles += 100;
    
    resumable.upload<T>(target, metadata);
  }
  
  get files(): IResumableFile[] {
    return resumable.files;
  }

  cancel(): void {
    resumable.cancel();

    this.uploading = false;
    this.keyResumFiles -= 100;
  }

  getFileUploadFile(file: IResumableFile): IAppFileUploadFile {
    return this.uploadFiles.find(uploadFile => uploadFile.uniqueIdentifier === file.uniqueIdentifier)!;
  }

  onFileRemoved(file: IResumableFile): void {
    this.keyResumFiles -= 1;
    this.$emit("fileRemoved")
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