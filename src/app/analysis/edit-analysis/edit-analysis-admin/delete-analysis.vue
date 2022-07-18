<template>
  <app-box :title="$t('danger-zone')">
    <app-button type="button" variant="danger" 
      :loading="finishTaskLoading" 
      @click="onFinishTaskClick"
      :disabled="!analysis.task_id"
    >
      {{ $t("finish-running-task") }}
    </app-button>
    <hr>
    <app-button type="button" variant="danger" :loading="loading" @click="onDeleteAnalysisClick">
      {{ $t("delete") }}
    </app-button>
  </app-box>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { UPLOAD_ANALYSIS_STORAGE_KEY } from "@/app/shared/components/fetch-component/storage-keys";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";

@Component({
  name: "app-delete-analysis",
  components: {
    AppButton,
    AppBox,
  },
})
export default class AppDeleteAnalysis extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  loading = false;
  finishTaskLoading = false;

  async onDeleteAnalysisClick() {
    try {
      if (confirm("Delete analysis and all according files? This cannot be undone.")) {
        this.loading = true;

        appLocalStorage.removeItem(UPLOAD_ANALYSIS_STORAGE_KEY + "-" + this.analysis.id);

        await volateqApi.deleteAnalysis(this.analysis.id);

        this.$router.push({ name: "Analyses" });
      }
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  async onFinishTaskClick() {
    this.finishTaskLoading = true;
    try {
      await volateqApi.finishRunningTask(this.analysis.id);

      AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);

      this.showSuccess(this.$t('successfully-finished-running-task').toString())
    } catch (e) {
      this.showError(e);
    } finally {
      this.finishTaskLoading = false;
    }
  }
}
</script>
