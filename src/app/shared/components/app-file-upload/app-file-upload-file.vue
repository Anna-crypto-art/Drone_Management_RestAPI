<template>
  <div class="app-file-upload-file">
    <div class="app-file-upload-file-infos">
      <div class="app-file-upload-file-name">{{ file.fileName }}</div>
      <div class="app-file-upload-file-size"><small class="grayed">{{ getFileSize(file.size) }}</small></div>
      <div class="app-file-upload-file-remove">
        <b-icon icon="x"></b-icon>
      </div>
    </div>
    <div v-show="uploading" class="app-file-upload-file-infos" style="width: {{ progress }}%"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IResumable, IResumableFile } from "@/app/shared/components/resumable/types";

@Component({
  name: "app-file-upload-file",
})
export default class AppFileUploadFile extends Vue {
  @Prop({ required: true }) file!: IResumableFile;
  @Prop({ required: true }) uploading!: boolean;

  get progress() {
    return Math.round(this.file.progress(true) * 100);
  }

  getFileSize(size: number): string {
    const sizes = ["KB", "MB", "GB", "TB"];

    let i = 0;
    do {
      size = size / 1024;
    } while (size > 1024 && ++i < sizes.length)

    return `${Math.round(size)} ${sizes[i]}`;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

.app-file-upload-file {
  margin-bottom: 10px;
  width: 100%;
  background-color: $white;
  position: relative;

  &-infos {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 20px 10px;
  }
  &-remove {
    position: absolute;
    right: 10px;
    top: 5px;

    &:hover {
      color: $delete;
    }
  }
  &-progressbar {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $progressbar;
  }
}

</style>