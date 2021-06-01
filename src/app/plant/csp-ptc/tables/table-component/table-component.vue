<template>
  <div class="app-analysis-result-csp-ptc-absorber">
    <!-- TODO -->

    <app-analysis-result-csp-ptc-container ref="container" tableName="cspPtcAbsorberTable" :pagination="pagination">
      <b-table id="cspPtcAbsorberTable" hover :fields="columns" :items="dataProvider" class="bordered" ref="table"
        head-variant="light"
        :emptyText="$t('no-data')"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage">
        <template #head(pcs)="column">
          {{ column.label }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
        </template>
        <template #head(irIntensity)="column">
          {{ column.label }} <app-explanation>{{ $t("ir-intensity_expl") }}</app-explanation>
        </template>
        <template #head(classSubfield)="column">
          {{ column.label }} <app-explanation><span v-html="$t('class-sca_expl')"></span></app-explanation>
        </template>
        <template #head(missingGlass)="column">
          {{ column.label }} <app-explanation><span v-html="$t('missing-gct_expl')"></span></app-explanation>
        </template>
      </b-table>
    </app-analysis-result-csp-ptc-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import { BvTableCtxObject, BvTableFieldArray } from "bootstrap-vue";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import AppTableComponentContainer from "@/app/plant/csp-ptc/tables/table-component/table-component-container.vue";
import { AppAnalysisResultCspPtcBase } from "@/app/analysis/analysis-result/csp-ptc/components/shared/analysis-result-csp-ptc-base";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { TableRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { ITableComponentContainer } from "./types";
import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";
import { IActiveComponent } from "../types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultCspPtcMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-helper";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";

@Component({
  name: "app-analysis-result-csp-ptc-absorber",
  components: {
    AppTableComponentContainer,
    AppExplanation,
  }
})
export default class AppTableComponent extends Vue {
  @Prop() analysisResult!: AnalysisResultDetailedSchema;
  @Prop() activeComponent!: IActiveComponent;
  @Ref() container!: ITableComponentContainer;
  @Ref() table!: any;

  columns: BvTableFieldArray = [];

  pagination = { currentPage: 1, perPage: 10, total: 0 };

  protected last_ctx: BvTableCtxObject | undefined;
  protected searchText = "";

  private mappingHelper!: AnalysisResultCspPtcMappingHelper<AnalysisResultCspPtcSchemaBase>;

  protected startLoading() {
    this.container.startLoading()
  }
  protected stopLoading() {
    this.container.stopLoading()
  }

  // protected hasKeyFigure(keyFigureId: AnalysisResultKeyFigure): boolean {
  //   return this.componentKeyFigures.filter(
  //     (comp_key_figure) => comp_key_figure.key_figure.id === keyFigureId
  //   ).length > 0
  // }

  public search(searchText: string) {
    this.searchText = searchText.trim();

    this.table.refresh()
  }

  created() {
    this.mappingHelper = new AnalysisResultCspPtcMappingHelper(this.activeComponent.mapping, this.analysisResult);

    this.columns = this.mappingHelper.getColumns(this.$t);
  }

  getCsvColumnMappingsParam(): { [column_name: string]: string } {
    // TODO!

    // const columnMappingParams = {
    //   [this.$t("pcs").toString()]: 'fieldgeometry_component.kks',
    //   [this.$t("absorber-temperature").toString()]: 'absorber_temperature',
    //   [this.$t("ir-intensity").toString()]: 'ir_intensity',
    //   [this.$t("class-subfield").toString()]: 'class_subfield'
    // };

    // if (this.hasKeyFigure(AnalysisResultKeyFigure.MISSING_GLASS_CLADDING_TUBE_ID)) {
    //   columnMappingParams[this.$t("missing-gct").toString()] = 'missing_glass_cladding_tube';
    // }

    return {}// columnMappingParams;
  }

  getTableRequestParam(): TableRequest {
    // TODO!

    if (!this.last_ctx) {
      throw Error('Missing last_ctx');
    }

    const orderByMappings = {
      pcs: "kks", 
      absorberTemperature: "absorber_temperature",
      irIntensity: "ir_intensity",
      classSubfield: "class_subfield",
      missingGlass: "missing_glass_cladding_tube",
    };

    return {
      limit: this.last_ctx.perPage,
      page: this.last_ctx.currentPage,
      order_by: this.last_ctx.sortBy && orderByMappings[this.last_ctx.sortBy],
      order_direction: this.last_ctx.sortDesc ? 'desc' : 'asc',
      filter: this.searchText
    }
  }

  async dataProvider(ctx: BvTableCtxObject) {
    // TODO!

    // this.startLoading()
    // this.last_ctx = ctx;

    // try {
    //   const tableResult = (await volateqApi.getSpecificAnalysisResult<AnalysisResultCspPtcIrIntensitySchema>(
    //     this.analysisResultId, 
    //     this.componentKeyFigures[0].id, 
    //     this.getTableRequestParam()
    //   ));
    //   const items = tableResult.items.map((absorberDataRow: AnalysisResultCspPtcIrIntensitySchema) => ({
    //     pcs: absorberDataRow.fieldgeometry_component.kks,
    //     absorberTemperature: absorberDataRow.absorber_temperature,
    //     irIntensity: absorberDataRow.ir_intensity,
    //     missingGlass: absorberDataRow.missing_glass_cladding_tube,
    //     classSubfield: absorberDataRow.class_subfield,
    //   }));
      
    //   this.pagination.total = tableResult.total;

    //   return items;
    // } catch (e) {
    //   appContentEventBus.showError(e)
    // } finally {
    //   this.stopLoading()
    // }

    return [];
  }
}
</script>