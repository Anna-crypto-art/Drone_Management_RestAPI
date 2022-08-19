<template>
  <div class="app-simple-file-upload">
    <b-form-file v-model="modelValue" :accept="accept"></b-form-file>
    <div v-if="uploadProgress && modelValue" class="mar-top">
      {{ $t('uploading') }}
      <b-progress :max="uploadProgress.total">
        <b-progress-bar :value="uploadProgress.loaded" variant="success">
          <span v-if="uploadProgress.loaded === uploadProgress.total">
            {{ $t("upload-succes-filename", { filename: modelValue.name }) }}
          </span>
          <span v-if="uploadProgress.loaded < uploadProgress.total">
            {{ Math.round(uploadProgress.loaded / uploadProgress.total * 100) }}%
          </span>
        </b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { UploadProgress } from "./types";

@Component({
  name: "app-simple-file-upload",
})
export default class AppSimpleFileUpload extends Vue {
  @Prop({ required: true }) value!: File | null;
  @Prop({ required: true }) uploadProgress!: UploadProgress | null;
  @Prop({ default: "*" }) accept!: string;

  modelValue: File | null = null;

  created() {
    this.modelValue = this.value;
  }

  @Watch('modelValue') onModelValueChanged() {
    this.$emit('input', this.modelValue);
  }
}

</script>