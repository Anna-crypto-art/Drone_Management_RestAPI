<template>
  <div v-show="flightCampaign">
    <div v-for="(flightDay, index) in flightDays" :key="index">
      <h3 class="flight-campaign-route-table-header">
        {{ $t('day-with-number', {number: index+1}) }}
      </h3>
      <app-table-container>
        <app-table
          :rows="flightDay"
          :columns="flightRouteColumns"
          :loading="loading"
          :hoverActions="true"
        >
          <template #cell(start_time)="row">
            {{ row.item.start_time }}
          </template>
          <template #cell(drone)="row">
            {{ appendDroneNameAndModelName(row.item.drone) }}
          </template>
          <template #cell(plant_status)="row">
            <span>
              {{ row.item.plant_status ? row.item.plant_status.name : '' }}
            </span>
            <app-explanation v-if="row.item.plant_status">{{ row.item.plant_status.description }}</app-explanation>
          </template>
          <template #cell(action)="row">
            {{ row.item.action ? row.item.action : '' }}
          </template>
          <template #cell(duration)="row">
            {{ row.item.duration ? $t("number-with-minutes", {number: row.item.duration}) : '' }}
          </template>

          <template #hoverActions="row">
            <app-button
              v-show="row.item.drone"
              @click="onDownloadJsonClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('download-json')"
              icon="download"
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import dateHelper from "@/app/shared/services/helper/date-helper";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { FlightCampaignItemSchema } from "@/app/shared/services/volateq-api/api-schemas/flight-campaign-schema";
import { FlightRouteItemSchema } from "./types";
@Component({
  name: "app-flight-campaign-routes",
  components: {
    AppTableContainer,
    AppTable,
    AppButton,
    AppExplanation
  }
})
export default class AppFlightCampaignRoutes extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
  @Prop({ default: null }) flightCampaign!: FlightCampaignItemSchema | null;
  loading = false;
  flightRouteItems: Array<FlightRouteItemSchema> = [];
  flightDays: FlightRouteItemSchema[][] = [];

  flightRouteColumns: AppTableColumns = [
    { key: "start_time", label: this.$t("start-time").toString() },
    { key: "plant_area", label: this.$t("plant-area").toString() },
    { key: "plant_status", label: this.$t("plant-status").toString() },
    { key: "action", label: this.$t("action").toString() },
    // { key: "drone", label: this.$t("drone").toString() }, // not needed yet as we only support 1 drone per flight campaign for now
    { key: "duration", label: this.$t("duration").toString() },
  ];

  async created() {
    await this.updateFlightRoutes();
  }

  @Watch('flightCampaign')
  async onFlightCampaignChanged() {
    await this.updateFlightRoutes();
  }

  @CatchError()
  async onDownloadJsonClick(flightRouteItem: any) {
    if (this.flightCampaign) {
      const flightRouteJsonContent = await volateqApi.downloadFlightRouteJson(flightRouteItem.id);
      let download_file_name = this.flightCampaign.name + "_" + flightRouteItem.plant_area + "_" + flightRouteItem.start_time.toString() + "_" + flightRouteItem.plant_status.name + ".json";
      download_file_name = download_file_name.replace(/ /g,"_");
      
      const blob = new Blob([JSON.stringify(flightRouteJsonContent)], {type: 'text/json'});
      const event = new MouseEvent("click", {"bubbles": true, "cancelable": false});
      const a = document.createElement('a');
      a.download = download_file_name;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      a.dispatchEvent(event);
    }
  }

  @CatchError()
  async onDeleteClick(flightRouteItem: any) {
    if (this.flightCampaign) {
      if (flightRouteItem.drone) {
        if (!confirm(this.$t("flight-route-delete-are-you-sure").toString())) {
          return;
        }
        volateqApi.deleteFlightRoute(this.flightCampaign.id, flightRouteItem.id);
        this.showSuccess(this.$t("flight-route-delete-success").toString())
      }
      else {
        if (!confirm(this.$t("plant-action-delete-are-you-sure").toString())) {
          return;
        }
        volateqApi.deletePlantOperationAction(this.flightCampaign.id, flightRouteItem.id);
        this.showSuccess(this.$t("plant-action-delete-success").toString())
      }

      await this.updateFlightRoutes();
    }
  }

  @CatchError("loading")
  private async updateFlightRoutes() {
    if (!this.flightCampaign) {
      this.flightRouteItems = [];
      return;
    }

    let plantActions: Array<FlightRouteItemSchema> = (await volateqApi.getPlantActionsOfFlightCampaign(this.flightCampaign.id)).map(plant_action => ({
          id: plant_action.id,
          start_time: dateHelper.toDateTime(plant_action.timestamp, true),
          drone: null,
          plant_area: null,
          plant_status: null,
          duration: null,
          action: plant_action.action_text
    }));

    let flightRouteItems: Array<FlightRouteItemSchema> = (await volateqApi.getFlightRoutesOfFlightCampaign(this.flightCampaign.id)).map(flight_route => ({
      id: flight_route.id,
      start_time: dateHelper.toDateTime(flight_route.start_time, true),
      drone: flight_route.drone,
      plant_area: flight_route.plant_area,
      plant_status: flight_route.plant_status,
      duration: flight_route.duration,
      action: 'Fly drone'
    }));
    flightRouteItems = [...plantActions, ...flightRouteItems];
    this.flightRouteItems = flightRouteItems.sort((a, b) => {
      const timeA = a.start_time!;
      const timeB = b.start_time!;
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });

    // split into 1 table per day
    let flightDays: FlightRouteItemSchema[][] = [];
    let currentDayIdx = 0;
    let currentDate = new Date(this.flightRouteItems[0].start_time!).getDay();
    let currentFlightDay: FlightRouteItemSchema[] = [];

    for (let i = 0; i < this.flightRouteItems.length; i++) {
      let this_time = this.flightRouteItems[i].start_time!;
      let time_diff = new Date(this_time).getDay() - currentDate;
      if (time_diff && time_diff != 0) {
        currentDayIdx = currentDayIdx + 1;
        currentDate = new Date(this_time).getDay();
        flightDays.push(currentFlightDay)
        currentFlightDay = [];
        currentFlightDay.push(this.flightRouteItems[i]);
      } else {
        currentFlightDay.push(this.flightRouteItems[i]);
      }
      if (i == this.flightRouteItems.length - 1) {
        flightDays.push(currentFlightDay);
      }
    }
    this.flightDays = flightDays;
  }

  private appendDroneNameAndModelName(drone: DroneSchema) {
    if (drone == undefined) {
      return ''
    }
    return drone.custom_name + " (" + drone.drone_model.name_abbrev + ")"
  }
}
</script>

<style lang="scss">
.flight-campaign-route-table-header {
  margin-top: 20px !important;
}
</style>