<template>
  <app-content v-if="analysis" :title="analysis.name || ''" :navback="true">
    <template #subtitle>
      <div v-if="analysis.current_state"><b>{{ $t(analysis.current_state.state.name) }}</b></div>
    </template>
    <div class="app-edit-analysis">
      <b-tabs>
        <b-tab v-if="false" :title="$t('upload')"> <!-- will be available in future DV-1076 -->
          <app-analysis-upload :analysis_id="analysis.id"></app-analysis-upload>
        </b-tab>
        <b-tab class="app-edit-analysis-download-tab">
          <template #title>
            <b-icon icon="download" /><span class="pad-left">{{ $t("download") }}</span>
          </template>
          <app-button :disabled="isDownloadButtonDisabled" @click="onDownloadSelectedFilesClick">
            {{ $t("download-selected-files") }}
          </app-button>
          <app-table-container>
            <b-table
              ref="downloadFilesTable"
              :items="downloadFilesTableItems"
              :fields="downloadFilesTableColumns"
              select-mode="multi"
              selectable
              hover
              head-variant="light"
              @row-selected="onDownloadFilesSelected"
            >
              <template #head(selected)><b-checkbox :checked="allDownloadFilesSelected" @change="onSelectAllDownloadFiles"></b-checkbox> </template>
              <template #cell(selected)="{ rowSelected }">
                <b-checkbox :checked="rowSelected" disabled class="b-table-selectable-checkbox"> </b-checkbox>
              </template>
              <template #row-details="row">
                <span class="analysis-selection-sidebar-kpi-badge" v-for="kpi in row.item.kpis" :key="kpi.id">
                  <b-badge variant="primary" :style="'background-color: ' + getKpiColor(kpi)">{{ kpi.name }}</b-badge>
                </span>
              </template>
            </b-table>
          </app-table-container>
        </b-tab>
        <b-tab v-if="isSuperAdmin" class="app-edit-analysis-admin-tab">
          <template #title>
            <b-icon icon="braces" /><span class="pad-left">{{ $t("admin-panel") }}</span>
          </template>
          <div class="admin-box">
            <h4>{{ $t("update-analysis-state") }}</h4>
            <b-form @submit.prevent="onSubmitUpdateState" >
              <b-form-group :label="$t('select-new-analysis-state')">
                <b-form-select required v-model="selectedUpdateState" :options="updateStateOptions"></b-form-select>
              </b-form-group>
              <b-form-group :label="$t('message')">
                <b-form-textarea
                  v-model="selectedUpdateStateMessage"
                  :placeholder="$t('message')"
                  row="5"
                />
              </b-form-group>
              <app-button type="submit">{{ $t("update") }}</app-button>
            </b-form>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { ApiException } from "../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppAnalysisUpload from "@/app/analysis/analysis-upload.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import { AppDownloader } from "../shared/services/app-downloader/app-downloader";
import { ApiStates, ApiStateStruct } from "../shared/services/volateq-api/api-states";
import appButtonEventBus from "../shared/components/app-button/app-button-event-bus";

@Component({
  name: "app-edit-analysis",
  components: {
    AppContent,
    AppTableContainer,
    AppButton,
    AppAnalysisUpload
  }
})
export default class AppEditAnalysis extends BaseAuthComponent {
  analysis: AnalysisSchema | null = null;

  @Ref() downloadFilesTable!: any; // b-table
  isDownloadButtonDisabled = true;
    downloadFilesRows: Array<any> = [];
  downloadFilesTableColumns: BvTableFieldArray = [
    { key: "selected", label: "" },
    { key: "name", label: this.$t("name").toString() },
  ];
  downloadFilesTableItems: { name: string; }[] = [];
  private selectedDonwloadFiles: { name: string }[] = [];
  allDownloadFilesSelected = false;

  selectedUpdateState: ApiStates | null = null;
  updateStateOptions: { value: string, text: string }[] | null = null;
  selectedUpdateStateMessage = "";

  async created() {
    await this.updateAnalysis(this.$route.params.id)
  }

  onDownloadFilesSelected(selectedDownloadFiles: { name: string }[]) {
    this.selectedDonwloadFiles = selectedDownloadFiles;

    this.isDownloadButtonDisabled = this.selectedDonwloadFiles.length === 0;
  }

  async onDownloadSelectedFilesClick() {
    try {
      for (const downloadFile of this.selectedDonwloadFiles) {
        const downloadUrl = await volateqApi.getAnalysisFileDownloadUrl(this.analysis!.id, downloadFile.name);

        AppDownloader.download(downloadUrl.url, downloadFile.name);
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  onSelectAllDownloadFiles(selected: boolean) {
    if (selected) {
      // Bug: this.downloadFilesTable.selectAllRows() does not call event "onDownloadFilesSelected" in correct order
      // so lets work around...
      for (let i = 0; i < this.downloadFilesTableItems.length; i++) {
        this.downloadFilesTable.selectRow(i);
      }
      this.onDownloadFilesSelected(this.downloadFilesTableItems.slice());
    } else {
      // this.downloadFilesTable.clearSelection(); leads to "clearSelection is not a function" 
      // so lets work around... again!
      for (let i = 0; i < this.downloadFilesTableItems.length; i++) {
        this.downloadFilesTable.unselectRow(i);
      }
      this.onDownloadFilesSelected([]);
    }
  }

  async onSubmitUpdateState() {
    try {
      appButtonEventBus.startLoading();

      if (!this.selectedUpdateState) {
        throw { error: "NO_STATE_SELECTED", message: "Please, selecte a state" };
      }

      await volateqApi.updateAnalysisState(this.analysis!.id, {
        state: this.selectedUpdateState!,
        message: this.selectedUpdateStateMessage,
      });

      await this.updateAnalysis(this.analysis!.id);

      appContentEventBus.showSuccessAlert(this.$t("update-analysis-state-success").toString());
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      appButtonEventBus.stopLoading();
    }
  }

  private setDownloadFilesTableItems() {
    let files: string[] = [];
    if (this.analysis!.files.video_files) {
      files = files.concat(this.analysis!.files.video_files);
    }
    if (this.analysis!.files.drone_metadata_files) {
      files = files.concat(this.analysis!.files.drone_metadata_files);
    }
    if (this.analysis!.files.other_files) {
      files = files.concat(this.analysis!.files.other_files);
    }

    files.sort();

    this.downloadFilesTableItems = files.map(file => ({ name: file }));
  }

  private setUpdateStateOptions() {
    if (!this.analysis!.current_state) {
      return null;
    }

    const apiStates: ApiStates[] = ApiStateStruct[this.analysis!.current_state.state.name];
    if (apiStates.length === 0) {
      return null;
    }

    this.updateStateOptions = apiStates.map(apiState => ({
      value: apiState,
      text: this.$t(apiState).toString(),
    }));
  }

  private async updateAnalysis(analysisId: string) {
    try {
      this.analysis = await volateqApi.getAnalysis(analysisId);

      this.setDownloadFilesTableItems();
      this.setUpdateStateOptions();
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
  &-admin-tab {
    margin-top: 30px;
  }
}
</style>