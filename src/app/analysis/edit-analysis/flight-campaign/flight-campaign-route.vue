<template>
  <div v-show="flightCampaign">
    <div class="flight-campaign-print-headline mb-5">
      <h2>
        {{ flightCampaign.name }}
      </h2>
      <p>
        {{ this.$t('date') + ": " + flightCampaign.start_date }}
      </p>
      <p>
        {{ this.$t('drone') + ": " + appendDroneNameAndSerialNumber(flightCampaign.drone) }}
      </p>
    </div>
    <div v-for="(flightRoutesDay, index) in flightRoutesDays" :key="index">
      <h3 class="flight-campaign-route-table-header">
        {{ $t('day-with-number', {number: index+1}) }}, {{ getWeekDay(flightRoutesDay.date) }}
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
            {{ appendDroneNameAndSerialNumber(row.item.drone) }}
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
            <app-dropdown-button variant="secondary" size="sm" v-if="row.item.drone" class="d-none show-when-not-printing">
              <template #title>
                <app-icon icon="download" />
              </template>
              <b-dropdown-item-button @click="onDownloadJsonClick(row.item)">
                {{ $t('download-json') }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="onDownloadWPMZClick(row.item)" :disabled="!isDJIWPMZDownloadAllowed(row.item)">
                {{ $t('download-wpml-file') }}
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="onDownloadUnleashClick(row.item)" v-if="isSuperAdmin">
                {{ $t('download-unleash-route') }}
              </b-dropdown-item-button>
            </app-dropdown-button>

            <app-button
              v-show="isSuperAdmin"
              @click="onDeleteClick(row.item)"
              variant="outline-danger"
              size="sm"
              icon="trash"
              :title="$t('delete')"
              class="d-none show-when-not-printing"
            />
          </template>
        </app-table>
      </app-table-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
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
    AppExplanation,
    AppDropdownButton,
    AppIcon,
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
    { key: "duration", label: this.$t("duration").toString(), labelExpl: this.$t("flight-route-duration_expl").toString() },
  ];

  async created() {
    await this.updateFlightRoutes();
  }

  @Watch('flightCampaign')
  async onFlightCampaignChanged() {
    await this.updateFlightRoutes();
  }

  @CatchError()
  async onDownloadJsonClick(flightRoute: FlightRoute) {
    if (this.flightCampaign) {
      const downloadUrl = await volateqApi.generateDownloadUrl(volateqApi.getFlightRouteJsonUrl(flightRoute.id));
      
      AppDownloader.download(downloadUrl)
    }
  }

  @CatchError()
  async onDownloadWPMZClick(flightRoute: FlightRoute) {
    if (this.flightCampaign) {
      const downloadUrl = await volateqApi.generateDownloadUrl(volateqApi.getFlightRouteDjiWpmlUrl(flightRoute.id));
      
      AppDownloader.download(downloadUrl)
    }
  }

  @CatchError()
  async onDownloadUnleashClick(flightRoute: FlightRoute) {
    if (this.flightCampaign) {
      const downloadUrl = await volateqApi.generateDownloadUrl(volateqApi.getFlightRouteUnleashUrl(flightRoute.id));
      
      AppDownloader.download(downloadUrl)
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

  appendDroneNameAndSerialNumber(drone: DroneSchema) {
    if (drone == undefined) {
      return ''
    }
    return this.$t("drone-with-sn", {droneName: drone.custom_name, droneSerialNumber: drone.serial_number}).toString();
  }

  getWeekday(date: string) {
    return dateHelper.getWeekDay(date);
  }

  isDJIWPMZDownloadAllowed(flightRoute: FlightRoute) {
    return flightRoute.drone?.drone_model.name_abbrev === "M3T";
  }
}
</script>

<style lang="scss">
.flight-campaign-route-table-header {
  margin-top: 20px !important;
}

// printing discards all CSS so we need to do some display stuff to
// - hide the hover buttons
// - show an intro/headline text
// when printing.
.show-when-not-printing:not(button) {
  display: inline-flex !important;
}
button.show-when-not-printing {
  display: inline-block !important;
}
.flight-campaign-print-headline {
  margin-bottom: 40px;
  display: none;
}

</style>
