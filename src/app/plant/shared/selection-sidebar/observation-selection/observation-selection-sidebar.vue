<template>
  <div class="app-observation-selection-sidebar" :class="{ open: sidebarOpen }">
    <div class="grayed title">
      <app-icon-observations /><span class="title">{{ $t("observations") }}</span>
    </div>
    <div class="app-observation-selection-sidebar-filter">
      <b-form @submit.prevent="onSubmitFilter">
        <b-form-select v-model="selectedTimeRange" :options="timeRangeOptions" @change="onTimeRangeChanged()">
        </b-form-select>
      </b-form>
    </div>
    <app-table-container>
      <app-table
        ref="observTable"
        :rows="observTableItems"
        :columns="observTableColumns"
        selectMode="single"
        @rowSelected="onObservSelected"
        :overlayLoading="loading"
        :hideHeader="true"
      >
        <template #cell(name)="row">
          {{ row.item.name.date }}
          <app-icon 
            icon="app-indicator"
            class="mar-left-half"
            v-b-popover.hover.top="getComponentNames(row.item.name)"
          />
          <app-icon 
            icon="people-fill"
            class="mar-left-half" 
            v-b-popover.hover.top="row.item.name.user_names.join(', ')"
          /><br>
          <small class="grayed">{{ $t("count") }}: {{ row.item.name.count }}</small>
          <div v-if="row.item.name.ccps.length > 0" class="mar-top">
            <app-badge v-for="ccp in row.item.name.ccps" :key="ccp.ccp_id" :color="getCcpColor(ccp.ccp_id)">
              {{ getCcpName(ccp.ccp_id) }}
            </app-badge>
          </div>
        </template>
      </app-table>
    </app-table-container>
  </div>
</template>

<script lang="ts">
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Ref } from "vue-property-decorator";
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns, IAppSelectTable } from "@/app/shared/components/app-table/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";
import dateHelper from "@/app/shared/services/helper/date-helper";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { SummerizedObservations } from "@/app/shared/services/volateq-api/api-schemas/observation-schema";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import AppBadge from "@/app/shared/components/app-badge/app-badge.vue";
import { CcpService } from "../../plant-settings/ccp-service";
import { CCPDataType } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { ObservationSelectionEvent, ObservRowItem } from "./types";
import { observationSelectEventService } from "./observation-selection-event-service";
import { State } from "vuex-class";
import AppIconObservations from "@/app/shared/components/app-icon/app-icon-observations.vue";

@Component({
  name: "app-observation-selection-sidebar",
  components: {
    AppTableContainer,
    AppIconObservations,
    AppExplanation,
    AppIcon,
    AppTable,
    AppButton,
    AppDatepicker,
    AppBadge,
  },
})
export default class AppObservationSelectionSidebar extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Ref() observTable!: IAppSelectTable;
  @State(state => state.sidebar["observations"]) sidebarOpen!: boolean;
  

  observTableColumns: AppTableColumns = [
    { key: "name", label: this.$t("observations").toString() },
  ];
  observTableItems: ObservRowItem[] = [];

  fromDate = "";
  toDate = "";

  loading = false;

  absolute = true;

  ccpService!: CcpService;

  timeRangeOptions: { value: number, text: string }[] = [
    { value: 7, text: this.$t("last-7-days").toString() },
    { value: 30, text: this.$t("last-30-days").toString() },
    { value: 90, text: this.$t("last-90-days").toString() },
    { value: 365, text: this.$t("last-year").toString() },
  ];

  selectedTimeRange = 7;

  @CatchError("loading")
  async created() {
    observationSelectEventService.on(this.plant.id, ObservationSelectionEvent.SIDEBAR_ABSOLUTE, async (absolute) => {
      this.absolute = absolute;
    });

    // vue does not react to the preset sidebar state for a reason, so we switch the state here for reactivity
    this.$store.direct.commit.sidebar.set({ name: "observations", state: true });
    await this.$nextTick();
    this.$store.direct.commit.sidebar.set({ name: "observations", state: false });

    this.toDate = dateHelper.toDate(dateHelper.now());

    this.ccpService = CcpService.get(this.plant.id);
  }

  @CatchError("loading")
  async onTimeRangeChanged() {
    const dFrom = new Date();
    dFrom.setDate(dFrom.getDate() - this.selectedTimeRange);
    this.fromDate = dateHelper.toDate(dFrom);
    await this.updateSummerizedObservations();
  }

  @CatchError("loading")
  async onSubmitFilter() {
    await this.updateSummerizedObservations();
  }

  @CatchError("loading")
  async onObservSelected(selectedItems: ObservRowItem[]) {
    if (selectedItems.length > 0) {
      await observationSelectEventService.emit(this.plant.id, ObservationSelectionEvent.SELECTED, selectedItems[0].name);
    }
  }

  getComponentNames(summerizedObservations: SummerizedObservations): string {
    return summerizedObservations.components
      .map(c => this.$t(apiComponentNames[c.component_id]).toString() + " (" + c.count + ")")
      .join(", ")
  }

  getCcpColor(ccpId: string): string {
    const ccp = this.ccpService!.getCcp(ccpId)!;
    let color = ccp.color;
    if (!color && ccp.data_type_value_range?.infos) {
      if (ccp.data_type === CCPDataType.VALUE_LIST) {
        color = ccp.data_type_value_range.infos[Object.keys(ccp.data_type_value_range.infos)[0]].color;
      } else if (ccp.data_type === CCPDataType.NUMBER_RANGE) {
        color = ccp.data_type_value_range.infos[0].info.color;
      }
    }

    if (!color) {
      color = CcpService.defaultColor;
    }

    return color;
  }

  getCcpName(ccpId: string): string {
    return this.ccpService!.getCcp(ccpId)!.name; 
  }

  private async updateSummerizedObservations() {
    this.ccpService.getCcps(); // make sure ccps are available

    const summerizedDates = await volateqApi.getSummerizedOberservations(this.plant.id, { from: this.fromDate, to: this.toDate });

    this.observTableItems = summerizedDates.observations.map(o => ({ name: o }));
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-observation-selection-sidebar {
  height: 100%;
  width: 100%;
  position: absolute;
  border-right: 1px solid $border-color-grey;
  margin-left: calc($sidebar-width * -1);
  transition: all 0.3s ease-in-out;

  &.open {
    margin-left: 0;
    display: block;
    // z-index: 9;
  }

  &-filter {
    margin: 8px;
  }

  .title {
    margin: 10px;
    
    .app-icon-observations {
      // margin-right: 5px;
      font-size: 120%;
    }
  }

  .app-table-container {
    margin-top: 0;
  }

  &-filter {
    margin-bottom: 15px;
  }
}

</style>
