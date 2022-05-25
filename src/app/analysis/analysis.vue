<template>
  <app-content :title="$t('analysis-overview')" :subtitle="$t('analysis-overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'AnalysisNew' }">
        <b-button
          variant="primary"
          :disabled="!!incompleteAnalysisName"
          :title="(incompleteAnalysisName && $t('no-new-upload-allowed', { name: incompleteAnalysisName })) || ''"
        >
          {{ createNewAnalysisBtnText }}
        </b-button>
      </router-link>
      <div class="app-analysis-plants-filter pull-right" v-show="plantSelection">
        <b-form-select
          id="plants"
          class="app-analysis-plants-filter-select"
          v-model="selectedPlantId"
          :options="plantSelection"
          @change="onPlantSelectionChanged"
        >
        </b-form-select>
        <label class="app-analysis-plants-filter-label" for="plants">{{ $t("plant") }}</label>
      </div>
      <div class="app-analysis-customer-filter pull-right" v-show="customers">
        <b-form-select
          id="customers"
          class="app-analysis-customers-filter-select"
          v-model="selectedCustomerId"
          :options="customers"
          @change="onCustomerSelectionChanged"
        >
        </b-form-select>
        <label class="app-analysis-customers-filter-label" for="customers">{{ $t("customer") }}</label>
      </div>
      <div class="clear"></div>
      <app-table-container>
        <b-table
          hover
          :fields="columns"
          :items="analysisRows"
          head-variant="light"
          show-empty
          :emptyText="$t('no-data')"
          :busy="isLoading"
        >
          <template #table-busy>
            <div class="text-center">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template #empty="scope">
            <span class="grayed">{{ scope.emptyText }}</span>
          </template>

          <template #head(actions)>
            <span class="hidden">{{ $t("actions") }}</span>
          </template>
          <template #cell(name)="row">
            <router-link :to="{ name: 'EditAnalysis', params: { id: row.item.id } }">{{ row.item.name }}</router-link>
          </template>
          <template #cell(plant)="row">
            {{ row.item.plant }}<br />
            <small class="grayed">{{ row.item.customer }}</small>
          </template>
          <template #cell(user)="row">
            <span v-if="row.item.user.userName">
              {{ row.item.user.userName }}<br />
              <small class="grayed">{{ row.item.user.email }}</small>
            </span>
            <span v-else>{{ row.item.user.email }}</span>
          </template>

          <template #cell(state)="row">
            <div v-if="row.item.state">
              {{ $t(row.item.state.state.name) }}
              <br />
              <small class="grayed">{{ trans(getTimeDiff(row.item.state.started_at)) }}</small>
            </div>
            <div v-else>UNKNOWN</div>
          </template>
          <template #cell(hasResults)="row">
            <b-icon v-show="row.item.analysisResultId" icon="check" class="font-xl text-success" />
          </template>
          <template #cell(actions)="row">
            <div class="hover-cell pull-right">
              <router-link
                v-if="row.item.analysisResultId"
                :title="$t('show-results')"
                :to="{
                  name: 'Plant',
                  params: { id: row.item.plantId },
                  query: { view: 'table', result: row.item.analysisResultId },
                }"
              >
                <b-button variant="primary" size="sm"><b-icon icon="graph-up"></b-icon></b-button>
              </router-link>
            </div>
            <div class="clearfix"></div>
          </template>
        </b-table>
      </app-table-container>
    </div>
  </app-content>
</template>

<script lang="ts">
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppModalFormInfoArea from "@/app/shared/components/app-modal/app-modal-form-info-area.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import { Component } from "vue-property-decorator";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { ApiException } from "../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import { ApiStates } from "../shared/services/volateq-api/api-states";
import volateqApi from "../shared/services/volateq-api/volateq-api";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
    AppModalFormInfoArea,
  },
})
export default class AppAnalysis extends BaseAuthComponent {
  columns: BvTableFieldArray = [];

  plants!: PlantSchema[];
  plantSelection: Array<any> | null = null;
  selectedPlantId: string | null = null;

  customers: Array<any> | null = null;
  selectedCustomerId: string | null = null;

  analysisRows: Array<any> | null = null;
  isLoading = true;

  createNewAnalysisBtnText = "";
  uploadStateProcess = "";

  async created() {
    this.createNewAnalysisBtnText = this.$t("new-data-upload").toString();

    this.columns = [
      { key: "name", label: this.$t("name").toString(), sortable: true },
      { key: "plant", label: this.$t("plant").toString(), sortable: true },
      {
        key: "date",
        label: this.$t("acquisition-date").toString(),
        sortable: true,
        formatter: (flownAt: string) => {
          return new Date(Date.parse(flownAt)).toLocaleDateString();
        },
      },
      { key: "user", label: this.$t("created-by").toString(), sortable: true },
      { key: "state", label: this.$t("state").toString(), sortable: true },
      { key: "hasResults", label: this.$t("has-results").toString() },
      { key: "actions" },
    ];

    await this.getPlants();

    await this.updateAnalysisRows();
  }

  // "this" is undefined in html component... so (")this(") is a workaround...
  trans(args: [string, any]): string {
    return this.$t(...args).toString();
  }

  async onPlantSelectionChanged() {
    if (this.selectedPlantId) {
      const plant = this.plants!.find(plant => plant.id === this.selectedPlantId);
      if (plant!.customers.length > 1) {
        this.customers = [
          { value: null, text: "" },
          ...plant!.customers.map(customer => ({ value: customer.id, text: customer.name }))
        ];
      } else {
        this.customers = null;
      }
    } else {
      this.customers = null;
    }
    

    await this.updateAnalysisRows();
  }

  async onCustomerSelectionChanged() {
    await this.updateAnalysisRows();
  }

  get incompleteAnalysisName(): string | null {
    const analysisName = this.analysisRows?.find(
      analysis => analysis.state && analysis.state.state.id <= ApiStates.DATA_INCOMPLETE
    )?.name;

    return analysisName || null;
  }

  private async updateAnalysisRows() {
    this.isLoading = true;

    try {
      const analysisFilter: { plant_id?: string, customer_id?: string } = {};
      if (this.selectedPlantId) {
        analysisFilter.plant_id = this.selectedPlantId;
      }
      if (this.selectedCustomerId) {
        analysisFilter.customer_id = this.selectedCustomerId;
      }
      
      this.analysisRows = (await volateqApi.getAllAnalysis(analysisFilter)).map((a: AnalysisSchema) => {
        const row = {
          id: a.id,
          name: a.name,
          date: a.flown_at,
          user:
            (a.user && {
              userName: ((a.user.first_name || "") + " " + (a.user.last_name || "")).trim(),
              email: a.user.email,
            }) ||
            "",
          analysisResultId:
            (a.analysis_result && (this.isSuperAdmin || a.analysis_result.released) && a.analysis_result.id) ||
            undefined,
          state: a.current_state,
          files: a.files,
          plantId: a.plant.id,
          plant: a.plant.name,
          customer: a.customer.name,
        };

        return row;
      });
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } finally {
      this.isLoading = false;
    }
  }

  private async getPlants() {
    this.plants = await volateqApi.getPlants();
    // Hide the filter if one plant is available
    if (this.plants.length > 1) {
      this.plantSelection = this.plants.map(plant => ({ value: plant.id, text: plant.name }));
      this.plantSelection.unshift({ value: null, text: "" });
    }
  }
}
</script>

<style lang="scss">
.app-analysis {
  &-plants-filter {
    width: 300px;
  }
}

.app-analysis-plants-filter-select, .app-analysis-customers-filter-select {
  width: 200px !important;
  float: right;
}
.app-analysis-plants-filter-label, .app-analysis-customers-filter-label {
  float: right;
  margin-top: 5px;
  padding-right: 1em;
}
</style>
