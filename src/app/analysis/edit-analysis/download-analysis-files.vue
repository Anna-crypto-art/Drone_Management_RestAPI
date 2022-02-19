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
        <template #row-details="row">
          <span class="analysis-selection-sidebar-kpi-badge" v-for="kpi in row.item.kpis" :key="kpi.id">
            <b-badge variant="primary" :style="'background-color: ' + getKpiColor(kpi)">{{ kpi.name }}</b-badge>
          </span>
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
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { getReadableFileSize } from "@/app/shared/services/helper/file-helper";
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
  ];
  downloadFilesTableItems: { name: string }[] = [];

  allDownloadFilesSelected = false;
  private selectedDonwloadFiles: { name: string }[] = [];

  isFilesLoading = true;

  async created() {
    await this.setDownloadFilesTableItems();
  }

  @Watch('analysis') async onAnalysisChanged() {
    await this.setDownloadFilesTableItems();
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
      AppContentEventService.showError(this.analysis.id, e as ApiException);
    } finally {
      this.downloadButtonLoading = true;
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

  private async setDownloadFilesTableItems() {
    this.isFilesLoading = true;

    try {
      let files: string[] = [];
      for (const key of Object.keys(this.analysis.files)) {
        files = files.concat(this.analysis!.files[key]);
      }
      files.sort();

      const fileInfos = await volateqApi.getAnalysisFilesInfo(this.analysis.id, files);
      this.downloadFilesTableItems = Object.keys(fileInfos).map(filename => ({
        name: filename,
        size: fileInfos[filename] !== null ? getReadableFileSize(fileInfos[filename]!) : this.$t("missing").toString(),
      }));
    } catch (e) {
      AppContentEventService.showError(this.analysis.id, e as ApiException);
    } finally {
      this.isFilesLoading = false;
    }
  }
}
</script>
