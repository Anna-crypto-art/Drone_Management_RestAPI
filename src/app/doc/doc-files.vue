<template>
  <app-content :title="$t('documentation')">
    <div class="app-doc-files-table-toolbar" v-if="isSuperAdmin">
      <app-button variant="primary" @click="onCreateDocFileClick" :superAdminProtected="true">
        {{ $t("upload-new-doc-file") }}
      </app-button>
    </div>
    <app-table-container>
      <app-table :columns="columns" :rows="rows" :loading="loading" :hoverActions="true">
        <template #cell(fileName)="row">
          <a href="#" @click.prevent="onFileClick(row.item)">{{ row.item.title || row.item.fileName }}</a>
          <div class="grayed" v-show="row.item.description">
            {{ row.item.description }}
          </div>
          <div v-show="row.item.title && isSuperAdmin" class="grayed">
            <small>{{ row.item.fileName }}</small>
          </div>
        </template>
        <template #cell(updatedAtBy)="row">
          <small v-html="row.item.updatedAtBy"></small>
        </template>
        <template #hoverActions="row">
          <app-button
            @click="onCopyDocFileClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('copy-file-link')"
            icon="clipboard"
          />
          <app-button
            @click="onEditDocFileClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-doc-file')"
            :superAdminProtected="true"
            icon="wrench"
          />
          <app-button
            @click="onDeleteDocFileClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-doc-file')"
            :superAdminProtected="true"
            icon="trash"
          />
        </template>
      </app-table>
    </app-table-container>
    <app-modal-form
      id="edit-doc-file-modal"
      ref="appDocFileModal"
      :title="docFileModalTitle"
      :subtitle="docFileModalSubtitle"
      :ok-title="docFileModalOkTitle"
      :modalLoading="docFileModalLoading"
      :superAdminProtected="true"
      @submit="onSubmitDocFile"
    >
      <div v-if="currentDocFile">
        <b-form-group :label="$t('doc-file')">
          <app-simple-file-upload v-model="currentDocFile.file" :uploadProgress="uploadProgress" />
        </b-form-group>
        <b-form-group :label="$t('title')">
          <b-form-input v-model="currentDocFile.title" />
        </b-form-group>
        <b-form-group :label="$t('description')">
          <b-form-textarea
            id="description"
            v-model="currentDocFile.description"
          ></b-form-textarea>
        </b-form-group>
      </div>
    </app-modal-form> 
  </app-content>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { DocFileItem } from "@/app/doc/types";
import AppSimpleFileUpload from "@/app/shared/components/app-simple-file-upload/app-simple-file-upload.vue";
import { UploadProgress } from "@/app/shared/components/app-simple-file-upload/types";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { DocFile } from "../shared/services/volateq-api/api-schemas/doc-file-schema";
import dateHelper from "../shared/services/helper/date-helper";
import { getReadableFileSize } from "../shared/services/helper/file-helper";
import { AppDownloader } from "../shared/services/app-downloader/app-downloader";
import { baseUrl } from "@/environment/environment";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import { AppTableColumns } from "../shared/components/app-table/types";


@Component({
  name: "app-doc-files",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
    AppSimpleFileUpload,
    AppButton,
    AppTable,
  },
})
export default class AppDocFiles extends BaseAuthComponent {
  columns: AppTableColumns = [];
  rows: DocFileItem[] = [];

  loading = false;

  @Ref() appDocFileModal!: IAppModalForm;
  docFileModalLoading = false;
  docFileModalTitle = "";
  docFileModalSubtitle = "";
  docFileModalOkTitle = "";

  currentDocFile: DocFileItem | null = null;

  uploadProgress: UploadProgress | null = null;

  async created() {
    this.columns = [
      { key: "fileName", label: this.$t("document").toString() },
      { key: "updatedAtBy", label: this.$t("changed").toString() },
      { key: "size", label: this.$t("size").toString() },
    ];

    await this.updateDocFileRows();

    if (this.$route.query.fileId) {
      const docFileItem = this.rows.find(docFileItem => docFileItem.id === this.$route.query.fileId);
      if (docFileItem) {
        await this.onFileClick(docFileItem, "_self");
      }
    }
  }

  async updateDocFileRows() {
    this.loading = true;
    try {
      this.rows = (await volateqApi.getDocFiles()).map(docFile => ({
        id: docFile.id,
        file: null,
        description: docFile.description || null,
        title: docFile.title,
        fileName: docFile.file_name,
        updatedAtBy: this.getChangedText(docFile),
        size: getReadableFileSize(docFile.size),
      }));
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  async onFileClick(docFileItem: DocFileItem, target?: string) {
    try {
      const docFileUrl = await volateqApi.getDocFileUrl(docFileItem.id!);

      AppDownloader.open(docFileUrl.url, target || "_blank");
    } catch (e) {
      this.showError(e);
    }
  }

  async onCopyDocFileClick(docFileItem: DocFileItem) {
    try {
      const url = (new URL(`doc/files?fileId=${docFileItem.id}`, baseUrl)).toString();
  
      await navigator.clipboard.writeText(url);
  
      this.showSuccess(this.$t("copy-file-link-success").toString());
    } catch (e) {
      this.showError(e);
    }
  }

  onCreateDocFileClick() {
    try {
      this.currentDocFile = {
        file: null,
        description: null,
        title: null,
      };

      this.docFileModalTitle = this.$t("upload-new-doc-file").toString();
      this.docFileModalSubtitle = "";
      this.docFileModalOkTitle = this.$t("create").toString();

      this.uploadProgress = null;
      this.appDocFileModal.show();
    } catch (e) {
      this.showError(e);
    } 
  }

  onEditDocFileClick(docFileItem: DocFileItem) {
    try {
      this.currentDocFile = docFileItem;
  
      this.docFileModalTitle = this.$t("edit-doc-file").toString();
      this.docFileModalSubtitle = docFileItem.fileName || "";
      this.docFileModalOkTitle = this.$t("apply").toString();
  
      this.uploadProgress = null;
      this.appDocFileModal.show();
    } catch (e) {
      this.showError(e);
    }
  }

  async onSubmitDocFile() {
    this.docFileModalLoading = true;
    try {
      if (!this.currentDocFile) {
        throw new Error("Something went wrong! (Detais: currentDocFile is falsy)");
      }

      if (this.currentDocFile.id) { // update document
        if (!this.currentDocFile.file && 
          (this.currentDocFile.description === null || this.currentDocFile.description === undefined)) 
        {
          throw { error: "MISSING_FILE_OR_DESCRIPTION", message: "Nothing changed..." };
        }

        await volateqApi.editDocFile(
          this.currentDocFile.id,
          this.currentDocFile.file || undefined, 
          this.currentDocFile.title || undefined,
          this.currentDocFile.description || undefined,
          (progressEvent) => this.uploadProgress = { total: progressEvent.total, loaded: progressEvent.loaded },
        );

        this.showSuccess(this.$t("doc-file-updated-success").toString());
      } else { // create document
        if (!this.currentDocFile.file) {
          throw { error: "MISSING_FILE", message: "Please select a document to upload" };
        }

        await volateqApi.createDocFile(
          this.currentDocFile.file,
          this.currentDocFile.title || undefined,
          this.currentDocFile.description || undefined,
          (progressEvent) => this.uploadProgress = { total: progressEvent.total, loaded: progressEvent.loaded },
        );

        this.showSuccess(this.$t("doc-file-created-success").toString());
      }

      this.appDocFileModal.hide();

      await this.updateDocFileRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.docFileModalLoading = false;
    }
  }

  async onDeleteDocFileClick(docFileItem: DocFileItem) {
    this.loading = true;
    try {
      if (!confirm(this.$t("sure-delete-doc-file", { fileName: docFileItem.fileName }).toString())) {
        return;
      }

      await volateqApi.deleteDocFile(docFileItem.id!);

      this.showSuccess(this.$t("doc-file-deleted-success", { fileName: docFileItem.fileName }).toString());

      await this.updateDocFileRows();
    } catch (e) {
      this.showError(e as ApiException);
    } finally {
      this.loading = false;
    }
  }

  private getChangedText(docFile: DocFile): string {
    const userName = (docFile.user.first_name + " " + docFile.user.last_name).trim() || docFile.user.email;
    
    let createdOrUpdated = "";
    let timeDiff = "";
    if (!docFile.updated_at) {
      createdOrUpdated = this.$t("created").toString();
      timeDiff = this.$t(...dateHelper.getTimeDiff(docFile.created_at)).toString()
    } else {
      createdOrUpdated = this.$t("updated").toString();
      timeDiff = this.$t(...dateHelper.getTimeDiff(docFile.updated_at)).toString()
    }

    return `${createdOrUpdated} ${timeDiff} ${this.$t("by").toString()} ${userName}`
  }
}
</script>

<style lang="scss">
</style>
