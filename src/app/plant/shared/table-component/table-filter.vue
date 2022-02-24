<template>
  <div class="app-table-filter mar-top mar-bottom" v-if="analysisResult">
    <app-collapse :name="analysisResult.id">
      <template #button>
        <b-icon icon="filter" class="pad-right" />{{ $t("filter") }}
      </template>
      <b-row>
        <b-col sm="6">
          <h4>{{ $t("filter-by-pi") }}</h4>
          <app-filter-fields v-model="piFilterFieldValues" :filterFields="piFilterFields" />
        </b-col>
        <b-col sm="6">
          <h4>{{ $t("filter-by-component") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mar-top">
        <b-col>
          <app-button :loading="loading" class="pull-left mar-right" @click="onApplyFilter">
            {{ $t("apply") }}
          </app-button>
          <b-button variant="secondary" class="pull-left">{{ $t("reset") }}</b-button>
          <div class="clear"></div>
        </b-col>
      </b-row>
    </app-collapse>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import AppCollapse from "@/app/shared/components/app-collapse/app-collapse.vue";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { IActiveComponent } from "../types";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppFilterFields from "@/app/plant/shared/filter-fields/filter-fields.vue";
import { FilterField, FilterFieldValue } from "../filter-fields/types";

@Component({
  name: "app-table-filter",
  components: {
    AppCollapse,
    AppButton,
    AppFilterFields,
  },
})
export default class AppTableFilter extends Vue {
  @Prop({ required: true }) analysisResult!: AnalysisResultDetailedSchema;
  @Prop({ required: true }) activeComponent!: IActiveComponent;

  loading = false;

  piFilterFieldValues: FilterFieldValue[] = [];
  piFilterFields: FilterField[] = [];

  private mappingHelper!: AnalysisResultMappingHelper<AnalysisResultSchemaBase>;

  created() {
    this.mappingHelper = new AnalysisResultMappingHelper(this.activeComponent.mapping, this.analysisResult);

    this.piFilterFields = this.mappingHelper.getFields()
      .filter(field => field.filterType)
      .map(field => ({
        key: field.key,
        name: this.$t(field.key).toString(),
        type: field.filterType!
      }));
  }

  async onApplyFilter() {
    console.log(this.piFilterFieldValues);
    // do somehting
  }
}
</script>

<style lang="scss">
</style>