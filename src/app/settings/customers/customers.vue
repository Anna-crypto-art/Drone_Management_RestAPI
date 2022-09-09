<template>
  <div class="app-settings-customers">
    <div class="app-settings-customers-table-toolbar">
      <b-button variant="primary" @click="onCreateCustomerClick" v-b-modal.edit-customer-modal>
        {{ $t("create-customer") }}
      </b-button>
    </div>
    <app-table-container>
      <b-table :fields="columns" :items="rows" head-variant="light" hover :busy="loading">
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template #cell(plants)="row">
          <span class="grayed">
            {{ row.item.plants.map(plant => plant.name).join(", ") }}
          </span>
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <b-button
              @click="onEditCustomerClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('edit-customer')"
            >
              <b-icon icon="wrench" />
            </b-button>
            <b-button
              @click="onDeleteCustomerClick(row.item)"
              variant="outline-danger"
              size="sm"
              :title="$t('delete-customer')"
            >
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </app-table-container>
    <app-modal-form
      id="edit-customer-modal"
      ref="appCustomerModal"
      :title="customerModalTitle"
      :ok-title="customerModalOkTitle"
      :modalLoading="customerModalLoading"
      @submit="onSubmitCustomer"
    >
      <b-row v-if="currentCustomer">
        <b-col>
          <b-form-group :label="$t('name')" label-for="name">
            <b-form-input
              id="customerName"
              v-model="currentCustomer.name"
              :placeholder="$t('name')"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('role')" label-for="role">
            <b-form-select
              id="role"
              v-model="currentCustomer.role"
              :options="roles"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div><b>{{ $t("plants") }}</b></div>
          <div class="app-settings-customers-plants-selection">
            <div v-for="selectPlant in selectPlants" :key="selectPlant.plant.id">
              <b-checkbox 
                v-model="selectPlant.selected"
              >
                {{ selectPlant.plant.name }}
                <small class="grayed" v-if="selectPlant.otherCustomers">{{ selectPlant.otherCustomers }}</small>
              </b-checkbox>
            </div>
          </div>
        </b-col>
      </b-row>
    </app-modal-form>    
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { BvTableFieldArray } from "bootstrap-vue";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { SelectPlant } from "../types";
import { CustomerItem } from "./types";
import { CustomerRole, CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";


@Component({
  name: "app-settings-users",
  components: {
    AppTableContainer,
    AppModalForm,
  },
})
export default class AppSettingsCustomers extends BaseAuthComponent {
  columns: BvTableFieldArray = [];
  rows: CustomerItem[] = [];

  plants!: PlantSchema[];
  roles!: Array<any>;

  loading = false;

  @Ref() appCustomerModal!: IAppModalForm;
  customerModalLoading = false;
  customerModalTitle = "";
  customerModalOkTitle = "";
  selectPlants: SelectPlant[] = [];
  currentCustomer: CustomerItem | null = null;

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "role", label: this.$t("role").toString() },
      { key: "plants", label: this.$t("plants").toString() },
      { key: "actions", label: "" },
    ];

    this.roles = [
      { value: null, text: "" },
      ...Object.keys(CustomerRole).map(roleKey => ({ value: CustomerRole[roleKey], text: CustomerRole[roleKey] })),
    ]

    await this.updateCustomerRows();

    try {
      this.plants = (await volateqApi.getAllPlants()).sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    } catch (e) {
      this.showError(e);
    }
  }

  async updateCustomerRows() {
    this.loading = true;
    try {
      this.rows = (await volateqApi.getCustomers()).map((customer: CustomerSchema) => ({
        id: customer.id,
        name: customer.name,
        role: customer.role,
        plants: customer.plants,
      })).sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  onCreateCustomerClick() {
    this.currentCustomer = {
      id: null,
      name: "",
      role: null,
      plants: [],
    }

    this.selectPlants = this.plants.map(plant => ({
      plant: plant,
      selected: false,
      otherCustomers: plant.customers!.map(customer => customer.name).join(", "),
    }));

    this.customerModalTitle = this.$t("create-customer").toString();
    this.customerModalOkTitle = this.$t("create").toString();

    this.appCustomerModal.show();
  }

  onEditCustomerClick(customerItem: CustomerItem) {
    this.currentCustomer = customerItem;

    this.selectPlants = this.plants.map(plant => ({
      plant: plant,
      selected: !!customerItem.plants.find(customerPlant => customerPlant.id === plant.id),
      otherCustomers: plant.customers!.filter(customer => customer.id !== customerItem.id)
        .map(customer => customer.name).join(", "),
    }));

    this.customerModalTitle = this.$t("edit-customer").toString() + ": " + customerItem.name;
    this.customerModalOkTitle = this.$t("apply").toString();

    this.appCustomerModal.show();
  }

  async onSubmitCustomer() {
    this.customerModalLoading = true;
    try {
      const selectedPlantIds: string[] = this.selectPlants.filter(selectPlant => selectPlant.selected)
        .map(selectPlant => selectPlant.plant.id);

      if (this.currentCustomer!.id === null) {
        await volateqApi.createCustomer({
          name: this.currentCustomer!.name,
          role: this.currentCustomer!.role || undefined,
          plant_ids: selectedPlantIds,
        });

        this.showSuccess(this.$t("customer-created-success").toString());
      } else {
        await volateqApi.updateCustomer(this.currentCustomer!.id, {
          name: this.currentCustomer!.name,
          role: this.currentCustomer!.role || undefined,
          plant_ids: selectedPlantIds,
        });

        this.showSuccess(this.$t("customer-updated-success").toString());
      }

      this.appCustomerModal.hide();

      await this.updateCustomerRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.customerModalLoading = false;
    }
  }

  async onDeleteCustomerClick(customerItem: CustomerItem) {
    this.loading = true;
    try {
      if (!confirm(this.$t("sure-delete-customer", { customer: customerItem.name }).toString())) {
        return;
      }

      await volateqApi.deleteCustomer(customerItem.id!);

      this.showSuccess(this.$t("customer-deleted-success", {customer: customerItem.name }).toString());

      await this.updateCustomerRows();
    } catch (e) {
      this.showError(e as ApiException);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.app-settings-customers-plants-selection {
  max-height: 400px;
  overflow-y: auto;
}
</style>
