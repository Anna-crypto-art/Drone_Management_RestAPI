<template>
  <div class="app-settings-orders">
    <div class="app-settings-orders-table-toolbar">
      <app-button variant="primary" @click="onCreateOrderClick">
        {{ $t("create-order") }}
      </app-button>
      <app-table-filter>
        <label for="plants">{{ $t("plant") }}</label>
        <b-form-select
          id="plants"
          v-model="selectedPlantId"
          :options="plantFilterOptions"
          @change="onPlantSelectionChanged"
        />
      </app-table-filter>
      <app-table-filter>
        <label for="customers">{{ $t("customer") }}</label>
        <b-form-select
          id="customers"
          v-model="selectedCustomerId"
          :options="customerFilterOptions"
          @change="onCustomerSelectionChanged"
        />
      </app-table-filter>
    </div>
    <app-table-container size="sm">
      <app-table :columns="columns" :rows="rows" :loading="loading" :hoverActions="true">
        <template #cell(orderType)="row">
          {{ orderTypes[row.item.orderType] }}
        </template>
        <template #cell(productPackages)="row">
          <app-order-pps-view :orderProductPackages="row.item.productPackages" />
        </template>
        <template #cell(userCreatedUpdated)="row">
          <small class="text-grey" v-html="row.item.userCreatedUpdated"></small>
        </template>
        <template #hoverActions="row">
          <app-button
            @click="onEditOrderClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-order')"
            icon="wrench"
          />
          <app-button
            @click="onDeleteOrderClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-order')"
            icon="trash"
          />
        </template>
      </app-table>
    </app-table-container>
    <app-modal-form
      id="edit-order-modal"
      ref="appOrderModal"
      :title="orderModalTitle"
      :subtitle="orderModalSubTitle"
      :ok-title="orderModalOkTitle"
      :modalLoading="orderModalLoading"
      @submit="onSubmitOrder"
    >
      <div v-if="currentOrder">
        <b-row v-if="!currentOrder.id">
          <b-col>
            <b-form-group :label="$t('plant')">
              <b-form-select v-model="currentOrder.plantId"
                :options="createOrderPlantOptions"
                @change="onCreateOrderPlantSelectionChanged"
                required />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group :label="$t('customer')">
              <b-form-select 
                v-model="currentOrder.customerId"
                :options="createOrderCustomerOptions"
                :disabled="!currentOrder.plantId"
                required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group v-if="!currentOrder.id" :label="$t('type')">
          <b-form-select 
            v-model="currentOrder.orderType"
            :options="createOrderTypeOptions"
            @change="onCreateOrderTypeChanged"
            required />
        </b-form-group>
        <b-form-group :label="$t('product-packages')">
          <app-multiselect 
            v-model="currentOrder.productPackages"
            :options="productPackagesOptions"
            :disabled="!currentOrder.orderType" />
          <app-button cls="mar-top" size="sm" @click="onOpenKeyFigureDisable" variant="secondary" :loading="loadingOrderPPKFDisabled">
            {{ $t('disable-key-figures-for-product-packages') }}
          </app-button>
        </b-form-group>
        <b-form-group :label="$t('start-date')">
          <app-datepicker v-model="currentOrder.startDate" required />
        </b-form-group>
        <b-form-group :label="$t('end-date')">
          <app-datepicker v-model="currentOrder.endDate" required />
        </b-form-group>
      </div>
    </app-modal-form>
    <app-modal-form
      id="edit-order-pp-key-figures-disabled"
      ref="orderPPKFDisabledModal"
      :title="$t('disable-key-figures-for-product-packages')"
      :ok-title="$t('apply')"
      @submit="onSubmitKeyFigureDisable"
    >
      <div v-if="disabledKeyFigures">
        <b-form-group v-for="pp in disabledKeyFigures" :key="pp.id" :label="pp.name">
          <app-multiselect 
              v-model="pp.key_figure_ids"
              :options="pp.keyFigureOptions" />
        </b-form-group>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import AppTableFilter from "@/app/shared/components/app-table-filter/app-table-filter.vue";
import AppOrderPpsView from "@/app/shared/components/app-order-pps-view/app-order-pps-view.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { sortAlphabetical } from "@/app/shared/services/helper/sort-helper";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import dateHelper from "@/app/shared/services/helper/date-helper";
import { OrderProductPackageSchema, OrderSchema, OrderType } from "@/app/shared/services/volateq-api/api-schemas/order-schema";
import { ProductPackagesQuantities } from "./types";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { ProductPackageWithKeyFiguresSchema } from "@/app/shared/services/volateq-api/api-schemas/product-package";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";
import { AppTableColumns } from "@/app/shared/components/app-table/types";

@Component({
  name: "app-settings-orders",
  components: {
    AppTableContainer,
    AppModalForm,
    AppMultiselect,
    AppTableFilter,
    AppOrderPpsView,
    AppButton,
    AppTable,
    AppDatepicker,
  },
})
export default class AppSettingsOrders extends BaseAuthComponent {
  columns: AppTableColumns = [];
  rows: any[] = [];

  orderTypes: Record<OrderType, string> | null = null;

  productPackages!: ProductPackageWithKeyFiguresSchema[];
  productPackagesOptions: Array<MultiselectOption> = [];

  plants!: PlantSchema[];
  customers!: CustomerSchema[];

  plantFilterOptions: any[] = [];
  customerFilterOptions: any[] = [];

  createOrderPlantOptions: any[] = [];
  createOrderCustomerOptions: any[] = [];
  createOrderTypeOptions: any[] = [];

  selectedPlantId: string | null = null;
  selectedCustomerId: string | null = null;

  loading = false;

  @Ref() appOrderModal!: IAppModalForm;
  orderModalLoading = false;
  orderModalTitle = "";
  orderModalSubTitle = "";
  orderModalOkTitle = "";
  currentOrder: any | null = null;

  loadingOrderPPKFDisabled = false
  @Ref() orderPPKFDisabledModal!: IAppModalForm;
  disabledKeyFigures: any[] = [];

  @CatchError("loading")
  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "orderType", label: this.$t("type").toString() },
      { key: "customer", label: this.$t("customer").toString() },
      { key: "plant", label: this.$t("plant").toString() },
      { key: "startDate", label: this.$t("start-date").toString() },
      { key: "endDate", label: this.$t("end-date").toString() },
      { key: "productPackages", label: this.$t("product-packages").toString() },
      { key: "userCreatedUpdated", label: this.$t("last-changed").toString() },
    ];
    
    this.productPackages = await volateqApi.getProductPackagesWithKeyFigures();

    this.orderTypes = {
      [OrderType.SETUP]: this.$t('setup').toString(),
      [OrderType.SUBSCRIPTION]: this.$t('subscription').toString(),
    };
    this.createOrderTypeOptions = Object.keys(this.orderTypes).map(key => ({ value: key, text: this.orderTypes![key] }));

    this.plants = sortAlphabetical(await volateqApi.getAllPlants(), "name");
    this.customers = sortAlphabetical(await volateqApi.getCustomers(), "name");

    if (this.selectedCustomer) {
      this.selectedCustomerId = this.selectedCustomer.id;
    }

    this.createOrderPlantOptions = this.plants.map(plant => ({ value: plant.id, text: plant.name }));
    this.updatePlantFilterOptions();
    this.updateCustomerFilterOptions();

    await this.updateOrderRows();
  }

  private async updateOrderRows() {
    this.loading = true;
    try {
      this.rows = (await volateqApi.getOrders(this.selectedPlantId, this.selectedCustomerId)).map(order => ({
        id: order.id,
        name: order.name,
        orderType: order.order_type,
        customer: order.customer.name,
        plant: order.plant.name,
        startDate: dateHelper.toDate(order.start_date),
        endDate: dateHelper.toDate(order.end_date),
        productPackages: order.order_product_packages.filter(pp => pp.product_package.id !== 1), // Filter CSP_PTC Base product,
        userCreatedUpdated: this.getUserCreatedUpdated(order),
      }));
    } finally {
      this.loading = false;
    }
  }

  @CatchError()
  onCreateOrderClick() {
    this.currentOrder = {
      id: null,
      orderType: null,
      startDate: null,
      endDate: null,
      productPackages: [],
      plantId: this.selectedPlantId,
      customerId: this.selectedPlantId && this.selectedCustomerId,
    }

    this.updateCreateOrderCustomerOptions();
    if (!this.selectedCustomerId && this.createOrderCustomerOptions.length === 1) {
      this.currentOrder.customerId = this.createOrderCustomerOptions[0].value;
    }

    this.orderModalTitle = this.$t("create-order").toString();
    this.orderModalOkTitle = this.$t("create").toString();
    this.orderModalSubTitle = "";

    this.appOrderModal.show();
  }

  @CatchError()
  onEditOrderClick(orderRow: any) {
    this.currentOrder = {
      id: orderRow.id,
      startDate: orderRow.startDate,
      endDate: orderRow.endDate,
      productPackages: this.concatProductPackagesWithYearly(orderRow.productPackages),
      orderType: orderRow.orderType,
    };

    this.updateProductPackagesOptions();

    this.orderModalTitle = this.$t("edit-order").toString();
    this.orderModalOkTitle = this.$t("apply").toString();
    this.orderModalSubTitle = orderRow.name;

    this.appOrderModal.show();
  }

  @CatchError("orderModalLoading")
  async onSubmitOrder() {
    const ppyi = this.unchainProductPackagesWithYearly(this.currentOrder.productPackages);

    if (this.currentOrder.id) { // Update
      await volateqApi.updateOrder(this.currentOrder.id, {
        product_packages: ppyi.productPackages,
        quantities: ppyi.quantities,
        start_date: this.currentOrder.startDate,
        end_date: this.currentOrder.endDate,
        key_figures_disabled: this.currentOrder.disabledKeyFigures?.map(kfd => ({ 
          product_package_id: kfd.product_package_id,
          key_figure_ids: kfd.key_figure_ids,
        }))
      });

      this.showSuccess(this.$t("order-updated-success").toString());
    } else { // Create
      await volateqApi.createOrder({
        order_type: this.currentOrder.orderType,
        customer_id: this.currentOrder.customerId,
        plant_id: this.currentOrder.plantId,
        product_packages: ppyi.productPackages,
        quantities: ppyi.quantities,
        start_date: this.currentOrder.startDate,
        end_date: this.currentOrder.endDate,
        key_figures_disabled: this.currentOrder.disabledKeyFigures?.map(kfd => ({ 
          product_package_id: kfd.product_package_id,
          key_figure_ids: kfd.key_figure_ids,
        }))
      });

      this.showSuccess(this.$t("order-created-success").toString());
    }

    this.appOrderModal.hide();

    await this.updateOrderRows();
  }

  @CatchError('loadingOrderPPKFDisabled')
  async onOpenKeyFigureDisable() {
    let existingDisabledKeyFigures = this.currentOrder.disabledKeyFigures;
    if (!existingDisabledKeyFigures) {
      existingDisabledKeyFigures = [];

      if (this.currentOrder.id) {
        existingDisabledKeyFigures = (await volateqApi.getOrderPPDisabledKeyFigures(this.currentOrder.id)).map(orderPP => ({
          product_package_id: orderPP.product_package_id,
          key_figure_ids: orderPP.key_figures_disabled.map(kf => kf.id),
        }));
      }
    }

    const newDisabledKeyFigures: any[] = [];

    for (const ppId of this.currentOrder.productPackages) {
      const ppName = this.productPackagesOptions.find(ppo => ppo.id === ppId)!.label;
      const productPackageId = parseInt(ppId.split('_')[0]);
      const keyFiguresIds = existingDisabledKeyFigures
        .find(existOrderPP => existOrderPP.product_package_id === productPackageId)?.key_figure_ids || []
      
      newDisabledKeyFigures.push({
        id: ppId,
        name: ppName,
        product_package_id: productPackageId,
        key_figure_ids: keyFiguresIds,
        keyFigureOptions: this.productPackages
          .find(productPackage => productPackage.id === productPackageId)!
          .key_figures.map(kf => ({ id: kf.id, label: kf.name }))
      });
    }

    this.disabledKeyFigures = newDisabledKeyFigures;

    this.orderPPKFDisabledModal.show();
  }

  @CatchError()
  onSubmitKeyFigureDisable() {
    this.currentOrder.disabledKeyFigures = this.disabledKeyFigures;

    this.orderPPKFDisabledModal.hide();
  }

  @CatchError()
  async onDeleteOrderClick(orderRow: any) {
    if (!confirm(this.$t("sure-delete-order").toString())) {
      return;
    }

    await volateqApi.deleteOrder(orderRow.id);

    this.showSuccess(this.$t("order-deleted-success").toString());

    await this.updateOrderRows();
  }

  @CatchError("loading")
  async onPlantSelectionChanged() {
    this.updateCustomerFilterOptions();
    await this.updateOrderRows();
  }

  @CatchError("loading")
  async onCustomerSelectionChanged() {
    this.updatePlantFilterOptions();
    await this.updateOrderRows();
  }

  @CatchError()
  onCreateOrderPlantSelectionChanged() {
    this.updateCreateOrderCustomerOptions();

    if (this.createOrderCustomerOptions.length === 1) {
      this.currentOrder.customerId = this.createOrderCustomerOptions[0].value;
    } else {
      this.currentOrder.customerId = null;
    }
  }

  @CatchError()
  onCreateOrderTypeChanged() {
    this.updateProductPackagesOptions();
  }

  private updateProductPackagesOptions() {
    const productPackagesOptions: MultiselectOption[] = [];

    if (this.currentOrder?.orderType) {
      let quantities: number[] = [];
      let quantText = "";
      if (parseInt(this.currentOrder.orderType) === OrderType.SETUP) {
        quantities = [0];
      } else if (parseInt(this.currentOrder.orderType) === OrderType.SUBSCRIPTION) {
        quantities = [1, 4, 12];
        quantText = " - Yearly ";
      }

      for (const productPackage of this.productPackages) {
        if (productPackage.id !== 1) { // Skip CSP_PTC Base
          for (const quantity of quantities) {
            productPackagesOptions.push({ 
              id: productPackage.id + "_" + quantity, 
              label: productPackage.name + (quantText ? quantText + quantity : ""),
            });
          }
        }
      }

      this.productPackagesOptions = productPackagesOptions;
    }
  }

  private updatePlantFilterOptions() {
    this.plantFilterOptions = [
      { value: null, text: "" },
      ...this.plants.filter(plant => !this.selectedCustomerId || plant.customers!
          .find(customer => customer.id === this.selectedCustomerId))
        .map(plant => ({ value: plant.id, text: plant.name }))
    ];
  }

  private updateCustomerFilterOptions() {
    this.customerFilterOptions = [
      { value: null, text: "" },
      ...this.customers.filter(customer => !this.selectedPlantId ||
          this.plants.find(plant => plant.id === this.selectedPlantId)!.customers!.find(c => c.id === customer.id))
        .map(customer => ({ value: customer.id, text: customer.name }))
    ];
  }

  private updateCreateOrderCustomerOptions() {
    if (this.currentOrder?.plantId) {
      this.createOrderCustomerOptions = this.plants.find(plant => plant.id === this.currentOrder!.plantId)!
        .customers!.map(customer => ({ value: customer.id, text: customer.name }));
    } else {
      this.createOrderCustomerOptions = [];
    }
  }

  private getUserCreatedUpdated(order: OrderSchema): string {
    const createdOrChanged = this.$t(order.updated_at ? "changed-by" : "created-by").toString();
    const user = order.user_updated || order.user_created;
    const userName = (user.first_name + " " + user.last_name).trim() || user.email;
    const at = this.$t(...dateHelper.getTimeDiff(order.updated_at || order.created_at)).toString();

    return `${createdOrChanged}<br>${userName}<br>${at}`;
  }

  private concatProductPackagesWithYearly(productPackages: OrderProductPackageSchema[]): string[] {
    return productPackages.map(pp => `${pp.product_package.id}_${pp.quantity}`);
  }

  private unchainProductPackagesWithYearly(concatProductPackages: string[]): ProductPackagesQuantities {
    const result: ProductPackagesQuantities = { productPackages: [], quantities: [] };

    for (const concatProductPackage of concatProductPackages) {
      const splittedPP = concatProductPackage.split("_");
      result.productPackages.push(parseInt(splittedPP[0]));
      result.quantities.push(parseInt(splittedPP[1]));
    }

    return result
  }

}
</script>

<style lang="scss">
.app-settings-order-plants-selection {
  max-height: 400px;
  overflow-y: auto;
}
</style>
