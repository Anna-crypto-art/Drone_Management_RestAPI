<template>
  <div class="visual-csp-ptc">
    <app-map-view 
      :plant="plant"
      :componentLayerTypes="componentLayerTypes" 
      :analyses="analyses"
      :keyFigureLayers="keyFigureLayers"
    />
    

    <!--
    <app-visualization
      :plant="plant"
      :analyses="analyses"
      :componentLayerTypes="componentLayerTypes"
      :keyFigureLayers="keyFigureLayers"
    >
      <template #glassTubeTemperatureClass3>
        {{
          (firstAnalysisResult &&
            (firstAnalysisResult.csp_ptc.glass_tube_temperature_class_count === 3
              ? $t("glass-tube-temperature-class-4")
              : $t("glass-tube-temperature-class-3"))) ||
          ""
        }}
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
      <template #scaOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("sca", 3) }}
      </template>
      <template #scaOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("sca", 2) }}
      </template>
      <template #scaOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("sca", 1) }}
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
      <template #hcePositionSupportOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("hce", 3) }}
      </template>
      <template #hcePositionSupportOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("hce", 2) }}
      </template>
      <template #hcePositionSupportOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("hce", 1) }}
      </template>
      <template #hcePositionCenterOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit("hce", 3) }}
      </template>
      <template #hcePositionCenterOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit("hce", 2) }}
      </template>
      <template #hcePositionCenterOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit("hce", 1) }}
      </template>
    </app-visualization>
    -->
  </div>
</template>

<script lang="ts">
import AppVisualization from "@/app/plant/shared/visualization/visualization.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue"
import AppButton from "@/app/shared/components/app-button/app-button.vue"
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IAnalysisSelectionComponent } from "../../shared/selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../../shared/selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import AppMapView from "@/app/plant/shared/map-view/map-view.vue";

@Component({
  name: "app-visual-csp-ptc",
  components: {
    AppVisualization,
    AppExplanation,
    AppModalForm,
    AppButton,
    AppMapView,
  },
})
export default class AppVisualCspPtc extends BaseAuthComponent implements IAnalysisSelectionComponent {
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  analysisSelectionService!: AnalysisSelectionService;

  async created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
  }

  async mounted() {
    await this.analysisSelectionService?.register();
  }

  async unmounted() {
    this.analysisSelectionService?.unregister();
  }

  getTransAlignmentOffsetClassLimit(componentType: "sce" | "sca" | "hce", classLimit: 1 | 2 | 3): string {
    if (!this.firstAnalysisResult) {
      return "";
    }

    let offsetClassLimits: number[] | null = null;
    let unit = "";
    if (componentType === "sce") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc!.sce_alignment_deviation_to_drive_class_limits;
      unit = "°";
    } else if (componentType === "sca") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc!.sca_tracking_encoder_offset_class_limits;
      unit = "°";
    } else if (componentType === "hce") {
      offsetClassLimits = this.firstAnalysisResult.csp_ptc!.hce_position_total_class_limits;
      unit = "[mm]";
    }

    if (offsetClassLimits === null) {
      return "";
    }

    if (classLimit === 1) {
      return this.$t("alignment-offset-class-1", { limit0: offsetClassLimits[0], unit }).toString();
    }
    if (classLimit === 2) {
      return this.$t("alignment-offset-class-2", {
        limit1: offsetClassLimits[1],
        limit0: offsetClassLimits[0],
        unit,
      }).toString();
    }
    if (classLimit === 3) {
      return this.$t("alignment-offset-class-3", {
        limit1: offsetClassLimits[1],
        unit,
      }).toString();
    }

    throw new Error("class_limit not allowed");
  }

  get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.firstAnalysisResult || null;
  }
}
</script>
