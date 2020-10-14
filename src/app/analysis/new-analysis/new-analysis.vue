<template>
  <app-content :title="$t('create-new-analysis')" :navback="true" :subtitle="$t('create-new-analysis_descr')">
    <div class="app-new-analysis">
      <b-form @submit.prevent="onSubmit" style="margin-bottom: 50px;">
        <b-row>
          <b-col sm="4" v-if="isSuperAdmin">
            <b-form-group label-cols="auto" :label="$t('customer')">
              <b-form-select required v-model="newAnalysis.customer_id" :options="customerOptions" @change="onCustomerSelect"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label-cols="auto" :label="$t('route')">
              <b-form-select required v-model="newAnalysis.route_id" :options="routesOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <app-file-upload ref="appFileUpload" :title="$t('upload-your-files')"
          @fileAdded="checkFileCompleteness"
          @fileRemoved="checkFileCompleteness"
          @completed="onCompleted"
          @failed="onFailed">
          <app-checklist>
            <app-checklist-item :checked="checkListItems.videoFiles">{{ $t("video-files_descr") }}</app-checklist-item>
            <app-checklist-item :checked="checkListItems.droneMetaFile">{{ $t("drone-metadata-file_descr") }}</app-checklist-item>
            <app-checklist-item :checked="checkListItems.plantMetaFile">{{ $t("plant-metadata-file_descr") }}</app-checklist-item>
          </app-checklist>
        </app-file-upload>
        <app-button ref="uploadButton" type="submit" cls="pull-right">{{ uploadButtonTxt }}</app-button>
        <div class="clearfix"></div>
      </b-form>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Watch, Ref } from "vue-property-decorator";
import BaseAuthComponent from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { RouteSchema } from "@/app/shared/services/volateq-api/api-schemas/route-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";
import { SelectOption } from "@/app/shared/types/select-option";
import AppFileUpload from "@/app/shared/components/app-file-upload/app-file-upload.vue";
import { IAppFileUpload, IResumableFile } from "@/app/shared/components/app-file-upload/types";
import AppChecklist from "@/app/shared/components/app-checklist/app-checklist.vue"
import AppChecklistItem from "@/app/shared/components/app-checklist/app-checklist-item.vue"
import { CheckListItems } from "@/app/analysis/new-analysis/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import appButtonEventBus from "@/app/shared/components/app-button/app-button-event-bus";
import { IAppButton } from "@/app/shared/components/app-button/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppFileUpload,
    AppChecklist,
    AppChecklistItem,
    AppButton
  }
})
export default class AppNewAnalysis extends BaseAuthComponent {
  @Ref() appFileUpload!: IAppFileUpload;
  @Ref() uploadButton!: IAppButton;
  uploadButtonTxt = "";
  
  customers: CustomerSchema[] | undefined;
  customerOptions: SelectOption[] = [];

  routes: RouteSchema[] = [];
  routesOptions: SelectOption[] = [];

  newAnalysis: NewAnalysis = { route_id: "", files: [] };
  checkListItems: CheckListItems = {
    videoFiles: false,
    droneMetaFile: false,
    plantMetaFile: false
  }

  analysis: { id: string } | undefined;

  async created() {
    try {
      if (this.isSuperAdmin) {
        this.customers = await volateqApi.getCustomers();
        this.customerOptions = this.customers.map(customer => ({ value: customer.id, text: customer.name }));
        this.newAnalysis.customer_id = "";
      }
      this.routes = await volateqApi.getRoutes();
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }

    this.uploadButtonTxt = this.$t("upload").toString();
  }

  async onCustomerSelect() {
    if (this.newAnalysis.customer_id) {
      try {
        this.routes = await volateqApi.getRoutes({ customer_id: this.newAnalysis.customer_id });
      } catch (e) {
        appContentEventBus.showErrorAlert(this.$t(e.error).toString());
      }
    }
  }

  @Watch('routes')
  onRoutesChanged(routes: RouteSchema[], oldRoutes: RouteSchema[]) {
    this.routesOptions = this.routes.map(route => ({ value: route.id, text: route.abbrev }));
  }

  checkFileCompleteness() {
    this.checkListItems.droneMetaFile = false;
    this.checkListItems.videoFiles = false;
    this.checkListItems.plantMetaFile = false;

    let countMp4Files = 0;
    this.newAnalysis.files = [];
    for (const file of this.appFileUpload.files) {
      const ext = (file.fileName.split(".").pop() || "").toLowerCase();

      if (ext === "mp4") {
        this.checkListItems.videoFiles = true;
        this.newAnalysis.files.push(file.fileName)
      } else if (ext === "srt") {
        this.checkListItems.droneMetaFile = true;
        this.newAnalysis.files.push(file.fileName)
      } else if (ext === "xslx" || ext === "mdb") {
        this.checkListItems.plantMetaFile = true;
        this.newAnalysis.plant_metadata_file = file.fileName;
      }
    }
  }

  async onSubmit() {
    if (this.analysis) { // Upload failed before. Just trying to resume, now
      this.uploadButton.startLoading();
      this.appFileUpload.upload(volateqApi.getAnalyisisFileUploadUrl(this.analysis.id));
      return;
    }

    this.checkFileCompleteness();
    if (!this.checkListItems.droneMetaFile || !this.checkListItems.videoFiles) {
      appContentEventBus.showErrorAlert("MISSING_FILES");
      this.uploadButton.stopLoading();
      return;
    }

    try {
      this.uploadButton.startLoading();

      this.analysis = await volateqApi.createAnalysis(this.newAnalysis);

      this.appFileUpload.upload(volateqApi.getAnalyisisFileUploadUrl(this.analysis.id));
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
      this.uploadButton.stopLoading();
    } 
  }

  async onCompleted() {
    if (!this.analysis) {
      appContentEventBus.showErrorAlert(this.$t(ApiErrors.SOMETHING_WENT_WRONG).toString());
      console.error('Missing analysis.id object!')
      return;
    }

    this.uploadButton.stopLoading();
    this.uploadButton.disable();

    try {
      await volateqApi.updateAnalysisState(this.analysis.id, { state: ApiStates.PICK_ME_UP })

      appContentEventBus.showSuccessAlert(this.$t("upload-completed-successfully").toString());
    } catch (e) {
      appContentEventBus.showErrorAlert(this.$t(e.error).toString());
    }
  }

  async onFailed(message: string) {
    if (!this.analysis) {
      appContentEventBus.showErrorAlert(this.$t(ApiErrors.SOMETHING_WENT_WRONG).toString());
      console.error('Missing analysis.id object!')
      return;
    }

    appContentEventBus.showErrorAlert(message);
    this.uploadButton.stopLoading();
    this.uploadButtonTxt = this.$t('resume-upload').toString();

    try {
      await volateqApi.updateAnalysisState(this.analysis.id, { state: ApiStates.UPLOAD_FAILED, message: message })
    } catch (e) {
      // Well, that is not a surprise...
      console.error(e);
    }
  }
}
</script>

<style lang="scss">

</style>
