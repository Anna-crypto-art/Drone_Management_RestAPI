<template>
  <div class="app-file-selection mar-bottom" v-bind:class="{ dragging: dragging }" @drop="onDrop" @dragover="onDragOver" @dragleave="onDragLeave">
    <slot />

    <div class="app-file-selection-button">
      <app-file-input v-model="fileButtonSelection" :disabled="disabled" />
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
  @Prop({ default: false }) disabled!: boolean;

  fileButtonSelection: File[] | null = null;
  fileDropSelection: File[] | null = null;

  dragging = false;

  emitFiles() {
    if (this.disabled) {
      return;
    }

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

    [...(e.dataTransfer!.files as any)].forEach(file => {
      files.push(file);
    })

    this.fileButtonSelection = null;

    if (files.length > 0) {
      this.fileDropSelection = files;
    } else {
      this.fileDropSelection = null;
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
  padding: 1em;
  transition: 150ms ease border-color;
  border: 1px dashed $background-grey;

  &.dragging {
    border-color: $blue;
  }
}
</style>
