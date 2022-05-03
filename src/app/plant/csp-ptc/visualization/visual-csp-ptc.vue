<template>
  <div class="visual-csp-ptc">
    <app-visualization
      ref="visualization"
      :plant="plant"
      :analysisResults="analysisResults"
      :componentLayerTypes="componentLayerTypes"
      :keyFigureLayers="keyFigureLayers"
    >
      <template #pcs>
        {{ $t("pcs") }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
      </template>
      <template #irIntensity>
        {{ $t("ir-intensity-class") }}
        <app-explanation><span v-html="$t('ir-intensity-class_expl')"></span></app-explanation>
      </template>
      <template #glassTubeTemperature>
        {{ $t("glass-tube-temperature-class") }}
        <app-explanation><span v-html="$t('glass-tube-temperature-class_expl')"></span></app-explanation>
      </template>
      <template #missingGhr>
        {{ $t("missing-gct") }}
        <app-explanation><span v-html="$t('missing-gct_expl')"></span></app-explanation>
      </template>
      <template #O2Penetration>
        {{ $t("oxygen-penetration") }}
        <app-explanation><span v-html="$t('oxygen-penetration_expl')"></span></app-explanation>
      </template>
      <template #H2Concentration>
        {{ $t("high-hydrogen-concentration") }}
        <app-explanation><span v-html="$t('high-hydrogen-concentration_expl')"></span></app-explanation>
      </template>
      <template #glassTubeTemperatureClass3>
        {{
          (firstAnalysisResult &&
            (firstAnalysisResult.csp_ptc.glass_tube_temperature_class_count === 3
              ? $t("glass-tube-temperature-class-4")
              : $t("glass-tube-temperature-class-3"))) ||
          ""
        }}
      </template>
      <template #glassTubeTemperatureNotMeasured>
        {{ $t("not-measured") }}
        <app-explanation><span v-html="$t('not-measured-glass-tube-temp')"></span></app-explanation>
      </template>
      <template #recommendedAction>
        {{ $t("recommended-action") }}
        <app-explanation><span v-html="$t('recommended-action_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass1>
        {{ $t("recommended-action-class-1") }}
        <app-explanation><span v-html="$t('recommended-action-class-1_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass2>
        {{ $t("recommended-action-class-2") }}
        <app-explanation><span v-html="$t('recommended-action-class-2_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass3>
        {{ $t("recommended-action-class-3") }}
        <app-explanation><span v-html="$t('recommended-action-class-3_expl')"></span></app-explanation>
      </template>
      <template #sceOrientation>
        {{ $t("alignment-offset") }}
        <app-explanation><span v-html="$t('sce-alignment-offset_expl')"></span></app-explanation>
      </template>
      <template #sceOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sce", 3) }}
      </template>
      <template #sceOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sce", 2) }}
      </template>
      <template #sceOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sce", 1) }}
      </template>
      <template #scaOrientation>
        {{ $t("tracking-offset") }} <app-explanation><span v-html="$t('tracking-offset_expl')"></span></app-explanation>
      </template>
      <template #scaOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sca", 3) }}
      </template>
      <template #scaOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sca", 2) }}
      </template>
      <template #scaOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sca", 1) }}
      </template>
      <template #scaAvgOrientation>
        {{ $t("average-tracking-offset") }} <app-explanation><span v-html="$t('average-tracking-offset_expl')"></span></app-explanation>
      </template>
      <template #scaAvgOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sca", 3) }}
      </template>
      <template #scaAvgOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sca", 2) }}
      </template>
      <template #scaAvgOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sca", 1) }}
      </template>
      <template #scaFriction>
        {{ $t("torsion-caused-friction-mean") }}
        <app-explanation><span v-html="$t('torsion-caused-friction-mean_expl')"></span></app-explanation>
      </template>
      <template #scaSdx>
        {{ $t("slope-deviation") }}
        <app-explanation><span v-html="$t('slope-deviation_expl')"></span></app-explanation>
      </template>
      <template #hcePosition>
        {{ $t("hce-position-total-offset") }}
        <app-explanation><span v-html="$t('hce-position-offset_expl')"></span></app-explanation>
      </template>
      <template #hcePositionOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("hce", 3) }}
      </template>
      <template #hcePositionOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("hce", 2) }}
      </template>
      <template #hcePositionOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("hce", 1) }}
      </template>
    </app-visualization>
  </div>
</template>

<script lang="ts">
import { IPlantVisualization, Legend } from "@/app/plant/shared/visualization/types";
import AppVisualization from "@/app/plant/shared/visualization/visualization.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { AnalysisSelectionBaseComponent } from "../../shared/analysis-selection-sidebar/analysis-selection-base-component";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";

@Component({
  name: "app-visual-csp-ptc",
  components: {
    AppVisualization,
    AppExplanation,
  },
})
export default class AppVisualCspPtc
  extends AnalysisSelectionBaseComponent
  implements IPlantVisualization
{
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() visualization: IPlantVisualization | undefined;

  async created() {
    await super.created();
  }

  get openLayers(): IOpenLayersComponent | undefined {
    return this.visualization?.openLayers;
  }

  onLayerSelected(selected: boolean, legend?: Legend): void {
    return this.visualization?.onLayerSelected(selected, legend);
  }

  getTransAlignmentOffsetClassLimit(componentType: "sce" | "sca" | "hce", classLimit: 1 | 2 | 3): string {
    if (!this.firstAnalysisResult) {
      return "";
    }

    let offsetClassLimits: number[] | null = null;
    if (componentType === "sce") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc.sce_alignment_deviation_to_drive_class_limits;
    } else if (componentType === "sca") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc.sca_tracking_encoder_offset_class_limits;
    } else if (componentType === "hce") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc.hce_position_total_class_limits;
    }

    if (offsetClassLimits === null) {
      return "";
    }

    if (classLimit === 1) {
      return this.$t("alignment-offset-class-1", { limit0: offsetClassLimits[0] }).toString();
    }
    if (classLimit === 2) {
      return this.$t("alignment-offset-class-2", {
        limit1: offsetClassLimits[1],
        limit0: offsetClassLimits[0],
      }).toString();
    }
    if (classLimit === 3) {
      return this.$t("alignment-offset-class-3", {
        limit1: offsetClassLimits[1],
      }).toString();
    }

    throw new Error("class_limit not allowed");
  }
}
</script>
