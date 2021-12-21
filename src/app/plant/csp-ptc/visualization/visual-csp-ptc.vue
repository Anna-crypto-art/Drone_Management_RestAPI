<template>
  <div class="visual-csp-ptc">
    <app-visualization ref="visualization" 
      :plant="plant"
      :analysisResults="analysisResults"
      :componentLayerTypes="componentLayerTypes"
      :keyFigureLayers="keyFigureLayers">

      <template #pcs>
        {{ $t("pcs") }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
      </template>
      <template #irIntensity>
        {{ $t("ir-intensity-class") }} <app-explanation><span v-html="$t('ir-intensity-class_expl')"></span></app-explanation>
      </template>
      <template #glassTubeTemperature>
        {{ $t("glass-tube-temperature-class") }} <app-explanation><span v-html="$t('glass-tube-temperature-class_expl')"></span></app-explanation>
      </template>
      <template #missingGhr>
        {{ $t("missing-gct") }} <app-explanation><span v-html="$t('missing-gct_expl')"></span></app-explanation>
      </template>
      <template #O2Penetration>
        {{ $t("oxygen-penetration") }} <app-explanation><span v-html="$t('oxygen-penetration_expl')"></span></app-explanation>
      </template>
      <template #H2Concentration>
        {{ $t("high-hydrogen-concentration") }} <app-explanation><span v-html="$t('high-hydrogen-concentration_expl')"></span></app-explanation>
      </template>
      <template #recommendedAction>
        {{ $t("recommended-action") }} <app-explanation><span v-html="$t('recommended-action_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass1>
        {{ $t("recommended-action-class-1") }} <app-explanation><span v-html="$t('recommended-action-class-1_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass2>
        {{ $t("recommended-action-class-2") }} <app-explanation><span v-html="$t('recommended-action-class-2_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass3>
        {{ $t("recommended-action-class-3") }} <app-explanation><span v-html="$t('recommended-action-class-3_expl')"></span></app-explanation>
      </template>
      <template #sceOrientation>
        {{ $t("alignment-offset") }} <app-explanation><span v-html="$t('sce-alignment-offset_expl')"></span></app-explanation>
      </template>
      <template #sceOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit('sce', 3) }}
      </template>
      <template #sceOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit('sce', 2) }}
      </template>
      <template #sceOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit('sce', 1) }}
      </template>
       <template #scaOrientation>
        {{ $t("tracking-offset") }} <app-explanation><span v-html="$t('tracking-offset_expl')"></span></app-explanation>
      </template>
      <template #scaOrientOffsetClass3>
        {{ getTransAlignmentOffsetClassLimit('sca', 3) }}
      </template>
      <template #scaOrientOffsetClass2>
        {{ getTransAlignmentOffsetClassLimit('sca', 2) }}
      </template>
      <template #scaOrientOffsetClass1>
        {{ getTransAlignmentOffsetClassLimit('sca', 1) }}
      </template>
      <template #scaFriction>
        {{ $t("torsion-caused-friction-mean") }} <app-explanation><span v-html="$t('torsion-caused-friction-mean_expl')"></span></app-explanation>
      </template>
      <template #scaSdx>
        {{ $t("slope-deviation") }} <app-explanation><span v-html="$t('slope-deviation_expl')"></span></app-explanation>
      </template>

    </app-visualization>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from 'vue-property-decorator';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import AppGeovisualization from "@/app/shared/components/app-geovisualization/app-geovisualization.vue";
import { IOpenLayersComponent } from '@/app/shared/components/app-geovisualization/types/components';
import { IAnalysisResultSelection } from '@/app/plant/shared/types';
import { IPlantVisualization, Legend } from '@/app/plant/shared/visualization/types';
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from './layers';


@Component({
  name: 'app-visual-csp-ptc',
  components: {
    AppGeovisualization,
    AppExplanation
  }
})
export default class AppVisualCspPtc extends BaseAuthComponent implements IAnalysisResultSelection, IPlantVisualization {
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() visualization!: IAnalysisResultSelection & IPlantVisualization;

  selectAnalysisResult(analysisResultId: string | undefined): void {
    this.visualization.selectAnalysisResult(analysisResultId);
  }

  get selectedAnalysisResult(): AnalysisResultDetailedSchema | null | undefined {
    return this.visualization.selectedAnalysisResult;
  }

  get openLayers(): IOpenLayersComponent {
    return this.visualization.openLayers;
  }

  onLayerSelected(selected: boolean, legend?: Legend): void {
    return this.visualization.onLayerSelected(selected, legend);
  }

  getTransAlignmentOffsetClassLimit(component_type: 'sce' | 'sca', class_limit: 1 | 2 | 3): string {
    if (!this.selectedAnalysisResult) {
      return "";
    }

    const offset_class_limits: number[] | null = this.selectedAnalysisResult.csp_ptc[component_type + '_orientation_offset_class_limits'];

    if (offset_class_limits === null) {
      return "";
    }

    if (class_limit === 1) {
      return this.$t("alignment-offset-class-1", { limit0: offset_class_limits[0] }).toString();
    } 
    if (class_limit === 2) {
      return this.$t("alignment-offset-class-2", { limit1: offset_class_limits[1], limit0: offset_class_limits[0] }).toString();
    }
    if (class_limit === 3) {
      return this.$t("alignment-offset-class-3", { limit1: offset_class_limits[1] }).toString();
    }

    throw new Error("class_limit not allowed");
  }
}
</script>