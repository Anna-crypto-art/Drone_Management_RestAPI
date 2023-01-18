<template>
  <div class="app-settings-product-packages">
    <div class="app-settings-product-packages-table-toolbar">
      <app-button variant="primary" @click="onCreateProductPackageClick" v-b-modal.create-product-package-modal>
        {{ $t("create-product-package") }}
      </app-button>
    </div>
    <app-table-container>
      <app-table :columns="columns" :rows="rows" :loading="loading" :hoverActions="true">
        <template #cell(name)="row">
          <span>{{ row.item.product_package.name }}</span>
        </template>
        <template #cell(key_figures)="row">
          <span class="grayed">
            {{ row.item.product_package.key_figures.map(key_figure => key_figure.name).join(", ") }}
          </span>
        </template>
        <template #hoverActions="row">
          <app-button
            v-show="row.item.role !== 'SUPER_ADMIN'"
            @click="onEditProductPackageClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-product-package')"
            icon="wrench"
          />
          <app-button
            @click="onDeleteProductPackageClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-product-package')"
            icon="trash"
          />
        </template>
      </app-table>
    </app-table-container>

    
    <app-modal-form
      id="create-product-package-modal"
      ref="appCreateProductPackageModal"
      :ok-title="$t('create')"
      :modalLoading="createProductPackageModalLoading"
      @submit="onSubmitCreateProductPackage"
    >
      <template #modal-title>
        <h4>{{ $t("create-product-package") }}</h4>
      </template>
      
    </app-modal-form>

    
    <app-modal-form
      id="edit-product-package-modal"
      ref="appEditProductPackageModal"
      :ok-title="$t('apply')"
      :modalLoading="editProductPackageModalLoading"
      @submit="onSubmitEditProductPackage"
    >
      <template #modal-title>
        <h4>{{ $t("update-product-package", { product_package: currentProductPackage.name }) }}</h4>
      </template>
      <!-- <b-row v-if="editUser">
        <b-col>
          <b-form-group :label="$t('role')" label-for="role">
            <b-form-select
              id="role"
              v-model="editUser.roleId"
              :options="roles"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <div><b>{{ $t("plants") }}</b></div>
          <div v-for="customerPlant in editUser.customerPlants" :key="customerPlant.plant.id">
            <b-checkbox 
              v-model="customerPlant.selected"
            >
              {{ customerPlant.plant.name }}
              <small class="grayed" v-if="customerPlant.otherCustomers">{{ customerPlant.otherCustomers }}</small>
            </b-checkbox>
          </div>
        </b-col>
      </b-row> -->
    </app-modal-form>


    <!-- <app-modal-form
      id="edit-product-package-modal"
      ref="appProductPackageModal"
      :title="productPackageModalTitle"
      :ok-title="productPackageModalOkTitle"
      :modalLoading="productPackageModalLoading"
      @submit="onSubmitProductPackage"
    >
      <b-row v-if="currentProductPackage">
        <b-col>
          <b-form-group :label="$t('name')" label-for="name">
            <b-form-input
              id="productPackageName"
              v-model="currentProductPackage.name"
              :placeholder="$t('name')"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div><b>{{ $t("performance-indicators") }}</b></div>
          <div class="app-settings-product-package-performance-indicator-selection">
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
    </app-modal-form>     -->
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { SelectPlant } from "../types";
import { ProductPackageItem } from "./types";
import { CustomerRole, CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { ProductPackageWithKeyFiguresSchema } from "@/app/shared/services/volateq-api/api-schemas/product-package";


@Component({
  name: "app-settings-product-packages",
  components: {
    AppTableContainer,
    AppModalForm,
    AppTable,
    AppButton,
  },
})
export default class AppSettingsProductPackages extends BaseAuthComponent {
  columns: AppTableColumns = [];
  rows: ProductPackageItem[] = [];

  // plants!: PlantSchema[];
  // roles!: Array<any>;

  loading = false;

  @Ref() appCreateProductPackageModal!: IAppModalForm;
  createProductPackageModalLoading = false;
  createProductPackageModalTitle = "";
  createProductPackageModalOkTitle = "";

  @Ref() appEditProductPackageModal!: IAppModalForm;
  editProductPackageModalLoading = false;
  editProductPackageModalTitle = "";
  editProductPackageModalOkTitle = "";
  currentProductPackage: ProductPackageItem | null = null;

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "key_figures", label: this.$t("performance-indicators").toString() },
    ];

    // this.roles = [
    //   { value: null, text: "" },
    //   ...Object.keys(CustomerRole).map(roleKey => ({ value: CustomerRole[roleKey], text: CustomerRole[roleKey] })),
    // ]

    await this.updateCustomerRows();

    // try {
    //   this.plants = (await volateqApi.getAllPlants()).sort((a, b) => {
    //     const nameA = a.name.toLowerCase();
    //     const nameB = b.name.toLowerCase();

    //     if (nameA < nameB) {
    //       return -1;
    //     }
    //     if (nameA > nameB) {
    //       return 1;
    //     }

    //     return 0;
    //   });
    // } catch (e) {
    //   this.showError(e);
    // }
  }

  async updateCustomerRows() {
    this.loading = true;
    try {
      this.rows = (await volateqApi.getProductPackagesWithKeyFigures()).map((product_package: ProductPackageWithKeyFiguresSchema) => ({
        id: product_package.id,
        name: product_package.name,
        product_package: product_package,
        number_currently_booked: 0,
      })).sort((a, b) => {
        const nameA = a.product_package.name.toLowerCase();
        const nameB = b.product_package.name.toLowerCase();

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

  onCreateProductPackageClick() {
    this.currentProductPackage = {
      id: 0,
      name: "",
      product_package: {
        id: 0,
        name: "",
        key_figures: [],
      },
      number_currently_booked: 0
    }

    // this.selectPlants = this.plants.map(plant => ({
    //   plant: plant,
    //   selected: false,
    //   otherCustomers: plant.customers!.map(customer => customer.name).join(", "),
    // }));

    this.createProductPackageModalTitle = this.$t("create-product-package").toString();
    this.createProductPackageModalOkTitle = this.$t("create").toString();

    this.appCreateProductPackageModal.show();
  }

  async onSubmitCreateProductPackage() {
    this.createProductPackageModalLoading = true;
    try {
      // const selectedPlantIds: string[] = this.selectPlants.filter(selectPlant => selectPlant.selected)
      //   .map(selectPlant => selectPlant.plant.id);

      // if (this.currentCustomer!.id === null) {
      //   await volateqApi.createCustomer({
      //     name: this.currentCustomer!.name,
      //     role: this.currentCustomer!.role || undefined,
      //     plant_ids: selectedPlantIds,
      //   });

      //   this.showSuccess(this.$t("customer-created-success").toString());
      // } else {
      //   await volateqApi.updateCustomer(this.currentCustomer!.id, {
      //     name: this.currentCustomer!.name,
      //     role: this.currentCustomer!.role || undefined,
      //     plant_ids: selectedPlantIds,
      //   });

      //   this.showSuccess(this.$t("customer-updated-success").toString());
      // }

      this.appCreateProductPackageModal.hide();

      await this.updateCustomerRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.createProductPackageModalLoading = false;
    }
  }

  onEditProductPackageClick(productPackageItem: ProductPackageItem) {
    this.currentProductPackage = productPackageItem;

    // this.selectPlants = this.plants.map(plant => ({
    //   plant: plant,
    //   selected: !!customerItem.plants.find(customerPlant => customerPlant.id === plant.id),
    //   otherCustomers: plant.customers!.filter(customer => customer.id !== customerItem.id)
    //     .map(customer => customer.name).join(", "),
    // }));

    // this.customerModalTitle = this.$t("edit-customer").toString() + ": " + customerItem.name;
    // this.customerModalOkTitle = this.$t("apply").toString();

    this.appEditProductPackageModal.show();
  }

  async onSubmitEditProductPackage() {
    this.editProductPackageModalLoading = true;
    try {

      this.appEditProductPackageModal.hide();

      await this.updateCustomerRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.editProductPackageModalLoading = false;
    }
  }

  async onDeleteCustomerClick(productPackageItem: ProductPackageWithKeyFiguresSchema) {
    this.loading = true;
    try {
    //   if (!confirm(this.$t("sure-delete-customer", { customer: customerItem.name }).toString())) {
    //     return;
    //   }

    //   await volateqApi.deleteCustomer(customerItem.id!);

    //   this.showSuccess(this.$t("customer-deleted-success", {customer: customerItem.name }).toString());

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
// .app-settings-customers-plants-selection {
//   max-height: 400px;
//   overflow-y: auto;
// }
</style>
