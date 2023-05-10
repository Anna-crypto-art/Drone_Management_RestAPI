<template>
  <div v-show="flightCampaign">
    <app-table-container>
      <app-table
        :rows="flightRouteItems"
        :columns="flightRouteColumns"
        :loading="loading"
        :hoverActions="true"
      >
        <template #cell(timestamp)="row">
          {{ row.item.timestamp }}
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
  name: "app-flight-campaign-plant-operation-actions",
  components: {
    AppTableContainer,
    AppTable,
    AppButton,
    AppExplanation
  }
})
export default class AppFlightCampaignPlantOperationActions extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
  @Prop({ default: null }) flightCampaign!: FlightCampaignItemSchema | null;
  loading = false;
  flightRouteItems: Array<any> = [];
  flightRouteColumns: AppTableColumns = [
    { key: "timestamp", label: this.$t("time").toString() },
    { key: "action_text", label: this.$t("action").toString() },
  ];
  async created() {
    await this.updateFlightRoutes();
  }

  @Watch('flightCampaign')
  async onFlightCampaignChanged() {
    await this.updateFlightRoutes();
  }

  @CatchError("loading")
  private async updateFlightRoutes() {
    if (!this.flightCampaign) {
      this.flightRouteItems = [];
      return;
    }
    this.flightRouteItems = (await volateqApi.getPlantActionsOfFlightCampaign(this.flightCampaign.id)).map(plant_action => ({
      id: plant_action.id,
      timestamp: dateHelper.toDateTime(plant_action.timestamp, true),
      action_text: plant_action.action_text,
    })).sort((a, b) => {
      const timeA = a.timestamp;
      const timeB = b.timestamp;
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
  }
}
</script>

<style lang="scss">
</style>