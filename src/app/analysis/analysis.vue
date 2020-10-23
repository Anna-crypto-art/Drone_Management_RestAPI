<template>
  <app-content :title="$t('overview')" :subtitle="$t('overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'Analysis-New' }">
        <b-button variant="primary">{{ createNewAnalysisBtnText }}</b-button>
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
import { AppTableColumn, AppTableColumns, AppTableRow, AppTableRows } from "../shared/components/app-table/types";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import resumable from "../shared/services/resumable/resumable";
import { ResumableEvent } from "../shared/services/resumable/types";
import { IAnalysisId } from "./new-analysis/types";
import { ApiStates } from "../shared/services/volateq-api/api-states";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTable
  }
})
export default class AppAnalysis extends BaseAuthComponent {
  columns: AppTableColumn[] = [];
  analysisRows: AppTableRow[] = [];

  createNewAnalysisBtnText = "";

  async created() {
    this.createNewAnalysisBtnText = this.$t("create-new-analysis").toString();

    this.columns = [
      { name: '#' },
      { name: this.$t("date").toString() },
      { name: this.$t("route").toString() },
      { name: this.$t("state").toString() },
    ];

    if (this.isSuperAdmin) {
      this.columns.splice(0, 0, { name: this.$t("customer").toString() });
    }

    await this.updateAnalysisRows();
  }

  mounted() {
    resumable.on(ResumableEvent.PROGRESS, () => {
      if (this.updateTableRowState(this.$t("UPLOADING") + " " + Math.round(resumable.progress() * 100) + "%")) {
        this.createNewAnalysisBtnText = this.$t("return-to-upload").toString();
      }
    });
    resumable.on(ResumableEvent.COMPLETED, () => {
      this.createNewAnalysisBtnText = this.$t("create-new-analysis").toString();
      this.updateTableRowState(this.$t("PICK_ME_UP").toString());
    });
    resumable.on(ResumableEvent.FAILED, () => {
      this.updateTableRowState(this.$t("UPLOAD_FAILED").toString());
    });
  }

  private updateTableRowState(value: string): boolean {
    const analysisId = resumable.getMetadata<IAnalysisId>();
    if (this.analysisRows && analysisId) {
      const row = this.analysisRows.find(row => row.id === analysisId.id);
      if (row && row.cells.length > 0) {
        row.cells[row.cells.length - 1].value = value;

        return true;
      }
    }

    return false;
  }

  private async updateAnalysisRows() {
    try {
      this.analysisRows = (await volateqApi.getAnalysis()).map((a: AnalysisSchema) => {
        const row: AppTableRow = {
          id: a.id,
          cells: [
            { value: a.id },
            { value: new Date(Date.parse(a.created_at)).toLocaleString() },
            { value: a.plant_route.route.abbrev },
            { value: this.$t(a.current_state && a.current_state.state.name || "UNKNOWN").toString() }
          ]
        };

        if (this.isSuperAdmin) {
          row.cells.splice(0, 0, { value: a.plant_route.customer.name });
        }

        return row;
      });
    } catch (e) {
      console.error(e);

      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
  }
}
</script>

<style>

</style>
