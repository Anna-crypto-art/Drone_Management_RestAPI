<template>
  <div class="analysis-selection-sidebar">
    <app-sidebar :open="false" @toggled="onSidebarToggled">
      <div class="analysis-selection-sidebar-leftside">
        <app-table-container size="sm">
          <b-table ref="analysisResultsTable"
          :items="analysisResultsTableItems" 
          :fields="analysisResultsTableColumns"
          select-mode="single"
          selectable
          hover
          head-variant="light"
          @row-selected="onAnalysisResultSelected">
            <template #head(selected)></template>
            <template #cell(selected)="{ rowSelected }">
              <b-checkbox :checked="rowSelected" disabled class="b-table-selectable-checkbox"></b-checkbox>
            </template>
            <template #row-details="row">
              <span class="analysis-selection-sidebar-kpi-badge" v-for="kpi in row.item.kpis" :key="kpi.id">
                <b-badge variant="primary" :style="'background-color: ' + getKpiColor(kpi)">{{ kpi.name }}</b-badge>
              </span>
            </template>
          </b-table>
        </app-table-container>
      </div>
    </app-sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'vue-property-decorator';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import { BvTableFieldArray } from 'bootstrap-vue';
import AppTableContainer from '@/app/shared/components/app-table-container/app-table-container.vue';
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import AppSidebar from '@/app/shared/components/app-sidebar/app-sidebar.vue';
import { KeyFigureSchema } from '@/app/shared/services/volateq-api/api-schemas/key-figure-schema';


@Component({
  name: 'app-analysis-selection-sidebar',
  components: {
    AppTableContainer,
    AppExplanation,
    AppSidebar,
  }
})
export default class AppAnalysisSelectionSidebar extends Vue {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() getPIColor!: (keyFigure: KeyFigureSchema) => string;
  @Ref() analysisResultsTable!: any; // b-table

  analysisResultsTableColumns: BvTableFieldArray = [
    { key: 'selected', label: '' },
    { key: 'name', label: this.$t("name").toString(), },
    { key: 'createdAt', label: this.$t('created-at').toString() },
  ];
  analysisResultsTableItems: Record<string, unknown>[] = [];

  async created() {
    for (const analysisResult of this.analysisResults) {
      this.analysisResultsTableItems.push({
        id: analysisResult.id,
        name: analysisResult.analysis.name,
        createdAt: new Date(Date.parse(analysisResult.analysis.created_at)).toLocaleDateString(),
        kpis: analysisResult.key_figures,
        _showDetails: true,
      })
    }

    if (this.analysisResults.length > 0) {
      let tableRowIndex = 0;
      const analysisResultId = this.$route.query.result;
      if (analysisResultId && typeof analysisResultId === "string") {
        tableRowIndex = this.analysisResults.findIndex(analysisResult => analysisResult.id === analysisResultId);
      }

      setTimeout(() => this.analysisResultsTable.selectRow(tableRowIndex), 1000); // wait for DOM
    }
  }

  onAnalysisResultSelected(selectedAnalysisResult: { id: string }[]): void {
    const selectedAnalysisResultId = selectedAnalysisResult && selectedAnalysisResult.length > 0 && 
      selectedAnalysisResult[0].id || undefined;

    this.$emit("analysisResultSelected", selectedAnalysisResultId);
  }

  onSidebarToggled(open: boolean): void {
    this.$emit("sidebarToggled", open)
  }

  getKpiColor(keyFigure: KeyFigureSchema): string {
    return this.getPIColor(keyFigure);
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

$left-width: 400px;

.analysis-selection-sidebar {
  height: calc(100vh - #{$header-height});
  display: flex;

  &-leftside {
    padding: 20px;
    height: 100%;
    width: $left-width;
    border-right: $border-color-grey 1px solid;
  }
  &-kpi-badge {
    padding-right: 5px;
  }

  .b-table-details {
    cursor: default !important;
  }
}
</style>