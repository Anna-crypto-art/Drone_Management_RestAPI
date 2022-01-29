<template>
  <app-content v-if="analysis" :title="analysis.name || ''" :navback="true">
    <template #subtitle>
      <div v-if="analysis.current_state">
        <b>{{ $t(analysis.current_state.state.name) }}</b>
      </div>
    </template>
    <div class="app-edit-analysis">
      <b-tabs>
        <b-tab class="app-edit-analysis-download-tab">
          <template #title>
            <b-icon icon="download" /><span class="pad-left">{{ $t("download") }}</span>
          </template>
          <app-download-analysis-files ref="downloadAnalysisFiles" :analysis="analysis" />
        </b-tab>
        <b-tab class="app-edit-analysis-upload-tab">
          <template #title>
            <b-icon icon="upload" /><span class="pad-left">{{ $t("upload") }}</span>
          </template>
          <app-upload-analysis-files :analysis="analysis" ref="uploadAnalysisFiles" @updateAnalysis="onUpdateAnalysis" />
        </b-tab>
        <b-tab v-if="isSuperAdmin" class="app-edit-analysis-admin-tab">
          <template #title>
            <b-icon icon="braces" /><span class="pad-left">{{ $t("admin-panel") }}</span>
          </template>
          <app-edit-analysis-admin ref="editAnalysisAdmin" :analysis="analysis" @updateAnalysis="onUpdateAnalysis" />
        </b-tab>
      </b-tabs>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import appContentEventBus from "../../shared/components/app-content/app-content-event-bus";
import { BaseAuthComponent } from "../../shared/components/base-auth-component/base-auth-component";
import { ApiException } from "../../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../../shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "../../shared/services/volateq-api/volateq-api";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import AppDownloadAnalysisFiles from "@/app/analysis/edit-analysis/download-analysis-files.vue";
import AppEditAnalysisAdmin from "@/app/analysis/edit-analysis/edit-analysis-admin/edit-analysis-admin.vue";
import AppUploadAnalysisFiles from "@/app/analysis/edit-analysis/upload-analysis-files.vue";
import { IUpdateEditAnalysis } from "./types";

@Component({
  name: "app-edit-analysis",
  components: {
    AppContent,
    AppAnalysisUpload,
    AppDownloadAnalysisFiles,
    AppEditAnalysisAdmin,
    AppUploadAnalysisFiles,
  },
})
export default class AppEditAnalysis extends BaseAuthComponent {
  analysis: AnalysisSchema | null = null;

  @Ref() downloadAnalysisFiles!: IUpdateEditAnalysis;
  @Ref() editAnalysisAdmin!: IUpdateEditAnalysis;
  @Ref() uploadAnalysisFiles!: IUpdateEditAnalysis;

  async created() {
    await this.updateAnalysis(this.$route.params.id);
  }

  async onUpdateAnalysis() {
    await this.updateAnalysis(this.analysis!.id);
  }

  private async updateAnalysis(analysisId: string) {
    try {
      this.analysis = await volateqApi.getAnalysis(analysisId);

      if (this.downloadAnalysisFiles && this.editAnalysisAdmin && this.uploadAnalysisFiles) {
        await this.downloadAnalysisFiles.updateAnalysis(this.analysis);
        await this.editAnalysisAdmin.updateAnalysis(this.analysis);
        await this.uploadAnalysisFiles.updateAnalysis(this.analysis);
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }
}
</script>

<style lang="scss">
.app-edit-analysis {
  &-download-tab {
    margin-top: 30px;
  }
  &-upload-tab {
    margin-top: 30px;
  }
}
</style>
