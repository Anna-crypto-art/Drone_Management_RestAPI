<template>
  <div class="plant-view-diagram-csp-ptc">
    <app-diagram-overview
      :plant="plant"
      :analyses="analyses" 
      :resultMappings="resultMappings"
      :componentSelection="componentIdSelection"
    />
  </div>
</template>

<script lang="ts">
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { allCspPtcMappings } from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping";
import { TableColumnSelect, TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisSelectionBaseComponent } from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-base-component";
import AppDiagramOverview from "@/app/plant/shared/diagram/diagram-overview.vue";
import { DiagramNumberBox, DiagramResultMappings } from "../shared/diagram/types";
import { FilterFieldType } from "../shared/filter-fields/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { KeyFigureColors } from "../shared/visualization/layers/types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
    

@Component({
  name: "app-plant-diagram-view-csp-ptc",
  components: {
    AppExplanation,
    AppDiagramOverview,
  },
})
export default class AppPlantDiagramViewCspPtc extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  resultMappings: DiagramResultMappings[] = [];

  numberBoxes: DiagramNumberBox[] | null = null;
  tableFilter: TableFilterRequest | null = null;

  async created() {
    await super.created();
  }

  async onAnalysisSelected() {
    this.updateMappings();
  }

  async onMultiAnalysesSelected() {
    this.updateMappings();
  }

  @CatchError()
  private updateMappings() {
    if (!this.firstAnalysisResult) {
      return;
    }

    const resultMappings: DiagramResultMappings[] = [];

    for (const cspPtcMapping of allCspPtcMappings) {
      const resultMapping: DiagramResultMappings = cspPtcMapping;

      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
          resultMapping.resultMapping,
          this.firstAnalysisResult,
        );

      analysisResultMappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);

      const columnsMapping = analysisResultMappingHelper.getColumnsMapping();
      const diagramEntries = analysisResultMappingHelper.getDiagramEntries();
            
      const columnsSelection = this.getColumnsSelection(diagramEntries, columnsMapping);

      resultMapping.tableFilter = {
        component_filter: { component_id: 0 /* plant */, grouped: true },
        columns_selection: { columns: columnsSelection },
      };

      if (resultMapping.componentId === ApiComponent.CSP_PTC_MIRROR) {
        // Speeds up query for table analysis_result_csp_ptc_mirror
        resultMapping.tableFilter.filters = { is_missing: true };
      }

      resultMapping.numberBoxes = this.getNumberBoxes(diagramEntries, columnsMapping);

      resultMappings.push(resultMapping);
    }

    this.resultMappings = resultMappings;
  }

  private getColumnsSelection(
    diagramEntries: AnalysisResultMappings<any>,
    columnsMapping: Record<string, string>
  ): TableColumnSelect[] {
    const columnsSelection: TableColumnSelect[] = [];
    for (const entry of diagramEntries) {
      const columnName = columnsMapping[entry.transName];

      if (entry.keyFigureId === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID) {
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
      } else if (entry.keyFigureId === ApiKeyFigure.SCA_TRACKING_DEVIATION_ID || 
        entry.keyFigureId === ApiKeyFigure.SCE_ALIGNMENT_ID || 
        entry.keyFigureId === ApiKeyFigure.SCA_SDX_ID ||
        entry.keyFigureId === ApiKeyFigure.SCE_SDX_ID ||
        entry.keyFigureId === ApiKeyFigure.SCA_FRICTION_ID)
      {
        const classLimits = {
          [ApiKeyFigure.SCA_TRACKING_DEVIATION_ID]: this.firstAnalysisResult!.csp_ptc.sca_tracking_encoder_offset_class_limits,
          [ApiKeyFigure.SCE_ALIGNMENT_ID]: this.firstAnalysisResult!.csp_ptc.sce_alignment_deviation_to_drive_class_limits,
          [ApiKeyFigure.SCA_SDX_ID]: this.firstAnalysisResult!.csp_ptc.sdx_rms_class_limits,
          [ApiKeyFigure.SCE_SDX_ID]: this.firstAnalysisResult!.csp_ptc.sdx_rms_class_limits,
          [ApiKeyFigure.SCA_FRICTION_ID]: this.firstAnalysisResult!.csp_ptc.sca_torsion_class_limits,
        }[entry.keyFigureId];

        columnsSelection.push({
          name: columnName,
          func: "count",
          func_condition: {
            compare_mode: "greater",
            compare_values: [classLimits[1] - 0.001], // greaterEqual
          },
          label: columnName + "_" + 3,
        });
        columnsSelection.push({
          name: columnName,
          func: "count",
          func_condition: {
            compare_mode: "between", // postgresql between is inclusive (<= and >=)
            compare_values: [classLimits[0], classLimits[1] - 0.001],
          },
          label: columnName + "_" + 2,
        });
      } else if (entry.filterType === FilterFieldType.BOOLEAN) {
        columnsSelection.push({
          name: columnName,
          func: "sum",
        });
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
        loaded: false,
        color: KeyFigureColors.diagramRed,
        historyActive: false,
        areasActive: false,
      };

      let colorMap: Record<number, string> = { 3: KeyFigureColors.diagramRed, 2: KeyFigureColors.diagramYellow };

      if (entry.keyFigureId === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID) {
        numberBox.nums = [];

        if (this.firstAnalysisResult!.csp_ptc.glass_tube_temperature_class_count === 4) {
          colorMap = { 4: KeyFigureColors.diagramRed, 3: KeyFigureColors.orange, 2: KeyFigureColors.diagramYellow };
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

        for (const recActionClass of [3, 2]) {
          numberBox.nums.push({
            displayName: this.$t("recommended-action-class-" + recActionClass).toString(),
            columnName: numberBox.columnName + "_" + recActionClass,
            color: colorMap[recActionClass],
          });
        }
      } else if (entry.keyFigureId === ApiKeyFigure.SCA_TRACKING_DEVIATION_ID ||
        entry.keyFigureId === ApiKeyFigure.SCE_ALIGNMENT_ID) 
      {
        const classLimits = entry.keyFigureId === ApiKeyFigure.SCA_TRACKING_DEVIATION_ID ?
          this.firstAnalysisResult!.csp_ptc.sca_tracking_encoder_offset_class_limits :
          this.firstAnalysisResult!.csp_ptc.sce_alignment_deviation_to_drive_class_limits;

        numberBox.nums = [];

        for (const offsetClass of [3, 2]) {
          numberBox.nums.push({
            displayName: this.$t("alignment-offset-class-" + offsetClass, {
              limit0: classLimits[0],
              limit1: classLimits[1],
            }).toString(),
            columnName: numberBox.columnName + "_" + offsetClass,
            color: colorMap[offsetClass],
          });
        }
      } else if (entry.keyFigureId === ApiKeyFigure.SCA_SDX_ID ||
          entry.keyFigureId === ApiKeyFigure.SCE_SDX_ID) {
        const classLimits = this.firstAnalysisResult!.csp_ptc.sdx_rms_class_limits

        numberBox.nums = [];

        for (const slopeClass of [3, 2]) {
          numberBox.nums.push({
            displayName: this.$t("slope-deviation-class-" + slopeClass, {
              limit0: classLimits[0],
              limit1: classLimits[1],
            }).toString(),
            columnName: numberBox.columnName + "_" + slopeClass,
            color: colorMap[slopeClass],
          });
        }
      } else if (entry.keyFigureId === ApiKeyFigure.SCA_FRICTION_ID) {
        const classLimits = this.firstAnalysisResult!.csp_ptc.sca_torsion_class_limits

        numberBox.nums = [];

        for (const torsClass of [3, 2]) {
          numberBox.nums.push({
            displayName: this.$t("sca-torsion-class-" + torsClass, {
              limit0: classLimits[0],
              limit1: classLimits[1],
            }).toString(),
            columnName: numberBox.columnName + "_" + torsClass,
            color: colorMap[torsClass],
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
}
</script>


<style>
  .plant-view-diagram-csp-ptc {
    padding: 30px 20px;
  }
</style>