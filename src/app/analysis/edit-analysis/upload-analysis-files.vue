<template>
  <div>
    <b-form-checkbox v-model="dataComplete" @change="onChangeDataComplete">
      {{ $t("data-complete") }} <app-explanation>{{ $t("data-complete_expl") }}</app-explanation>
    </b-form-checkbox>
    <app-analysis-upload :analysis="analysis" @startUpload="onStartUpload" @cancelUpload="onCancelUpload" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IUpdateEditAnalysis } from "./types";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-upload-analysis-files",
  components: {
    AppAnalysisUpload,
    AppExplanation,
  },
})
export default class AppUploadAnalysisFiles extends BaseAuthComponent implements IUpdateEditAnalysis {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  dataComplete = true;

  async updateAnalysis(analysis: AnalysisSchema) {
    this.analysis = analysis;
  }

  async onStartUpload(files: string[], done: (analysis: AnalysisSchema) => void) {
    try {
      await volateqApi.prepareAnalysisUpload(this.analysis.id, files);

      done(this.analysis);
  
      this.$emit("updateAnalysis");
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onCancelUpload(done: () => void) {
    try {
      await volateqApi.cancelAnalysisUpload(this.analysis.id);

      done();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onChangeDataComplete() {
    try {
      await volateqApi.updateAnalysis(this.analysis.id, { data_complete: this.dataComplete });
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }
}
</script>

<style lang="scss">
</style>
