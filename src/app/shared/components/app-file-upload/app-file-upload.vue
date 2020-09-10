<template>
  <div class="app-file-upload">
    <resumable ref="resumable"
      target="/api/auth/resumable"
      dropzoneId="file-upload-dropzone-id"
      browseButtonId="file-upload-browsebutton-id"
      @onFileAdded="fileAdded">
    </resumable>
    <div id="file-upload-dropzone-id" class="app-file-upload-dropzone">
      <div class="app-file-upload-dropzone-content">
        <slot></slot>
      </div>
      <div class="app-file-upload-dropzone-browsebutton">
        <b-button variant="primary" id="file-upload-browsebutton-id">{{ $t('browse...') }}</b-button>
      </div>
      <div class="app-file-upload-dropzone-files">
        <app-file-upload-file v-for="file in files" :key="file.uniqueIdentifier" :uploading="uploading"></app-file-upload-file>
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

  uploading = false;

  created() {
    this.resumable.setBearerToken(store.state.auth.token);
  }

  progress(): number {
    return this.resumable.progress();
  }

  upload() {
    this.uploading = true;

    this.resumable.upload();
  }

  get files(): IResumableFile[] {
    return this.resumable.files;
  }

  cancel() {
    this.resumable.cancel();
  }

  fileAdded(file: IResumableFile) {
    this.$emit("onFileAdded", file);
  }  
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-file-upload {
  &-dropzone {
    background-color: $blue-10pc;
    border: 1px solid $blue-40pc;
    padding: 20px;
  }
  &-content {
    margin-bottom: 20px;
  }
  &-browsebutton {
    margin-bottom: 20px;
  }
}

</style>