<template>
  <app-content :title="$t('plants-overview')" :subtitle="$t('plants-overview_descr')">
    <app-table-container>
      <b-table hover :fields="columns" :items="plants"
        head-variant="light"
        show-empty 
        :emptyText="$t('no-data')">
        <template #head(actions)>
          <span class="hidden">{{ $t("actions") }}</span>
        </template>
        <template #cell(digitized)="row">
          <b-icon :class="row.item.digitized ? 'green' : 'red'" :icon="row.item.digitized ? 'check2' : 'x'"></b-icon>
        </template>
        <template #cell(actions)="row">
          <div class="hover-cell pull-right">
            <router-link :to="{ name: 'Plant', params: { id: row.item.id }}">
              <b-button variant="primary" size="sm"><b-icon icon="graph-up"></b-icon></b-button>
            </router-link>
          </div>
          <div class="clearfix"></div>
        </template>
      </b-table>
    </app-table-container>
  </app-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer,
  }
})
export default class AppPlants extends BaseAuthComponent {
  columns: BvTableFieldArray | null = null;
  plants: Record<string, unknown>[] | null = null;

  async created() {
    this.columns = [
      { key: "name", label: this.$t("name").toString() },
      { key: "digitized", label: this.$t("digitized").toString() },
      { key: "analysesCount", label: this.$t("number-of-analyses").toString() },
      { key: "actions" }
    ];

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
        name: plant.name,
        digitized: !!plant.fieldgeometry,
        analysesCount: (await volateqApi.getAnalysisResults(plant.id)).length,
      })
    }
  }
}
</script>