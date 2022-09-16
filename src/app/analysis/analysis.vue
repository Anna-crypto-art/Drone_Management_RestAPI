<template>
  <app-content :title="$t('analysis-overview')" :subtitle="$t('analysis-overview_descr')">
    <div class="app-analysis">
      <b-button variant="primary" v-if="hasCompleteAnalysesOnly" @click="onNewDataUploadClick">
        {{ $t("new-data-upload") }}
      </b-button>
      <b-alert :show="!!incompleteAnalysis" variant="info" class="mar-bottom-2x">
        <span v-if="incompleteAnalysis" v-html="$t('new-upload-not-allowed_descr', { analysis: incompleteAnalysis.name })"></span>
      </b-alert>
      <router-link v-if="incompleteAnalysis" :to="{ name: 'EditAnalysis', params: { id: incompleteAnalysis.id } }"> 
        <b-button variant="primary">
          {{ $t("upload-data-for-analysis", { analysis: incompleteAnalysis.name }) }}
        </b-button>
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
            <b-icon v-show="hasResult(row.item) && !hasReleasedResult(row.item)" icon="check" class="font-xl text-success" />
            <b-icon v-show="hasReleasedResult(row.item)" icon="check-all" class="font-xl text-success" />
          </template>
          <template #cell(actions)="row">
            <div class="hover-cell pull-right">
              <router-link
                v-if="hasReadableResult(row.item)"
                :title="$t('show-results')"
                :to="{
                  name: 'Plant',
                  params: { id: row.item.plantId },
                  query: { view: 'table', result: row.item.analysisResult.id },
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
import AppTableFilter from "@/app/shared/components/app-table-filter/app-table-filter.vue";
import { BvTableFieldArray } from "bootstrap-vue";
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import dateHelper from "../shared/services/helper/date-helper";
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
    AppTableFilter,
  },
})
export default class AppAnalysis extends BaseAuthComponent {
  columns: BvTableFieldArray = [];

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
      { key: "plant", label: this.$t("plant").toString(), sortable: true },
      {
        key: "date",
        label: this.$t("acquisition-date").toString(),
        sortable: true,
        formatter: (flownAt: string) => {
          return dateHelper.toDate(flownAt);
        },
      },
      { key: "user", label: this.$t("created-by").toString(), sortable: true },
      { key: "state", label: this.$t("state").toString(), sortable: true },
      { key: "hasResults", label: this.$t("has-results-released").toString() },
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

  private async updateAnalysisRows() {
    this.isLoading = true;

    try {
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
        };

        return row;
      });
    } catch (e) {
      this.showError(e);
    } finally {
      this.isLoading = false;
    }
  }

  private async getPlants() {
    try {
      this.plants = await volateqApi.getPlants();
      // Hide the filter if one plant is available
      if (this.plants.length > 1) {
        this.plantSelection = this.plants.map(plant => ({ value: plant.id, text: plant.name }));
        this.plantSelection.unshift({ value: null, text: "" });
      }
    } catch (e) {
      this.showError(e);
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
