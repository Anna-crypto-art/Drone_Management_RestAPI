<template>
  <div class="app-tables-csp-ptc">
    <app-tables-component
      :componentResultMappings="componentResultMappings"
      :tableResultComponents="activeComponents"
      :analyses="analyses"
      :plant="plant"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import AppTablesComponent from "@/app/plant/shared/table-component/tables-component.vue";
import { ITablesComponent, TableResultComponent } from "@/app/plant/shared/table-component/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { allCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping";

@Component({
  name: "app-tables-csp-ptc",
  components: {
    AppTablesComponent,
  },
})
export default class AppTablesCspPtc extends BaseAuthComponent implements ITablesComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  componentResultMappings = allCspPtcMappings

  activeComponents: TableResultComponent[] = [
    { componentId: ApiComponent.CSP_PTC_ABSORBER },
    { componentId: ApiComponent.CSP_PTC_SCE, descr: "sce_expl" },
    { componentId: ApiComponent.CSP_PTC_SCA, descr: "sca_expl" },
    { componentId: ApiComponent.CSP_PTC_MIRROR },
    { componentId: ApiComponent.CSP_PTC_SWIVEL },
  ];
}
</script>
