<template>
  <div class="app-simple-file-upload">
    <b-form-file v-model="value" accept=".zip" @change="onFileChanged"></b-form-file>
    <div v-if="uploadProgress" class="mar-top">
      {{ $t('uploading') }}
      <b-progress :max="uploadProgress.total">
        <b-progress-bar :value="uploadProgress.loaded" variant="success">
          <span v-if="uploadProgress.loaded === uploadProgress.total">
            {{ $t("upload-succes-filename", { filename: value.name }) }}
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
export default class AppImportAnalysisResult extends Vue {
  @Prop({ required: true }) value!: File | null;
  @Prop({ required: true }) uploadProgress!: UploadProgress | null;

  onFileChanged() {
    this.$emit('input', this.value);
  }
}

</script>