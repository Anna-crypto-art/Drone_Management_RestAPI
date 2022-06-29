<template>
  <app-box :title="$t('run-qfly-server')">
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
  </app-box>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { ApiTasks } from "@/app/shared/services/volateq-api/api-tasks";
import AppBox from "@/app/shared/components/app-box/app-box.vue";

@Component({
  name: "app-run-qfly-for-analysis",
  components: {
    AppButton,
    AppBox,
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

        if (task.state === "SUCCESSFUL") {
          this.showSuccess(this.$t("uploaded-data-complete-success").toString());
        }
      } else if (task.name === ApiTasks.runQFlyWizard) {
        this.loadingRunQFlyWizard = false;

        if (task.state === "SUCCESSFUL") {
          this.showSuccess(this.$t("evaluation-finished-success").toString());
        }
      }
    })
  }

  get validateFilesDisabled(): boolean {
    return this.analysis.current_state.state.id !== ApiStates.DATA_COMPLETE
  }

  get runQFlyWizardDisabled(): boolean {
    return !([ApiStates.DATA_COMPLETE_VERIFIED, ApiStates.PROCESSING].includes(this.analysis.current_state.state.id));
  }

  async onValidateFilesClick() {
    try {
      if (confirm("Are you sure?")) {
        this.loadingValidateFiles = true;

        await volateqApi.validatePlantMetadata(this.analysis.id, this.startServer);

        AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
      }
    } catch (e) {
      this.showError(e);
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
      this.showError(e);
    }
  }
}
</script>
