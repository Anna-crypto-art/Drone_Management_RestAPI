<template>
  <div class="diagram-history">
    <app-loading v-show="loading" />
    <!-- <div class="diagram-select-row">
      <div class="diagram-select-row-col">
        <b-form-select v-model="selectedComponentId" :options="componentOptions" @change="onComponentSelected">
          <template #first>
            <b-form-select-option :value="null" disabled>{{ $t("select-component") }}</b-form-select-option>
          </template>
        </b-form-select>
      </div>
      <div class="diagram-select-row-col">
        
      </div>
      <div class="diagram-select-row-col apply">
        <app-button v-show="selectedComponentId" @click="onApply" :loading="loading">{{ $t("apply") }}</app-button>
      </div>
    </div> -->
    <div :style="'width: 100%; height: ' + charHeight + 'px'">
      <div v-if="lineChartData">
        <LineChart
          :class="'diagram-line-chart' + (isMobile ? ' mobile' : '')"
          :chart-data="lineChartData"
          :chart-options="lineChartOptions"
          :height="charHeight"
          :width="charWidth"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import {
  AnalysisResultMappingEntry,
  AnalysisResultMappings,
} from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BvSelectOption, BvSelectGroupOption } from "@/app/shared/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { Line as LineChart } from "vue-chartjs/legacy";
import { AnalysisHistoryResult, GroupedAnalysisResult } from "./types";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
  PointElement,
} from "chart.js";
import ChartDataLables from "chartjs-plugin-datalabels";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import { TableResultSchema } from "@/app/shared/services/volateq-api/api-schemas/table-result-schema";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ChartDataLables);

@Component({
  name: "app-diagram-history",
  components: {
    AppButton,
    AppBox,
    LineChart,
    AppLoading,
  },
})
export default class AppDiagramHistory extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) keyFigure!: KeyFigureSchema;
  @Prop({ required: true }) keyFigureName!: string;
  @Prop({ required: true }) analysisResult!: AnalysisResultDetailedSchema;
  @Prop({ required: true }) analysisResults!: AnalysisResultDetailedSchema[];
  // @Prop({ required: true }) componentSelection!: ApiComponent[];
  @Prop({ required: true }) resultMappings!: {
    componentId: ApiComponent;
    resultMapping: AnalysisResultMappings<AnalysisResultSchemaBase>;
  }[];
  @Prop({ required: true }) load!: boolean;
  

  // TODO: make @State(mobile) working...
  isMobile = false;

  selectedComponentId: ApiComponent | null = null;
  loading = false;

  charWidth = 300;
  charHeight = 200;
  lineChartData: ChartData | null = null;
  lineChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        // color: "#fff",
        align: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "",
          align: "end",
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "",
          align: "end",
        },
      },
    },
    responsive: false,
  };

  @Watch('load') async onKeyFigureChanged() {
    if (this.load) {
      await this.loadHistoryData();
    }
  }

  async created(): Promise<void> {
    await super.created();

    this.isMobile = window.matchMedia("screen and (max-width: 1000px)").matches;
    this.charWidth = this.isMobile ? 300 : 800;
    this.charHeight = this.isMobile ? 150 : 400;
  }

  // get componentOptions(): BvSelectOption[] {
  //   return this.componentSelection.map(comp => ({
  //     value: comp,
  //     text: this.$t(apiComponentNames[comp]).toString(),
  //   }));
  // }

  // onComponentSelected() {
  //   // do something
  // }

  private async loadHistoryData() {
    try {
      this.loading = true;

      const tableFilter: TableFilterRequest = this.getTableFilterRequest();

      const groupedResults = await volateqApi.getAnalysisResultHistory<AnalysisHistoryResult>(
        this.plant.id,
        this.keyFigure.component_id,
        {
          limit: this.analysisResults.length
        },
        tableFilter,
      );

      this.setBarChartOptions();

      const columnName = this.getColumnNameByKeyFigure();
      this.lineChartData = {
        labels: groupedResults.items.map(item => new Date(Date.parse(item.flown_at)).toLocaleDateString()),
        datasets: [
          {
            data: groupedResults.items.map(item => item[columnName] as number),
            backgroundColor: "rgba(6, 107, 226, 0.8)",
            borderColor: "rgba(6, 107, 226, 0.8)",
          },
        ],
      };
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
 

  private getMappingHelper(): AnalysisResultMappingHelper<AnalysisResultSchemaBase> {
    return new AnalysisResultMappingHelper(
        this.resultMappings.find(resultMapping => resultMapping.componentId === this.keyFigure.component_id)!
          .resultMapping,
        this.analysisResult,
    );
  }

  // async onApply() {
  //   // do something
  // }

  private getTableFilterRequest(): TableFilterRequest {
    const tableFilter: TableFilterRequest = { component_filter: { grouped: true, component_id: 0 }};

    if (this.selectedComponentId !== null) {
      tableFilter.component_filter!.component_id = this.selectedComponentId;
    }

    const isCountTableUnit = this.getLabelUnit() === "Count";

    const columnName: string = this.getColumnNameByKeyFigure();
    if (!tableFilter.columns_selection) {
      tableFilter.columns_selection = { columns: [{ name: columnName, func: isCountTableUnit ? "sum" : "avg" }] };
    }
    if (isCountTableUnit) {
      if (!tableFilter.filters) {
        tableFilter.filters = { [columnName]: true };
      }
    }

    return tableFilter;
  }

  private getLabelUnit(): string {
    let labelUnit = this.getMappingEntry().unit;

    return labelUnit || "";
  }

  private getColumnNameByKeyFigure(): string {
    return this.getMappingHelper().getColumnsMapping()[this.keyFigureName];
  }

  private getMappingEntry(): AnalysisResultMappingEntry<AnalysisResultSchemaBase> {
    return this.getMappingHelper().getEntries().find(entry => entry.transName === this.keyFigureName)!;
  }

  private setBarChartOptions(): void {
    const labelUnit: string = this.getLabelUnit();

    // this.lineChartOptions["scales"]!["x"]!["title"]["text"] = labelUnit;
    this.lineChartOptions["scales"]!["y"]!["title"]["text"] = labelUnit;

    const isCountTableUnit = labelUnit === "Count";
    const roundPrecision = isCountTableUnit ? 0 : 3;    

    this.lineChartOptions.plugins!.datalabels!.formatter = (val: number) => MathHelper.roundTo(val, roundPrecision);
     
  }
}
</script>

<style lang="scss">
.diagram-history {
  position: relative;
}

.diagram-line-chart {
  width: 800px;
  height: 600px;
  margin: 60px auto 0;

  &.mobile {
    width: 300px;
    height: 200px;
  }
}

.diagram-select-row {
  display: flex;
  &-col {
    flex: 2;
    padding-right: 15px;
    &.apply {
      flex: 1;
      button {
        width: 100%;
      }
      padding-right: 0;
    }
  }
}
</style>
