<template>
  <div class="app-file-selection mar-bottom" v-bind:class="{ dragging: dragging }" @drop="onDrop" @dragover="onDragOver" @dragleave="onDragLeave">
    <slot />

    <div class="app-file-selection-button mar-bottom">
      <app-file-input v-model="fileButtonSelection" />
    </div>

    <slot name="files" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import AppFileInput from "./app-file-input.vue";

@Component({
  name: "app-files-selection",
  components: {
    AppFileInput,
  }
})
export default class AppFilesSelection extends Vue {
  fileButtonSelection: File[] | null = null;
  fileDropSelection: File[] | null = null;

  dragging = false;

  emitFiles() {
    this.$emit("filesSelected", this.fileDropSelection || this.fileButtonSelection);
  }

  @Watch("fileButtonSelection") onFileButtonSelectionChanged() {
    if (this.fileButtonSelection) {
      this.fileDropSelection = null;
    }

    this.emitFiles();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();

    this.dragging = false;

    const files: File[] = [];

    // if (e.dataTransfer!.items) {
    //   for (let i = 0; i < e.dataTransfer!.items.length; i++) {
    //     const item = e.dataTransfer!.items[i];
    //     if (item.kind === 'file') {
    //       const itemFile = item.getAsFile();
    //       if (itemFile) {
    //         files.push(itemFile);
    //       }
    //     }
    //   }
    // } else {
      [...(e.dataTransfer!.files as any)].forEach(file => {
        files.push(file);
      })
      // for (let i = 0; i < e.dataTransfer!.files!.length; i++) {
      //   files.push(e.dataTransfer!.files[i]);
      // }
    // }

    this.fileButtonSelection = null;

    if (files.length > 0) {
      this.fileDropSelection = files;
    } else {
      this.fileDropSelection = null;
    }

    console.log(files);
    console.log(e.dataTransfer!.files!.length);
    console.log(e.dataTransfer!.files[0]);
    console.log("fileDropSelection")
    console.log(this.fileDropSelection)

    this.emitFiles();
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();

    this.dragging = true;
  }

  onDragLeave() {
    this.dragging = false;
  }

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.app-file-selection {
  background-color: $background-grey;
  padding: 1em;
  transition: 150ms ease background-color;

  &.dragging {
    background-color: $dark-20pc;
  }
}
</style>
