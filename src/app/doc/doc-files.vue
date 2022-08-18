<template>
  <div class="app-doc-files">
    <div class="app-doc-files-table-toolbar">
      <b-button variant="primary" @click="onCreateDocFileClick">
        {{ $t("upload-new-doc-file") }}
      </b-button>
    </div>
    <app-table-container>
      <b-table :fields="columns" :items="rows" head-variant="light" hover :busy="loading">
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #cell(fileName)="row">
          <a href="#" @click="onFileClick">{{ row.item.fileName }}</a>
          <div class="grayed" v-show="row.item.description">
            {{ row.item.description }}
          </div>
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right" v-if="isSuperAdmin">
            <b-button
              @click="onEditDocFileClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('edit-doc-file')"
            >
              <b-icon icon="wrench" />
            </b-button>
            <b-button
              @click="onDeleteDocFilerClick(row.item)"
              variant="outline-danger"
              size="sm"
              :title="$t('delete-doc-file')"
            >
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </app-table-container>
    <app-modal-form
      id="edit-doc-file-modal"
      ref="appDocFileModal"
      :title="docFileModalTitle"
      :ok-title="docFileModalOkTitle"
      :modalLoading="docFileModalLoading"
      @submit="onSubmitDocFile"
    >
      <b-form-group :label="$t('file')">
        <b-form-input
          id="docFile"
          v-model="currentDocFile.fileName"
          :placeholder="$t('name')"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('description')">
        <b-form-textarea
          id="description"
          v-model="currentDocFile.description"
        ></b-form-textarea>
      </b-form-group>
    </app-modal-form>    
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { BvTableFieldArray } from "bootstrap-vue";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { DocFileItem } from "@/app/doc/types";


@Component({
  name: "app-settings-users",
  components: {
    AppTableContainer,
    AppModalForm,
  },
})
export default class AppSettingsCustomers extends BaseAuthComponent {
  columns: BvTableFieldArray = [];
  rows: DocFileItem[] = [];

  loading = false;

  @Ref() appDocFileModal!: IAppModalForm;
  docFileModalLoading = false;
  docFileModalTitle = "";
  docFileModalOkTitle = "";

  currentDocFile: DocFileItem | null = null;

  async created() {
    this.columns = [
      { key: "fileName", label: this.$t("file-name").toString() },
      { key: "updatedAtBy", label: this.$t("").toString() },
      { key: "size", label: this.$t("plants").toString() },
      { key: "actions", label: "" },
    ];

    await this.updateDocFileRows();
  }

  async updateDocFileRows() {
    this.loading = true;
    try {
      // blub
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  onCreateDocFileClick() {
    this.currentDocFile = {
      fileName: null,
      description: null,
    }

    this.docFileModalTitle = this.$t("upload-new-doc-file").toString();
    this.docFileModalOkTitle = this.$t("create").toString();

    this.appDocFileModal.show();
  }

  onEditDocFileClick(docFileItem: DocFileItem) {
    this.currentDocFile = docFileItem;

    this.docFileModalTitle = this.$t("edit-doc-file").toString() + ": " + docFileItem.fileName;
    this.docFileModalOkTitle = this.$t("apply").toString();

    this.appDocFileModal.show();
  }

  async onSubmitDocFile() {
    this.docFileModalLoading = true;
    try {
      // blub

      this.showSuccess(this.$t("doc-file-updated-success").toString());

      this.appDocFileModal.hide();

      await this.updateDocFileRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.docFileModalLoading = false;
    }
  }

  async onDeleteCustomerClick(docFileItem: DocFileItem) {
    this.loading = true;
    try {
      if (!confirm(this.$t("sure-delete-doc-file", { fileName: docFileItem.fileName }).toString())) {
        return;
      }

      // blub

      this.showSuccess(this.$t("doc-file-deleted-success", { fileName: docFileItem.fileName }).toString());

      await this.updateDocFileRows();
    } catch (e) {
      this.showError(e as ApiException);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.app-settings-customers-plants-selection {
  max-height: 400px;
  overflow-y: auto;
}
</style>
