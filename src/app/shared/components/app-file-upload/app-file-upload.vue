<template>
  <div class="app-file-upload">
    <resumable ref="resumable"
      dropzoneId="file-upload-dropzone-id"
      browseButtonId="file-upload-browsebutton-id"
      @fileAdded="onFileAdded"
      @fileSuccess="onFileSuccess"
      @fileProgress="onFileProgress"
      @fileRetry="onFileRetry"
      @fileError="onFileError">
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

  mounted() {
    this.resumable.setBearerToken(store.state.auth.token);
  }

  progress(): number {
    return this.resumable.progress();
  }

  upload(target: string) {
    this.uploading = true;
    this.keyResumFiles += 100;

    this.resumable.upload(target);
  }

  get files(): IResumableFile[] {
    return this.resumable.files;
  }

  cancel() {
    this.resumable.cancel();
  }

  getFileUploadFile(file: IResumableFile): IAppFileUploadFile {
    return this.uploadFiles.find(uploadFile => uploadFile.uniqueIdentifier === file.uniqueIdentifier)!;
  }

  onFileAdded(file: IResumableFile) {
    this.keyResumFiles += 1;

    this.$emit("fileAdded", file);
  }

  onFileRemoved(file: IResumableFile) {
    this.keyResumFiles -= 1;

    this.$emit("fileRemoved", file);
  }

  onFileSuccess(file: IResumableFile) {
    this.getFileUploadFile(file).emitSuccess();
  }
  onFileProgress(file: IResumableFile) {
    this.getFileUploadFile(file).emitProgress();
  }
  onFileError(file: IResumableFile, msg: string) {
    this.getFileUploadFile(file).emitError(msg);
  }
  onFileRetry(file: IResumableFile) {
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