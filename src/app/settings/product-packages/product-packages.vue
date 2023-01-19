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
          <span class="product-package-table-name">{{ row.item.product_package.name }}</span>
        </template>
        <template #cell(key_figures)="row">
          <span class="grayed">
            <!-- {{ row.item }} -->
            {{ row.item.product_package.key_figures.map(key_figure => key_figure.name).join(", ") }}
          </span>
        </template>
        <template #cell(technology)="row">
          {{ row.item.technology }}
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
      :title="$t('create-product-package')"
      :ok-title="$t('create')"
      :modalLoading="createProductPackageModalLoading"
      @submit="onSubmitCreateProductPackage"
    >
      <b-form-group :label="$t('name')">
        <b-form-input id="new-product-package-name" v-model="newProductPackage.name" required :placeholder="$t('name')" />
      </b-form-group>
      <b-form-group :label="$t('technology')">
        <b-form-select id="new-plant-technology" v-model="newProductPackage.technology_id" :options="technologies" required />
      </b-form-group>
      <b-form-group :label="$t('performance-indicators')">
        <app-multiselect 
          v-model="newProductPackage.key_figures"
          :options="keyFigureOptions" />
      </b-form-group>
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
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
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
import { ProductPackageSchema, ProductPackageWithKeyFiguresSchema } from "@/app/shared/services/volateq-api/api-schemas/product-package";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { ApiTechnology } from "@/app/shared/services/volateq-api/api-technologies";


@Component({
  name: "app-settings-product-packages",
  components: {
    AppTableContainer,
    AppModalForm,
    AppTable,
    AppButton,
    AppMultiselect,
  },
})
export default class AppSettingsProductPackages extends BaseAuthComponent {
  columns: AppTableColumns = [];
  rows: ProductPackageItem[] = [];

  all_key_figures: KeyFigureSchema[] = [];
  keyFigureOptions: Array<MultiselectOption> = [];
  selected_key_figures: KeyFigureSchema[] = [];
  
  technologies: Array<any> = [];

  newProductPackage: { name: string, technology_id: number, key_figures: KeyFigureSchema[] } =
    {name: "", technology_id: 0, key_figures: []};


  // newPlant: { name: string, technology_id: number | null, customer_id: string | null } | null = 
  //   { name: "", technology_id: null, customer_id: null };

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
      { key: "technology", label: this.$t("technology").toString(), superAdminOnly: true },
      { key: "key_figures", label: this.$t("performance-indicators").toString() },
    ];

    // this.roles = [
    //   { value: null, text: "" },
    //   ...Object.keys(CustomerRole).map(roleKey => ({ value: CustomerRole[roleKey], text: CustomerRole[roleKey] })),
    // ]

    this.technologies = (await volateqApi.getTechnologies()).map(tech => ({ value: tech.id, text: tech.abbrev }))
    await this.updateProductPackageRows();
    // this.newProductPackage = this.createEmptyProductPackage();
    this.all_key_figures = await volateqApi.getAllKeyFigures();
    this.updateKeyFigureOptions();
    // this.all_key_figures = volateqApi.getAllKeyFigures();
    // this.all_key_figures = (await volateqApi.getAllKeyFigures()).map((key_figure: KeyFigureSchema) => ({
    //     id: key_figure.id,
    //     name: key_figure.name,
    //     component_id: key_figure.component_id,
    //     description: key_figure.description,
    //     component: key_figure.component,
    //   })).sort((a, b) => {
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
  }

  private updateKeyFigureOptions() {
    const keyFigureOptions: MultiselectOption[] = [];

    for (const key_figure of this.all_key_figures) {
      // if (key_figure.id !== 1) { // Skip CSP_PTC Base
        keyFigureOptions.push({ 
          id: key_figure.id + "", 
          label: key_figure.name,
        });
      // }
    }

    this.keyFigureOptions = keyFigureOptions;
  }

  async updateProductPackageRows() {
    this.loading = true;
    try {
      this.rows = (await volateqApi.getProductPackagesWithKeyFigures()).map((product_package: ProductPackageWithKeyFiguresSchema) => ({
        id: product_package.id,
        name: product_package.name,
        technology: ApiTechnology[product_package.technology_id],
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
    this.newProductPackage = {name: "", technology_id: 0, key_figures: []};

    this.currentProductPackage = {
      id: 0,
      name: "",
      technology: "",
      product_package: {
        id: 0,
        name: "",
        technology_id: 0,
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
      console.log(this.newProductPackage)
      await volateqApi.createProductPackage({
        name: this.newProductPackage!.name,
        technology_id: this.newProductPackage.technology_id!,
        key_figures: this.newProductPackage.key_figures.map(kf => kf.id),
      });

      this.appCreateProductPackageModal.hide();

      this.showSuccess(this.$t("product-package-created-success").toString());
      
      await this.updateProductPackageRows();
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

      await this.updateProductPackageRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.editProductPackageModalLoading = false;
    }
  }

  async onDeleteProductPackageClick(productPackageItem: ProductPackageWithKeyFiguresSchema) {
    this.loading = true;
    try {
    //   if (!confirm(this.$t("sure-delete-customer", { customer: customerItem.name }).toString())) {
    //     return;
    //   }

    //   await volateqApi.deleteCustomer(customerItem.id!);

    //   this.showSuccess(this.$t("customer-deleted-success", {customer: customerItem.name }).toString());

      await this.updateProductPackageRows();
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
.product-package-table-name {
  @media (min-width: 992px) {
    white-space: nowrap;
  }
}
</style>
