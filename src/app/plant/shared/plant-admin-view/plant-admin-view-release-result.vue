<template>
  <div class="app-plant-admin-view-release-result">
    <b-alert :show="showAnalysisNotFinished" variant="info" class="mar-top">
      {{ $t("analysis-not-finished_descr") }}
    </b-alert>
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
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component'
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { ApiStates } from '@/app/shared/services/volateq-api/api-states';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';


@Component({
  name: "app-plant-admin-view-release-result",
  components: {
    AppBox,
    AppButton,
  }
})
export default class AppPlantAdminViewReleaseResult extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ default: null }) analysisResult!: AnalysisResultDetailedSchema | null; 
  
  analysisResultReleased: boolean | null = null;
  analysisState: ApiStates | null = null;

  async created() {
    await this.analysisResultChanged();
  }

  @Watch('analysisResult') async analysisResultChanged() {
    if (this.analysisResult) {
      this.analysisResultReleased = this.analysisResult.released;
      this.analysisState = (await volateqApi.getAnalysis(this.analysisResult.analysis_id)).current_state.state.id;
    }
  }

  async onReleaseChanged() {
    try {
      if (this.analysisResult) {
        await volateqApi.updateAnalysisResult(this.analysisResult.id, {
          release: this.analysisResultReleased!,
        });

        this.analysisResult.released = this.analysisResultReleased!; 

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
    return this.analysisResult?.analysis.name || "";
  }

  get showAnalysisNotFinished(): boolean {
    return this.analysisResultReleased && this.analysisState !== ApiStates.FINISHED || false;
  }
}
</script>