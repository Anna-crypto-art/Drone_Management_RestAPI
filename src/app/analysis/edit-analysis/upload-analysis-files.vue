<template>
  <div>
    <b-alert :show="!uploadAllowed" variant="info">
      {{ $t("upload-not-allowed_descr") }}
    </b-alert>
    
    <app-analysis-uploader v-if="uploadAllowed" :analysis="analysis" :droneOptions="droneOptions" :selectedDrone="selectedDrone" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppAnalysisUploader from "@/app/analysis/shared/analysis-uploader.vue";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";

@Component({
  name: "app-upload-analysis-files",
  components: {
    AppAnalysisUploader,
  },
})
export default class AppUploadAnalysisFiles extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
  @Prop({ default: null }) selectedDrone!: DroneSchema | null;
  @Prop({ default: [] }) droneOptions!:  Array<any>;

  get uploadAllowed(): boolean {
    return this.analysis && this.analysis.current_state!.state.id < ApiStates.DATA_COMPLETE_VERIFIED || false;
  }
}
</script>