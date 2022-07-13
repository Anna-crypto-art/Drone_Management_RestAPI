<template>
  <div>
    <app-button
      :disabled="isDownloadButtonDisabled"
      :loading="downloadButtonLoading"
      @click="onDownloadSelectedFilesClick"
    >
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
        :busy="isFilesLoading"
      >
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #head(selected)
          ><b-checkbox :checked="allDownloadFilesSelected" @change="onSelectAllDownloadFiles"></b-checkbox>
        </template>
        <template #cell(selected)="{ rowSelected }">
          <b-checkbox :checked="rowSelected" disabled class="b-table-selectable-checkbox"> </b-checkbox>
        </template>
        <template #cell(uploadedAt)="row">
          {{ getReadableDate(row.item.uploadedAt) }}
        </template>
      </b-table>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { Component, Ref, Prop, Watch } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { BvTableFieldArray } from "bootstrap-vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { getReadableFileSize } from "@/app/shared/services/helper/file-helper";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";

@Component({
  name: "app-download-analysis-files",
  components: {
    AppTableContainer,
    AppButton,
  },
})
export default class AppDownloadAnalysisFiles extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() downloadFilesTable!: any; // b-table
  isDownloadButtonDisabled = true;
  downloadButtonLoading = false;

  downloadFilesTableColumns: BvTableFieldArray = [
    { key: "selected", label: "" },
    { key: "name", label: this.$t("name").toString() },
    { key: "size", label: this.$t("size").toString() },
    { key: "uploadedAt", label: this.$t("uploaded-at").toString() },
  ];
  downloadFilesTableItems: { name: string, size: string | null, uploadedAt: number | null }[] = [];

  allDownloadFilesSelected = false;
  private selectedDonwloadFiles: { name: string }[] = [];

  isFilesLoading = false;

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

  async onDownloadSelectedFilesClick() {
    try {
      this.downloadButtonLoading = true;

      if (this.selectedDonwloadFiles.length === 1) {
        const downloadUrl = await volateqApi.getAnalysisFileDownloadUrl(
          this.analysis!.id,
          this.selectedDonwloadFiles[0].name
        );

        AppDownloader.download(downloadUrl.url, this.selectedDonwloadFiles[0].name);
      } else {
        const archiveName = `analysis-${this.analysis.name}-selected-files.zip`;
        const downloadUrl = await volateqApi.generateDownloadUrl(
          volateqApi.downloadMultipleAnalysisFilesUrl(
            this.analysis.id,
            this.selectedDonwloadFiles.map(downloadFile => downloadFile.name)
          )
        );

        AppDownloader.download(downloadUrl, archiveName);
      }
    } catch (e) {
      this.showError(e);
    } finally {
      this.downloadButtonLoading = false;
    }
  }

  onSelectAllDownloadFiles(selected: boolean) {
    if (selected) {
      this.downloadFilesTable.selectAllRows();
    } else {
      // this.downloadFilesTable.clearSelection(); leads to "clearSelection is not a function"
      // so lets work around...
      for (let i = 0; i < this.downloadFilesTableItems.length; i++) {
        this.downloadFilesTable.unselectRow(i);
      }
    }
  }

  getReadableDate(date: number | null): string {
    return date && (new Date(date)).toLocaleString() || "";
  }

  private async loadFiles() {
    this.isFilesLoading = true;
    try {
      let files: string[] = [];
      this.downloadFilesTableItems = [];

      if (!this.analysis.files){
        return;
      }

      for (const key of Object.keys(this.analysis.files)) {
        files = files.concat(this.analysis!.files[key]);
      }

      this.downloadFilesTableItems = [];

      const fileInfos = await volateqApi.getAnalysisFilesInfo(this.analysis.id, files);
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
        if (uploadingUsers.length === 0) {
          AppContentEventService.showWarning(this.analysis.id, this.$t("state-uploading-without-uploading-user").toString())
        } else {
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
    } catch (e) {
      this.showError(e);
    } finally {
      this.isFilesLoading = false;
    }
  }
}
</script>
