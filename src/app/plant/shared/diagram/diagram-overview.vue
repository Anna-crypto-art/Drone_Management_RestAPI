<template>
  <div class="diagram-overview">
    <app-box :title="$t('overview-of-pis')" :loading="loading">
      <div class="diagram-overview-group"> 
        <app-diagram-number-box v-for="numberBox in numberBoxes" :key="numberBox.id"
          :numberBox="numberBox"
          :showActionButton="analysisResults.length > 1"
          @actionButtonClick="onActionButtonClick"
        >
          <template #historyDiagram>
            <app-diagram-history
              :plant="plant"
              :numberBox="numberBox"
              :tableFilter="getTableFilter(numberBox)"
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
import { DiagramNumberBox, DiagramNumberBoxNum, DiagramResultMappings, GroupedAnalysisResult } from "./types";
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
  
  numberBoxes: DiagramNumberBox[] | null = null;

  loading = false;
  viewedNumberBox: DiagramNumberBox | null = null;

  async created(): Promise<void> {
    await super.created();
  }

  onActionButtonClick(numberBoxId: string) {
    if (this.viewedNumberBox) {
      this.viewedNumberBox.active = false;

      if (this.viewedNumberBox.id === numberBoxId) {
        this.viewedNumberBox = null;
        return;
      }
      
      this.viewedNumberBox = null;
    }

    this.viewedNumberBox = this.numberBoxes!.find(numberBox => numberBox.id === numberBoxId) || null;

    if (this.viewedNumberBox) {
      this.viewedNumberBox.active = true;
    }
  }

  getTableFilter(numberBox: DiagramNumberBox): TableFilterRequest {
    const resultMapping = this.resultMappings.find(resultMapping => resultMapping.componentId === numberBox.keyFigure.component_id)!;

    return {
      component_filter: { ...resultMapping.tableFilter!.component_filter },
      columns_selection: { columns: 
        resultMapping.tableFilter!.columns_selection!.columns.filter(column => column.name === numberBox.columnName)!
      }
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
  
  private async updateNumberBoxes(): Promise<void> {
    this.loading = true;

    const numberBoxes: DiagramNumberBox[] = [];
    for (const resultMapping of this.resultMappings) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
        resultMapping.resultMapping,
        this.firstAnalysisResult!
      );

      analysisResultMappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);

      const groupedResult: GroupedAnalysisResult = (this.compareAnalysisResult ?
        await volateqApi.getSpecificAnalysisResultCompared<GroupedAnalysisResult>(
          this.firstAnalysisResult!.id,
          resultMapping.componentId,
          this.compareAnalysisResult.id,
          { limit: 1 },
          resultMapping.tableFilter
        ) :
        await volateqApi.getSpecificAnalysisResult<GroupedAnalysisResult>(
          this.firstAnalysisResult!.id,
          resultMapping.componentId,
          { limit: 1 },
          resultMapping.tableFilter
        )
      ).items[0];

      for (const numberBox of resultMapping.numberBoxes!) {
        if (numberBox.nums) {
          for (const numberBoxNum of numberBox.nums) {
            this.setNumberBoxNum(numberBox, numberBoxNum, groupedResult);
          }
        } else {
          this.setNumberBoxNum(numberBox, numberBox, groupedResult);
        }
        
        numberBox.loaded = true;
      }

      numberBoxes.push(...resultMapping.numberBoxes!);
    }

    this.numberBoxes = numberBoxes;

    this.loading = false;
  }

  private setNumberBoxNum(
    numberBox: DiagramNumberBox,
    numberBoxNum: DiagramNumberBoxNum,
    groupedResult: GroupedAnalysisResult
  ): void {
    const columnName = numberBoxNum.columnName;
    const columnNameDiff = this.compareAnalysisResult ? columnName + "__diff" : null;

    let variant: string | undefined = undefined;
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

    numberBoxNum.num = MathHelper.roundTo(groupedResult[columnName] as number, numberBox.precision),
    numberBoxNum.diff = columnNameDiff ? 
      plusSymbol + MathHelper.roundTo(groupedResult[columnNameDiff] as number, numberBox.precision) : undefined
    numberBoxNum.diffVariant = variant;
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
