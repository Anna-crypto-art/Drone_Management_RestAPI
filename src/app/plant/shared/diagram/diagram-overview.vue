<template>
  <div class="diagram-overview">
    <app-box :title="$t('overview-of-pis')" :loading="loading">
      <div class="diagram-overview-group"> 
        <app-diagram-number-box v-for="numberBox in numberBoxes" 
          :key="numberBox.keyFigure.id + '_' + numberBox.keyFigureName"
          :name="numberBox.keyFigureName"
          :num="numberBox.num"
          :variant="numberBox.variant"
          :diff="numberBox.diff"
          :unit="numberBox.unit"
          :active="numberBox.active"
          :showActionButton="analysisResults.length > 1"
          @actionButtonClick="onActionButtonClick"
        >
          <template #historyDiagram>
            <app-diagram-history
              :plant="plant"
              :keyFigure="numberBox.keyFigure"
              :keyFigureName="numberBox.keyFigureName"
              :analysisResult="firstAnalysisResult"
              :analysisResults="analysisResults"
              :resultMappings="resultMappings"
              :load="numberBox.active"
            />
          </template>
        </app-diagram-number-box>
      </div>
    </app-box>
  </div>
</template>

<script lang="ts">
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import {
  AnalysisResultMappings,
} from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import AppDiagramNumberBox  from "@/app/plant/shared/diagram/diagram-number-box.vue";
import { DiagramNumberBox, DiagramResultMappings, GroupedAnalysisResult } from "./types";
import { TableColumnSelect, TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { FilterFieldType } from "../filter-fields/types";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import AppDiagramHistory from "@/app/plant/shared/diagram/diagram-history.vue";

@Component({
  name: "app-diagram-overview",
  components: {
    AppButton,
    AppBox,
    AppDiagramNumberBox,
    AppDiagramHistory,
  },
})
export default class AppDiagramOverview extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() resultMappings!: DiagramResultMappings[];

  loading = false;
  viewedNumberBox: DiagramNumberBox | null = null;

  numberBoxes: DiagramNumberBox[] = [];

  async created(): Promise<void> {
    await super.created();
  }

  onActionButtonClick(keyFigureName: string) {
    if (this.viewedNumberBox) {
      this.viewedNumberBox.active = false;

      if (this.viewedNumberBox.keyFigureName === keyFigureName) {
        this.viewedNumberBox = null;
        return;
      }
      
      this.viewedNumberBox = null;
    }

    this.viewedNumberBox = this.numberBoxes.find(numberBox => numberBox.keyFigureName === keyFigureName) || null;

    if (this.viewedNumberBox) {
      this.viewedNumberBox.active = true;
    }
  }

  protected async onAnalysisSelected() {
    if (this.firstAnalysisResult) {
      await this.updateNumberBoxes();
    }
  }

  protected async onMultiAnalysesSelected() {
    if (this.firstAnalysisResult && this.compareAnalysisResult) {
      await this.updateNumberBoxes();
    }
  }

  private getTableFilter(
    diagramEntries: AnalysisResultMappings<AnalysisResultSchemaBase, any>,
    columnsMapping: Record<string, string>
  ): TableFilterRequest | undefined {
    const columnsSelection: TableColumnSelect[] = [];

    for (const entry of diagramEntries) {
      columnsSelection.push({
        name: columnsMapping[entry.transName],
        func: entry.filterType === FilterFieldType.BOOLEAN ? "sum" : "avg",
      });
    }

    if (columnsSelection.length > 0) {
      const tableFilter: TableFilterRequest = {
        component_filter: { component_id: 0 /* plant */, grouped: true },
        columns_selection: { columns: columnsSelection },
      };

      return tableFilter;
    }

    return undefined;
  }
  
  private async updateNumberBoxes(): Promise<void> {
    this.loading = true;

    this.numberBoxes = [];

    for (const resultMapping of this.resultMappings) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
        resultMapping.resultMapping,
        this.firstAnalysisResult!
      );

      analysisResultMappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);

      const columnsMapping = analysisResultMappingHelper.getColumnsMapping();
      const diagramEntries = analysisResultMappingHelper.getDiagramEntries();
      const tableFilter = resultMapping.tableFilter || this.getTableFilter(diagramEntries, columnsMapping);

      if (tableFilter) {
        const groupedResult: GroupedAnalysisResult = (this.compareAnalysisResult ?
          await volateqApi.getSpecificAnalysisResultCompared<GroupedAnalysisResult>(
            this.firstAnalysisResult!.id,
            resultMapping.componentId,
            this.compareAnalysisResult.id,
            { limit: 1 },
            tableFilter
          ) :
          await volateqApi.getSpecificAnalysisResult<GroupedAnalysisResult>(
            this.firstAnalysisResult!.id,
            resultMapping.componentId,
            { limit: 1 },
            tableFilter
          )
        ).items[0];

        for (const entry of diagramEntries) {
          const columnName = columnsMapping[entry.transName];
          const columnNameDiff = this.compareAnalysisResult ? columnName + "__diff" : null;

          const precision = entry.unit === "Count" ? 0 : 3;

          let variant: string | null = null;
          let plusSymbol = "";   
          if (columnNameDiff) {
            const diffValue = groupedResult[columnNameDiff] as number;
            if (diffValue < 0) {
              variant = "success";
            } else if (diffValue === 0) {
              variant = "default";
            } else if (diffValue > 0) {
              variant = "danger";
              plusSymbol = "+";
            }
          }
          
          this.numberBoxes.push({
            keyFigure: this.firstAnalysisResult!.key_figures.find(keyFigure => keyFigure.id === entry.keyFigureId)!,
            keyFigureName: entry.transName,
            num: MathHelper.roundTo(groupedResult[columnName] as number, precision),
            diff: columnNameDiff ? plusSymbol + MathHelper.roundTo(groupedResult[columnNameDiff] as number, precision) : null,
            variant: variant,
            unit: entry.unit || null,
            active: false,
          });
        }
      }
    }

    this.loading = false;
  } 
}
</script>

<style lang="scss">
.diagram-overview {
  &-group {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
