<template>
  <div class="app-file-selection mar-bottom" v-bind:class="{ dragging: dragging }" @drop="onDrop" @dragover="onDragOver" @dragleave="onDragLeave">
    <slot />

    <div class="app-file-selection-button mar-bottom">
      <b-form-file v-model="fileButtonSelection" @change="onFileButtonSelected" plain multiple></b-form-file>
    </div>

    <slot name="files" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "app-files-selection",
})
export default class AppFilesSelection extends Vue {
  fileButtonSelection: File[] | null = null;
  fileDropSelection: File[] | null = null;

  dragging = false;

  emitFiles() {
    this.$emit("filesSelected", this.fileDropSelection || this.fileButtonSelection);
  }

  onFileButtonSelected() {
    this.fileDropSelection = null;

    this.emitFiles();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();

    const files: File[] = [];

    if (e.dataTransfer?.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i];
        if (item.kind === 'file') {
          const itemFile = item.getAsFile();
          if (itemFile) {
            files.push(itemFile);
          }
        }
      }
    } else if (e.dataTransfer?.files) {
      for (let i = 0; i < e.dataTransfer?.files.length; i++) {
        files.push(e.dataTransfer.files[i]);
      }
    }

    if (files.length > 0) {
      this.fileDropSelection = files;
      this.fileButtonSelection = null;
    } else {
      this.fileButtonSelection = null;
    }

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
  padding: 0.5em;
  transition: 150ms ease border-color;

  &.dragging {
    border: 1px solid $blue;
  }
}
</style>
