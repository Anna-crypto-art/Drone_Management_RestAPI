<template>
  <div class="visual-pv">
    <app-visualization
      :plant="plant"
      :analyses="analyses"
      :componentLayerTypes="componentLayerTypes"
      :keyFigureLayers="keyFigureLayers"
    >
      <!-- 
        this template seems to be quite unnecessary. But keep it anyway!
        Because if we don't pass any slots, the settings section disappears (Bug of Vue2?)
       -->
      <template #pvTrackerSolingLevel3>
        {{ $t('pv-tracker-soiling-level-3') }}
      </template>
      <template #pvTrackerDeviation3>
        {{ getTransAlignmentOffsetClassLimit("tracker", 3) }}
      </template>
      <template #pvTrackerDeviation2>
        {{ getTransAlignmentOffsetClassLimit("tracker", 2) }}
      </template>
      <template #pvTrackerDeviation1>
        {{ getTransAlignmentOffsetClassLimit("tracker", 1) }}
      </template>
    </app-visualization>
  </div>
</template>

<script lang="ts">
import AppVisualization from "@/app/plant/shared/visualization/visualization.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { IAnalysisSelectionComponent } from "../../shared/selection-sidebar/analysis-selection/types";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSelectionService } from "../../shared/selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";

@Component({
  name: "app-visual-pv",
  components: {
    AppVisualization,
  },
})
export default class AppVisualPv extends BaseAuthComponent implements IAnalysisSelectionComponent {
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  analysisSelectionService!: AnalysisSelectionService;

  async mounted() {
    await AnalysisSelectionService.register(this);
  }

  async unmounted() {
    this.analysisSelectionService.unregister();
  }

  get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.firstAnalysisResult || null;
  }

  getTransAlignmentOffsetClassLimit(componentType: "tracker", classLimit: 1 | 2 | 3): string {
    if (!this.firstAnalysisResult) {
      return "";
    }

    let offsetClassLimits: number[] | null = null;
    let unit = "";
    if (componentType === "tracker") {
      offsetClassLimits = this.firstAnalysisResult.pv!.tracker_deviation_class_limits;
      unit = "°";
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

  async onAnalysisSelected() { /* stay blubby */ }
  async onMultiAnalysesSelected() { /* stay blubby */ }
}
</script>
