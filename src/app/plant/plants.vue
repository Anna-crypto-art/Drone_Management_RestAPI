<template>
  <app-content :title="$t('plants-overview')" :subtitle="$t('plants-overview_descr')">
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
      <b-form-group>
        <b-form-checkbox id="clear-before-checkbox" v-model="managePlantModel.clearBefore">
          {{ $t("clear-before") }}
        </b-form-checkbox>
      </b-form-group>
      <b-form-group :label="$t('select-dt-json-file')">
        <b-form-file v-model="managePlantModel.file" required accept=".json"></b-form-file>
      </b-form-group>
    </app-modal-form>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { IAppModalForm } from "../shared/components/app-modal/types";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import { PlantItem } from "./types";
import { ApiException } from "../shared/services/volateq-api/api-errors";

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

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "digitized", label: this.$t("digitized").toString() },
      { key: "analysesCount", label: this.$t("number-of-analyses").toString() },
    ];

    if (this.isSuperAdmin) {
      this.columns.push({ key: "actions" });
    }

    await this.updatePlants();
  }

  async updatePlants() {
    try {
      this.tableLoading = true;
      let plants: PlantSchema[] = [];

      if (this.isSuperAdmin) {
        const customers = await volateqApi.getCustomers();
        for (const customer of customers) {
          plants = plants.concat(await volateqApi.getPlants(customer.id));
        }
      } else {
        plants = await volateqApi.getPlants();
      }

      this.plants = [];
      for (const plant of plants) {
        this.plants.push({
          id: plant.id,
          customerId: plant.customer_id,
          name: plant.name,
          digitized: !!plant.fieldgeometry,
          analysesCount: (await volateqApi.getAnalysisResults(plant.id)).length,
        });
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.tableLoading = false;
    }
  }

  async saveManagePlant() {
    try {
      this.plantModalLoading = true;

      const task = await volateqApi.importFieldgeometry(
        this.managePlantModel.file!,
        this.managePlantModel.plant!.customerId,
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
}
</script>
