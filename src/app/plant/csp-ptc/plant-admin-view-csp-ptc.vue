<template>
  <div class="plant-view-csp-ptc-admin-panel">
    <b-container>
      <b-row>
        <b-col sm="6">
          <app-box :title="$t('analysis-visibility-of', { analysisName: analysisResultName })">
            <b-form-checkbox
              v-show="analysisResultReleased !== null"
              v-model="analysisResultReleased"
              switch
              @change="onReleaseChanged"
            >
              {{ analysisResultReleased ? $t("released") : $t("invisible-for-customer") }}
            </b-form-checkbox>
          </app-box>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";

@Component({
  name: "app-plant-admin-view-csp-ptc",
  components: {
    AppButton,
    AppBox
  },
})
export default class AppPlantAdminViewCspPtc extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ default: null }) selectedAnalysisResult: AnalysisResultDetailedSchema | null = null; 
  
  analysisResultReleased: boolean | null = null;

  @Watch('selectedAnalysisResult') selectedAnalysisResultChanged() {
    if (this.selectedAnalysisResult) {
      this.analysisResultReleased = this.selectedAnalysisResult.released;
    }
  }

  async onReleaseChanged() {
    try {
      if (this.selectedAnalysisResult) {
        await volateqApi.updateAnalysisResult(this.selectedAnalysisResult.id, {
          release: this.analysisResultReleased as boolean,
        });

        const msg = this.analysisResultReleased ? 
          this.$t("analysis-result-released-success").toString() :
          this.$t("analysis-result-locked-success").toString();

        this.showSuccess(msg);
      }
    } catch (e) {
      this.showError(e);
    }
  }

  get analysisResultName(): string {
    return this.selectedAnalysisResult?.analysis.name || "";
  }
}
</script>

<style lang="scss">
</style>
