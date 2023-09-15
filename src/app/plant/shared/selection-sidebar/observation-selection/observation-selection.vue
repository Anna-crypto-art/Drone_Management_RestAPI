<template>
  <div class="app-observation-selection">
    <div class="app-observation-selection-filter">
      <b-form @submit.prevent="onSubmitFilter">
        <b-form-group :label="$t('from')" label-cols-sm="4" label-cols-lg="2">
          <app-datepicker v-model="fromDate" required /> 
        </b-form-group>
        <b-form-group :label="$t('to')" label-cols-sm="4" label-cols-lg="2">
          <app-datepicker v-model="toDate" required /> 
        </b-form-group>
        <app-button type="submit" cls="width-100pc">{{ $t('apply') }}</app-button>
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

@Component({
  name: "app-observation-selection",
  components: {
    AppTableContainer,
    AppExplanation,
    AppIcon,
    AppTable,
    AppButton,
    AppDatepicker,
    AppBadge,
  },
})
export default class AppObservationSelection extends BaseAuthComponent {
  @Prop() plant!: PlantSchema;
  @Ref() observTable!: IAppSelectTable;

  observTableColumns: AppTableColumns = [
    { key: "name", label: this.$t("observations").toString() },
  ];
  observTableItems: Record<string, SummerizedObservations>[] = [];

  fromDate = "";
  toDate = "";

  loading = false;

  ccpService!: CcpService;

  @CatchError("loading")
  async created() {
    this.toDate = dateHelper.toDate(dateHelper.now());
    
    const dFrom = new Date();
    dFrom.setDate(dFrom.getDate() - 7);
    this.fromDate = dateHelper.toDate(dFrom);

    this.ccpService = CcpService.get(this.plant.id);

    await this.updateSummerizedObservations();
  }

  @CatchError("loading")
  async onSubmitFilter() {
    await this.updateSummerizedObservations();
  }

  @CatchError("loading")
  async onObservSelected() {
    // TODO
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

.app-observation-selection {
  .app-table-container {
    margin-top: 0;
  }

  &-filter {
    margin-bottom: 15px;
  }
}

</style>
