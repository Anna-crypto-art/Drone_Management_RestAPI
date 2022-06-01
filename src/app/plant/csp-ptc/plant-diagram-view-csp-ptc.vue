<template>
  <div class="plant-view-diagram-csp-ptc">
    <app-diagram-overview
      :plant="plant"
      :analysisResults="analysisResults" 
      :resultMappings="resultMappings"
    />
    <app-diagram 
      :plant="plant"
      :analysisResults="analysisResults" 
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
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import AppDiagram from "@/app/plant/shared/diagram/diagram.vue";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { allCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping";
import { BvSelectOption } from "@/app/shared/types";
import { TableColumnSelect, TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisSelectionBaseComponent } from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-base-component";
import AppDiagramOverview from "@/app/plant/shared/diagram/diagram-overview.vue";
import { DiagramNumberBox, DiagramResultMappings } from "../shared/diagram/types";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import AppDiagramHistory from "@/app/plant/shared/diagram/diagram-history.vue";
import { FilterFieldType } from "../shared/filter-fields/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
    

@Component({
  name: "app-plant-diagram-view-csp-ptc",
  components: {
    AppExplanation,
    AppDiagram,
    AppDiagramOverview,
    AppDiagramHistory,
  },
})
export default class AppPlantDiagramViewCspPtc extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];

  selectedGlassTubeTemperatureClass: number | null = null;

  tableFilter: TableFilterRequest | null = null;
  labelUnit = "";

  async created() {
    await super.created();
  }

  onAnalysisSelected() {
    this.setTableFilters();
  }

  private setTableFilters() {
    for (const cspPtcMapping of allCspPtcMappings) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
          cspPtcMapping.resultMapping,
          this.firstAnalysisResult!
        );

      analysisResultMappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);

      const columnsMapping = analysisResultMappingHelper.getColumnsMapping();
      const diagramEntries = analysisResultMappingHelper.getDiagramEntries();

      if (cspPtcMapping.componentId === ApiComponent.CSP_PTC_ABSORBER) {
        const columnsSelection: TableColumnSelect[] = [];
        for (const entry of diagramEntries) {
          if (entry.filterType === FilterFieldType.BOOLEAN) {
            columnsSelection.push({
              name: columnsMapping[entry.transName],
              func: "sum",
            });
          } else if (entry.keyFigureId === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID) {
            columnsSelection.push({
              name: columnsMapping[entry.transName],// + ": "
                // + this.$t("glass-tube-temperature-class-" 
                //   + this.firstAnalysisResult!.csp_ptc.glass_tube_temperature_class_count).toString(),
              func: "count",
              func_condition: {
                compare_mode: "equal",
                compare_values: [this.firstAnalysisResult!.csp_ptc.glass_tube_temperature_class_count],
              },
            });
          } else if (entry.keyFigureId === ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID) {
            columnsSelection.push({
              name: columnsMapping[entry.transName],// + ": " + this.$t("recommended-action-class-3").toString(),
              func: "count",
              func_condition: {
                compare_mode: "equal",
                compare_values: [3]
              },
            })
          }
        }
        
        cspPtcMapping.tableFilter = {
          component_filter: { component_id: 0 /* plant */, grouped: true },
          columns_selection: { columns: columnsSelection },
        };
      }
    }
  }

  get componentIdSelection(): ApiComponent[] {
    return [ApiComponent.CSP_PTC_SUBFIELD, ApiComponent.CSP_PTC_LOOP, ApiComponent.CSP_PTC_SCA];
  }

  get resultMappings(): DiagramResultMappings[] {
    return allCspPtcMappings;
  }

  get glassTubeTemperatureClassOptions(): BvSelectOption[] {
    if (!this.firstAnalysisResult) {
      return [];
    }

    const classOptions: BvSelectOption[] = [];

    if (this.firstAnalysisResult.csp_ptc.glass_tube_temperature_class_count === 4) {
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
        this.firstAnalysisResult!
      );

      const columnName = analysisResultMappingHelper.getColumnsMapping()['glass-tube-temperature-class'];

      // ignore multi in the first step
      const glassTubeClass = this.selectedGlassTubeTemperatureClass;

      this.tableFilter = {
        filters: { [columnName]: glassTubeClass },
        columns_selection: {
          columns: [{ name: columnName, func: "sum" }],
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
    padding: 30px 20px;
  }
</style>