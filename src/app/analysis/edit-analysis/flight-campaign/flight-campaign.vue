<template>
  <div>
    <div class="app-flight-campaign-table-toolbar">
      <app-button variant="primary" @click="onCreateFlightCampaignClick">
        {{ $t("create-flight-campaign") }}
      </app-button>
    </div>
    <app-table-container>
      <app-table
        :rows="flightCampaignItems"
        :columns="flightCampaignColumns"
        selectMode="single"
        :loading="loading"
        @rowSelected="onFlightCampaignSelected"
        :hoverActions="true"
      >
        <template #cell(name)="row">
          <span :class="isGenerating(row.item) ? 'orange' : failedToGenerate(row.item) ? 'red' :''" :style="failedToGenerate(row.item) ? 'text-decoration: line-through;' : ''">
            {{ row.item.name }}
          </span>
        </template>
        <template #cell(start_date)="row">
          <span :class="isGenerating(row.item) ? 'orange' : failedToGenerate(row.item) ? 'red' :''" :style="failedToGenerate(row.item) ? 'text-decoration: line-through;' : ''">
            {{ row.item.start_date }}
          </span>
        </template>
        <template #cell(drone)="row">
          <span :class="isGenerating(row.item) ? 'orange' : failedToGenerate(row.item) ? 'red' :''" :style="failedToGenerate(row.item) ? 'text-decoration: line-through;' : ''">
            {{ appendDroneNameAndSerialNumber(row.item.drone) }}
          </span>
        </template>
        <template #cell(plant_status)="row">
          <span v-if="isGenerating(row.item)">
            <app-explanation>{{ $t("flight-type-not-yet-available_expl") }}</app-explanation>
          </span>
          <span v-else :class="isGenerating(row.item) ? 'orange' : failedToGenerate(row.item) ? 'red' :''" :style="failedToGenerate(row.item) ? 'text-decoration: line-through;' : ''">
            {{ row.item.plant_status.map(plant_status => plant_status.name).join(", ") }}
          </span>
        </template>
        <template #cell(user_created)="row">
          <span :class="isGenerating(row.item) ? 'orange' : failedToGenerate(row.item) ? 'red' :''" :style="failedToGenerate(row.item) ? 'text-decoration: line-through;' : ''">
            {{ row.item.user_created }}
          </span>
        </template>
        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin && isGenerated(row.item)"
            icon="arrow-right-circle-fill"
            @click="onExportClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('export-to-third-party')"
          />
          <app-button
            @click="onDeleteClick(row.item)"
            variant="outline-danger"
            size="sm"
            icon="trash"
            :title="$t('delete')"
          />
        </template>
      </app-table>
    </app-table-container>

    <app-modal-form
      id="flight-campaign-modal"
      ref="appFlightCampaignModal"
      :title="flightCampaignModalTitle"
      :ok-title="flightCampaignModalOkTitle"
      :modalLoading="flightCampaignModalLoading"
      :cancel-title="$t('cancel')"
      @submit="onSubmitFlightCampaign"
    >
      <div v-if="newFlightCampaign">
        <b-row>
          <b-col>
            <b-form-group :label="$t('name')">
              <b-form-input
                id="new-flight-campaign-name"
                v-model="newFlightCampaign.name"
                required
                :placeholder="$t('name')" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label="$t('drone')">
              <b-form-select
                id="drone-selection"
                v-model="selectedDroneId"
                :options="droneSelection"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="$t('start-date')">
              <app-datepicker v-model="newFlightCampaign.startDate" required /> 
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label="$t('product-packages')">
              <app-multiselect 
                v-model="newFlightCampaign.orderProductPackageIds"
                :options="availableProductPackages"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group v-if="isSuperAdmin" :label="$t('force-add-flight-types')">
              <template #label>
                {{ $t('force-add-flight-types') }} <app-super-admin-marker />
              </template>
              <app-multiselect 
                v-model="newFlightCampaign.forceAddFlightTypeIds"
                :options="availableFlightTypes"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox id="new-flight-campaign-battery-hotswapping" v-model="newFlightCampaign.batteryHotswapping">
              {{ $t("battery-hotswapping") }} <app-explanation>{{ $t("battery-hotswapping_expl") }}</app-explanation>
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox id="new-flight-campaign-autoexport-litchi" v-model="newFlightCampaign.autoExportLitchi">
              {{ $t("auto-export-litchi") }} <app-explanation>{{ $t("auto-export-litchi_expl") }}</app-explanation>
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-checkbox id="new-flight-campaign-optimize-torsion-flights" v-model="newFlightCampaign.optimizeTorsionFlights">
              {{ $t("optimize-torsion-flights") }} <app-explanation>{{ $t("optimize-torsion-flights_expl") }}</app-explanation>
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>
    </app-modal-form>

    <app-flight-campaign-routes 
      :analysis="analysis"
      :flightCampaign="selectedFlightCampaign"
    />

    <app-modal-form
      id="export-modal"
      ref="exportModal"
      :title="$t('export-to-third-party')"
      :ok-title="$t('export')"
      :cancel-title="$t('cancel')"
      :modalLoading="exportModalLoading"
      @submit="onExport"
    >
      <b-form-group :label="$t('select-export-target')">
        <b-form-select v-model="exportTargetId" :options="exportTargetOptions" required @change="onExportTargetChanged"/>
      </b-form-group>
      <b-form-group :label="$t('username')">
        <b-form-input v-model="exportUsername" :placeholder="$t('username')" required :disabled="!enableExportUserPasswordAuth" />
      </b-form-group>
      <b-form-group :label="$t('password')">
        <b-form-input v-model="exportPassword" :placeholder="$t('password')" required :disabled="!enableExportUserPasswordAuth" type="password" />
      </b-form-group>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { FlightCampaignItemSchema, FlightCampaignSchema, FlightCampaignState } from "@/app/shared/services/volateq-api/api-schemas/flight-campaign-schema"
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import AppFlightCampaignRoutes from "./flight-campaign-route.vue";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { NewFlightCampaign } from "./types";
import { sortBy } from "@/app/shared/services/helper/sort-helper";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
@Component({
  name: "app-analysis-flight-campaigns",
  components: {
    AppTableContainer,
    AppTable,
    AppModalForm,
    AppButton,
    AppDatepicker,
    AppSuperAdminMarker,
    AppMultiselect,
    AppFlightCampaignRoutes,
    AppExplanation
  }
})
export default class AppAnalysisFlightCampaigns extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
  
  loading = false;

  droneSelection: any[] = [];
  selectedDroneId: string | null = null;
  
  availableProductPackages: MultiselectOption[] = [];
  availableFlightTypes: MultiselectOption[] = [];
  
  @Ref() appFlightCampaignModal!: IAppModalForm;
  flightCampaignModalLoading = false;
  flightCampaignModalTitle = "";
  flightCampaignModalOkTitle = "";

  @Ref() exportModal!: IAppModalForm;
  exportModalLoading = false;
  exportTargetOptions = ['Unleash', 'Litchi'];
  exportTargetId = 'Unleash';
  enableExportUserPasswordAuth = false;
  exportUsername = '';
  exportPassword = '';
  flightCampaignSelectedForExport: FlightCampaignItemSchema | null = null;

  newFlightCampaign: NewFlightCampaign | null = null;
  
  flightCampaignItems: Array<FlightCampaignItemSchema> = [];
  flightCampaignColumns: AppTableColumns = [
    { key: "name", label: this.$t("name").toString() },
    { key: "start_date", label: this.$t("start-date").toString() },
    { key: "drone", label: this.$t("drone").toString() },
    { key: "plant_status", label: this.$t("flight-types").toString() },
    { key: "user_created", label: this.$t("created-by").toString() },
  ];
  selectedFlightCampaign: FlightCampaignItemSchema | null = null;

  @CatchError()
  async created() {
    this.droneSelection = (await volateqApi.getAvailableDronesForAnalysis(this.analysis.id)).map(drone => ({
      value: drone.id.toString(),
      text: this.appendDroneNameAndSerialNumber(drone)
    }));

    await this.updateFlightCampaigns();

    this.availableProductPackages = await volateqApi.getOrderPPsMulitselectOptions(
      this.analysis.plant.id,
      this.analysis.flown_at,
      this.analysis.customer.id,
    );

    this.availableFlightTypes = (await volateqApi.getAllPlantStatus())
      .filter(plant_status => plant_status.technology_id === this.analysis.plant.technology_id)
      .map(plant_status => ({
        id: plant_status.id.toString(),
        label: plant_status.name
      }));
  }
  
  @CatchError()
  onCreateFlightCampaignClick() {
    this.newFlightCampaign = {
      name: this.analysis.name + " " + this.$t("flight-campaign") + " " + (this.flightCampaignItems.length + 1).toString(),
      analysisId: this.analysis.id,
      startDate: this.analysis.flown_at,
      batteryHotswapping: true,
      orderProductPackageIds: this.analysis.order_product_packages.map(orderPP => orderPP.id),
      forceAddFlightTypeIds: [],
      autoExportLitchi: false,
      optimizeTorsionFlights: false,
    }
    this.selectedDroneId = this.analysis.drone?.id;

    this.flightCampaignModalTitle = this.$t("create-flight-campaign").toString();
    this.flightCampaignModalOkTitle = this.$t("create").toString();

    this.appFlightCampaignModal.show();
  }

  @CatchError("flightCampaignModalLoading")
  async onSubmitFlightCampaign() {
    try {
      if (!this.newFlightCampaign) {
        return
      }
      
      if (!this.newFlightCampaign.name) {
        throw { error: "INVALID_FLIGHT_CAMPAIGN_NAME", message: "Please enter a name for the flight campaign"}
      }

      if (!this.selectedDroneId) {
        throw { error: "INVALID_OR_MISSING_DRONE_SELECTION", message: "Please select a drone"}
      }

      await volateqApi.createFlightCampaign({
        name: this.newFlightCampaign.name,
        analysis_id: this.newFlightCampaign.analysisId,
        drone_id: this.selectedDroneId,
        start_date: this.newFlightCampaign.startDate,
        original_start_date: this.newFlightCampaign.startDate,
        battery_hotswapping: this.newFlightCampaign.batteryHotswapping,
        order_product_package_ids: this.newFlightCampaign.orderProductPackageIds,
        force_add_flight_type_ids: this.newFlightCampaign.forceAddFlightTypeIds,
        auto_export_litchi: this.newFlightCampaign.autoExportLitchi,
        optimize_torsion_flights: this.newFlightCampaign.optimizeTorsionFlights,
      });

      this.showSuccess(this.$t("now-creating-flight-campaign", { flight_campaign: this.newFlightCampaign.name }).toString());
      this.appFlightCampaignModal.hide();

      await this.updateFlightCampaigns();      
    } catch (e) {
      this.showError(e);
    }
  }

  async updateFlightCampaigns() {
    this.flightCampaignItems = sortBy(
      (await volateqApi.getFlightCampaignsOfAnalysis(this.analysis.id)).map((flight_campaign: FlightCampaignSchema) => ({
        id: flight_campaign.id,
        name: flight_campaign.name,
        drone: flight_campaign.drone,
        start_date: dateHelper.toDate(flight_campaign.start_date),
        original_start_date: dateHelper.toDate(flight_campaign.original_start_date),
        plant_status: flight_campaign.plant_status,
        flight_campaign_state: flight_campaign.flight_campaign_state,
        user_created: flight_campaign.user_created ? 
          (flight_campaign.user_created.first_name + " " + flight_campaign.user_created.last_name).trim() || flight_campaign.user_created.email : ""
      })),
      e => e.start_date,
      e => e.name.toLowerCase(),
    );
  }

  onFlightCampaignSelected(flightCampaignItems: FlightCampaignItemSchema[]) {
    if (flightCampaignItems.length > 0) {
      if (flightCampaignItems[0].flight_campaign_state == FlightCampaignState.GENERATING) {
        alert(this.$t('flight-campaign-being-generated'))
        this.selectedFlightCampaign = null;
      } else if (flightCampaignItems[0].flight_campaign_state == FlightCampaignState.FAILED_GENERATING) {
        alert(this.$t('flight-campaign-generation-failed'))
        this.selectedFlightCampaign = null;
      } else {
        this.selectedFlightCampaign = flightCampaignItems[0];
      }
    } else {
      this.selectedFlightCampaign = null;
    }
  }

  @CatchError("loading")
  async onDeleteClick(flightCampaignItem: any) {
    if (!confirm(this.$t("flight-campaign-delete-are-you-sure").toString())) {
      return;
    }
    await volateqApi.deleteFlightCampaign(flightCampaignItem.id);
    this.showSuccess(this.$t("flight-campaign-delete-success").toString())
    
    await this.updateFlightCampaigns();
  }
  private appendDroneNameAndSerialNumber(drone: DroneSchema) {
    return this.$t("drone-with-sn", {droneName: drone.custom_name, droneSerialNumber: drone.serial_number}).toString();
  }

  async onExportClick(flightCampaignItem: any) {
    this.flightCampaignSelectedForExport = flightCampaignItem;
    this.onExportTargetChanged();
    this.exportModal.show();
  }

  async onExportTargetChanged() {
    this.exportUsername = '';
    this.exportPassword = '';

    if (this.exportTargetId == 'Litchi') {
      this.enableExportUserPasswordAuth = true;
    } else if (this.exportTargetId == 'Unleash') {
      this.enableExportUserPasswordAuth = false;
    }
  }

  async onExport() {
    if (!this.flightCampaignSelectedForExport) {
      this.showError('No flight campaign selected for export');
      return
    }

    if (this.exportTargetId == 'Unleash') {
      await volateqApi.exportFlightCampaignToUnleash(this.flightCampaignSelectedForExport.id);
      this.showSuccess(this.$t("flight-campaign-export-unleash-success").toString());
      this.exportModal.hide();
    } else {
      this.showError('Not yet implemented');
    }
  }

  private isGenerating(flightCampaign: FlightCampaignItemSchema): boolean {
    return flightCampaign.flight_campaign_state == FlightCampaignState.GENERATING;
  }

  private failedToGenerate(flightCampaign: FlightCampaignItemSchema): boolean {
    return flightCampaign.flight_campaign_state == FlightCampaignState.FAILED_GENERATING;
  }

  private isGenerated(flightCampaign: FlightCampaignItemSchema): boolean {
    return flightCampaign.flight_campaign_state == FlightCampaignState.FINISHED_GENERATING;
  }
}
</script>

<style lang="scss">
</style>