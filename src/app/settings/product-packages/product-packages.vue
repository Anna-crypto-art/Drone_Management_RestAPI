<template>
  <div class="app-settings-product-packages">
    <div class="app-settings-product-packages-table-toolbar">
      <app-button variant="primary" @click="onCreateProductPackageClick">
        {{ $t("create-product-package") }}
      </app-button>
    </div>
    <app-table-container>
      <app-table :columns="columns" :rows="rows" :loading="loading" :hoverActions="true" noLineBreaks>
        <template #cell(name)="row">
          <span class="product-package-table-name">{{ row.item.name }}</span>
        </template>
        <template #cell(technology)="row">
          {{ row.item.technology_name }}
        </template>
        <template #cell(key_figures)="row">
          <span class="grayed">
            {{ row.item.key_figures.map(key_figure => key_figure.name).join(", ") }}
          </span>
        </template>
        <template #hoverActions="row">
          <app-button
            @click="onEditProductPackageClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-product-package', { product_package: row.item.name })"
            icon="wrench"
          />
          <app-button
            @click="onDeleteProductPackageClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-product-package', { product_package: row.item.name })"
            icon="trash"
          />
        </template>
      </app-table>
    </app-table-container>

    
    <app-modal-form
      id="product-package-modal"
      ref="appProductPackageModal"
      :title="productPackageModalTitle"
      :ok-title="productPackageModalOkTitle"
      :modalLoading="productPackageModalLoading"
      @submit="onSubmitProductPackage"
    >
      <b-row v-if="currentProductPackage">
        <b-col>
          <b-form-group :label="$t('name')">
            <b-form-input
              id="new-product-package-name"
              v-model="currentProductPackage.name"
              required
              :placeholder="$t('name')" />
          </b-form-group>
          <b-form-group :label="$t('technology')">
            <b-form-select
              id="new-plant-technology"
              v-model="currentProductPackage.technology_id"
              :options="technologies"
              required
              @change="onTechnologySelectionChanged" />
          </b-form-group>
          <b-form-group :label="$t('performance-indicators')">
              <app-multiselect
              v-model="selectedKeyFigureIds"
              :options="keyFigureOptions"
              required />
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
import { ProductPackageWithKeyFiguresSchemaItem } from "./types";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AppTableColumns } from "@/app/shared/components/app-table/types";
import { ProductPackageWithKeyFiguresSchema } from "@/app/shared/services/volateq-api/api-schemas/product-package";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { ApiTechnology } from "@/app/shared/services/volateq-api/api-technologies";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { BvSelectOption } from "@/app/shared/types";


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
  rows: ProductPackageWithKeyFiguresSchemaItem[] = [];

  keyFigureOptions: Array<MultiselectOption> = [];
  selectedKeyFigureIds: string[] | null = null;
  
  technologies: Array<BvSelectOption> = [];
  allKeyFigures: Array<KeyFigureSchema> = [];

  loading = false;

  @Ref() appProductPackageModal!: IAppModalForm;
  productPackageModalLoading = false;
  productPackageModalTitle = "";
  productPackageModalOkTitle = "";
  
  currentProductPackage: ProductPackageWithKeyFiguresSchema = {
      id: 0, // 0 -> nothing
      name: "",
      technology_id: 0, // 0 -> nothing
      key_figures: [],
    }

  @CatchError("loading")
  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "technology", label: this.$t("technology").toString() },
      { key: "key_figures", label: this.$t("performance-indicators").toString() },
    ];

    this.technologies = (await volateqApi.getTechnologies()).map(tech => ({ value: tech.id, text: tech.abbrev }));

    await this.updateProductPackageRows();

    this.allKeyFigures = (await volateqApi.getAllKeyFigures());
    this.updateKeyFigureOptions();
  }

  private updateKeyFigureOptions() {
    const keyFigureOptions: MultiselectOption[] = [];

    for (const key_figure of this.allKeyFigures) {
      if (!this.currentProductPackage.technology_id || // we want all key figures if no technology ID is set (e.g. creating new product package)
          this.currentProductPackage.technology_id == key_figure.component.technology_id) {
        keyFigureOptions.push({
          id: key_figure.id.toString(),
          label: key_figure.name,
        });
      }
    }

    this.keyFigureOptions = keyFigureOptions;
  }

  @CatchError("loading")
  async updateProductPackageRows() {
    this.loading = true;
    try {
      this.rows = (await volateqApi.getProductPackagesWithKeyFigures()).map((product_package: ProductPackageWithKeyFiguresSchema) => ({
        id: product_package.id,
        name: product_package.name,
        technology_name: ApiTechnology[product_package.technology_id],
        technology_id: product_package.technology_id,
        key_figures: product_package.key_figures,
      })).sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        const techA = a.technology_id;
        const techB = b.technology_id;

        // first sort by technology
        if (techA < techB) {
          return -1;
        }
        if (techA > techB) {
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

    } catch (e) {
      this.showError(e);
    } finally {
      this.loading = false;
    }
  }

  @CatchError()
  onCreateProductPackageClick() {
    this.currentProductPackage = {
      id: 0, // 0 -> nothing
      name: "",
      technology_id: 0, // 0 -> nothing
      key_figures: [],
    }
    this.selectedKeyFigureIds = [];

    this.updateKeyFigureOptions();

    this.productPackageModalTitle = this.$t("create-product-package").toString();
    this.productPackageModalOkTitle = this.$t("create").toString();

    this.appProductPackageModal.show();
  }

  @CatchError("productPackageModalLoading")
  async onSubmitProductPackage() {
    this.productPackageModalLoading = true;
    
    try {

      if (this.currentProductPackage.id === 0) {
        await volateqApi.createProductPackage({
          name: this.currentProductPackage.name,
          technology_id: this.currentProductPackage.technology_id,
          key_figures: this.selectedKeyFigureIds!.map(kf => Number(kf)),
        });
        this.showSuccess(this.$t("product-package-created-success", { product_package: this.currentProductPackage!.name }).toString());
      } else {
        await volateqApi.updateProductPackage(
          this.currentProductPackage.id,
          {
            name: this.currentProductPackage.name,
            technology_id: this.currentProductPackage.technology_id,
            key_figures: this.selectedKeyFigureIds!.map(kf => Number(kf)),
          }
        );
        this.showSuccess(this.$t("product-package-edited-successfully", { product_package: this.currentProductPackage!.name }).toString());
      }
      
      this.appProductPackageModal.hide();

      await this.updateProductPackageRows();
    } catch (e) {
      this.showError(e);
    } finally {
      this.productPackageModalLoading = false;
    }
  }

  @CatchError()
  onEditProductPackageClick(productPackageItem: ProductPackageWithKeyFiguresSchemaItem) {
    this.selectedKeyFigureIds = productPackageItem.key_figures.map(kf => kf.id.toString());

    this.currentProductPackage = {
      id: productPackageItem.id,
      name: productPackageItem.name,
      technology_id: productPackageItem.technology_id,
      key_figures: productPackageItem.key_figures,
    };

    this.updateKeyFigureOptions();

    this.productPackageModalTitle = this.$t("update-product-package", { product_package: this.currentProductPackage.name }).toString();
    this.productPackageModalOkTitle = this.$t('apply').toString();

    this.appProductPackageModal.show();
  }

  @CatchError("loading")
  async onDeleteProductPackageClick(productPackageItem: ProductPackageWithKeyFiguresSchemaItem) {
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

  @CatchError("loading")
  async onTechnologySelectionChanged() {
    this.currentProductPackage.key_figures = [];
    this.selectedKeyFigureIds = [];
    this.updateKeyFigureOptions();
  }
}
</script>

<style lang="scss">
.product-package-table-name {
  @media (min-width: 992px) {
    white-space: nowrap;
  }
}
</style>
