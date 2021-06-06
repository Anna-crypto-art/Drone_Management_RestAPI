<template>
  <div class="app-app-table-csp-ptc">
    <app-table-component-container ref="container" :tableName="tableName" :pagination="pagination">
      <b-table :id="tableName" hover :fields="columns" :items="dataProvider" class="bordered" ref="table"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template v-for="column in columns" :slot="column.key" slot-scope="data">
          {{ data.item.label }} <app-explanation v-if="column.labelExpl" v-html="column.labelExpl" :key="column.key" />
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
import { IActiveComponent, ITableComponent } from "../types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultCspPtcMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-helper";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";
import { BvTableFieldExtArray } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import apiResultsLoader from "@/app/shared/services/volateq-api/api-results-loader";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";

@Component({
  name: "app-table-csp-ptc",
  components: {
    AppTableComponentContainer,
    AppExplanation,
  }
})
export default class AppTableCspPtc extends Vue implements ITableComponent {
  @Prop() analysisResult!: AnalysisResultDetailedSchema;
  @Prop() activeComponent!: IActiveComponent;
  @Ref() container!: ITableComponentContainer;
  @Ref() table!: any;

  columns: BvTableFieldExtArray = [];
  tableName!: string;

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  private last_ctx: BvTableCtxObject | undefined;
  private searchText = "";

  private mappingHelper!: AnalysisResultCspPtcMappingHelper<AnalysisResultCspPtcSchemaBase>;
  private componentKeyFigureId!: string;

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
    this.componentKeyFigureId = this.analysisResult.component_key_figures
          .find(compKeyFigure => compKeyFigure.component.id === this.activeComponent.componentId)!.id

    this.mappingHelper = new AnalysisResultCspPtcMappingHelper(this.activeComponent.mapping, this.analysisResult);
    this.columns = this.mappingHelper.getColumns(transName => this.$t(transName));
  }

  getTableRequestParam(): TableRequest {
    if (!this.last_ctx) {
      throw Error('Missing last_ctx');
    }

    const orderByMappings = this.mappingHelper.getColumnsMapping();

    return {
      limit: this.last_ctx.perPage,
      page: this.last_ctx.currentPage,
      order_by: this.last_ctx.sortBy && orderByMappings[this.last_ctx.sortBy],
      order_direction: this.last_ctx.sortDesc ? 'desc' : 'asc',
      filter: this.searchText
    }
  }

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    return this.mappingHelper.getColumnsMapping();
  }

  refresh(): void {
    this.table.refresh();
  }

  async dataProvider(ctx: BvTableCtxObject) {
    this.startLoading()
    this.last_ctx = ctx;

    try {
      await apiResultsLoader.loadResults(this.analysisResult.id, this.componentKeyFigureId);

      let items = apiResultsLoader.getResults(this.analysisResult.id, this.componentKeyFigureId)!;
      
      if (this.searchText) {
        items = items.filter(item => item.fieldgeometry_component.kks.toUpperCase().startsWith(this.searchText.toUpperCase()));
      }
    
      const slicedItems = items.slice((ctx.currentPage - 1) * ctx.perPage, (ctx.currentPage - 1) * ctx.perPage + ctx.perPage);

      this.pagination.total = items.length;

      return this.mappingHelper.getItems(slicedItems);
    } catch (e) {
      appContentEventBus.showError(e)
    } finally {
      this.stopLoading()
    }

    return [];
  }
}
</script>