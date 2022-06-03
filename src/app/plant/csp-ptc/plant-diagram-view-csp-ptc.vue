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
import { KeyFigureColors } from "../shared/visualization/layers/types";
    

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

  numberBoxes: DiagramNumberBox[] | null = null;
  tableFilter: TableFilterRequest | null = null;

  labelUnit = "";

  async created() {
    await super.created();
  }

  onAnalysisSelected() {
    this.updateMappings();
  }

  private updateMappings() {
    for (const cspPtcMapping of allCspPtcMappings) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
          cspPtcMapping.resultMapping,
          this.firstAnalysisResult!
        );

      analysisResultMappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);

      const columnsMapping = analysisResultMappingHelper.getColumnsMapping();
      const diagramEntries = analysisResultMappingHelper.getDiagramEntries();
            
      const columnsSelection = this.getColumnsSelection(diagramEntries, columnsMapping);
      cspPtcMapping.tableFilter = {
        component_filter: { component_id: 0 /* plant */, grouped: true },
        columns_selection: { columns: columnsSelection },
      };

      cspPtcMapping.numberBoxes = this.getNumberBoxes(diagramEntries, columnsMapping);
    }
  }

  private getColumnsSelection(
    diagramEntries: AnalysisResultMappings<any>,
    columnsMapping: Record<string, string>
  ): TableColumnSelect[] {
    const columnsSelection: TableColumnSelect[] = [];
    for (const entry of diagramEntries) {
      const columnName = columnsMapping[entry.transName];

      if (entry.filterType === FilterFieldType.BOOLEAN) {
        columnsSelection.push({
          name: columnName,
          func: "sum",
        });
      } else if (entry.keyFigureId === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID) {
        for (let i = this.firstAnalysisResult!.csp_ptc.glass_tube_temperature_class_count; i > 1; i--) {
          columnsSelection.push({
            name: columnName,
            func: "count",
            func_condition: {
              compare_mode: "equal",
              compare_values: [i],
            },
            label: columnName + "_" + i,
          });
        }
      } else if (entry.keyFigureId === ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID) {
        for (const recActionClass of [3, 2]) {
          columnsSelection.push({
            name: columnName,
            func: "count",
            func_condition: {
              compare_mode: "equal",
              compare_values: [recActionClass],
            },
            label: columnName + "_" + recActionClass,
          });
        }
      }
    }

    return columnsSelection;
  }

  private getNumberBoxes(
    diagramEntries: AnalysisResultMappings<any>,
    columnsMapping: Record<string, string>
  ): DiagramNumberBox[] {
    const numberBoxes: DiagramNumberBox[] = [];
    for (const entry of diagramEntries) {
      const numberBox: DiagramNumberBox = {
        keyFigure: this.firstAnalysisResult!.key_figures.find(keyFigure => keyFigure.id === entry.keyFigureId)!,
        id: entry.keyFigureId + '_' + entry.transName,
        displayName: this.$t(entry.transName).toString(),
        columnName: columnsMapping[entry.transName],
        precision: 0,
        active: false,
        loaded: false,
        color: KeyFigureColors.red,
      };

      let colorMap: Record<number, string> = {};
      if (entry.keyFigureId === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID) {
        numberBox.nums = [];

        if (this.firstAnalysisResult!.csp_ptc.glass_tube_temperature_class_count === 4) {
          colorMap = { 4: KeyFigureColors.red, 3: KeyFigureColors.orange, 2: KeyFigureColors.yellow };
        } else {
          colorMap = { 3: KeyFigureColors.red, 2: KeyFigureColors.yellow };
        }
        
        for (let i = this.firstAnalysisResult!.csp_ptc.glass_tube_temperature_class_count; i > 1; i--) {
          numberBox.nums.push({
            displayName: this.$t("glass-tube-temperature-class-" + i).toString(),
            columnName: numberBox.columnName + "_" + i,
            color: colorMap[i],
          });
        }
      } else if (entry.keyFigureId === ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID) {
        numberBox.nums = [];

        colorMap = { 3: KeyFigureColors.red, 2: KeyFigureColors.yellow };

        for (const recActionClass of [3, 2]) {
          numberBox.nums.push({
            displayName: this.$t("recommended-action-class-" + recActionClass).toString(),
            columnName: numberBox.columnName + "_" + recActionClass,
            color: colorMap[recActionClass],
          });
        }
      }

      numberBoxes.push(numberBox);
    }

    return numberBoxes;
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