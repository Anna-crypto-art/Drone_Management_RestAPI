<template>
  <div class="app-file-upload-file mar-bottom">
    <div class="app-file-upload-file-infos">
      <div class="app-file-upload-file-name">
        <small class="app-file-upload-file-name-size grayed">{{ fileSize }}</small>
        {{ file.fileName }}
      </div>
      <div v-show="!uploading" class="app-file-upload-file-remove" @click="onFileRemove">
        <b-icon icon="x"></b-icon>
      </div>
      <div v-show="uploading" class="app-file-upload-file-progress">
        <span v-show="!success">{{ progress }}%</span>
        <b-icon v-show="success" icon="check2" class="text-success"></b-icon>
      </div>
    </div>
    <div ref="uploadProgressBar" v-show="uploading" class="app-file-upload-file-progressbar"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { getReadableFileSize } from "@/app/shared/services/helper/file-helper";
import { FileUploader } from "../../services/upload-service/file-uploader";
import { UploaderService } from "../../services/upload-service/uploader-service";

@Component({
  name: "app-file-uploader",
})
export default class AppFileUploader extends Vue {
  @Prop({ required: true }) file!: FileUploader;
  @Prop({ required: true }) uploading!: boolean;
  @Prop({ required: true }) uploaderService!: UploaderService;
  @Ref() uploadProgressBar: HTMLElement | undefined;

  progress = 0;
  success = false;

  created() {
    this.file.onProgress(progress => {
      this.progress = progress;

      if (this.uploadProgressBar) {
        this.uploadProgressBar.style.width = this.progress + "%";
      }
    });
    this.file.onComplete(() => {
      this.success = true;

      if (this.uploadProgressBar) {
        this.uploadProgressBar.style.display = "none";
      }
      this.progress = 0;
    });
  }

  get fileSize(): string {
    return getReadableFileSize(this.file.size);
  }

  onFileRemove(): void {
    if (!this.uploading) {
      this.uploaderService.removeFile(this.file.fileName);
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-file-upload-file {
  width: 100%;
  background-color: $white;
  border: 1px solid $border-color-grey;
  position: relative;
  height: 30px;

  &-infos {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 0.25em 1em;
    line-height: 14px;
  }

  &-name {
    width: calc(100% - 80px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &-size {
      margin-right: 20px;
    }
  }

  &-remove {
    position: absolute;
    right: 15px;
    top: 8px;
    font-size: 1.25em;
    cursor: pointer;

    &:hover {
      color: $delete;
    }
  }

  &-progress {
    position: absolute;
    right: 15px;
    top: 6px;
  }

  &-progressbar {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $progressbar;
    width: 0;
    transition: ease 300ms width;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
