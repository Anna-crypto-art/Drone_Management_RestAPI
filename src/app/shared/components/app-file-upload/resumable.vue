<template>
  <div class="resumable"></div>
</template>

<script lang="ts">
import Vue from "vue";
import ResumableJs from "resumablejs";
import { Component, Prop } from "vue-property-decorator";
import { IResumable, IResumableFile } from "@/app/shared/components/app-file-upload/types";

@Component({
  name: "resumable",
})
export default class Resumable extends Vue implements IResumable {
  @Prop({ required: true }) target!: string;
  @Prop({ required: true }) dropzoneId!: string;
  @Prop() browseButtonId: string | undefined;
  
  private resumable!: ResumableJs;  

  created() {
    this.resumable = new ResumableJs({
      target: this.target,
    });

    this.resumable.on("fileSuccess", (file: any) => {
      this.$emit("fileSuccess", file);
    });
    this.resumable.on("fileProgress", (file: any) => {
      this.$emit("fileProgress", file);
    });
    this.resumable.on("fileRetry", (file: any) => {
      this.$emit("fileRetry", file);
    });
    this.resumable.on("fileError", (file: any, msg: string) => {
      this.$emit("fileError", file, msg);
    });
    this.resumable.on("fileAdded", (file: any) => {
      this.$emit("fileAdded", file);
    });
    this.resumable.on("progress", () => {
      this.$emit("progress");
    });
  }

  get files(): IResumableFile[] {
    return this.resumable.files;
  }

  mounted() {
    const el = document.getElementById(this.dropzoneId);
    if (!el) {
      throw new Error(`No HTML-Element found with id='${this.dropzoneId}'`);
    }
    this.resumable.assignDrop(el);
    
    if (this.browseButtonId) {
      const browseBtnEl = document.getElementById(this.browseButtonId);
      if (!browseBtnEl) {
        throw new Error(`No HTML-Element found with id='${this.browseButtonId}'`);
      }
      this.resumable.assignBrowse(browseBtnEl, false);
    }
  }

  cancel() {
    this.resumable.cancel();
  }

  progress(): number {
    return this.resumable.progress();
  }

  upload() {
    this.resumable.upload();
  }

  setBearerToken(token: string) {
    this.resumable.opts.headers = { "Authorization": `Bearer ${token}`}
  }
}
</script>

<style lang="scss">
</style>
