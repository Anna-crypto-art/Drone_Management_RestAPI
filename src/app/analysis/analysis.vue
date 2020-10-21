<template>
  <app-content :title="$t('overview')" :subtitle="$t('overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'Analysis-New' }">
        <b-button variant="primary">{{ $t("create-new-analysis") }}</b-button>
      </router-link>
      <app-table :columns="columns" :rows="analysisRows"></app-table>
    </div>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import { AppTableColumns, AppTableRow, AppTableRows } from "../shared/components/app-table/types";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import resumable from "../shared/services/resumable/resumable";
import { ResumableEvent } from "../shared/services/resumable/types";
import { IAnalysisId } from "./new-analysis/types";
import { ApiStates } from "../shared/services/volateq-api/api-states";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTable
  }
})
export default class AppAnalysis extends Vue {
  columns: AppTableColumns = [];
  analysisRows: AppTableRow[] = [];

  async created() {
    this.columns = [
      { name: this.$t("date").toString() },
      { name: this.$t("route").toString() },
      { name: this.$t("state").toString() }
    ];

    await this.updateAnalysisRows();
  }

  mounted() {
    resumable.on(ResumableEvent.PROGRESS, () => {
      const analysisId = resumable.getMetadata<IAnalysisId>();
      if (this.analysisRows && analysisId) {
        const row = this.analysisRows.find(row => row.id === analysisId.id);
        if (row && row.cells.length > 0) {
          row.cells[row.cells.length - 1].value = this.$t("UPLOADING") + " " + Math.round(resumable.progress() * 100) + "%";
        }
      }
    });
  }

  private async updateAnalysisRows() {
    try {
      this.analysisRows = (await volateqApi.getAnalysis()).map((a: AnalysisSchema) => ({
        id: a.id,
        cells: [
          { value: new Date(Date.parse(a.created_at)).toLocaleString() },
          { value: a.plant_route.route.abbrev },
          { value: this.$t(a.current_state && a.current_state.state.name || "UNKNOWN").toString() }
        ]
      }));
    } catch (e) {
      console.error(e);

      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
  }
}
</script>

<style>

</style>
