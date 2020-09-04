<template>
  <div class="app-file-upload">
    <resumable ref="resumable" target="/api/auth/resumable"
      @onFileAdded="fileAdded"
      @onFileProgress="fileProgress">
      <div class="app-file-upload-dropzone">

      </div>
    </resumable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import store from "@/app/app-state";
import { IResumable, IResumableFile } from "@/app/shared/components/resumable/types";
import Resumable from "@/app/shared/components/resumable/resumable.vue";

@Component({
  name: "app-file-upload",
  components: {
    Resumable,
  }
})
export default class AppFileupload extends Vue {
  @Ref() resumable!: IResumable

  fileAdded(file: IResumableFile) {
    // ...
  }

  fileProgress(file: IResumableFile) {
    // ...
  }
}
</script>

<style lang="scss">
</style>