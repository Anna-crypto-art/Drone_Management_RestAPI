<template>
  <div class="plant-view-csp-ptc-admin-panel">
    <b-container>
      <app-plant-admin-view-release-result :plant="plant" :analysisResult="selectedAnalysisResult" />
      <app-plant-admin-view-change-history :analysisResult="selectedAnalysisResult" :layers="layers" />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppPlantAdminViewReleaseResult from "@/app/plant/shared/plant-admin-view/plant-admin-view-release-result.vue"
import AppPlantAdminViewChangeHistory from "@/app/plant/shared/plant-admin-view/plant-admin-view-change-history.vue"
import { KEY_FIGURE_LAYERS } from "./visualization/layers";

@Component({
  name: "app-plant-admin-view-csp-ptc",
  components: {
    AppPlantAdminViewReleaseResult,
    AppPlantAdminViewChangeHistory,
  },
})
export default class AppPlantAdminViewCspPtc extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ default: null }) selectedAnalysisResult!: AnalysisResultDetailedSchema | null; 
  
  layers = KEY_FIGURE_LAYERS
}
</script>

<style lang="scss">
</style>
