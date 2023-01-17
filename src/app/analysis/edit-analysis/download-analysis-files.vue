<template>
  <div>
    <app-button
      :disabled="isDownloadButtonDisabled"
      :loading="downloadButtonLoading"
      @click="onDownloadSelectedFilesClick"
    >
      {{ $t("download-selected-files") }}
    </app-button>
    <app-button v-if="isSuperAdmin"
      cls="mar-left"
      variant="secondary"
      :disabled="isDownloadButtonDisabled"
      @click="onMoveSelectedFilesClick"
      :superAdminProtected="true"
    >
      {{ $t("move-selected-files") }}
    </app-button>
    <app-button v-if="isSuperAdmin"
      cls="mar-left"
      variant="outline-danger"
      :disabled="isDownloadButtonDisabled"
      :loading="deleteSelectedFilesLoading"
      @click="onDeleteSelectedFilesClick"
      :superAdminProtected="true"
    >
      {{ $t("delete-selected-files") }}
    </app-button>
    <app-table-container>
      <app-table
        :rows="downloadFilesTableItems"
        :columns="downloadFilesTableColumns"
        :loading="isFilesLoading"
        selectMode="multi"
        :selectAllColumns="true"
        @rowSelected="onDownloadFilesSelected"
      >
        <template #cell(uploadedAt)="row">
          {{ getReadableDate(row.item.uploadedAt) }}
        </template>
      </app-table>
    </app-table-container>

    <app-modal-form id="moveSelectedFilesModal"
      ref="moveSelectedFilesModal"
      :modalLoading="moveSelectedFilesLoading"
      :okTitle="$t('move')"
      :title="$t('move-selected-files')"
      @submit="onMoveSelectedFiles"
      :superAdminProtected="true"
    >
      <b-form-group :label="$t('select-analysis')">
        <b-form-select v-model="targetAnalysisId" :options="moveAnalysisSelection" required />
      </b-form-group>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { Component, Ref, Prop, Watch } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { BvTableFieldArray } from "bootstrap-vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { getReadableFileSize } from "@/app/shared/services/helper/file-helper";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import dateHelper from "@/app/shared/services/helper/date-helper";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { analysisEventService } from "../shared/analysis-event-service";
import { AnalysisEvent } from "../shared/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

@Component({
  name: "app-download-analysis-files",
  components: {
    AppTableContainer,
    AppButton,
    AppModalForm,
    AppTable,
  },
})
export default class AppDownloadAnalysisFiles extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() moveSelectedFilesModal!: IAppModalForm;

  isDownloadButtonDisabled = true;
  downloadButtonLoading = false;

  downloadFilesTableColumns: BvTableFieldArray = [
    { key: "selected", label: "" },
    { key: "name", label: this.$t("name").toString() },
    { key: "size", label: this.$t("size").toString() },
    { key: "uploadedAt", label: this.$t("uploaded-at").toString() },
  ];
  downloadFilesTableItems: { name: string, size: string | null, uploadedAt: number | null }[] = [];

  private selectedDonwloadFiles: { name: string }[] = [];

  isFilesLoading = false;

  moveSelectedFilesLoading = false;
  targetAnalysisId: string | null = null;
  moveAnalysisSelection: { value: string, text: string }[] = [];

  deleteSelectedFilesLoading = false;

  async created() {
    this.loadFiles();
  }

  @Watch('analysis') onAnalysisChanged() {
    this.loadFiles();
  }

  onDownloadFilesSelected(selectedDownloadFiles: { name: string }[]) {
    this.selectedDonwloadFiles = selectedDownloadFiles;

    this.isDownloadButtonDisabled = this.selectedDonwloadFiles.length === 0;
  }

  @CatchError("downloadButtonLoading")
  async onDownloadSelectedFilesClick() {
    if (this.selectedDonwloadFiles.length === 1) {
      const downloadUrl = await volateqApi.getAnalysisFileDownloadUrl(
        this.analysis!.id,
        this.selectedDonwloadFiles[0].name
      );

      AppDownloader.download(downloadUrl.url, this.selectedDonwloadFiles[0].name);
    } else {
      const archiveName = `analysis-${this.analysis.name}-selected-files.zip`;

      // If the analysis has a lot of files we get HTTP ERROR 413 (request header too large)
      // To allow to download all files anyway, we set filenames to "all"
      const filenames: string[] | "all" = this.downloadFilesTableItems.length === this.selectedDonwloadFiles.length ?
        "all" : this.selectedDonwloadFiles.map(downloadFile => downloadFile.name);

      const downloadUrl = await volateqApi.generateDownloadUrl(
        volateqApi.downloadMultipleAnalysisFilesUrl(
          this.analysis.id,
          filenames
        )
      );

      AppDownloader.download(downloadUrl, archiveName);
    }
  }

  getReadableDate(date: number | null): string {
    return date && dateHelper.toDateTime(date) || "";
  }

  @CatchError()
  async onMoveSelectedFilesClick() {
    this.moveAnalysisSelection = (await volateqApi.getAllAnalysis({ plant_id: this.analysis.plant.id }))
      .filter(analysis => analysis.id !== this.analysis.id)
      .map(analysis => ({ value: analysis.id, text: analysis.name }));

    this.moveSelectedFilesModal.show();
  }

  @CatchError("moveSelectedFilesLoading")
  async onMoveSelectedFiles() {
    await volateqApi.moveAnalysisFiles(
      this.analysis.id, 
      this.targetAnalysisId!,
      this.selectedDonwloadFiles.map(downloadFile => downloadFile.name)
    );

    this.moveSelectedFilesModal.hide();

    this.showSuccess(this.$t("selected-files-moved-success").toString())

    analysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
  }

  @CatchError("deleteSelectedFilesLoading")
  async onDeleteSelectedFilesClick() {
    if (!confirm(this.$t("delete-selected-files-sure").toString())) {
      return;
    }

    this.deleteSelectedFilesLoading = true;

    await volateqApi.deleteAnalysisFiles(
      this.analysis.id, 
      this.selectedDonwloadFiles.map(downloadFile => downloadFile.name)
    );

    this.showSuccess(this.$t("selected-files-deleted-success").toString())

    analysisEventService.emit(this.analysis.id, AnalysisEvent.UPDATE_ANALYSIS);
  }

  @CatchError("isFilesLoading")
  private async loadFiles() {
    let files: string[] = [];
    this.downloadFilesTableItems = [];

    if (!this.analysis.files){
      return;
    }

    for (const key of Object.keys(this.analysis.files)) {
      files = files.concat(this.analysis!.files[key]);
    }

    this.downloadFilesTableItems = [];

    const fileInfos = await volateqApi.getAnalysisFiles(this.analysis.id, files);
    for (const fileName of Object.keys(fileInfos)) {
      const fileInfo = fileInfos[fileName];
      
      if (!fileInfo) {
        this.downloadFilesTableItems.push({ name: fileName, size: null, uploadedAt: null });
      } else {
        this.downloadFilesTableItems.push({ 
          name: fileName, 
          size: getReadableFileSize(fileInfo.size),
          uploadedAt: Date.parse(fileInfo.uploaded_at),
        });
      }
    }

    this.downloadFilesTableItems.sort((a, b) => {
      const uploadedAtA = a.uploadedAt || 1;
      const uploadedAtB = b.uploadedAt || 1;

      if (uploadedAtA < uploadedAtB) {
        return 1;
      } else if (uploadedAtA > uploadedAtB) {
        return -1;
      }
      return 0;
    });

    if (this.analysis.current_state.state.id === ApiStates.UPLOADING) {        
      let uploadingUsers = await volateqApi.getUploadingUsers(this.analysis.id);
      if (uploadingUsers.length > 0) {
        const me = await volateqApi.getMe();
        uploadingUsers = uploadingUsers.filter(userInfo => userInfo.email != me.email);

        if (uploadingUsers.length > 0) {
          const uploadingUsersMessages: string[] = [];
          for (const userInfo of uploadingUsers) {
            uploadingUsersMessages.push(this.$t("user-is-uploading", {
              user: ((userInfo.first_name || "") + " " + (userInfo.last_name || "")).trim() || userInfo.email,
            }).toString());
          }
          uploadingUsersMessages.push(this.$t("files-of-files-uploaded", {
            current_files: Object.keys(fileInfos).filter(fileName => !!fileInfos[fileName]).length,
            max_files: Object.keys(fileInfos).length,
          }).toString());

          AppContentEventService.showInfo(this.analysis.id, uploadingUsersMessages.join('<br>'));
        }
      }
    }
  }
}
</script>
