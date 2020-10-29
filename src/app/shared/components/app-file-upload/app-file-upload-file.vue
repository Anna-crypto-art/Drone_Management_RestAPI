<template>
  <div class="app-file-upload-file">
    <div class="app-file-upload-file-infos">
      <div class="app-file-upload-file-name">
        <small class="app-file-upload-file-name-size grayed">{{ getFileSize(file.size) }}</small>
        {{ file.fileName }}
        <span v-show="error" class="app-file-upload-file-name-error" v-bind:class="{ 'text-danger': !retry }">
          {{ retry && $t("retrying...") || error }}
        </span>
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
import { IAppFileUploadFile } from "@/app/shared/components/app-file-upload/types";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";
import { IResumableFile } from "@/app/shared/services/resumable/types";

@Component({
  name: "app-file-upload-file",
})
export default class AppFileUploadFile extends Vue implements IAppFileUploadFile {
  @Prop({ required: true }) file!: IResumableFile;
  @Prop({ required: true }) uploading!: boolean;
  @Ref() uploadProgressBar: HTMLElement | undefined;

  progress = 0;
  error = "";
  retry = false;
  success = false;

  created() {
    if (this.uploading) {
      this.emitProgress();

      if (this.progress === 100) {
        this.emitSuccess();
      }
    }
  }

  get uniqueIdentifier(): string {
    return this.file.uniqueIdentifier;
  }

  getFileSize(size: number): string {
    const sizes = ["KB", "MB", "GB", "TB"];

    let i = 0;
    do {
      size = size / 1024;
    } while (size > 1024 && ++i < sizes.length)

    return `${Math.round(size)} ${sizes[i]}`;
  }

  onFileRemove(): void {
    this.file.cancel();

    this.$emit('fileRemoved', this.file);
  }

  emitError(msg: string): void {
    try {
      const erroMsg = JSON.parse(msg);
      if (erroMsg.error) {
        this.error = erroMsg.error;
      }
    } catch {
      console.error(msg);
      this.error = ApiErrors.SOMETHING_WENT_WRONG;
    }

    this.success = false;
    this.retry = false;
  }

  emitRetry(): void {
    this.success = false;
    this.retry = true;
  }

  emitProgress(): void {
    this.progress = Math.round(this.file.progress(false) * 100);
    this.error = "";
    this.retry = false;

    if (this.uploadProgressBar) {
      this.uploadProgressBar.style.width = this.progress + "%";
    }
  }

  emitSuccess(): void {
    this.error = "";
    this.retry = false;
    this.progress = 0;
    this.success = true;

    if (this.uploadProgressBar) {
      this.uploadProgressBar.style.display = "none";
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-file-upload-file {
  margin-bottom: 10px;
  width: 100%;
  background-color: $white;
  border: 1px solid $dark-20pc;
  position: relative;
  height: 38px;

  &-infos {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 0.45rem 1.2rem;
    line-height: 20px;
  }

  &-name {
    width: calc(100% - 80px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &-size {
      margin-right: 20px;
    }

    &-error {
      margin-left: 20px;
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
    top: 8px;
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