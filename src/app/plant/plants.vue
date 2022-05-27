<template>
  <app-content :title="$t('plants-overview')" :subtitle="$t('plants-overview_descr')">
    <div class="plant-tools" v-if="isSuperAdmin">
      <b-button variant="secondary" @click="onCreatePlantClick()">{{ $t('create-plant') }}</b-button>
      <b-form-select
        id="customers"
        class="plant-tools-select-customer"
        v-model="selectedCustomerId"
        :options="customers"
        @change="onCustomerSelectionChanged"
      />
      <label class="plant-tools-select-customer-label" for="customers">{{ $t("customer") }}</label>
      <div class="clearfix"></div>
    </div>
    <app-table-container>
      <b-table
        hover
        :fields="columns"
        :items="plants"
        head-variant="light"
        show-empty
        :emptyText="$t('no-data')"
        :busy="tableLoading"
      >
        <template #table-busy>
          <div class="text-center">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>

        <template #head(actions)>
          <span class="hidden">{{ $t("actions") }}</span>
        </template>

        <template #cell(name)="row">
          <router-link v-show="row.item.digitized" :to="{ name: 'Plant', params: { id: row.item.id } }">
            {{ row.item.name }}
          </router-link>
          <span v-if="!row.item.digitized">{{ row.item.name }}</span>
        </template>

        <template #cell(digitized)="row">
          <b-icon :class="row.item.digitized ? 'green' : 'red'" :icon="row.item.digitized ? 'check2' : 'x'"></b-icon>
        </template>
        <template #cell(established)="row">
          <b-icon
            :class="row.item.established ? 'green' : 'red'"
            :icon="row.item.established ? 'check2' : 'x'"
          ></b-icon>
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <b-button
              v-show="isSuperAdmin"
              @click="onManagePlantClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('upload-dt')"
            >
              <b-icon icon="hammer"></b-icon>
            </b-button>
            <b-button
              @click="onEditPlantClick(row.item)"
              variant="secondary"
              size="sm"
              :title="$t('edit-plant')"
            >
              <b-icon icon="wrench"></b-icon>
            </b-button>
            <b-button
              @click="onDeletePlantClick(row.item)"
              variant="outline-danger"
              size="sm"
              :title="$t('delete-plant')"
            >
              <b-icon icon="trash"></b-icon>
            </b-button>
          </div>
          <div class="clearfix"></div>
        </template>
      </b-table>
    </app-table-container>

    <app-modal-form
      id="manage-plant-modal"
      ref="managePlantModal"
      :title="$t('upload-dt')"
      :subtitle="$t('upload-dt_descr')"
      :ok-title="$t('apply')"
      :modalLoading="plantModalLoading"
      @submit="saveManagePlant"
    >
      <b-form-group v-if="managePlantModel.plant" v-show="managePlantModel.plant.fieldgeometry">
        <a href="#" @click="onFileClick(managePlantModel.plant.fieldgeometry)">
          {{ managePlantModel.plant.fieldgeometry && managePlantModel.plant.fieldgeometry.file_name }}
        </a>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox id="clear-before-checkbox" v-model="managePlantModel.clearBefore">
          {{ $t("clear-before") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-dt-json-file')">
        <b-form-file v-model="managePlantModel.file" required accept=".json"></b-form-file>
      </b-form-group>
    </app-modal-form>

    <app-modal-form
      id="create-plant-modal"
      ref="appCreatePlantModal"
      :title="$t('create-plant')"
      :okTitle="$t('create')"
      :modalLoading="createPlantLoading"
      @submit="onSubmitCreatePlant"
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
      :okTitle="$t('apply')"
      :modalLoading="editPlantLoading"
      @submit="onSubmitEditPlant"
    >
      <b-form-group :label="$t('name')" v-if="editPlant">
        <b-form-input id="edit-plant-name" v-model="editPlant.name" required :placeholder="$t('name')" />
      </b-form-group>
    </app-modal-form>
  </app-content>
</template>

<script lang="ts">
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import { Component, Ref } from "vue-property-decorator";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import { IAppModalForm } from "../shared/components/app-modal/types";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { AppDownloader } from "../shared/services/app-downloader/app-downloader";
import { ApiException } from "../shared/services/volateq-api/api-errors";
import { FieldgeometrySchema } from "../shared/services/volateq-api/api-schemas/fieldgeometry-schema";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { PlantItem } from "./types";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
  },
})
export default class AppPlants extends BaseAuthComponent {
  @Ref() managePlantModal!: IAppModalForm;
  plantModalLoading = false;

  columns: BvTableFieldArray | null = null;
  plants: PlantItem[] | null = null;

  tableLoading = false;
  managePlantModel: { plant: PlantItem | null; clearBefore: boolean; file: File | null } = {
    plant: null,
    clearBefore: true,
    file: null,
  };

  selectedCustomerId: string | null = null;
  customers: Array<any> = [];

  technologies: Array<any> = [];

  @Ref() appCreatePlantModal!: IAppModalForm;
  createPlantLoading = false;
  newPlant: { name: string, technology_id: number | null, customer_id: string | null } | null = 
    { name: "", technology_id: null, customer_id: null };
  
  @Ref() appEditPlantModal!: IAppModalForm;
  editPlantLoading = false;
  editPlant: { id: string, name: string } | null = null

  async created(): Promise<void> {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "digitized", label: this.$t("digitized").toString() },
      { key: "established", label: this.$t("established").toString() },
      { key: "analysesCount", label: this.$t("number-of-analyses").toString() },
      { key: "technology", label: this.$t("technology").toString() }
    ];

    if (this.isSuperAdmin) {
      this.columns.push({ key: "customers", label: this.$t("customers").toString() })
      this.columns.push({ key: "actions" });

      this.customers = [
        { value: null, text: "" },
        ...(await volateqApi.getCustomers()).map(customer => ({ value: customer.id, text: customer.name }))
      ];

      this.technologies = (await volateqApi.getTechnologies()).map(tech => ({ value: tech.id, text: tech.abbrev }))
    }

    await this.updatePlants();
  }

  async updatePlants(): Promise<void> {
    try {
      this.tableLoading = true;
      const plants: PlantSchema[] = await volateqApi.getPlants(true, this.selectedCustomerId || undefined);

      this.plants = plants.map(plant => ({
        id: plant.id,
        name: plant.name,
        digitized: !!plant.fieldgeometry,
        analysesCount: plant.analysis_results_count!,
        established: !plant.in_setup_phase,
        fieldgeometry: plant.fieldgeometry,
        technology: plant.technology.abbrev,
        customers: plant.customers?.map(customer => customer.name).join(", "),
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
      })
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.tableLoading = false;
    }
  }

  async saveManagePlant(): Promise<void> {
    try {
      this.plantModalLoading = true;

      const task = await volateqApi.importFieldgeometry(
        this.managePlantModel.file!,
        this.managePlantModel.plant!.id,
        this.managePlantModel.clearBefore
      );
      volateqApi.waitForTask(
        task.id,
        async task => {
          this.plantModalLoading = false;

          if (task.state === "SUCCESS") {
            this.managePlantModal.hide();
            appContentEventBus.showSuccessAlert(this.$t("dt-imported-successfully").toString());
            await this.updatePlants();
          } else if (task.state === "FAILURE") {
            this.managePlantModal.alertError({ error: "SOMETHING_WENT_WRONG", details: task.result });
          }
        },
        info => {
          this.managePlantModal.alertInfo(info);
        }
      );
    } catch (e) {
      this.managePlantModal.alertError(e as ApiException);
    }
  }

  onManagePlantClick(plant: PlantItem): void {
    this.managePlantModel.plant = plant;
    this.managePlantModel.clearBefore = true;
    this.managePlantModel.file = null;

    this.managePlantModal.show();
  }

  async onFileClick(fieldgeometry: FieldgeometrySchema) {
    try {
      const downloadUrl = await volateqApi.getFieldgeometryFileUrl(fieldgeometry.id);

      AppDownloader.download(downloadUrl.url, fieldgeometry.file_name);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onCustomerSelectionChanged() {
    await this.updatePlants();
  }

  onCreatePlantClick() {
    this.newPlant = { name: "", technology_id: null, customer_id: null };
    this.appCreatePlantModal.hideAlert();
    this.appCreatePlantModal.show();
  }
  
  async onSubmitCreatePlant() {
    this.createPlantLoading = true;
    try {
      await volateqApi.createPlant({
        name: this.newPlant!.name,
        technology_id: this.newPlant!.technology_id!,
        customer_id: this.newPlant!.customer_id!
      });

      this.appCreatePlantModal.hide();

      appContentEventBus.showSuccessAlert(this.$t("plant-created-success").toString());
      
      await this.updatePlants();

    } catch (e) {
      this.appCreatePlantModal.alertError(e as ApiException);
    } finally {
      this.createPlantLoading = false;
    }
  }

  async onDeletePlantClick(plant: PlantItem) {
    this.tableLoading = true;
    try {
      if (!confirm(this.$t("sure-delete-plant", {plant: plant.name }).toString())) {
        return;
      }

      await volateqApi.deletePlant(plant.id);

      appContentEventBus.showSuccessAlert(this.$t("plant-deleted-success", { plant: plant.name }).toString());

      await this.updatePlants();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.tableLoading = false;
    }
  }

  onEditPlantClick(plant: PlantItem) {
    this.editPlant = { id: plant.id, name: plant.name };
    this.appEditPlantModal.hideAlert();
    this.appEditPlantModal.show();
  }

  async onSubmitEditPlant() {
    this.editPlantLoading = true;
    try {
      await volateqApi.updatePlant(this.editPlant!.id, { name: this.editPlant!.name });

      this.appEditPlantModal.hide();
      appContentEventBus.showSuccessAlert(this.$t("plant-updated-success", { plant: this.editPlant!.name }).toString());

      await this.updatePlants();
    } catch (e) {
      this.appEditPlantModal.alertError(e as ApiException);
    } finally {
      this.editPlantLoading = false;
    }
  }
}
</script>

<style lang="scss">
.plant-tools-select-customer {
  width: 200px !important;
  float: right;
  &-label {
    float: right;
    margin-top: 5px;
    padding-right: 1em;
  }
}
</style>