<template>
  <app-content :title="$t('overview')" :subtitle="$t('overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'Analysis-New' }">
        <b-button variant="primary">{{ createNewAnalysisBtnText }}</b-button>
      </router-link>
      <app-table-container>
        <b-table hover :fields="columns" :items="analysisRows"
          head-variant="light"
          show-empty 
          :emptyText="$t('no-data')">
          <template #empty="scope">
            <span class="grayed">{{ scope.emptyText }}</span>
          </template>
          <template #head(actions)>
            <span class="hidden">{{ $t("actions") }}</span>
          </template>
          <template #cell(actions)="row">
            <div class="hover-cell pull-right">
              <b-dropdown right size="sm" variant="secondary" :title="$t('download...')">
                <template #button-content><b-icon icon="cloud-download"></b-icon></template>
                <b-dropdown-item v-for="file in getAnalysisFiles(row)" :key="file" @click="onFileClick(row.item, file)">
                  {{ file }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="clearfix"></div>
          </template>
        </b-table>
      </app-table-container>
    </div>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import resumable from "../shared/services/resumable/resumable";
import { ResumableEvent } from "../shared/services/resumable/types";
import { IAnalysisId } from "./new-analysis/types";
import { ApiStates } from "../shared/services/volateq-api/api-states";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { BvTableCtxObject, BvTableField, BvTableFieldArray } from "bootstrap-vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer
  }
})
export default class AppAnalysis extends BaseAuthComponent {
  columns: BvTableFieldArray = [];
  analysisRows: Array<any> = [];

  createNewAnalysisBtnText = "";

  async created() {
    this.createNewAnalysisBtnText = this.$t("create-new-analysis").toString();

    this.columns = [
      { key: "date", label: this.$t("date").toString(), sortable: true },
      { key: "route", label: this.$t("route").toString(), sortable: true },
      { key: "state", label: this.$t("state").toString(), sortable: true },
      { key: "actions" }
    ];

    if (this.isSuperAdmin) {
      this.columns.splice(0, 0, { key: "customer", label: this.$t("customer").toString(), sortable: true });
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

  getAnalysisFiles(row: any): string[] {
    const files: string[] = [];
    const analysis: AnalysisSchema = row.item || {};

    if (!analysis.files || !analysis.id) {
      return [];
    }

    if (analysis.files.video_files) {
      for (const videoFile of analysis.files.video_files) {
        files.push(videoFile);
      }
    }
    if (analysis.files.drone_metadata_files) {
      for (const droneFile of analysis.files.drone_metadata_files) {
        files.push(droneFile);
      }
    }

    return files;
  }

  async onFileClick(analysis: AnalysisSchema, fileName: string) {
    try {
      const downloadUrl = await volateqApi.getAnalysisFileDownloadUrl(analysis.id, fileName);
      
      AppDownloader.download(downloadUrl.url, fileName);
    } catch (e) {
      console.error(e);

      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
  }

  private updateTableRowState(value: string): boolean {
    const analysisId = resumable.getMetadata<IAnalysisId>();
    if (this.analysisRows && analysisId) {
      const row = this.analysisRows.find(row => row.id === analysisId.id);
      if (row) {
        row.state = value;

        return true;
      }
    }

    return false;
  }

  private async updateAnalysisRows() {
    try {
      this.analysisRows = (await volateqApi.getAnalysis()).map((a: AnalysisSchema) => {
        const row = {
          id: a.id,
          date: new Date(Date.parse(a.created_at)).toLocaleString(),
          route: a.plant_route.route.abbrev,
          state: this.$t(a.current_state && a.current_state.state.name || "UNKNOWN").toString(),
          files: a.files,
        };

        if (this.isSuperAdmin) {
          row["customer"] = a.plant_route.customer.name;
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
