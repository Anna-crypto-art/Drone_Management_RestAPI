<template>
  <div class="app-file-upload-file" :key="rerender">
    <div class="app-file-upload-file-infos">
      <div class="app-file-upload-file-name">
        {{ file.fileName }}
        <span v-show="error" class="app-file-upload-file-name-error" v-bind:class="{ 'text-danger': !retry }">
          {{ retry && $t("retrying...") || error }}
        </span>
      </div>
      <div class="app-file-upload-file-size"><small class="grayed">{{ getFileSize(file.size) }}</small></div>
      <div v-show="!uploading" class="app-file-upload-file-remove" @click="onFileRemove">
        <b-icon icon="x"></b-icon>
      </div>
      <div v-show="uploading" class="app-file-upload-file-progress">
        <span v-show="!success">{{ progress }}%</span>
        <b-icon v-show="success" icon="check2" class="text-success"></b-icon>
      </div>
      
    </div>
    <div v-show="uploading" class="app-file-upload-file-progressbar" :style="`width: ${progress}%`"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IAppFileUploadFile, IResumableFile } from "@/app/shared/components/app-file-upload/types";
import { ApiErrors } from "../../services/volateq-api/api-errors";

@Component({
  name: "app-file-upload-file",
})
export default class AppFileUploadFile extends Vue implements IAppFileUploadFile {
  @Prop({ required: true }) file!: IResumableFile;
  @Prop({ required: true }) uploading!: boolean;

  rerender = 0;

  progress = 0;
  error = "";
  retry = false;
  success = false;

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
    this.retry = false;

    ++this.rerender;
  }

  emitRetry(): void {
    this.retry = true;

    ++this.rerender;
  }

  emitProgress(): void {
    this.progress = Math.round(this.file.progress(false) * 100);
    this.error = "";
    this.retry = false;

    ++this.rerender;
  }

  emitSuccess(): void {
    this.error = "";
    this.retry = false;
    this.progress = 0;
    this.success = true;

    ++this.rerender;
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
  height: 60px;

  &-infos {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 10px 20px;
    height: 40px;
    line-height: 20px;
  }

  &-name {
    width: calc(100% - 80px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &-error {
      margin-left: 20px;
    }
  }

  &-remove {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1.25em;
    cursor: pointer;

    &:hover {
      color: $delete;
    }
  }

  &-progress {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  &-progressbar {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $progressbar;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

</style>