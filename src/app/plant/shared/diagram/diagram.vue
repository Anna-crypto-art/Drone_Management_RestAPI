<template>
  <div class="diagram">
    <div class="diagram-select-row">
      <div class="diagram-select-row-col">
        <b-form-select v-model="selectedComponentId" :options="componentOptions" @change="onComponentSelected" >
          <template #first>
            <b-form-select-option :value="null" disabled>{{ $t("select-component") }}</b-form-select-option>
          </template>
        </b-form-select>
      </div>
      <div class="diagram-select-row-col">
        <b-form-select v-model="selectedOrderAndLimit" v-show="selectedComponentId">
          <template #first>
            <b-form-select-option :value="null" disabled>{{ $t("select-order-and-limit") }}</b-form-select-option>
          </template>
          <b-form-select-option :value="{ reverse: true, limit: 10 }">
            {{ $t("order-and-limit-selection-text", {limit: 10, order: 'descending'}) }}
          </b-form-select-option>
          <b-form-select-option :value="{ reverse: true, limit: 25 }">
            {{ $t("order-and-limit-selection-text", {limit: 25, order: 'descending'}) }}
          </b-form-select-option>
          <b-form-select-option :value="{ reverse: false, limit: 10 }">
            {{ $t("order-and-limit-selection-text", {limit: 10, order: 'ascending'}) }}
          </b-form-select-option>
          <b-form-select-option :value="{ reverse: false, limit: 25 }">
            {{ $t("order-and-limit-selection-text", {limit: 25, order: 'ascending'}) }}
          </b-form-select-option>
        </b-form-select>
      </div>
      <div class="diagram-select-row-col">
        <b-form-select v-if="selectedAnalysisResult" 
          v-model="selectedKeyFigure"
          :options="keyFigureGroupOptions"
          v-show="selectedOrderAndLimit"
          @change="onKeyFigureSelected"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>{{ $t("select-pi") }}</b-form-select-option>
          </template>
        </b-form-select>
      </div>
      <div v-show="showSlot" class="diagram-select-row-col">
        <template v-if="selectedAnalysisResult">
          <div v-for="keyFigureOption in keyFigureOptions" :key="keyFigureOption.value.entry.transName">
            <div v-show="keyFigureOption.value.show">
              <slot :name="keyFigureOption.value.entry.transName" />
            </div>
          </div>
        </template>
      </div>
      <div class="diagram-select-row-col apply">
        <app-button v-show="selectedKeyFigure" @click="onApply" :loading="loading">{{ $t("apply") }}</app-button>
      </div>
    </div>
    <div v-if="barChartData">
      <Bar :class="'diagram-bar-chart' + (isMobile ? ' mobile' : '')" 
        :chart-data="barChartData" 
        :chart-options="barChartOptions" 
        :height="charHeight" 
        :width="charWidth" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisResultMappingEntry, AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BvSelectOption, BvSelectGroupOption } from "@/app/shared/types";
import { Component, Prop } from "vue-property-decorator";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { Bar } from 'vue-chartjs/legacy';
import { GroupedAnalysisResult } from "./types";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartData, ChartOptions } from 'chart.js'
import ChartDataLables from "chartjs-plugin-datalabels";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLables)

@Component({
  name: "app-diagram",
  components: {
    AppButton,
    Bar,
  },
})
export default class AppDiagram extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() componentSelection!: ApiComponent[];
  @Prop() resultMappings!: { componentId: ApiComponent, resultMapping: AnalysisResultMappings<AnalysisResultSchemaBase>}[];
  @Prop({ default: null }) tableFilter!: TableFilterRequest | null;
  @Prop({ default: "" }) labelUnit!: string;
  
  // TODO: make @State(mobile) working...
  isMobile = false;
  
  keyFigureGroupOptions: BvSelectGroupOption[] | null = null;

  selectedComponentId: ApiComponent | null = null;
  selectedOrderAndLimit: { reverse: boolean, limit: number } | null = null;
  selectedKeyFigure: { 
    entry: AnalysisResultMappingEntry<AnalysisResultSchemaBase>, 
    show: boolean,
    mappingHelper: AnalysisResultMappingHelper<AnalysisResultSchemaBase>
    componentId: ApiComponent,
  } | null = null;
  
  showSlot = false;
  loading = false;

  charWidth = 300;
  charHeight = 200;
  barChartData: ChartData | null = null;
  barChartOptions: ChartOptions = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "",
          align: "end",
        }
      },
      y: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "",
          align: "end",
        }
      }
    },
    responsive: false,
  }

  async created(): Promise<void> {
    await super.created();

    this.isMobile = window.matchMedia("screen and (max-width: 1000px)").matches;
    this.charWidth = this.isMobile ? 300 : 800;
    this.charHeight = this.isMobile ? 200 : 600;
  }

  protected onAnalysisSelected() {
    if (this.selectedAnalysisResult) {
      this.updateKeyFigureGroupSelection();
    }
  }

  get componentOptions(): BvSelectOption[] {
    return this.componentSelection.map(comp => ({
      value: comp,
      text: this.$t(apiComponentNames[comp]).toString(),
    }));
  }

  get keyFigureOptions(): BvSelectOption[] {
    return this.keyFigureGroupOptions!
      .reduce((prev, current) => [...prev, ...current.options] as any, []);
  }

  onComponentSelected() {
    this.updateKeyFigureGroupSelection();
  }

  onKeyFigureSelected() {
    this.showSlot = false;

    if (this.selectedKeyFigure) {
      for (const keyFigureGroupOption of this.keyFigureGroupOptions!) {
        for (const keyFigureOption of keyFigureGroupOption.options) {
          keyFigureOption.value.show = (keyFigureOption.value.entry.transName === this.selectedKeyFigure.entry.transName);

          if (keyFigureOption.value.show && keyFigureOption.value.entry.transName in this.$slots) {
            this.showSlot = true;
          }
        }
      }
    }
  }

  async onApply() {
    try {
      this.loading = true;

      let tableFilter: TableFilterRequest | null = {};
      let labelUnit = this.selectedKeyFigure!.entry.unit;
      if (this.showSlot) {
        tableFilter = this.tableFilter;
        labelUnit = this.labelUnit && this.labelUnit || labelUnit;
      }

      this.barChartOptions["scales"]!["x"]!["title"]["text"] = labelUnit;
      this.barChartOptions["scales"]!["y"]!["title"]["text"] = this.$t(apiComponentNames[this.selectedComponentId!]).toString();

      if (!tableFilter) {
        tableFilter = {};
      }

      tableFilter.component_filter = {
        component_id: this.selectedComponentId!,
        grouped: true,
      }

      const isCountTableUnit = labelUnit === "Count";

      const columnName: string = this.selectedKeyFigure!.mappingHelper.getColumnsMapping()[this.selectedKeyFigure!.entry.transName];
      if (!tableFilter.columns_selection) {
        tableFilter.columns_selection = { columns: [{ name: columnName, func: isCountTableUnit ? "count" : "avg" }] };
      }
      if (isCountTableUnit) {
        if (!tableFilter.filters) {
          tableFilter.filters = { [columnName]: true };
        }
      }

      const groupedResults = await volateqApi.getSpecificAnalysisResult<GroupedAnalysisResult>(
        this.selectedAnalysisResult!.id, 
        this.selectedKeyFigure!.componentId,
        { 
          order_by: columnName, 
          order_direction: this.selectedOrderAndLimit!.reverse ? "desc" : "asc",
          limit: this.selectedOrderAndLimit!.limit,
        },
        tableFilter
      );

      const totalOfPercantage = isCountTableUnit && groupedResults.total;
      if (totalOfPercantage) {
        this.barChartOptions.plugins!.datalabels!.formatter = (val: number) => {
          const roundedVal = Math.round(val * 100) / 100;

          return roundedVal + ` (${Math.round(val / totalOfPercantage * 10000) / 100}%)`;
        };
      } else {
        this.barChartOptions.plugins!.datalabels!.formatter = (val: number) => {
          return Math.round(val * 100) / 100;
        };
      }

      this.barChartData = { 
        labels: groupedResults.items.map(item => item.kks),
        datasets: [{ 
          data: groupedResults.items.map(item => item[columnName] as number), 
          backgroundColor: "rgba(6, 107, 226, 0.8)",
        }],
      };
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  private updateKeyFigureGroupSelection(): void {
    const keyFigureSelectOptions: BvSelectGroupOption[] = [];
    for (const resultMapping of this.resultMappings) {
      const analysisResultMappingHelper = new AnalysisResultMappingHelper(
        resultMapping.resultMapping, 
        this.selectedAnalysisResult!
      );

      if (this.selectedComponentId !== resultMapping.componentId) {
        keyFigureSelectOptions.push({
          label: this.$t(apiComponentNames[resultMapping.componentId]).toString(),
          options: analysisResultMappingHelper.getEntries()
            .filter(entry => entry.enableForDiagram)
            .map(entry => ({
              value: { 
                entry,
                show: false,
                mappingHelper: analysisResultMappingHelper,
                componentId: resultMapping.componentId 
              },
              text: this.$t(entry.transName).toString(),
            }))
        });
      }
    }

    this.keyFigureGroupOptions = keyFigureSelectOptions;
  }
}
</script>

<style lang="scss">
.diagram {
  &-bar-chart {
    width: 800px;
    height: 600px;
    margin: 60px auto 0;

    &.mobile {
      width: 300px;
      height: 200px;
    }
  }
  &-select-row {
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
}
</style>