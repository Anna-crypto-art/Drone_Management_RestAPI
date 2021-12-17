<template>
  <div class="app-table-component">
    <app-table-component-container ref="container" :tableName="tableName" :pagination="pagination" size="sm">
      <b-table :id="tableName" hover :fields="columns" :items="dataProvider" class="bordered" ref="table"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template #head()="column">
          {{ column.label }}
          <app-explanation v-if="column.field.labelExpl">
            <span v-html="$t(column.field.labelExpl)"></span>
          </app-explanation>
        </template>
      </b-table>
    </app-table-component-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { BvTableCtxObject } from "bootstrap-vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import AppTableComponentContainer from "@/app/plant/csp-ptc/tables/table-component/table-component-container.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { ITableComponentContainer } from "./types";
import { IActiveComponent } from "../types";
import { ITableComponent } from "./types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { BvTableFieldExtArray } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import apiResultsLoader from "@/app/shared/services/volateq-api/api-results-loader";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";

@Component({
  name: "app-table-component",
  components: {
    AppTableComponentContainer,
    AppExplanation,
  }
})
export default class AppTableComponent extends Vue implements ITableComponent {
  @Prop() analysisResult!: AnalysisResultDetailedSchema;
  @Prop() activeComponent!: IActiveComponent;
  @Prop({ default: false }) loadAllResults!: boolean;
  @Ref() container!: ITableComponentContainer;
  @Ref() table!: any;

  columns: BvTableFieldExtArray = [];
  tableName!: string;

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  private last_ctx: BvTableCtxObject | undefined;
  private searchText = "";

  private mappingHelper!: AnalysisResultMappingHelper<AnalysisResultSchemaBase>;
  private columnsMapping!: Record<string, string>;

  protected startLoading() {
    this.container.startLoading()
  }
  protected stopLoading() {
    this.container.stopLoading()
  }

  public search(searchText: string) {
    this.searchText = searchText.trim();

    this.table.refresh()
  }

  created() {
    this.tableName = "table_" + this.analysisResult.id + "_" + this.activeComponent.componentId;

    this.mappingHelper = new AnalysisResultMappingHelper(this.activeComponent.mapping, this.analysisResult);
    this.columns = this.mappingHelper.getColumns(transName => this.$t(transName));
    this.columnsMapping = this.mappingHelper.getColumnsMapping();
  }

  getTableRequestParam(): TableRequest {
    if (!this.last_ctx) {
      throw Error('Missing last_ctx');
    }

    return {
      limit: this.last_ctx.perPage,
      page: this.last_ctx.currentPage,
      order_by: this.last_ctx.sortBy && this.columnsMapping[this.last_ctx.sortBy],
      order_direction: this.last_ctx.sortDesc ? 'desc' : 'asc',
      filter: this.searchText
    }
  }

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    const columnsMapping = this.mappingHelper.getColumnsMapping();
    const translatedColumnsMapping = {};
    for (const transName of Object.keys(columnsMapping)) {
      translatedColumnsMapping[this.$t(transName).toString()] = columnsMapping[transName];
    }

    return translatedColumnsMapping;
  }

  refresh(): void {
    this.table.refresh();
  }

  async dataProvider(ctx: BvTableCtxObject) {
    this.startLoading()
    this.last_ctx = ctx;

    try {
      if (this.loadAllResults) {
        return this.getAllResults(ctx);
      }

      const results = await volateqApi.getSpecificAnalysisResult<AnalysisResultSchemaBase>(
        this.analysisResult.id,
        this.activeComponent.componentId,
        this.getTableRequestParam()
      );
      this.pagination.total = results.total;

      return this.mappingHelper.getItems(results.items);
    } catch (e) {
      appContentEventBus.showError(e as ApiException)
    } finally {
      this.stopLoading()
    }

    return [];
  }

  async getAllResults(ctx: BvTableCtxObject): Promise<any[]> {
    await apiResultsLoader.loadResults(this.analysisResult.id, this.activeComponent.componentId);

    let results = apiResultsLoader.getResults(this.analysisResult.id, this.activeComponent.componentId)!;
    
    if (this.searchText) {
      results = results.filter(item => item.fieldgeometry_component.kks.toUpperCase().startsWith(this.searchText.toUpperCase()));
    }

    const items = this.mappingHelper.getItems(results);
    this.pagination.total = items.length;

    if (ctx.sortBy) {
      items.sort((a, b) => {
        const valA = a[ctx.sortBy!] as string | number;
        const valB = b[ctx.sortBy!] as string | number;

        if (valA < valB) {
          return ctx.sortDesc ? 1 : -1;
        }
        if (valA > valB) {
          return ctx.sortDesc ? -1 : 1;
        }
        return 0;
      });
    }

    const slicedItems = items.slice((ctx.currentPage - 1) * ctx.perPage, (ctx.currentPage - 1) * ctx.perPage + ctx.perPage);

    return slicedItems;
  }
}
</script>