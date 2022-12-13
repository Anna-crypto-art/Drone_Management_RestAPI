<template>
  <label class="app-file-input btn btn-primary" v-bind:class="{ disabled: disabled }">
    <input 
      ref="fileInputElement"
      type="file"
      class="app-file-input-file"
      :disabled="disabled"
      @click="onClick"
      @change="onChange"
      :accept="accept"
      :multiple="multiple" />
      {{ $t("browse") }}
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Ref } from "vue-property-decorator";

@Component({
  name: "app-file-input",
})
export default class AppFileInput extends Vue {
  @Prop({ required: true }) value!: File[] | null;
  @Prop({ default: true }) multiple!: boolean;
  @Prop({ default: "*" }) accept!: string;
  @Prop({ default: false }) disabled!: boolean;

  @Ref() fileInputElement!: HTMLInputElement;

  modelValue: File[] | null = null;

  created() {
    this.modelValue = this.value;
  }

  @Watch('modelValue') onModelValueChanged() {
    this.$emit('input', this.modelValue);
  }

  onClick() {
    this.fileInputElement.value = '';
  }

  onChange() {
    this.setFiles();
  }

  private setFiles() {
    if (!this.fileInputElement.files || this.fileInputElement.files.length === 0) {
      this.modelValue = null;
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < this.fileInputElement.files.length; i++) {
      files.push(this.fileInputElement.files[i]);
    }

    this.modelValue = files;
  }
}

</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.app-file-input-file {
  display: none;
}


</style>