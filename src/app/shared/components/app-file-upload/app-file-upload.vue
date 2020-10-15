<template>
  <div class="app-file-upload">
    <resumable ref="resumable"
      dropzoneId="file-upload-dropzone-id"
      browseButtonId="file-upload-browsebutton-id"
      @fileAdded="onFileAdded"
      @fileSuccess="onFileSuccess"
      @fileProgress="onFileProgress"
      @fileRetry="onFileRetry"
      @fileError="onFileError"
      @complete="onCompleted">
    </resumable>
    <div id="file-upload-dropzone-id" class="app-file-upload-dropzone">
      <div class="app-file-upload-dropzone-content">
        <h3 v-if="title" class="app-file-upload-dropzone-content-title">{{ title }}</h3>
        <slot></slot>
      </div>
      <div class="app-file-upload-dropzone-browsebutton">
        <b-button variant="primary" id="file-upload-browsebutton-id">{{ $t('browse...') }}</b-button>
      </div>
      <div class="app-file-upload-dropzone-files" style="margin-top: 20px;" v-if="resumable" :key="keyResumFiles" v-show="keyResumFiles > 0">
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
import store from "@/app/app-state";
import Resumable from "@/app/shared/components/app-file-upload/resumable.vue";
import AppFileUploadFile from "@/app/shared/components/app-file-upload/app-file-upload-file.vue";
import { IAppFileUpload, IAppFileUploadFile, IResumable, IResumableFile } from "@/app/shared/components/app-file-upload/types";

@Component({
  name: "app-file-upload",
  components: {
    Resumable,
    AppFileUploadFile
  }
})
export default class AppFileUpload extends Vue implements IAppFileUpload {
  @Ref() resumable!: IResumable;
  @Ref() uploadFiles!: IAppFileUploadFile[];
  @Prop() title: string | undefined;
  
  keyResumFiles = 0; // changing the value forces vue to rerender the element with :key="keyResumFiles"
  uploading = false;

  failedTimeout: any | undefined;

  mounted(): void {
    this.resumable.setBearerToken(store.state.auth.token);
  }

  progress(): number {
    return this.resumable.progress();
  }

  upload(target: string): void {
    this.uploading = true;
    this.keyResumFiles += 100;

    this.resumable.upload(target);
  }

  get files(): IResumableFile[] {
    return this.resumable.files;
  }

  cancel(): void {
    this.resumable.cancel();
  }

  getFileUploadFile(file: IResumableFile): IAppFileUploadFile {
    return this.uploadFiles.find(uploadFile => uploadFile.uniqueIdentifier === file.uniqueIdentifier)!;
  }

  onCompleted(): void {
    const errorFile = this.files.map(file => this.getFileUploadFile(file)).find(appFile => !appFile.success);
    if (!errorFile) { // Resumable does fire "completed"-Event even if the upload failed
      this.$emit("completed");
    }
  }

  onFileAdded(file: IResumableFile): void {
    this.keyResumFiles += 1;

    this.$emit("fileAdded", file);
  }

  onFileRemoved(file: IResumableFile): void {
    this.keyResumFiles -= 1;

    this.$emit("fileRemoved", file);
  }

  onFileSuccess(file: IResumableFile): void {
    this.getFileUploadFile(file).emitSuccess();
  }
  onFileProgress(file: IResumableFile): void {
    this.getFileUploadFile(file).emitProgress();
  }
  onFileError(file: IResumableFile, msg: string): void {
    // Resumable does not fire "error"-Event reliably
    // So let's use "fileError"-Event instead 

    this.failedTimeout = setTimeout(() => {
      this.$emit("failed", msg);
    }, 2000) // wait 2 secs for "fileRetry"-Event before fire

    this.getFileUploadFile(file).emitError(msg);
  }
  onFileRetry(file: IResumableFile): void {
    if (this.failedTimeout) {
      clearTimeout(this.failedTimeout);
      this.failedTimeout = undefined;
    }

    this.getFileUploadFile(file).emitRetry();
  }

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-file-upload {
  margin-bottom: 30px;

  &-dropzone {
    background-color: $dark-10pc;
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