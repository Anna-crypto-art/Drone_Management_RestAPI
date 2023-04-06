<template>
  <div class="app-settings-drones">
    <app-settings-drone-models/>
  
    <div class="app-settings-drones-table-toolbar">
      <app-button variant="primary" @click="onCreateDroneClick">
        {{ $t("create-drone") }}
      </app-button>
      <app-table-filter >
        <b-checkbox switch v-model="showRetired" @change="updateDroneRows">
          {{ $t("show-retired") }}
        </b-checkbox>
      </app-table-filter>
      <app-table-filter v-show="availableCustomers">
        <label for="customer-filter">{{ $t("customer") }}</label>
        <b-form-select
          id="customer-filter"
          v-model="selectedCustomerId"
          :options="availableCustomers"
          @change="updateDroneRows"
        />
      </app-table-filter>
      <div class="clear"></div>
    </div>
    <app-table-container>
      <app-table :columns="droneColumns" :rows="droneRows" :loading="loading" :hoverActions="true">
        <template #cell(customer_plants)="row">
          <span v-html='row.item.customer_plants.map(customer_plant => (customer_plant.customer_name + " " + customer_plant.plant_name)).join("<br>")' :class='row.item.retired ? "grayed" : ""'></span>
        </template>
        <template #cell(drone_model)="row">
          <span :class='row.item.retired ? "grayed" : ""'>
            {{ row.item.drone_model.name_abbrev }}
          </span>
        </template>
        <template #cell(custom_name)="row">
          <span :class='row.item.retired ? "grayed" : ""'>
            {{ row.item.custom_name }}
          </span>
        </template>
        <template #cell(serial_number)="row">
          <span :class='row.item.retired ? "grayed" : ""'>
            {{ row.item.serial_number }}
          </span>
        </template>
        <template #cell(number_available_batteries)="row">
          <span :class='row.item.retired ? "grayed" : ""'>
            {{ row.item.number_available_batteries }}
          </span>
        </template>
        <template #hoverActions="row">
          <app-button
            @click="onEditDroneClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-something', { something: row.item.custom_name })"
            icon="wrench"
          />
          <app-button
            @click="onDeleteDroneClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-something', { something: row.item.custom_name })"
            icon="trash"
          />
        </template>
      </app-table>
    </app-table-container>
    <app-modal-form
      id="drone-modal"
      ref="appDroneModal"
      :title="droneModalTitle"
      :ok-title="droneModalOkTitle"
      :modalLoading="droneModalLoading"
      @submit="onSubmitDrone"
    >
      <b-row v-if="currentDrone">
        <b-col>
          <b-form-group :label="$t('customer-plants')">
            <b-alert :show="!appendNewCustomerPlantAllowed" variant="info">
              {{ $t("fill-in-empty-customer-plants-first") }}
            </b-alert>
            <b-row v-for="customerPlant in selectedCustomerPlants" :key="customerPlant.id" class="mar-bottom">
              <b-col cols="5">
                <b-form-select
                  id="drone-customer-selection"
                  v-model="customerPlant.customer_id"
                  :options="availableCustomers"
                  @change="onCustomerSelectionChanged(customerPlant)"
                ></b-form-select>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="drone-plant-selection"
                  v-model="customerPlant.plant_id"
                  :options="customerPlant.available_plant_ids"
                  v-show="customerPlant.customer_id != undefined"
                ></b-form-select>
              </b-col>
              <b-col cols="2">
                <app-button variant="outline-danger" size="sm" @click="deleteCustomerPlantEntry(customerPlant)" icon="x" />
              </b-col>
            </b-row>
            <app-button variant="secondary" size="sm" @click="appendEmptyCustomerPlant()" icon="plus" />
          </b-form-group>          

          <b-form-group :label="$t('drone-model')">
            <b-form-select
              id="drone-model-selection"
              v-model="currentDrone.drone_model.id"
              :options="availableDroneModels"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group :label="$t('name')">
            <b-form-input
              id="new-drone-name"
              v-model="currentDrone.custom_name"
              required
              type="text"
              :placeholder="$t('name')" />
          </b-form-group>
          <b-form-group :label="$t('serial-number')">
            <b-form-input
              id="new-drone-serial-number"
              v-model="currentDrone.serial_number"
              required
              type="text"
              :placeholder="$t('serial-number')" />
          </b-form-group>
          <b-form-group :label="$t('number-available-batteries')">
            <b-form-input
              id="new-drone-number-available-batteries"
              v-model="currentDrone.number_available_batteries"
              required
              type="number"
              :placeholder="$t('number-available-batteries')" 
              min="1"
              max="99"/>
          </b-form-group>
          <b-form-checkbox id="new-drone-retired" v-model="currentDrone.retired">
            {{ $t("retired") }}
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
import { DroneSchemaItem } from "./types";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import { CustomerPlantForDroneSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-plant-schema";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import AppSettingsDroneModels from "./drone-models.vue";
import AppTableFilter from "@/app/shared/components/app-table-filter/app-table-filter.vue";
import { sortAlphabetical } from "@/app/shared/services/helper/sort-helper";


@Component({
  name: "app-settings-drones",
  components: {
    AppTableContainer,
    AppModalForm,
    AppTable,
    AppButton,
    AppMultiselect,
    AppSettingsDroneModels,
    AppTableFilter
  },
})
export default class AppSettingsDrones extends BaseAuthComponent {
  droneColumns: AppTableColumns = [];
  droneRows: DroneSchemaItem[] = [];

  loading = false;
  showRetired = false;

  availableDroneModels: any[] = [];

  appendNewCustomerPlantAllowed = true;
  selectedCustomerPlants: CustomerPlantForDroneSchema[] = [];

  allCustomers: CustomerSchema[] = [];
  availableCustomers: any[] = [];

  // customerSelection: Array<any> | null = null;
  selectedCustomerId: string | null = null;

  allPlants: PlantSchema[] = [];

  @Ref() appDroneModal!: IAppModalForm;
  droneModalLoading = false;
  droneModalTitle = "";
  droneModalOkTitle = "";
  
  currentDrone: DroneSchema = {
    id: "",
    drone_model: {
      id: "",
      name: "",
      name_abbrev: "",
      vendor: "",
      flight_time: 0,
      recharge_time: 0,
      battery_swap_time: 0,
      supported: false,
    },
    custom_name: "",
    serial_number: "",
    number_available_batteries: 1,
    retired: false,
  }

  @CatchError("loading")
  async created() {
    this.droneColumns = [
      { key: "customer_plants", label: this.$t("customer-plants").toString() },
      { key: "drone_model", label: this.$t("drone-type").toString() },
      { key: "custom_name", label: this.$t("name").toString() },
      { key: "serial_number", label: this.$t("serial-number").toString() },
      { key: "number_available_batteries", label: this.$t("number-available-batteries").toString() },
    ];

    await this.updateDroneRows();
    await this.updateAvailableDroneModels();

    this.allCustomers = sortAlphabetical(await volateqApi.getCustomers(), 'name');
    this.allPlants = sortAlphabetical(await volateqApi.getAllPlants(), 'name');

    this.availableCustomers = [
      { value: null, text: "" },
      ...this.allCustomers.map(customer => ({
      value: customer.id,
      text: customer.name,
    }))];

    this.appendEmptyCustomerPlant();
  }
  
  async updateAvailableDroneModels(allowed_drone_model?: string) {
    this.availableDroneModels = (await volateqApi.getDroneModels()).filter(function (drone_model) {
        if (allowed_drone_model) {
          return drone_model.supported || drone_model.name_abbrev == allowed_drone_model
        } else {
          return drone_model.supported;
        }
      }).map(drone_model => ({
        value: drone_model.id,
        text: drone_model.name_abbrev,
      }));
  }

  async updateDroneRows() {
    const droneFilter: { customer_id?: string, plant_id?: string } = {};
    if (this.selectedCustomerId) {
      droneFilter.customer_id = this.selectedCustomerId;
    }
    this.droneRows = (await volateqApi.getDrones(droneFilter)).map((drone: DroneSchema) => ({
      id: drone.id,
      customer_plants: drone.customer_plants?.map(customer_plant => ({
        customer_id: customer_plant.customer_id,
        customer_name: customer_plant.customer_name,
        plant_id: customer_plant.plant_id,
        plant_name: customer_plant.plant_name,
      })).sort((a, b) => {
        const customerA = a.customer_name ? a.customer_name : '';
        const customerB = b.customer_name ? b.customer_name : '';

        // first sort by customer name
        if (customerA < customerB) {
          return -1;
        }
        if (customerA > customerB) {
          return 1;
        }

        const plantA = a.plant_name ? a.plant_name : '';
        const plantB = b.plant_name ? b.plant_name : '';

        // then sort by plant name
        if (plantA < plantB) {
          return -1;
        }
        if (plantA > plantB) {
          return 1;
        }

        return 0;
      }),
      drone_model: drone.drone_model,
      custom_name: drone.custom_name,
      serial_number: drone.serial_number,
      number_available_batteries: drone.number_available_batteries,
      retired: drone.retired
    })).sort((a, b) => {
      const customerA = (a.customer_plants && a.customer_plants.length > 0 && a.customer_plants[0].customer_name != undefined) ? a.customer_plants[0].customer_name : '';
      const customerB = (b.customer_plants && b.customer_plants.length > 0 && b.customer_plants[0].customer_name != undefined) ? b.customer_plants[0].customer_name : '';

      // first sort by customer
      if (customerA < customerB) {
        return -1;
      }
      if (customerA > customerB) {
        return 1;
      }

      const nameA = a.custom_name;
      const nameB = b.custom_name;

      // then sort by name
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    if (!this.showRetired) {
      this.droneRows = this.droneRows.filter(drone => !drone.retired);
    }
  }

  @CatchError("droneModalLoading")
  async onCreateDroneClick() {
    this.currentDrone = {
      id: "",
      drone_model: {
        id: "",
        name: "",
        name_abbrev: "",
        vendor: "",
        flight_time: 0,
        recharge_time: 0,
        battery_swap_time: 0,
        supported: false,
      },
      custom_name: "",
      serial_number: "",
      number_available_batteries: 1,
      retired: false,
    }
    this.selectedCustomerPlants = [];
    this.appendEmptyCustomerPlant();

    this.droneModalTitle = this.$t("create-drone").toString();
    this.droneModalOkTitle = this.$t("create").toString();

    await this.updateAvailableDroneModels();

    this.appDroneModal.show();
  }

  @CatchError("droneModalLoading")
  async onSubmitDrone() {
    this.currentDrone.customer_plants = [];
    for (let i = 0; i < this.selectedCustomerPlants.length; i++) {
      const customer_id = this.selectedCustomerPlants[i].customer_id;
      const plant_id = this.selectedCustomerPlants[i].plant_id;
      if (customer_id != undefined && plant_id != undefined) {
        this.currentDrone.customer_plants.push({
          customer_id: customer_id,
          plant_id: plant_id
        });
      }
    }

    if (!this.currentDrone.id) {
      await volateqApi.createDrone({
        customer_plant_ids_encoded: this.currentDrone.customer_plants,
        custom_name: this.currentDrone.custom_name,
        drone_model_id: this.currentDrone.drone_model.id,
        serial_number: this.currentDrone.serial_number,
        number_available_batteries: this.currentDrone.number_available_batteries,
        retired: this.currentDrone.retired
      });
      this.showSuccess(this.$t("something-created-success", { something: this.currentDrone!.custom_name }).toString());
    } else {
      await volateqApi.updateDrone(
        this.currentDrone.id,
        {
          customer_plant_ids_encoded: this.currentDrone.customer_plants,
          custom_name: this.currentDrone.custom_name,
          drone_model_id: this.currentDrone.drone_model.id,
          serial_number: this.currentDrone.serial_number,
          number_available_batteries: this.currentDrone.number_available_batteries,
          retired: this.currentDrone.retired
        }
      );
      this.showSuccess(this.$t("something-edited-successfully", { something: this.currentDrone!.custom_name }).toString());
    }
    
    this.appDroneModal.hide();

    await this.updateDroneRows();
  }

  @CatchError()
  async onEditDroneClick(droneItem: DroneSchemaItem) {
    this.currentDrone = {
      id: droneItem.id,
      customer_plants: droneItem.customer_plants?.map(customer_plant => ({
        customer_id: customer_plant.customer_id,
        plant_id: customer_plant.plant_id,
      })),
      custom_name: droneItem.custom_name,
      drone_model: (await volateqApi.getDroneModel(droneItem.drone_model.id)),
      serial_number: droneItem.serial_number,
      number_available_batteries: droneItem.number_available_batteries,
      retired: droneItem.retired
    };

    this.selectedCustomerPlants = [];
    if (this.currentDrone.customer_plants && this.currentDrone.customer_plants.length > 0) {
      for (let i = 0; i < this.currentDrone.customer_plants!.length; i++) {
        const newCustomerPlant: CustomerPlantForDroneSchema = {
            id: this.selectedCustomerPlants.length + 1,
            customer_id: this.currentDrone.customer_plants[i].customer_id,
            available_plant_ids: [],
            plant_id: this.currentDrone.customer_plants[i].plant_id,
        }
        this.selectedCustomerPlants.push(newCustomerPlant);
        this.onCustomerSelectionChanged(newCustomerPlant)
      }
    } else {
      this.appendEmptyCustomerPlant();
    }

    this.appendNewCustomerPlantAllowed = true;

    this.droneModalTitle = this.$t("update-something", { something: this.currentDrone.custom_name }).toString();
    this.droneModalOkTitle = this.$t('apply').toString();

    await this.updateAvailableDroneModels(this.currentDrone.drone_model.name_abbrev);

    this.appDroneModal.show();
  }

  @CatchError("loading")
  async onDeleteDroneClick(droneItem: DroneSchemaItem) {
    if (!confirm(this.$t("sure-delete-something", { something: droneItem.custom_name }).toString())) {
      return;
    }
    await volateqApi.deleteDrone(droneItem.id!);

    this.showSuccess(this.$t("something-deleted-successfully", { something: droneItem.custom_name }).toString());

    await this.updateDroneRows();
  }

  @CatchError()
  async onCustomerSelectionChanged(customerPlant: CustomerPlantForDroneSchema) {
    customerPlant.available_plant_ids = [];
    for (const plant of this.allPlants) {
      if (plant.customers) {
        for (const plant_customer of plant.customers) {
          for (const customer of this.allCustomers) {
            if (customer.id == plant_customer.id && plant_customer.id == customerPlant.customer_id) {
              customerPlant.available_plant_ids.push({
                value: plant.id.toString(),
                text: plant.name,
              });
              break;
            }
          }
        }
      }
    }
  }

  private checkIfAppendNewCustomerPlantAllowed() {
    let numberNonSelectedCustomers = 0;
    for (let i = 0; i < this.selectedCustomerPlants.length; i++) {
      if (this.selectedCustomerPlants[i].customer_id == undefined) {
        numberNonSelectedCustomers = numberNonSelectedCustomers + 1;
      }
    }

    if (numberNonSelectedCustomers >= 1) {
      this.appendNewCustomerPlantAllowed = false;
    } else  {
      this.appendNewCustomerPlantAllowed = true;
    }
  }

  private appendEmptyCustomerPlant() {
    this.checkIfAppendNewCustomerPlantAllowed();

    if (this.appendNewCustomerPlantAllowed) {
      const newCustomerPlant: CustomerPlantForDroneSchema = {
          id: this.selectedCustomerPlants.length + 1,
          customer_id: this.selectedCustomerId ? this.selectedCustomerId : undefined,
          available_plant_ids: []
      }
      this.selectedCustomerPlants.push(newCustomerPlant);

      if (this.selectedCustomerId) {
        this.onCustomerSelectionChanged(newCustomerPlant);
      }
    }
  }

  private deleteCustomerPlantEntry(customerPlant: CustomerPlantForDroneSchema) {
    this.selectedCustomerPlants = this.selectedCustomerPlants.filter(item => item != customerPlant);
  }

}
</script>

<style lang="scss">
.app-settings-drones {
  &-table-toolbar {
    margin-top: 50px;
  }

  #customer-filter {
    width: 300px;
  }
}

#drone-modal .btn {
  height: 38px;
}

</style>
