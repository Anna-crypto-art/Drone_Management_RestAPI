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
        <template #cell(technology)="row">
          {{ row.item.technology }}
        </template>
        <template #cell(key_figures)="row">
          <span class="grayed">
            {{ row.item.product_package.key_figures.map(key_figure => key_figure.name).join(", ") }}
          </span>
        </template>
        <template #cell(number_currently_booked)="row">
          {{ row.item.number_currently_booked }}
        </template>
        <template #hoverActions="row">
          <app-button
            v-show="row.item.role !== 'SUPER_ADMIN'"
            @click="onEditProductPackageClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-product-package', { product_package: row.item.product_package.name })"
            icon="wrench"
          />
          <app-button
            @click="onDeleteProductPackageClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-product-package', { product_package: row.item.product_package.name })"
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
      <b-row>
        <b-col>
          <b-form-group :label="$t('name')">
            <b-form-input id="edit-product-package-name" v-model="currentProductPackage.name" required />
          </b-form-group>
          <b-form-group :label="$t('technology')">
            <b-form-select id="new-plant-technology" v-model="currentProductPackage.technology_id" :options="technologies" required />
          </b-form-group>
          <b-form-group :label="$t('performance-indicators')">
            <app-multiselect 
              v-model="currentProductPackage.key_figures"
              :options="keyFigureOptions" />
          </b-form-group>
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

  newProductPackage: { name: string, technology_id: number, key_figures: number[] } =
    {name: "", technology_id: 0, key_figures: []};
  currentProductPackage: { name: string, technology_id: number, key_figures: number[] } =
    {name: "", technology_id: 0, key_figures: []};


  loading = false;

  @Ref() appCreateProductPackageModal!: IAppModalForm;
  createProductPackageModalLoading = false;
  createProductPackageModalTitle = "";
  createProductPackageModalOkTitle = "";

  @Ref() appEditProductPackageModal!: IAppModalForm;
  editProductPackageModalLoading = false;
  editProductPackageModalTitle = "";
  editProductPackageModalOkTitle = "";
  currentProductPackageItem: ProductPackageItem = {
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
  };


  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "technology", label: this.$t("technology").toString() },
      { key: "key_figures", label: this.$t("performance-indicators").toString() },
      { key: "number_currently_booked", label: this.$t("product-package-number-currently-booked").toString() },
    ];

    this.technologies = (await volateqApi.getTechnologies()).map(tech => ({ value: tech.id, text: tech.abbrev }))
    await this.updateProductPackageRows();
    this.all_key_figures = await volateqApi.getAllKeyFigures();
    this.updateKeyFigureOptions();
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

        const techA = a.product_package.technology_id;
        const techB = b.product_package.technology_id;

        if (techA < techB) {
          return -1;
        }
        if (techA > techB) {
          return 1;
        }

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      // load and set the number of orders
      for (let i = 0; i < this.rows.length; i++) {
          let number_of_orders = await volateqApi.getProductPackageNumberOfOrders(this.rows[i].product_package.id);
          this.rows[i].number_currently_booked = number_of_orders;
      }

    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  onCreateProductPackageClick() {
    this.newProductPackage = {name: "", technology_id: 0, key_figures: []};

    this.createProductPackageModalTitle = this.$t("create-product-package").toString();
    this.createProductPackageModalOkTitle = this.$t("create").toString();

    this.appCreateProductPackageModal.show();
  }

  async onSubmitCreateProductPackage() {
    this.createProductPackageModalLoading = true;
    try {
      await volateqApi.createProductPackage({
        name: this.newProductPackage!.name,
        technology_id: this.newProductPackage.technology_id!,
        key_figures: this.newProductPackage.key_figures,
      });

      this.appCreateProductPackageModal.hide();

      this.showSuccess(this.$t("product-package-created-success", { product_package: this.newProductPackage!.name }).toString());
      
      await this.updateProductPackageRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.createProductPackageModalLoading = false;
    }
  }

  onEditProductPackageClick(productPackageItem: ProductPackageItem) {
    this.currentProductPackageItem = productPackageItem;

    this.currentProductPackage = {
      name: productPackageItem.name,
      technology_id: productPackageItem.product_package.technology_id,
      key_figures: productPackageItem.product_package.key_figures.map(kf => kf.id),
    };

    this.appEditProductPackageModal.show();
  }

  async onSubmitEditProductPackage() {
    this.editProductPackageModalLoading = true;
    try {

      this.appEditProductPackageModal.hide();

      await volateqApi.updateProductPackage(
        this.currentProductPackageItem!.id,
        {
          name: this.currentProductPackage.name,
          technology_id: this.currentProductPackage.technology_id,
          key_figures: this.currentProductPackage.key_figures,
        }
      );

      this.showSuccess(this.$t("product-package-edited-successfully", { product_package: this.newProductPackage.name }).toString());
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
      if (!confirm(this.$t("sure-delete-product-package", { product_package: productPackageItem.name }).toString())) {
        return;
      }
      await volateqApi.deleteProductPackage(productPackageItem.id!);

      this.showSuccess(this.$t("product-package-deleted-successfully", { product_package: productPackageItem.name }).toString());

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
