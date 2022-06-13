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
        <template #cell(size)="row">
          <div v-if="row.item.size === null" class="hover-cell pull-right">
            <b-button
              @click="onLoadFileSizeClick(row.item.name)"
              variant="secondary"
              size="sm"
              :title="$t('load-file-size')"
            >
              {{ $t("load-file-size") }}
            </b-button>
          </div>
          <span v-if="row.item.size">{{ row.item.size }}</span>
          <span v-if="row.item.size === false">{{ $t("not-found") }}</span>
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
  downloadFilesTableItems: { name: string, size: null | false | string }[] = [];

  allDownloadFilesSelected = false;
  private selectedDonwloadFiles: { name: string }[] = [];

  isFilesLoading = false;

  async created() {
    this.setDownloadFilesTableItems();
  }

  @Watch('analysis') onAnalysisChanged() {
    this.setDownloadFilesTableItems();
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

  async onLoadFileSizeClick(filename: string) {
    this.isFilesLoading = true;
    try {
      const fileInfos = await volateqApi.getAnalysisFilesInfo(this.analysis.id, [filename]);
      const fileItem = this.downloadFilesTableItems.find(item => item.name === filename);
      
      fileItem!.size = fileInfos[filename] !== null ? getReadableFileSize(fileInfos[filename]!) : false;
    } catch (e) {
      this.showError(e);
    } finally {
      this.isFilesLoading = false;
    }
  }

  private async setDownloadFilesTableItems() {
    let files: string[] = [];
    for (const key of Object.keys(this.analysis.files)) {
      files = files.concat(this.analysis!.files[key]);
    }
    files.sort();

    this.downloadFilesTableItems = files.map(file => ({ name: file, size: null }));
  }
}
</script>
