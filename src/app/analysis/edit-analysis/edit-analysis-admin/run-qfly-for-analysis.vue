<template>
  <div class="admin-box">
    <h4>{{ $t("run-qfly-server") }}</h4>
    <b-form-checkbox v-model="startServer">
      {{ $t("start-qlfy-server") }}
    </b-form-checkbox>
    <br>
    <app-button 
      type="button"
      :loading="loadingValidateFiles"
      :disabled="validateFilesDisabled"
      @click="onValidateFilesClick"
      :title="$t('enabled-if-data-complete-only')"
    >
      {{ $t("validate-file-completeness") }}
    </app-button>
    <br>
    <br>
    <app-button
      type="button"
      :loading="loadingRunQFlyWizard"
      :disabled="runQFlyWizardDisabled"
      @click="onRunQFlyWizardClick"
      :title="$t('enabled-if-data-complete-verfified-only')"
    >
      {{ $t("run-qfly-wizard") }}
    </app-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { ApiTasks } from "@/app/shared/services/volateq-api/api-tasks";

@Component({
  name: "app-run-qfly-for-analysis",
  components: {
    AppButton,
  },
})
export default class AppRunQFlyForAnalysis extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  startServer = true;

  loadingValidateFiles = false;
  loadingRunQFlyWizard = false;

  async created() {
    AnalysisEventService.on(this.analysis.id, AnalysisEvent.RUN_ANALYSIS_TASK, (task: TaskSchema) => {
      if (task.name === ApiTasks.validatePlantMetadata) {
        this.loadingValidateFiles = true;
      } else if (task.name === ApiTasks.runQFlyWizard) {
        this.loadingRunQFlyWizard = true;
      }
    });
    AnalysisEventService.on(this.analysis.id, AnalysisEvent.FINISHED_ANALYSIS_TASK, (task: TaskSchema) => {
      if (task.name === ApiTasks.validatePlantMetadata) {
        this.loadingValidateFiles = false;

        if (task.state === "SUCCESS") {
          AppContentEventService.showSuccess(this.analysis.id, this.$t("uploaded-data-complete-success").toString());
        }
      } else if (task.name === ApiTasks.runQFlyWizard) {
        this.loadingRunQFlyWizard = false;

        if (task.state === "SUCCESS") {
          AppContentEventService.showSuccess(this.analysis.id, this.$t("evaluation-finished-success").toString());
        }
      }
    })
  }

  get validateFilesDisabled(): boolean {
    return this.analysis.current_state.state.id !== ApiStates.DATA_COMPLETE
  }

  get runQFlyWizardDisabled(): boolean {
    return !(this.analysis.current_state.state.id in [ApiStates.DATA_COMPLETE_VERIFIED, ApiStates.PROCESSING]);
  }

  async onValidateFilesClick() {
    try {
      if (confirm("Are you sure?")) {
        this.loadingValidateFiles = true;

        await volateqApi.validatePlantMetadata(this.analysis.id, this.startServer);

        AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
      }
    } catch (e) {
      AppContentEventService.showError(this.analysis.id, e as ApiException);
    }
  }

  async onRunQFlyWizardClick() {
    try {
      if (confirm("Are you sure?")) {
        this.loadingRunQFlyWizard = true;

        await volateqApi.runQFlyWizard(this.analysis.id, this.startServer);

        AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
      }
    } catch (e) {
      AppContentEventService.showError(this.analysis.id, e as ApiException);
    }
  }
}
</script>
