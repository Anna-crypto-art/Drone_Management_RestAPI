<template>
  <app-box :title="$t('analysis-file-actions')">
    <app-button type="button"
      :loading="plantCoverageLoading" 
      @click="onPlantCoverageClick"
    >
      {{ $t("check-drone-plant-coverage") }}
    </app-button>
  </app-box>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppBox from "@/app/shared/components/app-box/app-box.vue";

@Component({
  name: "app-analysis-file-actions",
  components: {
    AppButton,
    AppBox,
  },
})
export default class AppAnalysisFileActions extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  plantCoverageLoading = false;

  async onPlantCoverageClick() {
    this.plantCoverageLoading = true;
    try {
      if (this.analysis?.id) {
        const analysisDronePlantCoverage = await volateqApi.getDronePlantCoverage(this.analysis?.id);
        console.log(analysisDronePlantCoverage);
        this.showSuccess(this.$t('successfully-checked-drone-coverage').toString())
      }
    } catch (e) {
      this.showError(e);
    } finally {
      this.plantCoverageLoading = false;
    }
  }
}
</script>
