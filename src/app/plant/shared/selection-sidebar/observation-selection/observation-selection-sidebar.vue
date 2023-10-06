<template>
  <div class="app-observation-selection-sidebar" :class="{ absolute: absolute }">
    <app-sidebar :open="sidebarOpen" >
      <div class="app-observation-selection-sidebar-leftside">
        <h4 class="app-observation-selection-sidebar-leftside-title">
          {{ "Observations" }}
          <!-- {{ $t("Observations") }} -->
        </h4>
        <div class="app-observation-selection-sidebar">
          <div class="app-observation-selection-sidebar-filter">
            <b-form @submit.prevent="onSubmitFilter">
              <b-form-select v-model="selected" @change="onTimeRangeChanged(selected)">
                <b-form-select-option :value="null">select time range for Observations</b-form-select-option>
                <b-form-select-option value="past7Days">Last 7 Days</b-form-select-option>
                <b-form-select-option value="past30Days">Last 30 Days</b-form-select-option>
                <b-form-select-option value="past90Days">Last 90 Days</b-form-select-option>
                <b-form-select-option value="pastYear">Last Year</b-form-select-option>
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
      </div>
    </app-sidebar>
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
import AppSidebar from "@/app/shared/components/app-sidebar/app-sidebar.vue";
import { State } from "vuex-class";

@Component({
  name: "app-observation-selection-sidebar",
  components: {
    AppTableContainer,
    AppExplanation,
    AppIcon,
    AppTable,
    AppButton,
    AppDatepicker,
    AppBadge,
    AppSidebar,
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

  selected = "null";
  selectedTimeRange = "";

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

  async onTimeRangeChanged(selected: string) {
    this.selectedTimeRange = selected;

    const dFrom = new Date();

    switch (this.selectedTimeRange) {
      case "past7Days":
        dFrom.setDate(dFrom.getDate() - 7);
        break;
      case "past30Days":
        dFrom.setDate(dFrom.getDate() - 30);
        break;
      case "past90Days":
        dFrom.setDate(dFrom.getDate() - 90);
        break;
      case "pastYear":
        dFrom.setDate(dFrom.getDate() - 365);
    }

    this.fromDate = dateHelper.toDate(dFrom);
      await this.updateSummerizedObservations();
  }

  onSidebarToggled(sidebarType: string): void {
    if (sidebarType === "observations") {
      this.$store.direct.commit.sidebar.toggle({ name: "observations" });
    }
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
  height: calc(100vh - #{$header-height});
  
  &.absolute {
    position: absolute;
  }

  &-leftside {
    padding: 0.5em;
    height: 100%;
    width: 100%;
    border-right: $border-color-grey 1px solid;
    display: flex;
    flex-flow: column;

    &-title {
      margin-bottom: 0.5em;
      margin-left: 10px;
    }
  }

  .app-table-container {
    margin-top: 0;
  }

  &-filter {
    margin-bottom: 15px;
  }
}
  
// Fix sidebar overlays toaster
.b-popover {
  z-index: 1101;
}

</style>
