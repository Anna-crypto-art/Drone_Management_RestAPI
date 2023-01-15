<template>
  <app-box>
    <template #title>
      <h4 class="box-title">
        {{ $t('run-qfly-server') }}<br>
        <small class="grayed" v-html="serverInfo"></small>
      </h4>
    </template>
    <b-form @submit.prevent="runServerAction" v-if="qFlyServer">
      <b-form-group v-if="!serverStateUnallocated" :label="$t('server-tags')">
        <b-row v-for="tag in qFlyServer.server.tags" :key="tag.Key" class="mar-bottom">
          <b-col><b-form-input v-model="tag.Key" @change="onTagChanged" /></b-col>
          <b-col><b-form-input v-model="tag.Value" @change="onTagChanged" /></b-col>
        </b-row>
      </b-form-group>

      <b-form-group :label="$t('run-server-action')">
        <b-form-select v-model="selectedServerAction" :options="qFlyServerActionSelection" />
      </b-form-group>

      <b-form-group :label="$t('run-task')">
        <b-form-select v-model="selectedTask" :options="runTaskSelection" :disabled="taskSelectionDisabled" />
      </b-form-group>

      <app-button type="submit" :loading="loading">{{ $t("apply") }}</app-button>
    </b-form>
  </app-box>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AnalysisEventService } from "../../shared/analysis-event-service";
import { AnalysisEvent } from "../../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { ApiTasks } from "@/app/shared/services/volateq-api/api-tasks";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { QFlyServerAction, QFlyServerSchema, QFlyServerState } from "@/app/shared/services/volateq-api/api-schemas/server-schemas";

@Component({
  name: "app-run-qfly-for-analysis",
  components: {
    AppButton,
    AppBox,
  },
})
export default class AppRunQFlyForAnalysis extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  qFlyServer: QFlyServerSchema | null = null;
  qFlyServerActionSelection: { text: string, value: string | null }[] = [];
  runTaskSelection: { text: string, value: string | null }[] = [];

  tagsChanged = false;
  selectedServerAction: string | null = null;
  selectedTask: string | null = null;
  taskSelectionDisabled = false;

  loading = false;

  async created() {
    await this.updateQFlyServer();

    AnalysisEventService.on(this.analysis.id, AnalysisEvent.RUN_ANALYSIS_TASK, (task: TaskSchema) => {
      this.taskSelectionDisabled = true;
    });
    AnalysisEventService.on(this.analysis.id, AnalysisEvent.FINISHED_ANALYSIS_TASK, (task: TaskSchema) => {
      this.taskSelectionDisabled = false;

      if (task.state === "SUCCESSFUL") {
        if (task.name === ApiTasks.validate_plant_metadata) {
          this.showSuccess(this.$t("uploaded-data-complete-success").toString());
        } else if (task.name === ApiTasks.run_qfly_wizard) {
          this.showSuccess(this.$t("evaluation-finished-success").toString());
        }
      }
    })
  }

  get serverInfo(): string {
    if (this.qFlyServer) {
      return this.$t(`SERVER_STATE_${this.qFlyServer.state}`, { server: this.qFlyServer.server?.name }).toString() +
        (!this.serverStateUnallocated &&
          " " + this.$t('SERVER_INSTANCE_TYPE_VOLUME_SIZE_STRING', {
            instance_type: this.qFlyServer.instance_type,
            volume_size: this.qFlyServer.volume_size?.toString() }).toString() ||
        "") +
        (this.serverStateUnallocated && 
          "<br>" + this.$t('servers-available', { count: this.qFlyServer.servers_available }).toString() ||
          "")
    }

    return "";
  }

  private async updateQFlyServer() {
    try {
      const newQFlyServer = await volateqApi.getQFlyServer(this.analysis.id);

      if (!this.qFlyServer || this.qFlyServer.state !== newQFlyServer.state) {
        AnalysisEventService.emit(
          this.analysis.id,
          AnalysisEvent.QFLY_SERVER_STATE_CHANGED,
          newQFlyServer.state,
        );
      }

      this.qFlyServer = newQFlyServer;

      this.qFlyServerActionSelection = [
        { value: null, text: "" },
        ...this.qFlyServer.actions.map(action => ({
          value: action,
          text: this.$t(`SERVER_ACTION_${action}`).toString(),
        }))
      ];

      this.runTaskSelection = [
        { value: null, text: "" },
        {
          text: this.$t('validate-file-completeness').toString(),
          value: ApiTasks.validate_plant_metadata,
        },
        {
          text: this.$t('run-qfly-wizard').toString(),
          value: ApiTasks.run_qfly_wizard,
        },
      ];
    } catch (e) {
      this.showError(e);
    }
  }

  get serverStateUnallocated(): boolean {
    return this.qFlyServer!.state == QFlyServerState.UNALLOCATED;
  }

  onTagChanged() {
    this.tagsChanged = true;
  }

  get serverStateStopped(): boolean {
    return this.qFlyServer!.state == QFlyServerState.STOPPED;
  }

  get serverStateRunning(): boolean {
    return this.qFlyServer!.state == QFlyServerState.RUNNING;
  }

  async runServerAction() {
    this.loading = true;
    try {

      let confirm_text = "";
      if (!this.tagsChanged && !this.selectedServerAction && !this.selectedTask) {
        throw { error: "NOTHING_CHANGED_OR_SELECTED", message: "You did not change any tag or select anything to run/do." };
      } else {
        if (this.tagsChanged) {
          confirm_text += this.$t('apply-tags-changed').toString() + "\n\n";
        }
        if (this.selectedServerAction) {
            confirm_text += "\n\n" + this.$t('apply-selected-server-action').toString() + QFlyServerAction[this.selectedServerAction] + "\n\n";
        }
        if (this.selectedTask) {
            confirm_text += "\n\n" + this.$t('apply-selected-task-to-run').toString() + ApiTasks[this.selectedTask] + "\n\n";
        }
        confirm_text += this.$t('apply-are-you-sure').toString();
      }

      if (confirm(confirm_text)) {
        await volateqApi.runQFlyServerAction(this.analysis.id, {
          action: this.selectedServerAction && QFlyServerAction[this.selectedServerAction] || undefined,
          start_task: this.selectedTask && ApiTasks[this.selectedTask] || undefined,
          tags: this.tagsChanged ? this.qFlyServer!.server?.tags : undefined,
        });

        await this.updateQFlyServer();

        AnalysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
      }
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>
