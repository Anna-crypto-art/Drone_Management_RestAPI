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
    </app-visualization>
  </div>
</template>

<script lang="ts">
import AppVisualization from "@/app/plant/shared/visualization/visualization.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { AnalysisSelectionBaseComponent } from "../../shared/analysis-selection-sidebar/analysis-selection-base-component";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-visual-pv",
  components: {
    AppVisualization,
  },
})
export default class AppVisualPv extends AnalysisSelectionBaseComponent {
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  async created() {
    await super.created();
  }
}
</script>
