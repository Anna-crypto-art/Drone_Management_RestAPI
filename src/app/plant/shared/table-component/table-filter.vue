<template>
  <div class="app-table-component-filter mar-top mar-bottom" v-if="analysisResult">
    <app-collapse :name="analysisResult.id">
      <template #button>
        <b-icon icon="filter" /> <span class="pad-left">{{ $t("filter") }}</span>
      </template>
      <template slot="nextToButton">
        <slot name="nextToButton" />
      </template>
      <b-form @submit.prevent="onApplyFilter">
        <b-row>
          <b-col sm="6">
            <h5 class="mar-bottom" v-html="compareView ? $t('filter-diff-by-pi') : $t('filter-by-pi')"></h5>
            <app-filter-fields 
              v-model="piFilterFieldValues"
              :filterFields="piFilterFields"
              :filterSelectPlaceholder="$t('select-pi')"
              :compareView="compareView"
            >
              <template #addButton>
                {{ $t("add-pi-filter") }}
              </template>
            </app-filter-fields>
          </b-col>
          <b-col sm="6">
            <h5 class="mar-bottom">{{ $t("filter-by-component") }}</h5>
            <app-filter-fields 
              v-model="compFilterFieldValues"
              :filterFields="compFilterFields" 
              :extendable="false"
              :filterSelectPlaceholder="$t('select-component-type')"
            />
          </b-col>
        </b-row>
        <b-row class="mar-top">
          <b-col>
            <app-button class="pull-left mar-right" type="submit" style="margin-top: 0 !important;">
              {{ $t("apply") }}
            </app-button>
            <app-button variant="outline-danger" class="pull-left" @click="onReset">{{ $t("reset") }}</app-button>
            <div class="clear"></div>
          </b-col>
        </b-row>
      </b-form>
    </app-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import AppCollapse from "@/app/shared/components/app-collapse/app-collapse.vue";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppFilterFields from "@/app/plant/shared/filter-fields/filter-fields.vue";
import { FilterField, FilterFieldType, FilterFieldValue, FilterFieldValueType } from "../filter-fields/types";
import { apiComponentsFilter } from "@/app/shared/services/volateq-api/api-components/api-components-filter";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { TableFilterRequest } from "@/app/shared/services/volateq-api/api-requests/common/table-requests";
import { TableResultMappingComponent } from "./types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";

@Component({
  name: "app-table-component-filter",
  components: {
    AppCollapse,
    AppButton,
    AppFilterFields,
  },
})
export default class AppTableComponentFilter extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analysisResult!: AnalysisResultDetailedSchema;
  @Prop({ required: true }) activeComponent!: TableResultMappingComponent;

  analysisSelectionService: AnalysisSelectionService | null = null;

  // Base class IAnalysisSelectionComponent requires to have an "analyses" property. 
  // But we don't have them. Fortunatly they are nullable and the events 
  // ("onAnalysisSelected" and "onMultiAnalysesSelected") get fired anyway :)
  analyses = null;

  loading = false;

  piFilterFieldValues: FilterFieldValue[] = [];
  piFilterFields: FilterField[] = [];
  compFilterFieldValues: FilterFieldValue[] = [];
  compFilterFields: FilterField[] = [];

  compareView = false;

  private mappingHelper!: AnalysisResultMappingHelper<AnalysisResultSchemaBase>;

  @CatchError()
  async created() {
    this.mappingHelper = new AnalysisResultMappingHelper(this.activeComponent.mapping, this.analysisResult);

    this.piFilterFields = this.mappingHelper.getFields()
      .filter(field => field.filterType)
      .map(field => ({
        key: field.key,
        name: this.$t(field.key).toString(),
        type: field.filterType!,
      }));

    this.compFilterFields = apiComponentsFilter[this.activeComponent.componentId]!.map(compId => ({
      key: compId,
      name: this.$t(apiComponentNames[compId]).toString(),
      type: FilterFieldType.ARRAY,
      getValues: async () => {
        return (await volateqApi.getFieldgeometryComponentCodes(this.plant.fieldgeometry!.id, compId))
          .sort()
          .map(code => ({ value: code, text: code }));
      }
    }));
  }

  async mounted() {
    await AnalysisSelectionService.register(this);
  }

  async unmounted() {
    this.analysisSelectionService?.unregister();
  }

  async onAnalysisSelected() {
    await this.compareViewChanged(false);
  }

  async onMultiAnalysesSelected() {
    await this.compareViewChanged(true);
  }

  private async compareViewChanged(compareView: boolean) {
    if (this.compareView != compareView) {
      this.compareView = compareView
  
      // Wait for compareView "@Watch"-Events to refresh filter
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();
  
      this.onApplyFilter();
    }
  }

  onApplyFilter() {
    this.$emit("filter", this.getTableFilterRequest());
  }

  onReset() {
    this.piFilterFieldValues = [];
    this.compFilterFieldValues = [];

    this.$emit("filter", this.getTableFilterRequest());
  }

  private getTableFilterRequest(): TableFilterRequest | undefined {
    const columnsMapping = this.mappingHelper.getColumnsMapping();

    const filters: Record<string, FilterFieldValueType> = {};
    for (const piFilterFieldValue of this.piFilterFieldValues) {
      if (piFilterFieldValue.filterField) {
        filters[columnsMapping[piFilterFieldValue.filterField.key]] = piFilterFieldValue.value;
      }
    }

    const tableFilterRequest: TableFilterRequest = {};

    if (Object.keys(filters).length > 0) {
      tableFilterRequest.filters = filters;
    }

    if (this.compFilterFieldValues.length > 0) {
      tableFilterRequest.component_filter = {
        component_id: this.compFilterFieldValues[0].filterField?.key as number,
        codes: [this.compFilterFieldValues[0].value as string],
      }
    }

    return Object.keys(tableFilterRequest).length > 0 ? tableFilterRequest : undefined;
  }
}
</script>

<style lang="scss">
</style>