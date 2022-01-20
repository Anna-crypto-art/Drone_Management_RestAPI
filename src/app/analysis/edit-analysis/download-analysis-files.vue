<template>
  <div>
    <app-button
      ref="downloadSelectedFilesButton"
      :disabled="isDownloadButtonDisabled"
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
      >
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
import { Component, Ref, Prop } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { BvTableFieldArray } from "bootstrap-vue";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IUpdateEditAnalysis } from "@/app/analysis/edit-analysis/types";
import { waitFor } from "@/app/shared/services/helper/debounce-helper";
import { IAppButton } from "@/app/shared/components/app-button/types";

@Component({
  name: "app-download-analysis-files",
  components: {
    AppTableContainer,
    AppButton,
  },
})
export default class AppDownloadAnalysisFiles extends BaseAuthComponent implements IUpdateEditAnalysis {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() downloadSelectedFilesButton!: IAppButton;
  @Ref() downloadFilesTable!: any; // b-table
  isDownloadButtonDisabled = true;

  downloadFilesTableColumns: BvTableFieldArray = [
    { key: "selected", label: "" },
    { key: "name", label: this.$t("name").toString() },
  ];
  downloadFilesTableItems: { name: string }[] = [];

  allDownloadFilesSelected = false;
  private selectedDonwloadFiles: { name: string }[] = [];

  async created() {
    this.updateAnalysis(this.analysis);
  }

  updateAnalysis(analysis: AnalysisSchema) {
    this.analysis = analysis;
    this.setDownloadFilesTableItems();
  }

  onDownloadFilesSelected(selectedDownloadFiles: { name: string }[]) {
    this.selectedDonwloadFiles = selectedDownloadFiles;

    this.isDownloadButtonDisabled = this.selectedDonwloadFiles.length === 0;
  }

  async onDownloadSelectedFilesClick() {
    try {
      this.downloadSelectedFilesButton.startLoading();

      for (const downloadFile of this.selectedDonwloadFiles) {
        const downloadUrl = await volateqApi.getAnalysisFileDownloadUrl(this.analysis!.id, downloadFile.name);

        AppDownloader.download(downloadUrl.url, downloadFile.name);

        // Browsers do not like download spam. So let's take a break after each download.
        await waitFor(3000);
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.downloadSelectedFilesButton.stopLoading();
    }
  }

  onSelectAllDownloadFiles(selected: boolean) {
    if (selected) {
      this.downloadFilesTable.selectAllRows();
      // // Bug: this.downloadFilesTable.selectAllRows() does not call event "onDownloadFilesSelected" in correct order
      // // so lets work around...
      // for (let i = 0; i < this.downloadFilesTableItems.length; i++) {
      //   this.downloadFilesTable.selectRow(i);
      // }
    } else {
      // this.downloadFilesTable.clearSelection(); leads to "clearSelection is not a function"
      // so lets work around... again!
      for (let i = 0; i < this.downloadFilesTableItems.length; i++) {
        this.downloadFilesTable.unselectRow(i);
      }
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
}
</script>
