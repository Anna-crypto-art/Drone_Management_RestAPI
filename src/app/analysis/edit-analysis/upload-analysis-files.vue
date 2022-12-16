<template>
  <div>
    <b-alert :show="!uploadAllowed" variant="info">
      {{ $t("upload-not-allowed_descr") }}
    </b-alert>
    
    <app-analysis-uploader v-if="uploadAllowed" :analysis="analysis" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppAnalysisUploader from "@/app/analysis/shared/analysis-uploader.vue";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";

@Component({
  name: "app-upload-analysis-files",
  components: {
    AppAnalysisUploader,
  },
})
export default class AppUploadAnalysisFiles extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  get uploadAllowed(): boolean {
    return this.analysis && this.analysis.current_state.state.id < ApiStates.DATA_COMPLETE_VERIFIED || false;
  }
}
</script>