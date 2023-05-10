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
          <span :class="row.item.is_being_generated ? 'red' : ''">
            {{ row.item.name }}
          </span>
        </template>
        <template #cell(drone)="row">
          {{ appendDroneNameAndModelName(row.item.drone) }}
        </template>
        <template #cell(plant_status)="row">
          {{ row.item.plant_status.map(plant_status => plant_status.name).join(", ") }}
        </template>
        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin"
            icon="arrow-right-circle-fill"
            @click="onExportClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('export-to-third-party')"
          />
          <app-button
            v-show="isSuperAdmin"
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
      @submit="onSubmitFlightCampaign"
    >
      <b-row>
        <b-col>
          <b-form-group :label="$t('name')">
            <b-form-input
              id="new-flight-campaign-name"
              v-model="currentFlightCampaign.name"
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
            <app-datepicker v-model="currentFlightCampaign.start_date" required /> 
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group :label="$t('product-packages')">
            <app-multiselect 
              v-model="currentFlightCampaign.order_product_package_ids"
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
              v-model="currentFlightCampaign.force_add_flight_type_ids"
              :options="availableFlightTypes"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox id="new-flight-campaign-battery-hotswapping" v-model="currentFlightCampaign.battery_hotswapping">
            {{ $t("battery-hotswapping") }}
          </b-form-checkbox>
        </b-col>
      </b-row>
    </app-modal-form>

    <app-flight-campaign-routes 
      :analysis="analysis"
      :flightCampaign="selectedFlightCampaign"
    />

    <!-- <app-flight-campaign-plant-operation-actions 
      :analysis="analysis"
      :flightCampaign="selectedFlightCampaign"
    /> -->

    <app-modal-form
      id="export-modal"
      ref="exportModal"
      :title="$t('export-to-third-party')"
      :ok-title="$t('export')"
      :modalLoading="exportModalLoading"
      @submit="onExport"
    >
      <b-form-group :label="$t('select-export-target')">
        <b-form-select v-model="exportTargetId" :options="['Litchi', 'Flighthub 2']" required />
      </b-form-group>
      <b-form-group :label="$t('username')">
        <b-form-input v-model="exportUsername" :placeholder="$t('username')" required />
      </b-form-group>
      <b-form-group :label="$t('password')">
        <b-form-input v-model="exportPassword" :placeholder="$t('password')" required />
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
import { FlightCampaignItemSchema, FlightCampaignSchema } from "@/app/shared/services/volateq-api/api-schemas/flight-campaign-schema"
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import AppFlightCampaignRoutes from "./flight-campaign-route.vue";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import dateHelper from "@/app/shared/services/helper/date-helper";
import AppFlightCampaignPlantOperationActions from "./flight-campaign-plant-operation-actions.vue";
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
    AppFlightCampaignPlantOperationActions
  }
})
export default class AppAnalysisFlightCampaigns extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
  loading = false;
  allDrones: DroneSchema[] = [];
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
  exportTargetId = null;
  exportUsername = null;
  exportPassword = null;
  
  currentFlightCampaign: FlightCampaignSchema = {
      id: "",
      name: "",
      analysis_id: this.analysis.id,
      drone: {
        id: "",
        custom_name: "",
        serial_number: "",
        number_available_batteries: 0,
        retired: false,
        internal_identifier: "",
        notes: "",
        drone_model: {
          id: "",
          name: "",
          name_abbrev: "",
          vendor: "",
          flight_time: 0,
          recharge_time: 0,
          battery_swap_time: 0,
          supported: true,
        }
      },
      start_date: "",
      original_start_date: "",
      battery_hotswapping: true,
      order_product_package_ids: [],
      force_add_flight_type_ids: [],
      plant_status: [],
      is_being_generated: true
    }
  flightCampaignItems: Array<FlightCampaignItemSchema> = [];
  flightCampaignColumns: AppTableColumns = [
    { key: "name", label: this.$t("name").toString() },
    { key: "start_date", label: this.$t("start-date").toString() },
    { key: "drone", label: this.$t("drone").toString() },
    { key: "plant_status", label: this.$t("flight-types").toString() },
    // { key: "measureNotes", label: this.$t("notes").toString() },
  ];
  selectedFlightCampaign: FlightCampaignItemSchema | null = null;
  async created() {
    this.allDrones = await volateqApi.getAvailableDronesForAnalysis(this.analysis.id);
    this.droneSelection = this.allDrones.map(drone => ({
      value: drone.id.toString(),
      text: this.appendDroneNameAndModelName(drone)
    }));
    this.updateFlightCampaigns();
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
  @CatchError("flightCampaignModalLoading")
  onCreateFlightCampaignClick() {
    this.currentFlightCampaign = {
      id: "",
      name: this.analysis.name + " " + this.$t("flight-campaign") + " " + (this.flightCampaignItems.length + 1).toString(),
      analysis_id: this.analysis.id,
      drone: this.allDrones.length == 1 ? this.allDrones[0] : {
        id: "",
        custom_name: "",
        serial_number: "",
        number_available_batteries: 0,
        retired: false,
        internal_identifier: "",
        notes: "",
        drone_model: {
          id: "",
          name: "",
          name_abbrev: "",
          vendor: "",
          flight_time: 0,
          recharge_time: 0,
          battery_swap_time: 0,
          supported: true,
        }
      },
      start_date: this.analysis.flown_at,
      original_start_date: "",
      battery_hotswapping: true,
      order_product_package_ids: this.analysis.order_product_packages.map(orderPP => orderPP.id),
      force_add_flight_type_ids: [],
      plant_status: [],
      is_being_generated: true
    }
    this.selectedDroneId = this.analysis.drone.id;
    this.flightCampaignModalTitle = this.$t("create-flight-campaign").toString();
    this.flightCampaignModalOkTitle = this.$t("create").toString();
    this.appFlightCampaignModal.show();
  }

  async onSubmitFlightCampaign() {
    const selectedDrone = this.allDrones.filter(drone => drone.id.toString() == this.selectedDroneId);
    if (selectedDrone.length != 1) {
      return
    }
    try {
      await volateqApi.createFlightCampaign({
        name: this.currentFlightCampaign.name,
        analysis_id: this.currentFlightCampaign.analysis_id,
        drone_id: selectedDrone[0].id.toString(),
        start_date: this.currentFlightCampaign.start_date,
        original_start_date: this.currentFlightCampaign.start_date,
        battery_hotswapping: this.currentFlightCampaign.battery_hotswapping,
        order_product_package_ids: this.currentFlightCampaign.order_product_package_ids,
        force_add_flight_type_ids: this.currentFlightCampaign.force_add_flight_type_ids,
      });
      this.showSuccess(this.$t("now-creating-flight-campaign", { flight_campaign: this.currentFlightCampaign!.name }).toString());
      this.appFlightCampaignModal.hide();
      this.updateFlightCampaigns();
    } catch (e) {
      this.showError(e);
    }
  }

  async updateFlightCampaigns() {
    this.flightCampaignItems = (await volateqApi.getFlightCampaignsOfAnalysis(this.analysis.id)).map((flight_campaign: FlightCampaignSchema) => ({
      id: flight_campaign.id,
      name: flight_campaign.name,
      drone: flight_campaign.drone,
      start_date: dateHelper.toDate(flight_campaign.start_date),
      original_start_date: dateHelper.toDate(flight_campaign.original_start_date),
      plant_status: flight_campaign.plant_status,
      is_being_generated: flight_campaign.is_being_generated
    })).sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      const dateA = a.start_date;
      const dateB = b.start_date;
      // first sort by date
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      // then sort by name
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  onFlightCampaignSelected(flightCampaignItems: FlightCampaignItemSchema[]) {
    if (flightCampaignItems.length > 0) {
      if (flightCampaignItems[0].is_being_generated) {
        alert(this.$t('flight-campaign-being-generated'))
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
  private appendDroneNameAndModelName(drone: DroneSchema) {
    return drone.custom_name + " (" + drone.drone_model.name_abbrev + ")"
  }

  async onExportClick(refMeasureItem: any) {

    // get export options, e.g. Litchi and Flighthub2

    // show modal with export options
    this.exportModal.show();
  }

  async onExport() {
    this.showError('Not yet implemented')
  }
}
</script>

<style lang="scss">
</style>