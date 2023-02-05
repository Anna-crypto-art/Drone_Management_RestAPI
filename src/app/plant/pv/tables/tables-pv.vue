<template>
  <div class="app-tables-pv">
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
import { allPvMappings } from "@/app/shared/services/volateq-api/api-results-mappings/pv/analysis-result-pv-mapping"
import { ITablesComponent, TableResultComponent } from "@/app/plant/shared/table-component/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-tables-csp-ptc",
  components: {
    AppTablesComponent,
  },
})
export default class AppTablesPv extends BaseAuthComponent implements ITablesComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  componentResultMappings = allPvMappings

  activeComponents: TableResultComponent[] = [
    { componentId: ApiComponent.PV_MODULE },
    { componentId: ApiComponent.PV_TRACKER },
  ];
}
</script>
