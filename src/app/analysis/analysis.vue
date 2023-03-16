<template>
  <app-content :title="$t('analysis-overview')" :subtitle="$t('analysis-overview_descr')">
    <div class="app-analysis">
      <app-button variant="primary" v-if="hasCompleteAnalysesOnly" @click="onNewDataUploadClick">
        {{ $t("create-new-analysis") }}
      </app-button>
      <b-alert :show="!!incompleteAnalysis" variant="info" class="mar-bottom-2x">
        <span v-if="incompleteAnalysis" v-html="$t('new-upload-not-allowed_descr', { analysis: incompleteAnalysis.name })"></span>
      </b-alert>
      <router-link v-if="incompleteAnalysis" :to="{ name: 'EditAnalysis', params: { id: incompleteAnalysis.id } }"> 
        <app-button variant="primary">
          {{ $t("upload-data-for-analysis", { analysis: incompleteAnalysis.name }) }}
        </app-button>
      </router-link>
      <app-table-filter v-show="plantSelection">
        <label for="plants">{{ $t("plant") }}</label>
        <b-form-select
          id="plants"
          v-model="selectedPlantId"
          :options="plantSelection"
          @change="onPlantSelectionChanged"
        />
      </app-table-filter>
      <div class="clear"></div>
      <app-table-container>
        <app-table
          :columns="columns"
          :rows="analysisRows"
          :loading="isLoading"
          :hoverActions="true"
        >
          <template #cell(name)="row">
            <router-link :to="{ name: 'EditAnalysis', params: { id: row.item.id } }">{{ row.item.name }}</router-link>
            <div>
              <small class="grayed">{{ row.item.user.userName || row.item.user.email }}</small>
            </div>
          </template>

          <template #cell(state)="row">
            <div v-if="row.item.state">
              {{ $t(row.item.state.state.name) }}
              <b-icon 
                v-show="hasReleasedResult(row.item)"
                icon="check"
                class="text-success"
                v-b-popover.hover.top="$t('results-available')"
              />
              <b-icon 
                v-show="isSuperAdmin && hasResult(row.item) && !hasReleasedResult(row.item)"
                icon="shield-check"
                class="text-success" 
                v-b-popover.hover.top="$t('results-available-super-admin-only')"
              />
              <br />
              <small class="grayed">{{ trans(getTimeDiff(row.item.state.started_at)) }}</small>
            </div>
            <div v-else>UNKNOWN</div>
          </template>

          <template #cell(productPackages)="row">
            <app-order-pps-view :orderProductPackages="row.item.productPackages" />
          </template>

          <template #hoverActions="row">
            <router-link
              v-if="hasReadableResult(row.item)"
              :title="$t('show-results')"
              :to="{
                name: 'Plant',
                params: { id: row.item.plantId },
                query: { view: 'map', result: row.item.id },
              }"
            >
              <app-button variant="primary" size="sm">
                <app-icon-analysis />
              </app-button>
            </router-link>
          </template>

        </app-table>
      </app-table-container>
    </div>
  </app-content>
</template>

<script lang="ts">
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppModalFormInfoArea from "@/app/shared/components/app-modal/app-modal-form-info-area.vue";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import AppTable from "@/app/shared/components/app-table/app-table.vue";
import AppTableFilter from "@/app/shared/components/app-table-filter/app-table-filter.vue";
import AppOrderPpsView from "@/app/shared/components/app-order-pps-view/app-order-pps-view.vue";
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { sortAlphabetical } from "../shared/services/helper/sort-helper";
import dateHelper from "../shared/services/helper/date-helper";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import { ApiStates } from "../shared/services/volateq-api/api-states";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppIconAnalysis from "@/app/shared/components/app-icon/app-icon-analysis.vue";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { AppTableColumns } from "../shared/components/app-table/types";
import { CatchError } from "../shared/services/helper/catch-helper";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { appLocalStorage } from "../shared/services/app-storage/app-storage";

const SELECTED_PLANT_KEY = "app-analysis:selectedPlantId"

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
    AppModalFormInfoArea,
    AppTableFilter,
    AppOrderPpsView,
    AppSuperAdminMarker,
    AppIconAnalysis,
    AppTable,
    AppButton,
  },
})
export default class AppAnalysis extends BaseAuthComponent {
  columns: AppTableColumns = [];

  plants!: PlantSchema[];
  plantSelection: Array<any> | null = null;
  selectedPlantId: string | null = null;

  analysisRows: Array<any> | null = null;
  isLoading = true;

  createNewAnalysisBtnText = "";
  uploadStateProcess = "";

  async created() {
    this.createNewAnalysisBtnText = this.$t("new-data-upload").toString();

    this.columns = [
      { key: "name", label: this.$t("name").toString(), sortable: true },
      {
        key: "date",
        label: this.$t("acquisition-date").toString(),
        sortable: true,
        formatter: (flownAt: string) => {
          return dateHelper.toDate(flownAt);
        },
      },
      { key: "state", label: this.$t("state").toString(), sortable: true },
      { key: "productPackages", label: this.$t("product-packages").toString() },
    ];

    if (this.isSuperAdmin) {
      this.columns.push({ 
        key: "customer",
        label: this.$t("customer").toString(),
        sortable: true,
        superAdminOnly: true,
      });
    }

    await this.getPlants();

    await this.updateAnalysisRows();
  }

  // "this" is undefined in html component... so (")this(") is a workaround...
  trans(args: [string, any]): string {
    return this.$t(...args).toString();
  }

  async onPlantSelectionChanged() {
    appLocalStorage.setItem(SELECTED_PLANT_KEY, this.selectedPlantId);

    await this.updateAnalysisRows();
  }

  get hasCompleteAnalysesOnly(): boolean {
    return this.analysisRows && this.incompleteAnalyses.length === 0 || false;
  }

  get incompleteAnalysis(): any | null {
    const incompleteAnalyses = this.incompleteAnalyses;
    if (incompleteAnalyses.length === 1) {
      return incompleteAnalyses[0];
    }

    return null;
  }

  get incompleteAnalyses(): any[] {
    if (!this.analysisRows) {
      return [];
    }

    return this.analysisRows.filter(
      analysis => analysis.state && analysis.state.state.id <= ApiStates.DATA_INCOMPLETE
    );
  }

  hasResult(analysisItem: any): boolean {
    return !!analysisItem.analysisResult
  }

  hasReleasedResult(analysisItem: any): boolean {
    return analysisItem.analysisResult?.released || false;
  }

  hasReadableResult(analysisItem: any): boolean {
    return this.hasReleasedResult(analysisItem) || (this.isSuperAdmin && this.hasResult(analysisItem));
  }

  onNewDataUploadClick() {
    if (this.hasCompleteAnalysesOnly) {
      const query = this.selectedPlantId ? { plantId: this.selectedPlantId } : undefined;

      this.$router.push({ name: "AnalysisNew", query });
    }
  }

  @CatchError("isLoading")
  private async updateAnalysisRows() {
    const analysisFilter: { plant_id?: string, customer_id?: string } = {};
    if (this.selectedPlantId) {
      analysisFilter.plant_id = this.selectedPlantId;
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
        analysisResult: a.analysis_result,
        state: a.current_state,
        files: a.files,
        plantId: a.plant.id,
        plant: a.plant.name,
        customer: a.customer.name,
        productPackages: a.order_product_packages,
      };

      return row;
    });
  }

  @CatchError()
  private async getPlants() {
    this.plants = sortAlphabetical(await volateqApi.getPlants(), "name");
    // Hide the filter if one plant is available
    if (this.plants.length > 1) {
      this.plantSelection = this.plants.map(plant => ({ value: plant.id, text: plant.name }));
      this.plantSelection.unshift({ value: null, text: "" });

      const selectedPlantId = appLocalStorage.getItem(SELECTED_PLANT_KEY);
      if (selectedPlantId && this.plantSelection.find(p => p.value === selectedPlantId)) {
        this.selectedPlantId = selectedPlantId;
      }
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
</style>
