<template>
  <app-content v-if="analysis" :title="analysis.name || ''" :eventId="analysis.id" navbackPath="/analyses">
    <template #subtitle>
      <div class="mar-top">
        <app-step-progress :steps="analysisProgressSteps" />
      </div>
    </template>
    <div class="app-edit-analysis">
      <b-tabs v-model="tabIndex">
        <b-tab class="app-edit-analysis-download-tab" href="#download">
          <template #title>
            <b-icon icon="download" /><span class="pad-left">{{ $t("download") }}</span>
          </template>
          <app-download-analysis-files :analysis="analysis" />
        </b-tab>
        <b-tab class="app-edit-analysis-upload-tab" href="#upload">
          <template #title>
            <b-icon icon="upload" /><span class="pad-left">{{ $t("upload") }}</span>
          </template>
          <app-upload-analysis-files v-if="isStateNotNull" :analysis="analysis" :droneOptions="droneOptions" :selectedDrone="selectedDrone" />
        </b-tab>
        <b-tab class="app-edit-analysis-edit-tab">
          <template #title>
            <b-icon icon="pencil-square" /><span class="pad-left">{{ $t("edit") }}</span>
          </template>
          <b-row>
            <b-col sm>
              <app-box :title="$t('edit-analysis')">
                <b-form @submit.prevent="onSubmitEditAnalysis">
                  <b-form-group :label="$t('acquisition-date')" label-cols-sm="4" label-cols-lg="2">
                    <app-datepicker v-model="flownAt" required /> 
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="2" v-show="!changeProductPackagesAndDroneAllowed">
                    <template #label>
                    </template>
                    <b-alert :show="!changeProductPackagesAndDroneAllowed && !isSuperAdmin" variant="info" class="edit-analysis-info">
                      {{ $t("can-only-change-pp-drone-before-data-complete") }}
                    </b-alert>
                    <b-alert :show="!changeProductPackagesAndDroneAllowed && isSuperAdmin" variant="info" class="edit-analysis-info">
                      {{ $t("can-only-change-pp-drone-before-data-complete-super-admin") }}
                    </b-alert>
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="2">
                    <template #label>
                      {{ $t('product-packages') }} <app-super-admin-marker v-if="isSuperAdmin && !changeProductPackagesAndDroneAllowed" />
                    </template>
                    <app-multiselect 
                      v-model="selectedProductPackageIds"
                      :options="productPackagesSelection"
                      :readonly="!(isSuperAdmin || changeProductPackagesAndDroneAllowed)"
                    />
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="2" v-show="isSelectedDroneUnavailable">
                    <b-alert :show="isSelectedDroneUnavailable && isSuperAdmin" variant="info" class="edit-analysis-info">
                      {{ $t("previously-selected-drone-not-available") }}
                    </b-alert>
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="2" v-show="noDroneAvailable">
                    <b-alert :show="noDroneAvailable" variant="info" class="edit-analysis-info">
                      {{ $t("no-drone-available-for-customer-plant") }}
                    </b-alert>
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="2">
                    <template #label>
                      {{ $t('drone') }} <app-super-admin-marker v-if="isSuperAdmin && !changeProductPackagesAndDroneAllowed" />
                    </template>
                    <b-form-select v-model="selectedDroneId" :options="droneOptions" :disabled="!(isSuperAdmin || changeProductPackagesAndDroneAllowed) || isSelectedDroneUnavailable || noDroneAvailable"></b-form-select>
                  </b-form-group>
                  <b-form-group label-cols-sm="4" label-cols-lg="2" v-if="isSuperAdmin">
                    <template #label>
                      {{ $t('add-pis') }} <app-super-admin-marker />
                    </template>
                    <app-multiselect 
                      v-model="selectedKeyFigureIds"
                      :options="keyFiguresSelection"
                    />
                  </b-form-group>
                  <app-button type="submit" :loading="loading">{{ $t("apply") }}</app-button>
                </b-form>
              </app-box>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab class="app-edit-analysis-flights-tab" lazy>
          <template #title>
            <b-icon icon="calendar-range" />
            <span class="pad-left">{{ $t("flights") }}</span>
          </template>
          <app-analysis-flight-campaigns :analysis="analysis" />
        </b-tab>
        <b-tab class="app-edit-analysis-ref-measures" v-if="hasReferenceMeasurements" lazy>
          <template #title>
            <b-icon icon="clipboard-check" />
            <span class="pad-left">{{ $t("reference-measurements") }}</span>
            <app-super-admin-marker />
          </template>
          <app-analysis-reference-measurements :analysis="analysis" />
        </b-tab>
        <b-tab v-if="isSuperAdmin" class="app-edit-analysis-admin-tab" lazy>
          <template #title>
            <b-icon icon="shield-shaded" /><span class="pad-left">{{ $t("admin-panel") }}</span>
          </template>
          <app-edit-analysis-admin :analysis="analysis" />
        </b-tab>
      </b-tabs>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "../../shared/components/base-auth-component/base-auth-component";
import { ApiErrors } from "../../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../../shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "../../shared/services/volateq-api/volateq-api";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppDownloadAnalysisFiles from "@/app/analysis/edit-analysis/download-analysis-files.vue";
import AppEditAnalysisAdmin from "@/app/analysis/edit-analysis/edit-analysis-admin/edit-analysis-admin.vue";
import AppUploadAnalysisFiles from "@/app/analysis/edit-analysis/upload-analysis-files.vue";
import { analysisEventService } from "@/app/analysis/shared/analysis-event-service";
import { AnalysisEvent } from "../shared/types";
import { TaskSchema } from "@/app/shared/services/volateq-api/api-schemas/task-schema";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { apiStateNames, ApiStates } from "@/app/shared/services/volateq-api/api-states";
import AppAnalysisReferenceMeasurements from "@/app/analysis/edit-analysis/reference-measurement/analysis-reference-measurements.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { ProgressStep } from "@/app/shared/components/app-step-progress/types";
import AppStepProgress from "@/app/shared/components/app-step-progress/app-step-progress.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import AppAnalysisFlightCampaigns from "@/app/analysis/edit-analysis/flight-campaign/flight-campaign.vue";

@Component({
  name: "app-edit-analysis",
  components: {
    AppContent,
    AppButton,
    AppDownloadAnalysisFiles,
    AppEditAnalysisAdmin,
    AppUploadAnalysisFiles,
    AppBox,
    AppAnalysisReferenceMeasurements,
    AppSuperAdminMarker,
    AppStepProgress,
    AppMultiselect,
    AppDatepicker,
    AppAnalysisFlightCampaigns,
  },
})
export default class AppEditAnalysis extends BaseAuthComponent {
  analysis: AnalysisSchema | null = null;
  // path = "/analyses";

  flownAt = "";
  loading = false;
  hasReferenceMeasurements = false;

  productPackagesSelection: MultiselectOption[] = [];
  selectedProductPackageIds: string[] | null = null;

  keyFiguresSelection: MultiselectOption[] = [];
  selectedKeyFigureIds: string[] | null = null;

  selectedDrone: DroneSchema | null = null;
  selectedDroneId: string | null = null;
  droneOptionsRaw: Array<any> = [];
  droneOptions: Array<any> | null = null;

  // tab index stuff currently only needed for direct link from button "upload data for analysis XYZ" to upload tab
  tabIndex = 0;
  tabs = ['#download', '#upload'];

  mounted() {
    this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.meta.hash);
  }

  async created() {
    await this.updateAnalysis(this.$route.params.id);

    analysisEventService.on(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS, () => {
      this.updateAnalysis(this.analysis!.id)
    });
  }

  get analysisProgressSteps(): ProgressStep[] {
    const skipStepCount = 2;
    return [
      {
        id: ApiStates.UPLOADING,
        name: this.hasState([ApiStates.UPLOAD_FAILED, ApiStates.DATA_INCOMPLETE]) ?
          this.$t(this.analysis!.current_state?.state.name || "").toString() : 
          this.$t(apiStateNames[ApiStates.UPLOADING]).toString(),
        description: this.hasState([ApiStates.UPLOAD_FAILED, ApiStates.DATA_INCOMPLETE]) ?
          this.$t(this.analysis!.current_state?.state.name + "_descr").toString() : 
          this.$t(apiStateNames[ApiStates.UPLOADING] + "_descr").toString(),
        danger: this.hasState([ApiStates.UPLOAD_FAILED, ApiStates.DATA_INCOMPLETE]),
        active: this.hasState([ApiStates.UPLOADING, ApiStates.UPLOAD_FAILED, ApiStates.DATA_INCOMPLETE]),
      }, 
      {
        id: ApiStates.DATA_COMPLETE - skipStepCount,
        name: this.$t(apiStateNames[ApiStates.DATA_COMPLETE]).toString(),
        description: this.$t(apiStateNames[ApiStates.DATA_COMPLETE] + "_descr").toString(),
        active: this.hasState([ApiStates.DATA_COMPLETE]),
      },
      {
        id: ApiStates.DATA_COMPLETE_VERIFIED - skipStepCount,
        name: this.$t(apiStateNames[ApiStates.DATA_COMPLETE_VERIFIED]).toString(),
        description: this.$t(apiStateNames[ApiStates.DATA_COMPLETE_VERIFIED] + "_descr").toString(),
        active: this.hasState([ApiStates.DATA_COMPLETE_VERIFIED]),
      },
      {
        id: ApiStates.PROCESSING - skipStepCount,
        name: this.$t(apiStateNames[ApiStates.PROCESSING]).toString(),
        description: this.$t(apiStateNames[ApiStates.PROCESSING] + "_descr").toString(),
        active: this.hasState([ApiStates.PROCESSING]),
      },
      {
        id: ApiStates.FINISHED - skipStepCount,
        name: this.$t(apiStateNames[ApiStates.FINISHED]).toString(),
        description: this.$t(apiStateNames[ApiStates.FINISHED] + "_descr").toString(),
        active: this.hasState([ApiStates.FINISHED]),
      },
    ];
  }

  private hasState(apiStates: ApiStates[]): boolean {
    if (this.isStateNotNull) {
      return this.analysis && this.analysis.current_state &&
      apiStates.includes(this.analysis.current_state?.state.id) || false;
    }
    return false;
  }

  private get isStateNotNull(): boolean {
    return this.analysis?.current_state != (null || undefined);
  }

  @CatchError()
  private async updateAnalysis(analysisId: string) {
    this.analysis = await volateqApi.getAnalysis(analysisId);

    this.flownAt = this.analysis.flown_at;

    if (this.isSuperAdmin) {
      this.hasReferenceMeasurements = (await volateqApi.getReferenceMeasurements(this.analysis.id)).length > 0;
    }

    this.productPackagesSelection = await volateqApi.getOrderPPsMulitselectOptions(
      this.analysis.plant.id,
      this.analysis.flown_at,
      this.analysis.customer.id,
    );
    this.selectedProductPackageIds = this.analysis.order_product_packages.map(orderPP => orderPP.id);

    if (this.isSuperAdmin) {
      this.keyFiguresSelection = (await volateqApi.getAllKeyFigures())
        .filter(kf => kf.component.technology_id === this.analysis!.plant.technology_id)
        .map(kf => ({
          id: kf.id.toString(),
          label: kf.name,
        }));

      this.selectedKeyFigureIds = this.analysis.analysis_key_figures?.map(akf => akf.key_figure_id.toString()) || null;
    }

    this.watchAnalysisTask();

    if (this.isStateNotNull) {
      if (this.isSuperAdmin && this.analysis.analysis_result && 
        this.analysis.analysis_result.released && this.analysis.current_state?.state.id !== ApiStates.FINISHED
      ) {
        AppContentEventService.showInfo(this.analysis!.id, this.$t("analysis-not-finished_descr").toString());
      }
      if (this.isSuperAdmin && this.analysis.current_state?.state.id === ApiStates.FINISHED && 
        (!this.analysis.analysis_result || !this.analysis.analysis_result.released)
      ) {
        AppContentEventService.showInfo(this.analysis!.id, this.$t("analysis-not-released_descr").toString());
      }
    }

    this.selectedDrone = this.analysis!.drone;
    if (this.selectedDrone) {
      this.selectedDroneId = this.selectedDrone!.id;
    }
    this.droneOptionsRaw = (await volateqApi.getAvailableDronesForAnalysis(this.analysis!.id))
      .map(drone => ({ value: drone.id, text: this.$t("drone-with-sn", {droneName: drone.custom_name, droneSerialNumber: drone.serial_number}).toString() }));

    if (this.isSelectedDroneUnavailable) {
      this.droneOptions = [...this.droneOptionsRaw, {value: this.selectedDrone.id, text: this.$t("drone-with-sn", {droneName: this.selectedDrone.custom_name, droneSerialNumber: this.selectedDrone.serial_number}).toString()}]
    } else {
      this.droneOptions = this.droneOptionsRaw;
    }
  }

  get isSelectedDroneUnavailable(): boolean {
    return !!this.selectedDrone && !this.droneOptionsRaw.find(drone => drone.value == this.selectedDrone!.id);
  }

  private watchAnalysisTask() {
    if (this.analysis!.task_id && this.isSuperAdmin) {
      volateqApi.waitForTask(
        this.analysis!.task_id,
        (task: TaskSchema, failed: boolean) => {
          if (failed) {
            AppContentEventService.showError(this.analysis!.id, {
              error: ApiErrors.SOMETHING_WENT_WRONG,
              message: `<b>${task.output!.error}</b><br><br>` + volateqApi.getTaskOutputAsMessage(task),
            });
          } else {
            AppContentEventService.showSuccess(this.analysis!.id, volateqApi.getTaskOutputAsMessage(task))
          }

          analysisEventService.emit(this.analysis!.id, AnalysisEvent.FINISHED_ANALYSIS_TASK, task);
        },
        (task: TaskSchema) => {
          AppContentEventService.showInfo(this.analysis!.id, volateqApi.getTaskOutputAsMessage(task, this.$t("wait-for-start").toString()));

          analysisEventService.emit(this.analysis!.id, AnalysisEvent.RUN_ANALYSIS_TASK, task)
        }
      )
    }
  }

  @CatchError("loading")
  async onSubmitEditAnalysis() {
    await volateqApi.updateAnalysis(this.analysis!.id, { 
      flown_at: this.flownAt?.substring(0, 10),
      order_product_package_ids: this.selectedProductPackageIds || undefined,
      key_figure_ids: this.selectedKeyFigureIds?.map(k => parseInt(k)) || undefined,
      drone_id: this.selectedDroneId || undefined,
    });

    this.showSuccess(this.$t("analysis-updated-successfully").toString());

    analysisEventService.emit(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS);
  }

  get changeProductPackagesAndDroneAllowed(): boolean {
    if (this.isStateNotNull) {
      return (this.analysis!.current_state?.state.id || "") < ApiStates.DATA_COMPLETE;
    }
    return false;
  }

  get selectedDroneIsCurrentlyAvailable(): boolean {
    return this.selectedDrone?.id == null || this.droneOptionsRaw.find(drone => drone.value == this.selectedDrone?.id);
  }

  get noDroneAvailable(): boolean {
    return !!(this.droneOptions && this.droneOptions.length == 0);
  }
}
</script>

<style lang="scss">
.app-edit-analysis {
  &-download-tab {
    margin-top: 30px;
  }
  &-upload-tab {
    margin-top: 30px;
  }
  &-flights-tab {
    margin-top: 30px;
  }

  .alert-info {
    &.edit-analysis-info {
      margin-bottom: 0;
      margin-top: 1rem;
    }
  }
}
</style>
