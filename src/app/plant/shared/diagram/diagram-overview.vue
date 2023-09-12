<template>
  <div class="diagram-overview">
    <app-box :title="$t('overview-of-pis')" :loading="loading">
      <div class="diagram-overview-group"> 
        <app-diagram-number-box v-for="numberBox in numberBoxes" :key="numberBox.id"
          :numberBox="numberBox"
          :showActionButton="analyses.length > 1"
          @showHistoryButtonClick="onShowHistoryButtonClick"
          @showAreasButtonClick="onShowAreasButtonClick"
          @closeButtonClick="onCloseButtonClick"
          @viewMapButtonClick="onViewMapButtonClick"
        >
          <template #historyDiagram>
            <app-diagram-history
              :plant="plant"
              :numberBox="numberBox"
              :tableFilter="getTableFilter(numberBox)"
              :analyses="analyses"
              :load="numberBox.historyActive"
            />
          </template>
          <template #areasDiagram>
            <app-diagram-areas
              :plant="plant"
              :numberBox="numberBox"
              :tableFilter="getTableFilter(numberBox)"
              :analysisResult="firstAnalysisResult"
              :compareAnalysisResult="compareAnalysisResult"
              :componentSelection="componentSelection"
              :load="numberBox.areasActive"
            />
          </template>
        </app-diagram-number-box>
      </div>
    </app-box>
  </div>
</template>

<script lang="ts">
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import AppDiagramNumberBox  from "@/app/plant/shared/diagram/diagram-number-box.vue";
import { DiagramNumberBox, DiagramNumberBoxNum, DiagramResultMappings, GroupedAnalysisResult } from "./types";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import AppDiagramHistory from "@/app/plant/shared/diagram/diagram-history.vue";
import AppDiagramAreas from "@/app/plant/shared/diagram/diagram-areas.vue";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";

@Component({
  name: "app-diagram-overview",
  components: {
    AppButton,
    AppBox,
    AppDiagramNumberBox,
    AppDiagramHistory,
    AppDiagramAreas,
  },
})
export default class AppDiagramOverview extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @Prop() resultMappings!: DiagramResultMappings[];
  @Prop() componentSelection!: ApiComponent[];
  
  analysisSelectionService!: AnalysisSelectionService;
  
  numberBoxes: DiagramNumberBox[] | null = null;

  loading = false;
  viewedNumberBox: DiagramNumberBox | null = null;

  async mounted() {
    await AnalysisSelectionService.register(this);
  }

  async unmounted() {
    this.analysisSelectionService.unregister();
  }

  onShowHistoryButtonClick(numberBoxId: string) {
    const numberBox = this.numberBoxes!.find(numberBox => numberBox.id === numberBoxId)!;
    this.activateNumberBox(numberBox);
    numberBox.historyActive = true;
    numberBox.areasActive = false;
  }

  onShowAreasButtonClick(numberBoxId: string) {
    const numberBox = this.numberBoxes!.find(numberBox => numberBox.id === numberBoxId)!;
    this.activateNumberBox(numberBox);
    numberBox.areasActive = true;
    numberBox.historyActive = false;
  }

  onCloseButtonClick() {
    if (this.viewedNumberBox) {
      this.viewedNumberBox.historyActive = false;
      this.viewedNumberBox.areasActive = false;
      this.viewedNumberBox = null;
    }
  }

  onViewMapButtonClick(numberBoxId: string) {
    const numberBox = this.numberBoxes!.find(numberBox => numberBox.id === numberBoxId)!;

    this.$router.push({ name: "Plant", params: { id: this.plant.id }, query: { 
      view: "map",
      pi: numberBox.keyFigure.id + "",
      result: this.compareAnalysisResult ? 
        [this.firstAnalysisResult!.id, this.compareAnalysisResult.id] :
        (this.firstAnalysisResult ? this.firstAnalysisResult!.id : undefined)
    }})
    
    RouteQueryHelper.emitQueryChanged();
  }

  private activateNumberBox(numberBox: DiagramNumberBox) {
    if (this.viewedNumberBox && this.viewedNumberBox.id !== numberBox.id) {
      this.onCloseButtonClick();
    }

    this.viewedNumberBox = numberBox;
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

  async onAnalysisSelected() {
    if (this.firstAnalysisResult) {
      await this.updateNumberBoxes();
    }
  }

  async onMultiAnalysesSelected() {
    if (this.firstAnalysisResult && this.compareAnalysisResult) {
      await this.updateNumberBoxes();
    }
  }
  
  @CatchError("loading")
  private async updateNumberBoxes(): Promise<void> {
    const numberBoxes: DiagramNumberBox[] = [];
    for (const resultMapping of this.resultMappings) {
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

  get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.firstAnalysisResult || null;
  }

  get compareAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.compareAnalysisResult || null;
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
