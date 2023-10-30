<template>
  <div class="app-analysis-result-table-component">
    <app-table-component-container :loading="loading" :tableName="tableName" :pagination="pagination" size="sm">
      <app-table-component-filter 
        :analysisResult="analysisResult"
        :activeComponent="activeComponent"
        :plant="plant"
        @filter="onFilter"
      >
        <template #nextToButton>
          <b-form-checkbox switch v-model="showSumAvg" style="padding-top: 3px" @change="onShowSumAvgChange">
            {{ $t("show-sum-avg") }}
          </b-form-checkbox>
        </template>
      </app-table-component-filter>
      <app-table
        :id="tableName"
        :columns="columns"
        :rows="dataProvider"
        ref="table"
        :perPage="pagination.perPage"
        :currentPage="pagination.currentPage"
        :loading="null"
        :compact="true"
      >
        <template #cell()="data">
          {{ data.value }}
          <span v-if="compareAnalysisResult" v-html="getComparedCellValue(data)"></span>
        </template>
      </app-table>
    </app-table-component-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BvTableCtxObject } from "bootstrap-vue";
import AppTableComponentContainer from "@/app/plant/shared/table-component/table-component-container.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import { ResultMappingTableTabComponent } from "./types";
import { ITableComponent } from "./types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { TableFilterRequest, TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppTableComponentFilter from "@/app/plant/shared/table-component/table-filter.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { MathHelper } from "@/app/shared/services/helper/math-helper";
import { TableResultSchema } from "@/app/shared/services/volateq-api/api-schemas/table-result-schema";
import { BvTableCellData } from "@/app/shared/types";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns, IAppTable } from "@/app/shared/components/app-table/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-analysis-result-table-component",
  components: {
    AppTableComponentContainer,
    AppExplanation,
    AppTableComponentFilter,
    AppTable,
  },
})
export default class AppAnalysisResultTableComponent extends BaseAuthComponent implements ITableComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analysisResult!: AnalysisResultDetailedSchema;
  @Prop({ required: true }) activeComponent!: ResultMappingTableTabComponent;
  @Prop({ default: null }) compareAnalysisResult!: AnalysisResultDetailedSchema | null;

  @Ref() table!: IAppTable;

  loading = false;

  columns: AppTableColumns = [];
  tableName!: string;

  pagination = { currentPage: 1, perPage: 10, total: 0 };
  showSumAvg = false;

  private lastCtx: BvTableCtxObject | undefined;
  private searchText = "";
  private tableFilterRequest?: TableFilterRequest

  private mappingHelper!: AnalysisResultMappingHelper<AnalysisResultSchemaBase>;
  private mappingEntries!: AnalysisResultMappings<AnalysisResultSchemaBase>;
  private columnsMapping!: Record<string, string>;

  public search(searchText: string) {
    this.searchText = searchText.trim();

    this.refresh();
  }

  async created() {
    this.tableName = "table_" + this.analysisResult.id + "_" + this.activeComponent.componentId;

    this.mappingHelper = new AnalysisResultMappingHelper(this.activeComponent.mapping, this.analysisResult, this.isSuperAdmin);
    this.mappingHelper.setTableView(true);
    this.mappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);
    this.mappingEntries = this.mappingHelper.getEntries();
    this.columns = this.mappingHelper.getColumns(transName => this.$t(transName));
    this.columnsMapping = this.mappingHelper.getColumnsMapping();
  }

  @Watch('compareAnalysisResult') 
  onCompareAnalysisResultChanged() {
    this.mappingHelper.setCompareAnalysisResult(this.compareAnalysisResult);
  }

  onFilter(tableFilterRequest?: TableFilterRequest) {
    this.tableFilterRequest = tableFilterRequest;

    this.refresh();
  }

  onShowSumAvgChange() {
    this.refresh();
  }

  getComparedCellValue(data: BvTableCellData): string {
    if (this.compareAnalysisResult) {
      const diffKey = data.field.key + "__diff";
      if (diffKey in data.item) {
        const mappingEntry = this.mappingEntries.find(entry => entry.transName === data.field.key);
        if (mappingEntry) {
          const diffValue: number = data.item[diffKey];
          let textColorClass = "text-grey";
          let plusSymbol = "";
          if (diffValue < 0) {
            textColorClass = "text-success";
          } else if (diffValue > 0) {
            textColorClass = "text-danger";
            plusSymbol = "+";
          }
          
          return `<span class="diff ${textColorClass}">${plusSymbol}${diffValue}</span>`;
        }
      }
    }

    return "";
  }

  getCsvDownloadUrl(): string {
    return volateqApi.getSpecificAnalysisResultCsvUrl(
      this.analysisResult!.id,
      this.activeComponent.componentId,
      this.getTableRequestParam(),
      this.tableFilterRequest,
      this.getCsvColumnMappingsParam()
    );
  }

  refresh(): void {
    this.table.refresh();
  }

  // Do not use "CatchError" decorator here
  async dataProvider(ctx: BvTableCtxObject): Promise<any> {
    this.lastCtx = ctx;

    try {
      this.loading = true;

      const results = await this.getAnalysisResults();
      this.pagination.total = results.total;

      const tableItems = this.mappingHelper.getItems(results.items);

      if (results.sums) {
        const sumItem = this.mappingHelper.getItem(results.sums);
        for (const key in sumItem) {
          let val = sumItem[key];
          if (MathHelper.isFloat(val as any)) {
            sumItem[key] = val = MathHelper.roundTo(val as any, 2);
          }

          if (tableItems.length > 0 && val !== null) {
            if (typeof tableItems[0][key] === "number") {
              sumItem[key] = "μ " + sumItem[key];
            }
          }
        }

        tableItems.unshift({
          ...sumItem,
          _rowVariant: "primary",
        });
      }

      return tableItems;
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }

    return [];
  }

  private async getAnalysisResults(): Promise<TableResultSchema<AnalysisResultSchemaBase>> {
    if (this.compareAnalysisResult) {
      return await volateqApi.getSpecificAnalysisResultCompared<AnalysisResultSchemaBase>(
        this.analysisResult.id,
        this.activeComponent.componentId,
        this.compareAnalysisResult.id,
        this.getTableRequestParam(),
        this.tableFilterRequest,
      );
    }

    return await volateqApi.getSpecificAnalysisResult<AnalysisResultSchemaBase>(
      this.analysisResult.id,
      this.activeComponent.componentId,
      this.getTableRequestParam(),
      this.tableFilterRequest,
    );
  }

  private getTableRequestParam(): TableRequest {
    if (!this.lastCtx) {
      throw Error("Missing lastCtx");
    }

    return {
      limit: this.lastCtx.perPage,
      page: this.lastCtx.currentPage,
      order_by: this.lastCtx.sortBy && this.columnsMapping[this.lastCtx.sortBy],
      order_direction: this.lastCtx.sortDesc ? "desc" : "asc",
      search_text: this.searchText,
      sums: this.showSumAvg ? 1 : 0,
    };
  }

  private getCsvColumnMappingsParam(): { [column_name: string]: string } {
    const columnsMapping = this.mappingHelper.getColumnsMapping();
    const translatedColumnsMapping = {};
    for (const transName of Object.keys(columnsMapping)) {
      translatedColumnsMapping[this.$t(transName).toString()] = columnsMapping[transName];
    }

    return translatedColumnsMapping;
  }
}
</script>
<style lang="scss">
@import "@/scss/_colors.scss";

.app-table-component {
  tr.table-primary > td {
    font-weight: bold !important;
  }

  tr > td .diff {
    padding-left: 5px;
    font-weight: bold;

    &.text-grey {
      color: $grey;
    }
  }
}
</style>