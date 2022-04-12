<template>
  <div class="diagram">
    <b-row>
      <b-col>
        <b-form-select v-model="selectedComponentId" :options="componentOptions" >
          <template #first>
            <b-form-select-option :value="null" disabled>{{ $t("select-component") }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <b-col>
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
            {{ $t("order-and-limit-selection-text", {limit: 25, order: 'descending'}) }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col>
        <b-form-select v-if="selectedAnalysisResult" 
          v-model="selectedKeyFigure"
          :options="keyFigureOptions"
          v-show="selectedOrderAndLimit"
          @change="onKeyFigureSelected"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>{{ $t("select-pi") }}</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <b-col>
        <template v-if="selectedAnalysisResult">
          <div v-for="keyFigureOption in keyFigureOptions" :key="keyFigureOption.value.entry.transName">
            <div v-show="keyFigureOption.value.show">
              <slot :name="keyFigureOption.value.entry.transName" />
            </div>
          </div>
        </template>
      </b-col>
      <b-col>
        <app-button v-show="selectedKeyFigure" @click="onApply" :loading="loading">{{ $t("apply") }}</app-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisResultMappingEntry, AnalysisResultMappings } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { BvSelectOption } from "@/app/shared/types";
import { Component, Prop } from "vue-property-decorator";
import { AnalysisSelectionService } from "../analysis-selection-sidebar/analysis-selection-service";
import { AnalysisSelectionEvent } from "../analysis-selection-sidebar/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";

@Component({
  name: "app-diagram",
  components: {
    AppButton
  },
})
export default class AppPlantDiagramViewCspPtc extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() componentSelection!: ApiComponent[];
  @Prop() resultMappings!: { componentId: ApiComponent, resultMapping: AnalysisResultMappings<AnalysisResultSchemaBase>}[];
  @Prop({ default: null }) tableFilter!: TableFilterRequest | null;
  
  selectedAnalysisResult: AnalysisResultDetailedSchema | null = null;
  keyFigureOptions: BvSelectOption[] | null = null;

  selectedComponentId: ApiComponent | null = null;
  selectedOrderAndLimit: { reverse: boolean, limit: number } | null = null;
  selectedKeyFigure: { 
    entry: AnalysisResultMappingEntry<AnalysisResultSchemaBase>, 
    show: boolean,
    mappingHelper: AnalysisResultMappingHelper<AnalysisResultSchemaBase>
    componentId: ApiComponent,
    } | null = null;

  loading = false;

  async created(): Promise<void> {
    AnalysisSelectionService.on(
      this.plant.id,
      AnalysisSelectionEvent.ANALYSIS_SELECTED,
      (selectedAnalysisResultId: string | undefined) => {
        this.selectedAnalysisResult = this.analysisResults
          .find(analysisResult => analysisResult.id === selectedAnalysisResultId) || null;

        if (this.selectedAnalysisResult) {
          let keyFigureSelectOptions: BvSelectOption[] = [];
          for (const resultMapping of this.resultMappings) {
            const analysisResultMappingHelper = new AnalysisResultMappingHelper(resultMapping.resultMapping, this.selectedAnalysisResult!);

            keyFigureSelectOptions = [
              ...keyFigureSelectOptions, 
              ...analysisResultMappingHelper.getEntries().filter(entry => entry.enableForDiagram).map(entry => ({
                value: { entry, show: false, mappingHelper: analysisResultMappingHelper, componentId: resultMapping.componentId },
                text: this.$t(entry.transName).toString(),
            }))];
          }
          this.keyFigureOptions = keyFigureSelectOptions;
        }
      }
    );
  }

  get componentOptions(): BvSelectOption[] {
    return this.componentSelection.map(comp => ({
      value: comp,
      text: this.$t(apiComponentNames[comp]).toString(),
    }));
  }

  onKeyFigureSelected() {
    if (this.selectedKeyFigure) {
      for (const keyFigureOption of this.keyFigureOptions!) {
        keyFigureOption.value.show = (keyFigureOption.value.entry.transName === this.selectedKeyFigure.entry.transName);
      }
    }
  }

  async onApply() {
    try {
      this.loading = true;

      if (!this.tableFilter) {
        this.tableFilter = {};
      }

      this.tableFilter.component_filter = {
        component_id: this.selectedComponentId!,
        grouped: true,
      }

      const columnName: string = this.selectedKeyFigure!.mappingHelper.getColumnsMapping()[this.selectedKeyFigure!.entry.transName];
      if (!this.tableFilter.columns_selection) {
        this.tableFilter.columns_selection = { columns: [{ name: columnName }] };
      }

      volateqApi.getSpecificAnalysisResult(
        this.selectedAnalysisResult!.id, 
        this.selectedKeyFigure!.componentId,
        { order_by: columnName, order_direction: "desc", limit: 10 },
        this.tableFilter
      );
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>