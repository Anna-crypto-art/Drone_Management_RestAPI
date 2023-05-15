<template>
  <div v-show="flightCampaign">
    <div v-for="(flightRoutesDay, index) in flightRoutesDays" :key="index">
      <h3 class="flight-campaign-route-table-header">
        {{ $t('day-with-number', {number: index+1}) }}
      </h3>
      <app-table-container>
        <app-table
          :rows="flightRoutesDay.flightRoutesActions"
          :columns="flightRouteColumns"
          :loading="loading"
          :hoverActions="true"
        >
          <template #cell(startTime)="row">
            {{ row.item.startTime }}
          </template>
          <template #cell(drone)="row">
            {{ appendDroneNameAndModelName(row.item.drone) }}
          </template>
          <template #cell(plantStatus)="row">
            <span>
              {{ row.item.plantStatus ? row.item.plantStatus.name : '' }}
            </span>
            <app-explanation v-if="row.item.plantStatus">{{ row.item.plantStatus.description }}</app-explanation>
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
import { FlightRoute, FlightRoutesActionDay, PlantAction } from "./types";
import { sortBy } from "@/app/shared/services/helper/sort-helper";
import { AppDownloader } from "@/app/shared/services/app-downloader/app-downloader";


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
  
  flightRoutesDays: FlightRoutesActionDay[] = [];

  flightRouteColumns: AppTableColumns = [
    { key: "startTime", label: this.$t("start-time").toString() },
    { key: "plantArea", label: this.$t("plant-area").toString() },
    { key: "plantStatus", label: this.$t("plant-status").toString() },
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
      const downloadUrl = await volateqApi.generateDownloadUrl(volateqApi.getFlightRouteJsonUrl(flightRouteItem.id));

      console.log("downloadUrl: ")
      console.log(downloadUrl)
      
      AppDownloader.download(downloadUrl, 'blub.json')
    }
  }

  @CatchError()
  async onDeleteClick(flightRouteItem: any) {
    if (this.flightCampaign) {
      if (flightRouteItem.drone) {
        if (!confirm(this.$t("flight-route-delete-are-you-sure").toString())) {
          return;
        }
        volateqApi.deleteFlightRoute(flightRouteItem.id);
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
      return;
    }

    const plantActions: PlantAction[] = (await volateqApi.getPlantActionsOfFlightCampaign(this.flightCampaign.id))
      .map(action => ({
        id: action.id,
        startTime: dateHelper.toDateTime(action.timestamp, true),
        action: action.action_text
      }));

    const flightRoutes: FlightRoute[] = (await volateqApi.getFlightRoutesOfFlightCampaign(this.flightCampaign.id))
      .map(flight_route => ({
        id: flight_route.id,
        startTime: dateHelper.toDateTime(flight_route.start_time, true),
        drone: flight_route.drone,
        plantArea: flight_route.plant_area,
        plantStatus: flight_route.plant_status,
        duration: flight_route.duration,
        action: this.$t('fly-drone-action').toString(),
      }));

    const flightRouteActions: PlantAction[] = sortBy([...plantActions, ...flightRoutes], e => e.startTime);

    const flightRoutesActionDays: FlightRoutesActionDay[] = [];
    
    // split into 1 table per day
    let yesterday: string | null = null;
    for (const flightRouteAction of flightRouteActions) {
      const today = flightRouteAction.startTime.substring(0, 10);

      if (!yesterday || yesterday !== today) {
        flightRoutesActionDays.push({
          date: today,
          flightRoutesActions: [],
        });
      }

      const lastFlightRoutesActionDay = flightRoutesActionDays[flightRoutesActionDays.length - 1];
      lastFlightRoutesActionDay.flightRoutesActions.push(flightRouteAction);

      yesterday = today
    }

    this.flightRoutesDays = flightRoutesActionDays;
  }

  appendDroneNameAndModelName(drone: DroneSchema) {
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