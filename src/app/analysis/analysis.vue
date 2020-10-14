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
import { AppTableColumns, AppTableRows } from "../shared/components/app-table/types";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTable
  }
})
export default class AppAnalysis extends Vue {
  columns: AppTableColumns = [];
  analysisRows: AppTableRows = [];

  async created() {
    this.columns = [
      { name: this.$t("date").toString() },
      { name: this.$t("route").toString() },
      { name: this.$t("state").toString() }
    ];

    await this.updateAnalysisRows();
  }

  private async updateAnalysisRows() {
    try {
      this.analysisRows = (await volateqApi.getAnalysis()).map((a: AnalysisSchema) => ({
        id: a.id,
        cells: [
          { value: new Date(Date.parse(a.created_at)).toLocaleString() },
          { value: a.plant_route.route.abbrev },
          { value: a.current_state.state.name }
        ]
      }));
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
  }
}
</script>

<style>

</style>
