<template>
  <div class="visual-csp-ptc">
    <app-visualization
      ref="visualization"
      :plant="plant"
      :analyses="analyses"
      :componentLayerTypes="componentLayerTypes"
      :keyFigureLayers="keyFigureLayers"
    >
    </app-visualization>
  </div>
</template>

<script lang="ts">
import { IPlantVisualization, Legend } from "@/app/plant/shared/visualization/types";
import AppVisualization from "@/app/plant/shared/visualization/visualization.vue";
import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import { AnalysisSelectionBaseComponent } from "../../shared/analysis-selection-sidebar/analysis-selection-base-component";
import { COMPONENT_LAYERS } from "./layers";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-visual-pv",
  components: {
    AppVisualization,
  },
})
export default class AppVisualPv
  extends AnalysisSelectionBaseComponent
  implements IPlantVisualization
{
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = [];

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  @Ref() visualization: IPlantVisualization | undefined;

  async created() {
    await super.created();
  }

  get openLayers(): IOpenLayersComponent | undefined {
    return this.visualization?.openLayers;
  }

  async onLayerSelected(selected: boolean, legend: Legend | undefined) {
    return await this.visualization?.onLayerSelected(selected, legend);
  }

  public hideToast(): void {
    this.visualization?.hideToast();
  }

  public get enableResultsModification(): boolean {
    return this.visualization!.enableResultsModification;
  }
}
</script>
