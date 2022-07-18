<template>
  <app-content v-if="analysis" :title="analysis.name || ''" :navback="true" :eventId="analysis.id">
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
          <app-download-analysis-files :analysis="analysis" />
        </b-tab>
        <b-tab class="app-edit-analysis-upload-tab" v-if="uploadAllowed">
          <template #title>
            <b-icon icon="upload" /><span class="pad-left">{{ $t("upload") }}</span>
          </template>
          <app-upload-analysis-files :analysis="analysis" />
        </b-tab>
        <b-tab class="app-edit-analysis-edit-tab">
          <template #title>
            <b-icon icon="pencil-square" /><span class="pad-left">{{ $t("edit") }}</span>
          </template>
          <b-row>
            <b-col sm>
              <app-box :title="$t('edit-analysis')">
                <b-form @submit.prevent="onSubmitEditAnalysis">
                  <b-form-group :label="$t('acquisition-date')" label-cols-sm="4" label-cols-lg="2">
                    <b-datepicker v-model="flownAt" required /> 
                  </b-form-group>
                  <app-button type="submit" :loading="loading">{{ $t("apply") }}</app-button>
                </b-form>
              </app-box>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab class="app-edit-analysis-ref-measures" v-if="hasReferenceMeasurements">
          <template #title>
            <b-icon icon="clipboard-check" /><span class="pad-left">{{ $t("reference-measurements") }}</span>
          </template>
          <app-upload-analysis-files :analysis="analysis" />
        </b-tab>
        <b-tab v-if="isSuperAdmin" class="app-edit-analysis-admin-tab">
          <template #title>
            <b-icon icon="braces" /><span class="pad-left">{{ $t("admin-panel") }}</span>
          </template>
          <app-edit-analysis-admin :analysis="analysis" />
        </b-tab>
      </b-tabs>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "../../shared/components/base-auth-component/base-auth-component";
import { ApiErrors } from "../../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../../shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "../../shared/services/volateq-api/volateq-api";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import AppDownloadAnalysisFiles from "@/app/analysis/edit-analysis/download-analysis-files.vue";
import AppEditAnalysisAdmin from "@/app/analysis/edit-analysis/edit-analysis-admin/edit-analysis-admin.vue";
import AppUploadAnalysisFiles from "@/app/analysis/edit-analysis/upload-analysis-files.vue";
import { AnalysisEventService } from "@/app/analysis/shared/analysis-event-service";
import { AnalysisEvent } from "../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";

@Component({
  name: "app-edit-analysis",
  components: {
    AppContent,
    AppButton,
    AppAnalysisUpload,
    AppDownloadAnalysisFiles,
    AppEditAnalysisAdmin,
    AppUploadAnalysisFiles,
    AppBox,
  },
})
export default class AppEditAnalysis extends BaseAuthComponent {
  analysis: AnalysisSchema | null = null;

  flownAt = "";
  loading = false;
  hasReferenceMeasurements = false;

  async created() {
    await this.updateAnalysis(this.$route.params.id);

    AnalysisEventService.on(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS, () => {
      this.updateAnalysis(this.analysis!.id)
    });
  }

  get uploadAllowed(): boolean {
    return this.analysis && this.analysis.current_state.state.id < ApiStates.DATA_COMPLETE_VERIFIED || false;
  }

  private async updateAnalysis(analysisId: string) {
    try {
      this.analysis = await volateqApi.getAnalysis(analysisId);

      this.flownAt = this.analysis.flown_at;

      this.hasReferenceMeasurements = (await volateqApi.getReferenceMeasurements(this.analysis.id)).length > 0;

      this.watchAnalysisTask();
    } catch (e) {
      this.showError(e);
    }
  }

  private watchAnalysisTask() {
    if (this.analysis!.task_id) {
      volateqApi.waitForTask(
        this.analysis!.task_id,
        (task: TaskSchema, failed: boolean) => {
          if (failed) {
            AppContentEventService.showError(this.analysis!.id, {
              error: ApiErrors.SOMETHING_WENT_WRONG,
              message: `<b>${task.output!.error}</b><br><br>` + volateqApi.getTaskOutputAsMessage(task),
            });
          } else {
            AppContentEventService.showSuccess(this.analysis!.id, volateqApi.getTaskOutputAsMessage(task))
          }


          AnalysisEventService.emit(this.analysis!.id, AnalysisEvent.FINISHED_ANALYSIS_TASK, task);
        },
        (task: TaskSchema) => {
          AppContentEventService.showInfo(this.analysis!.id, volateqApi.getTaskOutputAsMessage(task, this.$t("wait-for-start").toString()));

          AnalysisEventService.emit(this.analysis!.id, AnalysisEvent.RUN_ANALYSIS_TASK, task)
        }
      )
    }
  }

  async onSubmitEditAnalysis() {
    try {
      this.loading = true;

      await volateqApi.updateAnalysis(this.analysis!.id, { flown_at: this.flownAt })

      this.showSuccess(this.$t("analysis-updated-successfully").toString());

      AnalysisEventService.emit(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS);
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
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
