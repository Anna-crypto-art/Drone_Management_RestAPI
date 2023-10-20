<template>
  <div class="diagram-areas">
    <app-loading v-show="loading" />
    <div class="diagram-areas-select-row">
      <div class="diagram-areas-select-row-col">
        <b-form-group label-cols="auto" :label="$t('component-area')">
          <b-form-select v-model="selectedComponentId" :options="componentOptions" @change="onComponentSelected" 
            class="diagram-areas-select-row-col-select" />
        </b-form-group>
      </div>
      <div class="diagram-areas-select-row-col" v-if="orderByOptions">
        <b-form-group label-cols="auto" :label="$t('order-by')">
        <b-form-select v-model="selectedOrderByColumn" :options="orderByOptions" @change="onOrderBySelected"
          class="diagram-areas-select-row-col-select" />
        </b-form-group>
      </div>
    </div>
    <div :style="'width: 100%; height: ' + charHeight + 'px'">
      <div v-if="barChartData">
        <Bar ref="barChart"
          :class="'diagram-areas-bar-chart' + (isMobile ? ' mobile' : '')"
          :chart-data="barChartData"
          :chart-options="barChartOptions"
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
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BvSelectOption } from "@/app/shared/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { Bar } from "vue-chartjs/legacy";
import { DiagramNumberBox, GroupedAnalysisResult } from "./types";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
  ChartDataset,
} from "chart.js";
import ChartDataLables, { Context } from "chartjs-plugin-datalabels";
import { TableResultSchema } from "@/app/shared/services/volateq-api/api-schemas/table-result-schema";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppLoading from "@/app/shared/components/app-loading/app-loading.vue";
import { LayerColor } from "../visualization/layers/types";
import { isOnMobileDevice } from "@/app/shared/services/helper/mobile-helper";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLables);

@Component({
  name: "app-diagram-areas",
  components: {
    AppButton,
    Bar,
    AppBox,
    AppLoading,
  },
})
export default class AppDiagramAreas extends BaseAuthComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analysisResult!: AnalysisResultDetailedSchema;
  @Prop({ default: null }) compareAnalysisResult!: AnalysisResultDetailedSchema | null;
  @Prop({ required: true }) componentSelection!: ApiComponent[];
  @Prop({ required: true }) tableFilter!: TableFilterRequest;
  @Prop({ required: true }) numberBox!: DiagramNumberBox;
  @Prop({ required: true }) load!: boolean;

  // TODO: make @State(mobile) working...
  isMobile = false;

  selectedComponentId: ApiComponent | null = null;
  selectedOrderByColumn: string | null = null;
  loading = false;

  charWidth = 300;
  charHeight = 150;
  barChartData: ChartData | null = null;
  barChartOptions: ChartOptions = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
      },
      tooltip: {
        padding: 10,
        boxPadding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 0.3,
        borderColor: '#444',
        cornerRadius: 0,
        titleColor: '#212529',
        bodyColor: '#212529',
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

  @Watch("load") async onLoadChanged() {
    if (this.load) {
      await this.loadComponentAreaData();
    }
  }

  created() {
    this.selectedComponentId = this.componentSelection[0];
    this.selectedOrderByColumn = (this.numberBox.nums || [this.numberBox])[0].columnName

    this.isMobile = isOnMobileDevice();
    this.charWidth = this.isMobile ? 300 : 800;
    this.charHeight = this.isMobile ? 150 : 350;
  }

  get componentOptions(): BvSelectOption[] {
    return this.componentSelection.map(comp => ({
      value: comp,
      text: this.$t(apiComponentNames[comp]).toString(),
    }));
  }

  get orderByOptions(): BvSelectOption[] | null {
    if (!this.numberBox.nums) {
      return null;
    }

    return this.numberBox.nums.map(num => ({
      value: num.columnName,
      text: num.displayName
    }));
  }

  async onComponentSelected() {
    await this.loadComponentAreaData();
  }

  async onOrderBySelected() {
    await this.loadComponentAreaData();
  }

  private async loadComponentAreaData() {
    try {
      this.barChartData = null;
      this.loading = true;

      const tableFilter: TableFilterRequest = this.getTableFilterRequest();
      const columnName: string = this.selectedOrderByColumn!;

      const groupedResults = this.compareAnalysisResult ?
        await volateqApi.getSpecificAnalysisResultCompared<GroupedAnalysisResult>(
          this.analysisResult!.id,
          this.numberBox.keyFigure.component_id,
          this.compareAnalysisResult.id,
          { order_by: columnName, order_direction: "desc", limit: 10 },
          tableFilter
        ) :
        await volateqApi.getSpecificAnalysisResult<GroupedAnalysisResult>(
          this.analysisResult!.id,
          this.numberBox.keyFigure.component_id,
          { order_by: columnName, order_direction: "desc", limit: 10 },
          tableFilter
        );

      this.setBarChartOptions(groupedResults);

      const getSubstracted = (item: GroupedAnalysisResult, columnName: string): number => {
        if (this.compareAnalysisResult) {
          const diffValue: number = item[columnName + "__diff"] as number;
          if (diffValue > 0) {
            return item[columnName] as number - diffValue;
          }
        }

        return item[columnName] as number;
      };

      const datasets: ChartDataset<any, any> = (this.numberBox.nums || [this.numberBox]).map(num => ({
        data: groupedResults.items.map(item => getSubstracted(item, num.columnName)),
        backgroundColor: num.color,
        stack: this.compareAnalysisResult && num.columnName || undefined,
      }));

      if (this.compareAnalysisResult) {
        datasets.push(...(this.numberBox.nums || [this.numberBox]).map(num => {
          const data: number[] = groupedResults.items.map(item => item[num.columnName + "__diff"] as number);
          const absData: number[] = data.map(val => Math.abs(val));

          return {
            data: absData,
            backgroundColor: LayerColor.lightGrey,
            stack: num.columnName,
            datalabels: {
              font: { weight: "bold" },
              color: data.map(val => {
                if (val === 0) {
                  return LayerColor.lightGrey;
                }
                if (val > 0) {
                  return LayerColor.diagramBad;
                }
                return LayerColor.diagramGood;
              }),
              formatter: (value: any, context: Context) => {
                if (data[context.dataIndex] > 0) {
                  return "+" + value;
                }
                if (data[context.dataIndex] < 0) {
                  return "-" + value;
                }

                return "";
              }
            }
          }
        }));
      }

      this.barChartData = {
        labels: groupedResults.items.map(item => item.kks),
        datasets: datasets,
      };
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  private getTableFilterRequest(): TableFilterRequest {
    // Copy tableFilter object to avoid manipulating origin
    const tableFilter: TableFilterRequest = { 
      component_filter: { ...this.tableFilter.component_filter },
      columns_selection: [ ...this.tableFilter.columns_selection! ]
    };

    tableFilter.component_filter!.component_id = this.selectedComponentId!;

    return tableFilter;
  }

  private setBarChartOptions(groupedResults: TableResultSchema<GroupedAnalysisResult>): void {
    this.barChartOptions["scales"]!["x"]!["stacked"] = !!this.compareAnalysisResult;
    this.barChartOptions["scales"]!["y"]!["stacked"] = !!this.compareAnalysisResult;

    if (this.numberBox.unit) {
      this.barChartOptions["scales"]!["x"]!["title"]["text"] = this.numberBox.unit;
    }
    this.barChartOptions["scales"]!["y"]!["title"]["text"] = this.$t(
      apiComponentNames[this.selectedComponentId!]
    ).toString();

    if (groupedResults.total && !this.compareAnalysisResult) {
      this.barChartOptions.plugins!.datalabels!.formatter = (val: number) => {
        return MathHelper.roundTo(val, this.numberBox.precision) + ` (${MathHelper.roundTo(val / groupedResults.total * 100, 2)}%)`;
      };
    } else {
      this.barChartOptions.plugins!.datalabels!.formatter = (val: number) => MathHelper.roundTo(val, this.numberBox.precision);
    }
  }
}
</script>

<style lang="scss">
.diagram-areas {
  &-bar-chart {
    width: 800px;
    height: 350px;

    &.mobile {
      width: 300px;
      height: 150px;
    }
  }
  &-select-row {
    display: flex;
    width: 400px;
    margin-bottom: 15px;

    &-col {
      &-select {
        width: 150px;
      }

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
}
</style>
