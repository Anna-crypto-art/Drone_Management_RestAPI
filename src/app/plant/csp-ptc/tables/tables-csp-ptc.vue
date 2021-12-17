<template>
  <div class="app-tables-csp-ptc">
    <app-tables-component :activeComponents="ACTIVE_COMPONENTS">
    </app-tables-component>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IActiveComponent } from "./types";
import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import analysisResultCspPtcMappingSceAngle from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import analysisResultCspPtcMappingScaOrientation from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sca";
import analysisResultCspPtcMappingMirror from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-mirror";
import AppTablesComponent from "@/app/plant/shared/table-component/tables-component.vue";
import { ITablesComponent } from "../../shared/table-component/types";


@Component({
  name: "app-tables-csp-ptc",
  components: {
    AppTablesComponent
  }
})
export default class AppTablesCspPtc extends BaseAuthComponent implements ITablesComponent {
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
      mapping: analysisResultCspPtcMappingMirror as any
    }
  ];
}
</script>