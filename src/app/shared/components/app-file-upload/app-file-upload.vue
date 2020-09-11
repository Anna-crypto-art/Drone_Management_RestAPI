<template>
  <div class="app-file-upload">
    <resumable ref="resumable"
      target="/api/auth/resumable"
      dropzoneId="file-upload-dropzone-id"
      browseButtonId="file-upload-browsebutton-id"
      @fileAdded="onFileAdded">
    </resumable>
    <div id="file-upload-dropzone-id" class="app-file-upload-dropzone">
      <div class="app-file-upload-dropzone-content">
        <slot></slot>
      </div>
      <div class="app-file-upload-dropzone-browsebutton">
        <b-button variant="primary" id="file-upload-browsebutton-id">{{ $t('browse...') }}</b-button>
      </div>
      <div class="app-file-upload-dropzone-files" style="margin-top: 20px;" v-if="resumable" :key="keyResumFiles" v-show="keyResumFiles > 0">
        <app-file-upload-file v-for="file in files" :key="file.uniqueIdentifier"
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
import { IResumable, IResumableFile } from "@/app/shared/components/resumable/types";
import Resumable from "@/app/shared/components/resumable/resumable.vue";
import AppFileUploadFile from "@/app/shared/components/app-file-upload/app-file-upload-file.vue";
import { IAppFileUpload } from "@/app/shared/components/app-file-upload/types";

@Component({
  name: "app-file-upload",
  components: {
    Resumable,
    AppFileUploadFile
  }
})
export default class AppFileUpload extends Vue implements IAppFileUpload {
  @Ref() resumable!: IResumable

  keyResumFiles = 0;
  uploading = false;

  mounted() {
    this.resumable.setBearerToken(store.state.auth.token);
  }

  progress(): number {
    return this.resumable.progress();
  }

  upload() {
    this.uploading = true;
    this.keyResumFiles += 100;

    this.resumable.upload();
  }

  get files(): IResumableFile[] {
    return this.resumable.files;
  }

  cancel() {
    this.resumable.cancel();
  }

  onFileAdded(file: IResumableFile) {
    console.log("added: " + file.fileName);
    console.log("files.length: " + this.files.length);

    this.keyResumFiles += 1;

    this.$emit("fileAdded", file);
  }

  onFileRemoved(file: IResumableFile) {
    this.keyResumFiles -= 1;

    this.$emit("fileRemoved", file);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-file-upload {
  &-dropzone {
    background-color: $dark-10pc;
    // border 1px solid $blue-10pc;
    padding: 20px;

    &-content {
      margin-bottom: 20px;
    }
  }
}

</style>