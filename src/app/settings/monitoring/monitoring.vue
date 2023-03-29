<template>
  <div class="app-operations-monitoring">
    <div class="monitoring-toolbar">
      <app-button @click="updateOperationsStatus()">{{ $t("reload") }}</app-button>
      <div class="monitoring-toolbar-loading"><b-spinner v-if="loading" /></div>
      <b-checkbox switch v-model="autoReload" @change="changeAutoReload">
        {{ $t("auto-reload") }}
      </b-checkbox>
    </div>

    <b-tabs align="center">
      <b-tab class="app-analysis-monitoring-tab">
        <template #title>
          <b-icon icon="graph-up" /><span class="pad-left">{{ $t("analysis-progress") }}</span>
        </template>
        <div class="app-analysis-monitoring">
          <div v-for="(analysisState, analysisName) in monitoring_json" v-bind:key="analysisName">
            <b-card :class="{ 'app-analysis-monitoring-title': true, closed: !collapsed_states[analysisName] }">
              <span v-if="qfly_servery_by_analysis_name.has(analysisName)">{{ analysisName + " (" + qfly_servery_by_analysis_name.get(analysisName) + ")" }}</span>
              <span v-else>{{ analysisName }}</span>

              <b-icon
                icon="chevron-down"
                font-scale="1.5"
                class="app-analysis-monitoring-toggle"
                variant="secondary"
                @click="toggleAnalysis(analysisName)"
              />
            </b-card>
            <b-collapse v-model="collapsed_states[analysisName]">
              <div v-if="hasError(analysisState)">
                <div class="app-analysis-monitoring-states">
                  <b-card no-body>
                    <div
                      :class="`app-analysis-monitoring-state app-analysis-monitoring-state-crashed`"
                      title="CRASHED"
                    >
                      {{ analysisState.error }}
                    </div>
                  </b-card>
                </div>
              </div>          
              <div v-if="!hasError(analysisState) && hasProjects(analysisState)">
                <div v-for="(projectState, projectName) in analysisState.output.projects" v-bind:key="projectName" class="app-analysis-monitoring-states">
                  <b-card no-body>
                    <div
                      :class="`app-analysis-monitoring-state app-analysis-monitoring-state-${projectState.state.toLowerCase()}`"
                      :title="projectState.state"
                    >
                      <span class="monitoring-project">{{ projectName }}</span>
                      <span class="monitoring-state grayed">{{ projectState.state }}</span>
                      <span class="monitoring-action grayed">{{ projectState.current_action }}</span>
                    </div>
                  </b-card>
                </div>
              </div>          
              <div v-if="!hasError(analysisState) && hasInfo(analysisState)">
                <div class="app-analysis-monitoring-states">
                  <b-card no-body>
                    <div
                      :class="`app-analysis-monitoring-state app-analysis-monitoring-state-running`"
                      :title="analysisState.name"
                    >
                      <span v-html="getAnalysisStateInfos(analysisState)"></span>
                    </div>
                  </b-card>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-tab>
      
      <b-tab class="app-server-monitoring-tab">
        <template #title>
          <b-icon icon="server" /><span class="pad-left">{{ $t("qfly-servers") }}</span>
        </template>
        <app-table-container>
          <app-table :columns="columns" :rows="rows" :loading="loading" :hoverActions="true">
            <template #cell(state)="row">
              <span :class="serverIsRunning(row.item) ? 'blue' : 'grayed'">
                {{ row.item.state }}
              </span>
            </template>
            <template #cell(volume_size)="row">
              {{ $t('volume-size-with-gb', { volume_size: row.item.volume_size }) }}
            </template>

            <template #hoverActions="row">
              <app-button
                v-if="!serverIsRunning(row.item)"
                @click="onStartServerClick(row.item)"
                variant="secondary"
                size="sm"
                :title="$t('start-server', { product_package: row.item.name })"
                icon="play-fill"
              />
              <app-button
                v-if="serverIsRunning(row.item)"
                @click="onStopServerClick(row.item)"
                variant="danger"
                size="sm"
                :title="$t('stop-server', { product_package: row.item.name })"
                icon="stop-fill"
              />
              <app-button
                @click="onEditServerClick(row.item)"
                variant="secondary"
                size="sm"
                :title="$t('edit-server', { product_package: row.item.name })"
                icon="wrench"
              />
            </template>
          </app-table>
        </app-table-container>
        <app-modal-form
          id="qfly-server-modal"
          ref="appQFlyServerModal"
          :title="qflyServerModalTitle"
          :ok-title="qflyServerModalOkTitle"
          :modalLoading="qflyServerModalLoading"
          @submit="onSubmitQFlyServer"
        >
          <b-row>
            <b-col>
              <b-form-group :label="$t('name')">
                <b-form-input
                  id="new-qfly-server-name"
                  v-model="currentQFlyServer.server.name"
                  required
                  :placeholder="$t('name')"
                    @change="onTagChanged" />
              </b-form-group>
              <b-form-group :label="$t('current-analysis')">
                <b-form-input
                  id="new-qfly-server-name"
                  v-model="currentQFlyServer.analysis_name"
                  @change="onTagChanged"/>
              </b-form-group>
              <b-form-group :label="$t('notes')">
                <b-form-textarea
                  id="new-qfly-server-notes"
                  rows="4"
                  v-model="currentQFlyServer.notes"
                  @change="onTagChanged"/>
              </b-form-group>
              <b-form-group :label="$t('run-server-action')">
                <b-form-select v-model="selectedServerAction" :options="qFlyServerActionSelection" />
              </b-form-group>
              <b-form-group :label="$t('run-task')">
                <b-form-select v-model="selectedTask" :options="runTaskSelection" :disabled="taskSelectionDisabled" />
              </b-form-group>
            </b-col>
          </b-row>
        </app-modal-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AnalysisMonitoring } from "@/app/shared/services/volateq-api/api-schemas/analysis-monitoring";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { QFlyServerAction, QFlyServerSchema, ServerTag } from "@/app/shared/services/volateq-api/api-schemas/server-schemas";
import { QFlyServerSchemaItem } from "@/app/settings/monitoring/types";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { QFlyServerState } from "@/app/shared/services/volateq-api/api-schemas/server-schemas"
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { ApiTasks } from "@/app/shared/services/volateq-api/api-tasks";
import { QFlyServerUpdateRequest } from "@/app/shared/services/volateq-api/api-requests/server-requests";
import { sortAlphabetical } from "@/app/shared/services/helper/sort-helper";

const AUTORELOAD_INTERVAL = 10e3; // milliseconds

@Component({
  name: "app-settings-monitoring",
  components: {
    AppContent,
    AppButton,
    AppTableContainer,
    AppTable,
    AppModalForm
  },
})
export default class AppSettingsMonitoring extends BaseAuthComponent {
  columns: AppTableColumns = [];
  rows: QFlyServerSchemaItem[] = [];
  
  monitoring_json: AnalysisMonitoring | null = null;
  collapsed_states: { [k in string]: boolean } = {};

  qfly_servers: QFlyServerSchema[] | null = null;
  qfly_servery_by_analysis_name: Map<string, string> = new Map();

  loading = true;

  @Ref() appQFlyServerModal!: IAppModalForm;
  qflyServerModalLoading = false;
  qflyServerModalTitle = this.$t("edit-server").toString();
  qflyServerModalOkTitle = this.$t("apply").toString();

  currentQFlyServer: QFlyServerSchema = {
    server: {
      id: "",
      name: "",
      tags: [],
      instance_type: "",
      volume_size: 0 // 0 -> nothing
    },
    analysis_name: "",
    state: QFlyServerState.UNALLOCATED,
    actions: [],
    notes: ""
  }
  qFlyServerActionSelection: { text: string, value: string | null }[] = [];
  runTaskSelection: { text: string, value: string | null }[] = [];
  selectedServerAction: string | null = null;
  selectedTask: string | null = null;
  taskSelectionDisabled = false;
  tagsChanged = false;

  autoReload = false;

  reloadInterval?: ReturnType<typeof setInterval>; // the NodeJS.Timer type is undefined for some reason ¯\_(ツ)_/¯

  changeAutoReload(autoReload: boolean) {
    if (autoReload) {
      this.reloadInterval = setInterval(this.updateOperationsStatus, AUTORELOAD_INTERVAL);
    } else {
      this.reloadInterval != undefined && clearInterval(this.reloadInterval);
    }
  }

  toggleAnalysis(name: string) {
    this.collapsed_states = { ...this.collapsed_states, [name]: !this.collapsed_states[name] }; // assigning to this.collapsed_states[name] breaks reactivity
  }

  updateOperationsStatus() {
    this.loadAnalysisStatus();
    this.loadQFlyServerStatus();
  }

  @CatchError("loading")
  async loadAnalysisStatus() {
    const current_analyses = await volateqApi.getAnalysisMonitoring();

    for (const analysisName in current_analyses) {
      if (this.collapsed_states[analysisName] === undefined) {
        this.collapsed_states[analysisName] = true;
      }
    }

    this.monitoring_json = current_analyses;
  }

  @CatchError("loading")
  async loadQFlyServerStatus() {
    this.qfly_servers = await volateqApi.getQFlyServers();

    this.qfly_servers.forEach((server) => {
      if (server.server)
        this.qfly_servery_by_analysis_name.set(server.analysis_name, server.server.name);
    });

    this.rows = sortAlphabetical(this.qfly_servers.map((qfly_server: QFlyServerSchema) => ({
      name: qfly_server.server!.name,
      server: qfly_server.server!,
      analysis_name: qfly_server.analysis_name,
      state: qfly_server.state,
      instance_type: qfly_server.server!.instance_type,
      volume_size: qfly_server.server!.volume_size,
      tags: qfly_server.server!.tags,
      git_branch: qfly_server.server!.tags.find((item: ServerTag) => item.Key === "GitBranch")!.Value,
      git_pull_on_startup: qfly_server.server!.tags.find((item: ServerTag) => item.Key === "GitPullOnStartup")!.Value,
      start_worker_on_startup: qfly_server.server!.tags.find((item: ServerTag) => item.Key === "StartWorkerOnStartup")!.Value,
      actions: qfly_server.actions,
      instance_id: qfly_server.server!.id,
      notes: qfly_server.notes!
    })), 'name');
  }

  async created() {
    
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "analysis_name", label: this.$t("current-analysis").toString() },
      { key: "notes", label: this.$t("notes").toString() },
      { key: "state", label: this.$t("state").toString() },
      { key: "instance_type", label: this.$t("instance-type").toString() },
      { key: "volume_size", label: this.$t("volume-size").toString() },
      { key: "git_branch", label: this.$t("git-branch").toString() },
    ];

    this.updateOperationsStatus();
  }

  hasError(analysisState: TaskSchema): boolean {
    return !!analysisState.output?.error;
  }

  hasInfo(analysisState: TaskSchema): boolean {
    return !!(analysisState.output?.infos && analysisState.output.infos.length > 0);
  }

  hasProjects(analysisState: TaskSchema): boolean {
    return !!(analysisState.output?.projects)
  }

  getAnalysisStateInfos(analysisState: TaskSchema): string {
    return volateqApi.getTaskOutputAsMessage(analysisState);
  }

  serverIsRunning(server: QFlyServerSchema): boolean {
    return server!.state == QFlyServerState.RUNNING;
  }

  serverHasCurrentAnalysis(server: QFlyServerSchema): boolean {
    return server!.analysis_name !== "";
  }

  @CatchError()
  async onStartServerClick(qfly_server: QFlyServerSchemaItem) {
    const confirmText = this.$t("sure-start-server", { server_name: qfly_server.name }).toString();
    if (!confirm(confirmText)) {
      return;
    }
    const qflyServerUpdateRequest: QFlyServerUpdateRequest =  {
      instance_id: qfly_server.instance_id,
      server_name: qfly_server.server.name,
      analysis_name: qfly_server.analysis_name,
      new_tags: undefined,
      action: undefined,
      task: undefined
    }
    return volateqApi.startQFlyServer(qflyServerUpdateRequest)
  }

  @CatchError()
  async onStopServerClick(qfly_server: QFlyServerSchemaItem) {
    const confirmText = this.$t("sure-stop-server", { server_name: qfly_server.name }).toString();
    if (!confirm(confirmText)) {
      return;
    }
    const qflyServerUpdateRequest: QFlyServerUpdateRequest =  {
      instance_id: qfly_server.instance_id,
      server_name: qfly_server.server.name,
      analysis_name: qfly_server.analysis_name,
      new_tags: undefined,
      action: undefined,
      task: undefined
    }
    return volateqApi.stopQFlyServer(qflyServerUpdateRequest)
  }

  onEditServerClick(qfly_server: QFlyServerSchemaItem) {
    this.currentQFlyServer = {
      server: qfly_server.server,
      analysis_name: qfly_server.analysis_name,
      state: qfly_server.state,
      actions: qfly_server.actions,
      notes: qfly_server.notes
    };
    
    this.selectedServerAction = null;
    this.selectedTask = null;    

    this.qFlyServerActionSelection = [
      { value: null, text: "" },
      ...this.currentQFlyServer.actions.map(action => ({
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

    this.appQFlyServerModal.show();
  }

  @CatchError("qflyServerModalLoading")
  async onSubmitQFlyServer() {
    const new_tags: ServerTag[] = [
      {
        Key: "Name",
        Value: this.currentQFlyServer.server!.name,
      },
      {
        Key: "CurrentAnalysis",
        Value: this.currentQFlyServer.analysis_name,
      },
      {
        Key: "Notes",
        Value: this.currentQFlyServer.notes!,
      },
    ];

    const qflyServerUpdateRequest: QFlyServerUpdateRequest =  {
      instance_id: this.currentQFlyServer.server!.id,
      server_name: this.currentQFlyServer.server!.name,
      analysis_name: this.currentQFlyServer.analysis_name,
      new_tags: this.tagsChanged ? new_tags : undefined,
      action: this.selectedServerAction && QFlyServerAction[this.selectedServerAction] || undefined,
      task: this.selectedTask && ApiTasks[this.selectedTask] || undefined
    }

    await volateqApi.updateQFlyServer(qflyServerUpdateRequest);

    this.showSuccess(this.$t("qfly-server-edited-successfully", { server_name: this.currentQFlyServer.server!.name }).toString());
    this.appQFlyServerModal.hide();
    this.loadQFlyServerStatus();

    this.tagsChanged = false;
  }

  onTagChanged() {
    this.tagsChanged = true;
  }
}
</script>

<style lang="scss">
@use "@/scss/_colors.scss";
@use "sass:color";

.app-operations-monitoring {
  .monitoring-toolbar {
    display: grid;
    grid-template-columns: max-content auto max-content;
    margin-bottom: 30px;
    align-items: center;
    gap: 0.5rem;
  }

  ul.nav-tabs {
    margin-bottom: 30px;
  }

  .app-analysis-monitoring {
    &-title {
      .app-analysis-monitoring-toggle {
        cursor: pointer;
        transition: transform 0.2s;
      }

      .card-text {
        margin-bottom: 0;
      }

      &.closed {
        .app-analysis-monitoring-toggle {
          transform: rotateZ(-90deg);
        }
      }

      .card-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    &-state {
      display: grid;
      gap: 10px;
      grid-template-areas:
        "project project"
        "state   action";
      padding: 1.25rem;

      .monitoring-project {
        grid-area: project;
      }

      .monitoring-state {
        grid-area: state;
      }

      .monitoring-action {
        grid-area: action;
        justify-self: end;
      }

      span {
        overflow-wrap: anywhere;
      }

      &-running {
        background: color.adjust(colors.$blue, $lightness: 45%); // use Volateq's blue with increased lightness
      }

      &-holding {
        background: #fff3cd;
      }

      &-crashed {
        background: #f8d7da;
      }

      &-finished {
        background: #d4edda;
      }

      &-launched {
        background: #e2e3e5;
      }
    }

    &-states {
      padding-left: 2rem;

      .card {
        border-top: none;
      }
    }
  }
}
</style>
