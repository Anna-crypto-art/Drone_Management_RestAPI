<template>
  <div class="plant-view-diagram-csp-ptc">
    <app-diagram 
      :analysisResults="analysisResults" 
      :plant="plant"
      :componentSelection="componentIdSelection"
      :resultMappings="resultMappings"
      :tableFilter="tableFilter"
      :labelUnit="labelUnit"
    >
      <template #glass-tube-temperature-class>
        <b-form-select
          v-model="selectedGlassTubeTemperatureClass"
          :options="glassTubeTemperatureClassOptions"
          @change="onSelectedGlassTubeTemperatureClassChanged"
        >
          <template #first>
            <b-form-select-option :value="null"></b-form-select-option>
          </template>
        </b-form-select>
      </template>
    </app-diagram>
  </div>
</template>

<script lang="ts">
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop } from "vue-property-decorator";
import AppDiagram from "@/app/plant/shared/diagram/diagram.vue";
import { apiComponentsFilter } from "@/app/shared/services/volateq-api/api-components/api-components-filter";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { allCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping";
import { AnalysisSelectionService } from "../shared/analysis-selection-sidebar/analysis-selection-service";
import { AnalysisSelectionEvent } from "../shared/analysis-selection-sidebar/types";
import { BvSelectOption } from "@/app/shared/types";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";

@Component({
  name: "app-plant-diagram-view-csp-ptc",
  components: {
    AppExplanation,
    AppDiagram,
  },
})
export default class AppPlantDiagramViewCspPtc extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];

  selectedAnalysisResult: AnalysisResultDetailedSchema | null = null;

  selectedGlassTubeTemperatureClass: number | null = null;

  tableFilter: TableFilterRequest | null = null;
  labelUnit = "";

  async created() {
    AnalysisSelectionService.on(
      this.plant.id,
      AnalysisSelectionEvent.ANALYSIS_SELECTED,
      (selectedAnalysisResultId: string | undefined) => {
        this.selectedAnalysisResult = this.analysisResults
          .find(analysisResult => analysisResult.id === selectedAnalysisResultId) || null;
      }
    );
  }

  get componentIdSelection(): ApiComponent[] {
    return [ApiComponent.CSP_PTC_SUBFIELD, ApiComponent.CSP_PTC_LOOP, ApiComponent.CSP_PTC_SCA];
  }

  get resultMappings(): { componentId: ApiComponent, resultMapping: AnalysisResultMappings<any> }[] {
    return allCspPtcMappings;
  }

  get glassTubeTemperatureClassOptions(): BvSelectOption[] {
    const classOptions: BvSelectOption[] = [];

    if (this.selectedAnalysisResult!.csp_ptc.glass_tube_temperature_class_count === 4) {
      classOptions.push({ value: "4", text: this.$t(`glass-tube-temperature-class-4`).toString() });
      classOptions.push({ value: "3", text: this.$t(`glass-tube-temperature-class-3`).toString() });
    } else {
      classOptions.push({ value: "3", text: this.$t(`glass-tube-temperature-class-4`).toString() });
    }
    classOptions.push({ value: "2", text: this.$t(`glass-tube-temperature-class-2`).toString() });

    return classOptions;
  }

  onSelectedGlassTubeTemperatureClassChanged() {
    if (this.selectedGlassTubeTemperatureClass) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
        analysisResultCspPtcMappingHce, 
        this.selectedAnalysisResult!
      );

      const columnName = analysisResultMappingHelper.getColumnsMapping()['glass-tube-temperature-class'];

      // ignore multi in the first step
      const glassTubeClass = this.selectedGlassTubeTemperatureClass;

      this.tableFilter = {
        filters: { [columnName]: glassTubeClass },
        columns_selection: {
          columns: [{ name: columnName, func: "count" }],
        }
      };

      this.labelUnit = "Count";
    } else {
      this.tableFilter = null;
      this.labelUnit = "";
    }
  }
}
</script>


<style>
  .plant-view-diagram-csp-ptc {
    padding: 60px 40px;
  }
</style>