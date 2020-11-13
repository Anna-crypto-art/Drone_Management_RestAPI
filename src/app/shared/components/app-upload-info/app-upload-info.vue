<template>
  <div class="app-upload-info">
    <div class="app-upload-info-centered">
      
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import resumable from "@/app/shared/services/resumable/resumable";
import { IResumableFile, ResumableEvent, ResumableState } from "../../services/resumable/types";

@Component({
  name: "app-upload-info",
})
export default class AppUploadInfo extends Vue {
  mounted() {
    resumable.on(ResumableEvent.COMPLETED, (file: IResumableFile) => {
      
    });
    resumable.on(ResumableEvent.FAILED, (file: IResumableFile, msg: string) => {
      
    });
    resumable.on(ResumableEvent.PROGRESS, () => {
      
    });
    resumable.on(ResumableEvent.FILE_RETRY, (file: IResumableFile, retries: number, maxRetries: number) => {
      
    });
  }

  updated() {
    if (resumable.hasState(ResumableState.FAILED)) {

    } else if (resumable.hasState(ResumableState.PAUSED)) {
      
    } else if (resumable.hasState(ResumableState.UPLOADING)) {

    } else if (resumable.hasState(ResumableState.RETRYING)) {

    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.app-upload-info {
  position: fixed;
  left: 50%;
  bottom: 50px;

  &-centered {
    position: relative;
    left: -50%;
    width: 600px;
    max-width: 100%;
    background-color: $background-grey;
  }
}
</style>