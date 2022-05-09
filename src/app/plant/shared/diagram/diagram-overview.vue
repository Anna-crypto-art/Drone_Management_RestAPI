<template>
  <div class="diagram-overview">
    <app-box :title="$t('overview')" :loading="loading">
      <!-- <div v-for="numberBoxComponentGroup in numberBoxComponentGroups" :key="numberBoxComponentGroup.componentName">
        <h5>{{ $t(numberBoxComponentGroup.componentName) }}</h5>-->
        <div class="diagram-overview-group"> 
          <app-diagram-number-box v-for="numberBox in numberBoxes" 
            :key="numberBox.keyFigureId + '_' + numberBox.keyFigureName"
            :name="numberBox.keyFigureName"
            :num="numberBox.num"
            :variant="numberBox.variant"
            :diff="numberBox.diff"
            :unit="numberBox.unit"
          />
        </div>
      <!--</div> -->
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
import { DiagramNumberBox, DiagramNumberBoxComponentGroup, GroupedAnalysisResult } from "./types";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { TableColumnSelect, TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { FilterFieldType } from "../filter-fields/types";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { MathHelper } from "@/app/shared/services/helper/math-helper";

@Component({
  name: "app-diagram-overview",
  components: {
    AppButton,
    AppBox,
    AppDiagramNumberBox,
  },
})
export default class AppDiagramOverview extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() resultMappings!: {
    componentId: ApiComponent;
    resultMapping: AnalysisResultMappings<AnalysisResultSchemaBase>;
  }[];

  loading = false;

  // numberBoxComponentGroups: DiagramNumberBoxComponentGroup[] = [];
  numberBoxes: DiagramNumberBox[] = [];

  async created(): Promise<void> {
    await super.created();
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

    this.numberBoxes = [];

    for (const resultMapping of this.resultMappings) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
        resultMapping.resultMapping,
        this.firstAnalysisResult!
      );

      analysisResultMappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);

      const columnsMapping = analysisResultMappingHelper.getColumnsMapping();
      const columnsSelection: TableColumnSelect[] = [];

      for (const entry of analysisResultMappingHelper.getDiagramEntries()) {
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

        // const numberBoxes: DiagramNumberBox[] = [];

        for (const entry of analysisResultMappingHelper.getDiagramEntries()) {
          const columnName = columnsMapping[entry.transName];
          const columnNameDiff = this.compareAnalysisResult ? columnName + "__diff" : null;

          const precision = entry.unit === "Count" ? 0 : 3;

          let variant: string | null = null;          
          if (columnNameDiff) {
            const diffValue = groupedResult[columnNameDiff] as number;
            if (diffValue < 0) {
              variant = "success";
            } else if (diffValue === 0) {
              variant = "default";
            } else if (diffValue > 0) {
              variant = "danger";
            }
          }

          this.numberBoxes.push({
            keyFigureId: entry.keyFigureId!,
            keyFigureName: this.$t(entry.transName).toString(),
            num: MathHelper.roundTo(groupedResult[columnName] as number, precision),
            diff: columnNameDiff ? MathHelper.roundTo(groupedResult[columnNameDiff] as number, precision) : null,
            variant: variant,
            unit: entry.unit || null,
          });
        }

        // this.numberBoxComponentGroups.push({
        //   componentName: apiComponentNames[resultMapping.componentId],
        //   numberBoxes: numberBoxes
        // });
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
