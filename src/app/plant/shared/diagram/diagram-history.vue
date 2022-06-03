<template>
  <div class="diagram-history">
    <app-loading v-show="loading" />
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
import { AnalysisHistoryResult, DiagramNumberBox, DiagramNumberBoxNum, GroupedAnalysisResult } from "./types";
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
  @Prop({ required: true }) numberBox!: DiagramNumberBox;
  @Prop({ required: true }) tableFilter!: TableFilterRequest;
  @Prop({ required: true }) analysisResult!: AnalysisResultDetailedSchema;
  @Prop({ required: true }) analysisResults!: AnalysisResultDetailedSchema[];
  @Prop({ required: true }) resultMappings!: {
    componentId: ApiComponent;
    resultMapping: AnalysisResultMappings<AnalysisResultSchemaBase>;
  }[];
  @Prop({ required: true }) load!: boolean;

  
  // TODO: make @State(mobile) working...
  isMobile = false;

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

  private async loadHistoryData() {
    try {
      this.loading = true;

      const groupedResults = await volateqApi.getAnalysisResultHistory<AnalysisHistoryResult>(
        this.plant.id,
        this.numberBox.keyFigure.component_id,
        {
          limit: this.analysisResults.length
        },
        this.tableFilter,
      );

      this.setBarChartOptions();

      const nums: DiagramNumberBoxNum[] = this.numberBox.nums || [this.numberBox];

      this.lineChartData = {
        labels: groupedResults.items.map(item => new Date(Date.parse(item.flown_at)).toLocaleDateString()),
        datasets: nums.map(num => ({
          data: groupedResults.items.map(item => item[num.columnName] as number),
          backgroundColor: num.color,
          borderColor: num.color,
        })),
      };
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  private getLabelUnit(): string {
    let labelUnit = this.numberBox.unit;

    return labelUnit || "";
  }

  private setBarChartOptions(): void {
    const labelUnit: string = this.getLabelUnit();

    // this.lineChartOptions["scales"]!["x"]!["title"]["text"] = labelUnit;
    this.lineChartOptions["scales"]!["y"]!["title"]["text"] = labelUnit;

    this.lineChartOptions.plugins!.datalabels!.formatter = (val: number) => MathHelper.roundTo(val, this.numberBox.precision);
     
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
