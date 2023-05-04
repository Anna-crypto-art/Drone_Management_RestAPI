<template>
  <div v-show="flightCampaign">
    <app-table-container>
      <app-table
        :rows="flightRouteItems"
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
            {{ row.item.plant_status.name }}
          </span>
          <app-explanation>{{ row.item.plant_status.description }}</app-explanation>
        </template>
        <template #cell(duration)="row">
          {{ $t("number-with-minutes", {number: row.item.duration}) }}
        </template>

        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin"
            @click="onDownloadJsonClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('download-json')"
            icon="download"
          />
        </template>
      </app-table>
    </app-table-container>
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
  flightRouteItems: Array<any> = [];
  flightRouteColumns: AppTableColumns = [
    { key: "start_time", label: this.$t("start-time").toString() },
    { key: "drone", label: this.$t("drone").toString() },
    { key: "plant_area", label: this.$t("plant-area").toString() },
    { key: "plant_status", label: this.$t("plant-status").toString() },
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

  @CatchError("loading")
  private async updateFlightRoutes() {
    if (!this.flightCampaign) {
      this.flightRouteItems = [];
      return;
    }
    this.flightRouteItems = (await volateqApi.getFlightRoutesOfFlightCampaign(this.flightCampaign.id)).map(flight_route => ({
      id: flight_route.id,
      start_time: dateHelper.toDateTime(flight_route.start_time),
      drone: flight_route.drone,
      plant_area: flight_route.plant_area,
      plant_status: flight_route.plant_status,
      duration: flight_route.duration,
    })).sort((a, b) => {
      const timeA = a.start_time;
      const timeB = b.start_time;
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
  }

  private appendDroneNameAndModelName(drone: DroneSchema) {
    return drone.custom_name + " (" + drone.drone_model.name_abbrev + ")"
  }
}
</script>

<style lang="scss">
</style>