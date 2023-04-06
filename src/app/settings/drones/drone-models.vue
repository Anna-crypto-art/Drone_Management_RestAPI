<template>
  <div class="app-settings-drone-models">
    <div class="app-settings-drone-models-table-toolbar">
      <app-button variant="primary" @click="onCreateDroneModelClick">
        {{ $t("create-drone-model") }}
      </app-button>
    </div>
    <app-table-container>
      <app-table :columns="droneModelColumns" :rows="droneModelRows" :loading="loading" :hoverActions="true">
        <template #cell(vendor)="row">
          <span :class='!row.item.supported ? "grayed" : ""'>
            {{ row.item.vendor }}
          </span>
        </template>
        <template #cell(name)="row">
          <span class="drone-model-table-name" :class='!row.item.supported ? "grayed" : ""'>
            {{ row.item.name_abbrev }} (<span class="grayed">{{ row.item.name }}</span>)
          </span>
        </template>
        <template #cell(flight_time)="row">
          <span :class='!row.item.supported ? "grayed" : ""'>
            {{ $t("number-with-minutes", {number: row.item.flight_time}) }}
          </span>
        </template>
        <template #cell(recharge_time)="row">
          <span :class='!row.item.supported ? "grayed" : ""'>
            {{ $t("number-with-minutes", {number: row.item.recharge_time}) }}
          </span>
        </template>
        <template #cell(battery_swap_time)="row">
          <span :class='!row.item.supported ? "grayed" : ""'>
            {{ $t("number-with-minutes", {number: row.item.battery_swap_time}) }}
          </span>
        </template>
        <template #hoverActions="row">
          <app-button
            @click="onEditDroneModelClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-something', { something: row.item.name })"
            icon="wrench"
          />
          <app-button
            @click="onDeleteDroneModelClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-something', { something: row.item.name })"
            icon="trash"
          />
        </template>
      </app-table>
    </app-table-container>
    <app-modal-form
      id="drone-model-modal"
      ref="appDroneModelModal"
      :title="droneModelModalTitle"
      :ok-title="droneModelModalOkTitle"
      :modalLoading="droneModelModalLoading"
      @submit="onSubmitDroneModel"
    >
      <b-row v-if="currentDroneModel">
        <b-col>
          <b-form-group :label="$t('vendor')">
            <b-form-input
              id="new-drone-model-vendor"
              v-model="currentDroneModel.vendor"
              required
              type="text"
              :placeholder="$t('vendor')" />
          </b-form-group>
          <b-form-group :label="$t('model-name')">
            <b-form-input
              id="new-drone-model-name"
              v-model="currentDroneModel.name"
              required
              type="text"
              :placeholder="$t('model-name')" />
          </b-form-group>
          <b-form-group :label="$t('name-abbrev')">
            <b-form-input
              id="new-drone-model-name-abbrev"
              v-model="currentDroneModel.name_abbrev"
              required
              type="text"
              :placeholder="$t('name-abbrev')" />
          </b-form-group>
          
          <b-row>
            <b-col>
              <b-form-group :label="$t('flight-time')">
                <b-form-input
                  id="new-drone-model-flight-time"
                  v-model="currentDroneModel.flight_time"
                  required
                  type="number"
                  :placeholder="$t('flight-time')" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="$t('recharge-time')">
                <b-form-input
                  id="new-drone-model-recharge-time"
                  v-model="currentDroneModel.recharge_time"
                  required
                  type="number"
                  :placeholder="$t('recharge-time')" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group :label="$t('battery-swap-time')">
                <b-form-input
                  id="new-drone-model-battery-swap-time"
                  v-model="currentDroneModel.battery_swap_time"
                  required
                  type="number"
                  :placeholder="$t('battery-swap-time')" />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-checkbox id="new-drone-model-supported" v-model="currentDroneModel.supported">
            {{ $t("supported") }}
          </b-form-checkbox>
        </b-col>
      </b-row>      
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { DroneModelSchemaItem } from "./types";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { DroneModelSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";


@Component({
  name: "app-settings-drone-models",
  components: {
    AppTableContainer,
    AppModalForm,
    AppTable,
    AppButton,
    AppMultiselect,
  },
})
export default class AppSettingsDroneModels extends BaseAuthComponent {
  droneModelColumns: AppTableColumns = [];
  droneModelRows: DroneModelSchemaItem[] = [];

  loading = false;

  @Ref() appDroneModelModal!: IAppModalForm;
  droneModelModalLoading = false;
  droneModelModalTitle = "";
  droneModelModalOkTitle = "";
  
  currentDroneModel: DroneModelSchema = {
    id: "",
    name: "",
    name_abbrev: "",
    vendor: "",
    flight_time: 0,
    recharge_time: 0,
    battery_swap_time: 0,
    supported: false,
  }

  @CatchError("loading")
  async created() {
    this.droneModelColumns = [
      { key: "vendor", label: this.$t("vendor").toString() },
      { key: "name", label: this.$t("name").toString() },
      { key: "flight_time", label: this.$t("flight-time").toString() },
      { key: "recharge_time", label: this.$t("recharge-time").toString() },
      { key: "battery_swap_time", label: this.$t("battery-swap-time").toString() },
    ];

    await this.updateDroneModelRows();
  }

  async updateDroneModelRows() {
    this.droneModelRows = (await volateqApi.getDroneModels()).map((drone_model: DroneModelSchema) => ({
      id: drone_model.id,
      name: drone_model.name,
      name_abbrev: drone_model.name_abbrev,
      vendor: drone_model.vendor,
      flight_time: drone_model.flight_time,
      recharge_time: drone_model.recharge_time,
      battery_swap_time: drone_model.battery_swap_time,
      supported: drone_model.supported
    })).sort((a, b) => {
      const vendorA = a.vendor;
      const vendorB = b.vendor;

      const nameA = a.name;
      const nameB = b.name;

      // first sort by vendor
      if (vendorA < vendorB) {
        return -1;
      }
      if (vendorA > vendorB) {
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

  @CatchError()
  onCreateDroneModelClick() {
    this.currentDroneModel = {
      id: "",
      name: "",
      name_abbrev: "",
      vendor: "",
      flight_time: 0,
      recharge_time: 0,
      battery_swap_time: 0,
      supported: false,
    }

    this.droneModelModalTitle = this.$t("create-drone-model").toString();
    this.droneModelModalOkTitle = this.$t("create").toString();

    this.appDroneModelModal.show();
  }

  @CatchError("droneModelModalLoading")
  async onSubmitDroneModel() {
    if (!this.currentDroneModel.id) {
      await volateqApi.createDroneModel({
        name: this.currentDroneModel.name,
        name_abbrev: this.currentDroneModel.name_abbrev,
        vendor: this.currentDroneModel.vendor,
        flight_time: this.currentDroneModel.flight_time,
        recharge_time: this.currentDroneModel.recharge_time,
        battery_swap_time: this.currentDroneModel.battery_swap_time,
        supported: this.currentDroneModel.supported
      });
      this.showSuccess(this.$t("something-created-success", { something: this.currentDroneModel!.name }).toString());
    } else {
      await volateqApi.updateDroneModel(
        this.currentDroneModel.id,
        {
          name: this.currentDroneModel.name,
          name_abbrev: this.currentDroneModel.name_abbrev,
          vendor: this.currentDroneModel.vendor,
          flight_time: this.currentDroneModel.flight_time,
          recharge_time: this.currentDroneModel.recharge_time,
          battery_swap_time: this.currentDroneModel.battery_swap_time,
          supported: this.currentDroneModel.supported
        }
      );
      this.showSuccess(this.$t("something-edited-successfully", { something: this.currentDroneModel!.name }).toString());
    }
    
    this.appDroneModelModal.hide();

    await this.updateDroneModelRows();
  }

  @CatchError()
  async onEditDroneModelClick(droneModelItem: DroneModelSchemaItem) {
    this.currentDroneModel = {
      id: droneModelItem.id,
      name: droneModelItem.name,
      name_abbrev: droneModelItem.name_abbrev,
      vendor: droneModelItem.vendor,
      flight_time: droneModelItem.flight_time,
      recharge_time: droneModelItem.recharge_time,
      battery_swap_time: droneModelItem.battery_swap_time,
      supported: droneModelItem.supported
    };

    this.droneModelModalTitle = this.$t("update-something", { something: this.currentDroneModel.name }).toString();
    this.droneModelModalOkTitle = this.$t('apply').toString();

    this.appDroneModelModal.show();
  }

  @CatchError("loading")
  async onDeleteDroneModelClick(droneModelItem: DroneModelSchemaItem) {
    if (!confirm(this.$t("sure-delete-something", { something: droneModelItem.name }).toString())) {
      return;
    }
    await volateqApi.deleteDroneModel(droneModelItem.id!);

    this.showSuccess(this.$t("something-deleted-successfully", { something: droneModelItem.name }).toString());

    await this.updateDroneModelRows();
  }
}
</script>

<style lang="scss">
.app-settings-drones-table-toolbar {
  margin-top: 50px;
}
</style>
