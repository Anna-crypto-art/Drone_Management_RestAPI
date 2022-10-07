<template>
  <div class="app-tables-csp-ptc">
    <app-tables-component
      :activeComponents="activeComponents"
      :analyses="analyses"
      :plant="plant"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import analysisResultCspPtcMappingSceAngle from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import analysisResultCspPtcMappingScaOrientation from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sca";
import analysisResultCspPtcMappingMirror from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-mirror";
import AppTablesComponent from "@/app/plant/shared/table-component/tables-component.vue";
import { ITablesComponent } from "@/app/plant/shared/table-component/types";
import { IActiveComponent } from "@/app/plant/shared/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-tables-csp-ptc",
  components: {
    AppTablesComponent,
  },
})
export default class AppTablesCspPtc extends BaseAuthComponent implements ITablesComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  activeComponents: IActiveComponent[] = [
    {
      label: apiComponentNames[ApiComponent.CSP_PTC_ABSORBER],
      componentId: ApiComponent.CSP_PTC_ABSORBER,
      mapping: analysisResultCspPtcMappingIrIntensity as any,
    },
    {
      label: apiComponentNames[ApiComponent.CSP_PTC_SCE],
      componentId: ApiComponent.CSP_PTC_SCE,
      mapping: analysisResultCspPtcMappingSceAngle as any,
      descr: "sce_expl",
    },
    {
      label: apiComponentNames[ApiComponent.CSP_PTC_SCA],
      componentId: ApiComponent.CSP_PTC_SCA,
      mapping: analysisResultCspPtcMappingScaOrientation as any,
      descr: "sca_expl",
    },
    {
      label: apiComponentNames[ApiComponent.CSP_PTC_MIRROR],
      componentId: ApiComponent.CSP_PTC_MIRROR,
      mapping: analysisResultCspPtcMappingMirror as any,
    },
  ];
}
</script>
