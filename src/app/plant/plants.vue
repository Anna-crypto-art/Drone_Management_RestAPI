<template>
  <app-content :title="$t('plants-overview')" :subtitle="$t('plants-overview_descr')">
    <div class="plant-tools" v-if="isSuperAdmin">
      <app-button variant="secondary" @click="onCreatePlantClick()" :superAdminProtected="true">{{ $t('create-plant') }}</app-button>
    </div>
    <app-table-container>
      <app-table
        :columns="columns"
        :rows="plants"
        :loading="tableLoading"
        :hoverActions="true"
      >
        <template #cell(name)="row">
          <router-link v-show="row.item.digitized" :to="{ name: 'Plant', params: { id: row.item.id } }">
            <span translate="no">{{ row.item.name }}</span>
          </router-link>
          <span v-if="!row.item.digitized">{{ row.item.name }}</span>
          <div>
            <small class="grayed">
              {{ row.item.analysesCount }} {{ $t("analyses") }}
            </small>
          </div>
        </template>
        <template #cell(productPackages)="row">
          <app-order-pps-view :orderProductPackages="row.item.productPackages"  />
        </template>

        <template #cell(digitized)="row">
          <app-icon :cls="row.item.digitized ? 'green' : 'red'" :icon="row.item.digitized ? 'check2' : 'x'" />
        </template>
        <template #cell(established)="row">
          <app-icon
            :cls="row.item.established ? 'green' : 'red'"
            :icon="row.item.established ? 'check2' : 'x'"
          />
        </template>
        <template #hoverActions="row">
          <app-button
            v-show="isSuperAdmin"
            @click="onManagePlantClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('upload-dt')"
            icon="hammer"
            :superAdminProtected="true"
          />
          <app-button
            v-show="isSuperAdmin"
            @click="onEditPlantClick(row.item)"
            variant="secondary"
            size="sm"
            :title="$t('edit-plant')"
            icon="wrench"
            :superAdminProtected="true"
          />
          <app-button
            v-show="isSuperAdmin"
            @click="onDeletePlantClick(row.item)"
            variant="outline-danger"
            size="sm"
            :title="$t('delete-plant')"
            icon="trash"
            :superAdminProtected="true"
          />
        </template>
      </app-table>
    </app-table-container>

    <app-modal-form
      id="manage-plant-modal"
      ref="managePlantModal"
      :title="$t('upload-dt')"
      :subtitle="managePlantModel.plant && managePlantModel.plant.name || ''"
      :ok-title="$t('apply')"
      :cancel-title="$t('cancel')"
      :modalLoading="plantModalLoading"
      @submit="saveManagePlant"
      :superAdminProtected="true"
    >
      <b-form-group v-if="managePlantModel.plant" v-show="managePlantModel.plant.fieldgeometry">
        <a href="#" @click="onFileClick(managePlantModel.plant.fieldgeometry)">
          {{ managePlantModel.plant.fieldgeometry && managePlantModel.plant.fieldgeometry.file_name }}
        </a>
      </b-form-group>
      <b-form-group>
        <b-alert :show="!removeDigitalTwinAllowed" variant="info">
          {{ $t("remove-digital-twin-not-allowed_descr") }}
        </b-alert>
        <b-form-checkbox id="clear-before-checkbox" v-model="managePlantModel.clearBefore" :disabled="!removeDigitalTwinAllowed">
          {{ $t("clear-before") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-dt-json-file')">
        <app-simple-file-upload v-model="managePlantModel.file" :uploadProgress="uploadProgress" accept=".json" />
      </b-form-group>
    </app-modal-form>

    <app-modal-form
      id="create-plant-modal"
      ref="appCreatePlantModal"
      :title="$t('create-plant')"
      :okTitle="$t('create')"
      :cancel-title="$t('cancel')"
      :modalLoading="createPlantLoading"
      @submit="onSubmitCreatePlant"
      :superAdminProtected="true"
    >
      <b-row>
        <b-col>
          <b-form-group :label="$t('name')">
            <b-form-input id="new-plant-name" v-model="newPlant.name" required :placeholder="$t('name')" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group :label="$t('technology')">
            <b-form-select id="new-plant-technology" v-model="newPlant.technology_id" :options="technologies" required />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group :label="$t('customer')">
            <b-form-select id="new-plant-customer" v-model="newPlant.customer_id" :options="customers" required />
          </b-form-group>
        </b-col>
      </b-row>
    </app-modal-form>

    <app-modal-form
      id="edit-plant-modal"
      ref="appEditPlantModal"
      :title="$t('edit-plant')"
      :subtitle="editPlant && editPlant.name || ''"
      :okTitle="$t('apply')"
      :cancel-title="$t('cancel')"
      :modalLoading="editPlantLoading"
      @submit="onSubmitEditPlant"
      :superAdminProtected="true"
    >
      <div v-if="editPlant">
        <b-form-group :label="$t('name')">
          <b-form-input id="edit-plant-name" v-model="editPlant.name" required :placeholder="$t('name')" />
        </b-form-group>
        <b-form-group v-if="editPlant.digitized" :label="$t('setup-phase')">
          <b-form-checkbox v-model="editPlant.inSetupPhase" switch>
            {{ $t("in-setup-phase") }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group v-if="editPlant.digitized" :label="$t('orientation-angle')">
          <b-form-input type="number" step="0.01" min="-90" max="90" v-model="editPlant.orientation" />
        </b-form-group>
      </div>
    </app-modal-form>
  </app-content>
</template>

<script lang="ts">
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { Component, Ref } from "vue-property-decorator";
import { IAppModalForm } from "../shared/components/app-modal/types";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { AppDownloader } from "../shared/services/app-downloader/app-downloader";
import { FieldgeometrySchema } from "../shared/services/volateq-api/api-schemas/fieldgeometry-schema";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { EditPlant, PlantItem } from "./types";
import AppButton from "@/app/shared/components/app-button/app-button.vue"
import AppTable from "@/app/shared/components/app-table/app-table.vue"
import AppIcon from "@/app/shared/components/app-icon/app-icon.vue"
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppModalFormInfoArea from "../shared/components/app-modal/app-modal-form-info-area.vue";
import AppOrderPpsView from "@/app/shared/components/app-order-pps-view/app-order-pps-view.vue";
import { sortAlphabetical } from "../shared/services/helper/sort-helper";
import { CatchError } from "../shared/services/helper/catch-helper";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import { OrderProductPackageSchema, OrderSchema } from "../shared/services/volateq-api/api-schemas/order-schema";
import { AppTableColumns } from "../shared/components/app-table/types";
import AppSimpleFileUpload from "@/app/shared/components/app-simple-file-upload/app-simple-file-upload.vue";
import { UploadProgress } from "@/app/shared/components/app-simple-file-upload/types";

@Component({
  name: "app-plants",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
    AppButton,
    AppSuperAdminMarker,
    AppModalFormInfoArea,
    AppOrderPpsView,
    AppTable,
    AppIcon,
    AppSimpleFileUpload,
  },
})
export default class AppPlants extends BaseAuthComponent {
  @Ref() managePlantModal!: IAppModalForm;
  plantModalLoading = false;

  columns: AppTableColumns | null = null;
  plants: PlantItem[] | null = null;

  uploadProgress: UploadProgress | null = null;

  tableLoading = false;
  managePlantModel: { plant: PlantItem | null; clearBefore: boolean; file: File | null } = {
    plant: null,
    clearBefore: false,
    file: null,
  };

  customers: Array<any> = [];

  technologies: Array<any> = [];

  @Ref() appCreatePlantModal!: IAppModalForm;
  createPlantLoading = false;
  newPlant: { name: string, technology_id: number | null, customer_id: string | null } | null = 
    { name: "", technology_id: null, customer_id: null };
  
  @Ref() appEditPlantModal!: IAppModalForm;
  editPlantLoading = false;
  editPlant: EditPlant | null = null

  @CatchError("tableLoading")
  async created(): Promise<void> {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "productPackages", label: this.$t("product-packages").toString() },
    ];

    if (this.isSuperAdmin) {
      this.columns.push({ key: "established", label: this.$t("established").toString(), superAdminOnly: true });
      this.columns.push({ key: "technology", label: this.$t("technology").toString(), superAdminOnly: true });
      this.columns.push({ key: "customerNames", label: this.$t("customers").toString(), superAdminOnly: true });

      this.customers = [
        { value: null, text: "" },
        ...(await volateqApi.getCustomers()).map(customer => ({ value: customer.id, text: customer.name }))
      ];

      this.technologies = (await volateqApi.getTechnologies()).map(tech => ({ value: tech.id, text: tech.abbrev }))
    }

    await this.updatePlants();
  }

  private async updatePlants(): Promise<void> {
    this.plants = sortAlphabetical<PlantSchema>(await volateqApi.getPlants(true, true), "name").map(plant => ({
      id: plant.id,
      name: plant.name,
      digitized: !!plant.fieldgeometry,
      analysesCount: plant.analysis_results_count!,
      established: !plant.in_setup_phase,
      fieldgeometry: plant.fieldgeometry,
      technology: plant.technology.abbrev,
      customerNames: plant.customers?.map(customer => customer.name).join(", "),
      customers: plant.customers,
      productPackages: ((orders: OrderSchema[]): OrderProductPackageSchema[] => { 
        const pps: OrderProductPackageSchema[] = [];
        for (const order of orders) {
          pps.push(...order.order_product_packages.filter(pp => pp.product_package.id !== 1)); // Filter CSP_PTC Base product
        }
        return pps;
      })(plant.current_orders),
    }));
  }

  @CatchError("plantModalLoading")
  async saveManagePlant(): Promise<void> {
    const task = await volateqApi.importFieldgeometry(
      this.managePlantModel.file!,
      this.managePlantModel.plant!.id,
      this.managePlantModel.clearBefore,
      (progressEvent) => {
        this.uploadProgress = { total: progressEvent.total, loaded: progressEvent.loaded };
      }
    );

    volateqApi.waitForTask(
      task.id,
      async (task, failed) => {
        this.plantModalLoading = false;

        if (failed) {
          this.showError({ error: "SOMETHING_WENT_WRONG", message: task.output!.error });
        } else {
          this.managePlantModal.hide();
          this.showSuccess(this.$t("dt-imported-successfully").toString());
          await this.updatePlants();
        }
      },
      task => {
        this.managePlantModal.alertInfo(volateqApi.getTaskOutputAsMessage(task, this.$t("wait-for-start").toString()));
      }
    );
  }

  @CatchError()
  onManagePlantClick(plant: PlantItem): void {
    this.managePlantModel.plant = plant;
    this.managePlantModel.clearBefore = this.removeDigitalTwinAllowed;
    this.managePlantModel.file = null;

    this.managePlantModal.show();
  }

  @CatchError()
  async onFileClick(fieldgeometry: FieldgeometrySchema) {
    const downloadUrl = await volateqApi.getFieldgeometryFileUrl(fieldgeometry.id);
    AppDownloader.download(downloadUrl.url, fieldgeometry.file_name);
  }

  @CatchError()
  onCreatePlantClick() {
    this.newPlant = { name: "", technology_id: null, customer_id: this.selectedCustomer?.id || null };
    this.appCreatePlantModal.hideAlert();
    this.appCreatePlantModal.show();
  }
  
  @CatchError("createPlantLoading")
  async onSubmitCreatePlant() {
    await volateqApi.createPlant({
      name: this.newPlant!.name,
      technology_id: this.newPlant!.technology_id!,
      customer_id: this.newPlant!.customer_id!
    });

    this.appCreatePlantModal.hide();

    this.showSuccess(this.$t("plant-created-success").toString());
    
    await this.updatePlants();
  }

  @CatchError("tableLoading")
  async onDeletePlantClick(plant: PlantItem) {
    if (!confirm(this.$t("sure-delete-plant", {plant: plant.name }).toString())) {
      return;
    }

    await volateqApi.deletePlant(plant.id);

    this.showSuccess(this.$t("plant-deleted-success", { plant: plant.name }).toString());

    await this.updatePlants();
  }

  @CatchError()
  onEditPlantClick(plant: PlantItem) {
    this.editPlant = { 
      id: plant.id,
      name: plant.name,
      digitized: plant.digitized,
      inSetupPhase: !plant.established,
      orientation: plant.fieldgeometry?.orientation,
    };
    this.appEditPlantModal.show();
  }

  @CatchError("editPlantLoading")
  async onSubmitEditPlant() {
    await volateqApi.updatePlant(this.editPlant!.id, { 
      name: this.editPlant!.name,
      in_setup_phase: this.editPlant!.inSetupPhase,
      orientation: this.editPlant?.orientation || undefined,
    });

    this.appEditPlantModal.hide();

    this.showSuccess(this.$t("plant-updated-success", { plant: this.editPlant!.name }).toString());

    await this.updatePlants();
  }

  get removeDigitalTwinAllowed(): boolean {
    if (this.managePlantModel.plant) {
      return this.managePlantModel.plant.analysesCount == 0;
    }
    return true;
  }
}
</script>

<style lang="scss">
</style>