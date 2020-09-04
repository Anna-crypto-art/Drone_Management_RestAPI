<template>
  <div class="resumable">
    <div class="resumable-dropzone">
      <slot></slot>
    </div>
    <div class="resumable-browse-button">
      <slot name="browse-button"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ResumableJs from "resumablejs";
import { Component, Prop } from "vue-property-decorator";
// import store from "@/app/app-state";
import { IResumable, IResumableFile } from "@/app/shared/components/resumable/types";

@Component({
  name: "resumable",
})
export default class Resumable extends Vue implements IResumable {
  @Prop({ required: true }) target!: string;
  
  private resumable!: ResumableJs;  

  created() {
    this.resumable = new ResumableJs({
      target: this.target,
      // headers: { "Authorization": `Bearer ${store.state.auth.token}`}
    });

    this.resumable.on("fileSuccess", (file) => {
      this.$emit("onFileSuccess", file);
    });
    this.resumable.on("fileProgress", (file) => {
      this.$emit("onFileProgress", file);
    });
    this.resumable.on("fileRetry", (file) => {
      this.$emit("onFileRetry", file);
    });
    this.resumable.on("fileError", (file, msg) => {
      this.$emit("onFileError", file, msg);
    });
    this.resumable.on("fileAdded", (file) => {
      this.$emit("onFileAdded", file);
    });
    this.resumable.on("progress", () => {
      this.$emit("onProgress");
    });
    
  }

  mounted() {
    const dropzone = this.$el.querySelector(".resumable-dropzone");
    if (dropzone) {
      this.resumable.assignDrop(dropzone);
    }
    const browseBtn = this.$el.querySelector(".resumable-browse-button .btn");
    if (browseBtn) {
      this.resumable.assignBrowse(browseBtn, false);
    }
  }

  cancel() {
    this.resumable.cancel();
  }

  progress() {
    this.resumable.progress();
  }
  
  getFiles(): IResumableFile[] {
    return <IResumableFile[]>this.resumable.files;
  }

  setBearerToken(token: string) {
    this.resumable.opts.headers = { "Authorization": `Bearer ${token}`}
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";

</style>
