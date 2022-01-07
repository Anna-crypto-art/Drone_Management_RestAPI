<template>
  <app-content :title="$t('analysis-overview')" :subtitle="$t('analysis-overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'AnalysisNew' }">
        <b-button variant="primary">{{ createNewAnalysisBtnText }}</b-button>
      </router-link>
      <app-table-container>
        <b-table
          hover
          :fields="columns"
          :items="analysisRows"
          head-variant="light"
          show-empty
          :emptyText="$t('no-data')"
        >
          <template #empty="scope">
            <span class="grayed">{{ scope.emptyText }}</span>
          </template>
          <template #head(actions)>
            <span class="hidden">{{ $t("actions") }}</span>
          </template>
          <template #cell(user)="row">
            <span v-if="row.item.user.userName">
              {{ row.item.user.userName }}<br />
              <small class="grayed">{{ row.item.user.email }}</small>
            </span>
            <span v-else>{{ row.item.user.email }}</span>
          </template>
          <template #cell(state)="row">
            <div v-if="row.item.state">
              {{ $t(row.item.state.state.name) }}
              <span v-if="row.item.state.state.name === 'UPLOADING'"> {{ uploadStateProcess }}</span>
              <br />
              <small class="grayed">{{ trans(getTimeDiff(row.item.state.started_at)) }}</small>
            </div>
            <div v-else>UNKNOWN</div>
          </template>
          <template #cell(actions)="row">
            <div class="hover-cell pull-right">
              <b-dropdown right size="sm" variant="secondary" :title="$t('download...')">
                <template #button-content><b-icon icon="cloud-download"></b-icon></template>
                <b-dropdown-item v-for="file in getAnalysisFiles(row)" :key="file" @click="onFileClick(row.item, file)">
                  {{ file }}
                </b-dropdown-item>
              </b-dropdown>
              <b-dropdown
                v-show="canUpdateState(row.item.state)"
                right
                size="sm"
                variant="secondary"
                :title="$t('update-analysis-state')"
              >
                <template #button-content><b-icon icon="flag"></b-icon></template>
                <b-dropdown-item
                  v-for="state in getPossibleUpdateStates(row.item.state)"
                  :key="state"
                  @click="onUpdateStateClick(row.item, state)"
                >
                  {{ $t(state) }}
                </b-dropdown-item>
              </b-dropdown>
              <b-button
                v-show="isSuperAdmin"
                @click="onManageResultFilesClick(row.item)"
                variant="secondary"
                size="sm"
                :title="$t('manage-result-files')"
              >
                <b-icon icon="hammer"></b-icon>
              </b-button>
              <router-link
                v-if="row.item.analysisResultId"
                :title="$t('show-results')"
                :to="{
                  name: 'Plant',
                  params: { id: row.item.plantId },
                  query: { view: 'table', result: row.item.analysisResultId },
                }"
              >
                <b-button variant="primary" size="sm"><b-icon icon="graph-up"></b-icon></b-button>
              </router-link>
            </div>
            <div class="clearfix"></div>
          </template>
        </b-table>
      </app-table-container>
      <app-modal-form
        id="update-state-modal"
        ref="appUpdateStateModal"
        :title="$t('update-analysis-state')"
        :subtitle="$t('update-analysis-state_descr')"
        :ok-title="$t('update')"
        @submit="changeAnalysisState"
      >
        <app-modal-form-info-area
          v-if="updateStateData.state"
          v-html="$t('update-analysis-state-to', { state: $t(updateStateData.state).toString() })"
        >
        </app-modal-form-info-area>
        <b-form-group :label="$t('message')" label-for="message">
          <b-form-textarea
            id="message"
            v-model="updateStateData.message"
            :placeholder="$t('message')"
            row="5"
          ></b-form-textarea>
        </b-form-group>
      </app-modal-form>
      <app-modal-form
        id="manage-result-files-modal"
        ref="appManageResultFilesModal"
        :title="$t('manage-result-files')"
        :subtitle="$t('manage-result-files_descr')"
        :ok-title="$t('apply')"
        @submit="saveManageResultFiles"
      >
        <b-form-group v-show="manageImportFiles.analysisResultId" :label="$t('remove-result-files')">
          <b-form-checkbox-group
            id="remove-result-files-checkbox-group"
            v-model="manageImportFiles.selectedResultFilesToRemove"
            :options="manageImportFiles.existingFilesOptions"
          >
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group :label="$t('select-json-result-file-import')">
          <b-form-file v-model="manageImportFiles.jsonFile" accept=".json"></b-form-file>
        </b-form-group>
        <b-form-group :label="$t('select-result-image-files')">
          <b-form-file v-model="manageImportFiles.imageFiles" accept="image/png, image/jpeg" multiple></b-form-file>
        </b-form-group>
      </app-modal-form>
    </div>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";

import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import uploadService from "@/app/shared/services/upload-service/upload-service";
import { IAnalysisId } from "./new-analysis/types";
import { ApiStates, ApiStateStruct } from "../shared/services/volateq-api/api-states";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { BvTableFieldArray } from "bootstrap-vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import { IUploadListener, UploadEvent, UploadState } from "../shared/services/upload-service/types";
import { AnalysisStateSchema } from "../shared/services/volateq-api/api-schemas/analysis-state-schema";
import { IAppModalForm } from "../shared/components/app-modal/types";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppModalFormInfoArea from "@/app/shared/components/app-modal/app-modal-form-info-area.vue";
import { TaskSchema } from "../shared/services/volateq-api/api-schemas/task-schema";
import { ApiErrors, ApiException } from "../shared/services/volateq-api/api-errors";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
    AppModalFormInfoArea,
  },
})
export default class AppAnalysis extends BaseAuthComponent implements IUploadListener {
  columns: BvTableFieldArray = [];
  analysisRows: Array<any> = [];

  createNewAnalysisBtnText = "";
  uploadStateProcess = "";

  @Ref() appUpdateStateModal!: IAppModalForm;
  updateStateData: {
    analysisId?: string;
    state?: ApiStates;
    message?: string;
  } = { message: "", state: undefined, analysisId: undefined };

  @Ref() appManageResultFilesModal!: IAppModalForm;
  manageImportFiles: {
    analysisId?: string;
    analysisResultId?: string;
    existingFilesOptions: { text: string; value: string }[];
    selectedResultFilesToRemove: string[];
    jsonFile?: File;
    imageFiles?: File[];
  } = { analysisResultId: "", existingFilesOptions: [], selectedResultFilesToRemove: [] };

  async created() {
    this.createNewAnalysisBtnText = this.$t("new-data-upload").toString();

    this.columns = [
      { key: "name", label: this.$t("name").toString(), sortable: true },
      { key: "plant", label: this.$t("plant").toString(), sortable: true },
      { key: "date", label: this.$t("created-at").toString(), sortable: true },
      { key: "user", label: this.$t("created-by").toString(), sortable: true },
      { key: "state", label: this.$t("state").toString(), sortable: true },
      { key: "actions" },
    ];

    await this.updateAnalysisRows();

    this.checkUploadState();
  }

  mounted() {
    this.registerUploadEvents();
  }

  registerUploadEvents() {
    uploadService.on(UploadEvent.PROGRESS, () => {
      this.updateToUploadState();
    });
    uploadService.on(UploadEvent.COMPLETED, () => {
      this.createNewAnalysisBtnText = this.$t("new-data-upload").toString();
      this.updateTableRowState(this.$t("PICK_ME_UP").toString());
    });
    uploadService.on(UploadEvent.FAILED, () => {
      this.updateTableRowState(this.$t("UPLOAD_FAILED").toString());
    });
  }

  checkUploadState() {
    if (uploadService.hasState(UploadState.UPLOADING)) {
      this.updateToUploadState();
    }
  }

  // "this" is undefined in html component... so (")this(") is a workaround...
  trans(args: [string, any]): string {
    return this.$t(...args).toString();
  }

  getAnalysisFiles(row: any): string[] {
    let files: string[] = [];
    const analysis: AnalysisSchema = row.item || {};

    if (!analysis.files || !analysis.id) {
      return [];
    }

    if (analysis.files.video_files) {
      files = files.concat(analysis.files.video_files);
    }
    if (analysis.files.drone_metadata_files) {
      files = files.concat(analysis.files.drone_metadata_files);
    }
    if (analysis.files.other_files) {
      files = files.concat(analysis.files.other_files);
    }

    files.sort();

    return files;
  }

  async onFileClick(analysis: AnalysisSchema, fileName: string) {
    try {
      const downloadUrl = await volateqApi.getAnalysisFileDownloadUrl(analysis.id, fileName);

      AppDownloader.download(downloadUrl.url, fileName);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  canUpdateState(analysisState: AnalysisStateSchema): boolean {
    return (
      this.isSuperAdmin &&
      analysisState &&
      [ApiStates.PICK_ME_UP, ApiStates.PROCESSING, ApiStates.PROCESS_FAILED].indexOf(analysisState.state.name) !== -1
    );
  }

  getPossibleUpdateStates(analysisState: AnalysisStateSchema): ApiStates[] {
    return (analysisState && ApiStateStruct[analysisState.state.name]) || [];
  }

  onUpdateStateClick(analysis: AnalysisSchema, state: ApiStates) {
    if (
      !this.updateStateData.analysisId ||
      this.updateStateData.analysisId !== analysis.id ||
      this.updateStateData.state !== state
    ) {
      this.updateStateData.message = "";
    }
    this.updateStateData.analysisId = analysis.id;
    this.updateStateData.state = state;

    this.appUpdateStateModal.show();
  }

  async onManageResultFilesClick(analysisRowItem: any) {
    this.manageImportFiles.analysisId = analysisRowItem.id;
    this.manageImportFiles.analysisResultId = analysisRowItem.analysisResultId;

    // clear arrays but keep the references
    this.manageImportFiles.existingFilesOptions.length = 0;
    this.manageImportFiles.selectedResultFilesToRemove.length = 0;

    if (this.manageImportFiles.analysisResultId) {
      const analysisResultFiles = await volateqApi.getAnalysisResultFiles(this.manageImportFiles.analysisResultId);
      for (const analysisResultFile of analysisResultFiles) {
        this.manageImportFiles.existingFilesOptions.push({
          text: analysisResultFile.filename,
          value: analysisResultFile.id,
        });
      }
    }

    this.appManageResultFilesModal.show();
  }

  async saveManageResultFiles() {
    try {
      appButtonEventBus.startLoading();

      const successfullyFinished = () => {
        this.appManageResultFilesModal.hide();
        appContentEventBus.showSuccessAlert(this.$t("success-managing-result-files").toString());
        appButtonEventBus.stopLoading();

        this.updateAnalysisRows();
      };

      if (this.manageImportFiles.analysisResultId && this.manageImportFiles.selectedResultFilesToRemove.length > 0) {
        for (const analysisResultFileId of this.manageImportFiles.selectedResultFilesToRemove) {
          await volateqApi.deleteAnalysisResultFile(this.manageImportFiles.analysisResultId, analysisResultFileId);
        }
      }

      if (this.manageImportFiles.jsonFile) {
        const task = await volateqApi.importAnalysisResult(
          this.manageImportFiles.jsonFile,
          this.manageImportFiles.analysisId!,
          this.manageImportFiles.imageFiles
        );

        volateqApi.waitForTask(task.id, task => {
          appButtonEventBus.stopLoading();

          if (task.state === "SUCCESS") {
            successfullyFinished();
          } else if (task.state === "FAILURE") {
            this.appManageResultFilesModal.alertError({ error: ApiErrors.SOMETHING_WENT_WRONG, details: task.result });
          } else {
            this.appManageResultFilesModal.alertError({
              error: "UNEXPECTED_TASK_STATE",
              details: task.state + ". " + task.result,
            });
          }
        });
      } else {
        successfullyFinished();
      }
    } catch (e) {
      this.appManageResultFilesModal.alertError(e as ApiException);
      appButtonEventBus.stopLoading();
    }
  }

  async changeAnalysisState() {
    this.appUpdateStateModal.hideAlert();
    appButtonEventBus.startLoading();

    this.updateAnalysisState();
  }

  async updateAnalysisState() {
    try {
      await volateqApi.updateAnalysisState(this.updateStateData.analysisId!, {
        state: this.updateStateData.state!,
        message: this.updateStateData.message,
      });

      await this.updateAnalysisRows();

      this.appUpdateStateModal.hide();

      appContentEventBus.showSuccessAlert(this.$t("update-analysis-state-success").toString());
    } catch (e) {
      this.appUpdateStateModal.alertError((e as ApiException).error);
    } finally {
      appButtonEventBus.stopLoading();
    }
  }

  private updateToUploadState() {
    if (this.updateTableRowState(Math.round(uploadService.progress() * 100) + "%")) {
      this.createNewAnalysisBtnText = this.$t("return-to-upload").toString();
    }
  }

  private updateTableRowState(value: string): boolean {
    const analysisId = uploadService.getMetadata<IAnalysisId>();
    if (this.analysisRows && analysisId) {
      this.uploadStateProcess = value;

      return true;
    }

    return false;
  }

  private async updateAnalysisRows() {
    try {
      this.analysisRows = (await volateqApi.getAllAnalysis()).map((a: AnalysisSchema) => {
        const row = {
          id: a.id,
          name: a.name,
          date: new Date(Date.parse(a.created_at)).toLocaleString(),
          user:
            (a.user && {
              userName: ((a.user.first_name || "") + " " + (a.user.last_name || "")).trim(),
              email: a.user.email,
            }) ||
            "",
          analysisResultId:
            (a.analysis_result && (this.isSuperAdmin || a.analysis_result.released) && a.analysis_result.id) ||
            undefined,
          state: a.current_state,
          files: a.files,
          plantId: a.plant.id,
          plant: a.plant.name,
        };

        return row;
      });
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }
}
</script>

<style></style>
