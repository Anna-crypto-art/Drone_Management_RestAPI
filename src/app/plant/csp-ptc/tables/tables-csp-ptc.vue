<template>
  <div class="app-tables-csp-ptc">
    <app-tables-component ref="tablesComponent" :activeComponents="activeComponents" :analysisResults="analysisResults" :plant="plant" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import analysisResultCspPtcMappingSceAngle from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import analysisResultCspPtcMappingScaOrientation from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sca";
import analysisResultCspPtcMappingMirror from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-mirror";
import AppTablesComponent from "@/app/plant/shared/table-component/tables-component.vue";
import { ITablesComponent } from "@/app/plant/shared/table-component/types";
import { IActiveComponent, IAnalysisResultSelection } from "@/app/plant/shared/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

@Component({
  name: "app-tables-csp-ptc",
  components: {
    AppTablesComponent,
  },
})
export default class AppTablesCspPtc extends BaseAuthComponent implements ITablesComponent, IAnalysisResultSelection {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];

  @Ref() tablesComponent!: IAnalysisResultSelection;

  activeComponents: IActiveComponent[] = [
    {
      componentId: AnalysisResultComponent.CSP_PTC_ABSORBER,
      mapping: analysisResultCspPtcMappingIrIntensity as any,
      label: "absorber-tubes",
    },
    {
      label: "single-collector-elements",
      componentId: AnalysisResultComponent.CSP_PTC_SCE,
      mapping: analysisResultCspPtcMappingSceAngle as any,
      descr: "sce_expl",
    },
    {
      label: "solar-collector-assembly",
      componentId: AnalysisResultComponent.CSP_PTC_SCA,
      mapping: analysisResultCspPtcMappingScaOrientation as any,
      descr: "sca_expl",
    },
    {
      label: "mirrors",
      componentId: AnalysisResultComponent.CSP_PTC_MIRROR,
      mapping: analysisResultCspPtcMappingMirror as any,
    },
  ];

  selectAnalysisResult(analysisResultId: string | undefined): void {
    this.tablesComponent.selectAnalysisResult(analysisResultId);
  }
  get selectedAnalysisResult(): AnalysisResultDetailedSchema | null | undefined {
    return this.tablesComponent.selectedAnalysisResult;
  }
}
</script>
