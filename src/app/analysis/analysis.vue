<template>
  <app-content :title="$t('analysis-overview')" :subtitle="$t('analysis-overview_descr')">
    <div class="app-analysis">
      <router-link :to="{ name: 'AnalysisNew' }">
        <b-button variant="primary">{{ createNewAnalysisBtnText }}</b-button>
      </router-link>
      <div class="app-analysis-plants-filter pull-right" v-show="plants">
        <b-form-select
          id="plants"
          class="app-analysis-plants-filter-select"
          v-model="selectedPlantId"
          :options="plants"
          @change="onPlantSelectionChanged"
        >
        </b-form-select>
        <label class="app-analysis-plants-filter-label" for="plants">{{ $t("plant") }}</label>
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
              <span v-if="row.item.state.state.name === 'UPLOADING'"> {{ uploadStateProcess }}</span>
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
import uploadService from "@/app/shared/services/upload-service/upload-service";
import { BvTableFieldArray } from "bootstrap-vue";
import { Component } from "vue-property-decorator";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { IUploadListener, UploadEvent, UploadState } from "../shared/services/upload-service/types";
import { ApiException } from "../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import { IAnalysisId } from "./new-analysis/types";

@Component({
  name: "app-analysis",
  components: {
    AppContent,
    AppTableContainer,
    AppModalForm,
    AppModalFormInfoArea,
  },
})
export default class AppAnalysis extends BaseAuthComponent implements IUploadListener {
  columns: BvTableFieldArray = [];
  plants: Array<any> | null = null;
  selectedPlantId: string | null = null;
  analysisRows: Array<any> = [];
  isLoading = true;

  createNewAnalysisBtnText = "";
  uploadStateProcess = "";

  async created() {
    this.createNewAnalysisBtnText = this.$t("new-data-upload").toString();

    this.columns = [
      { key: "name", label: this.$t("name").toString(), sortable: true },
      { key: "plant", label: this.$t("plant").toString(), sortable: true },
      { key: "date", label: this.$t("created-at").toString(), sortable: true },
      { key: "user", label: this.$t("created-by").toString(), sortable: true },
      { key: "state", label: this.$t("state").toString(), sortable: true },
      { key: "hasResults", label: this.$t("has-results").toString() },
      { key: "actions" },
    ];

    await this.getPlants();

    await this.updateAnalysisRows();

    this.checkUploadState();
  }

  mounted() {
    this.registerUploadEvents();
  }

  registerUploadEvents() {
    uploadService.on(UploadEvent.PROGRESS, () => {
      this.updateToUploadState();
    });
    uploadService.on(UploadEvent.COMPLETED, () => {
      this.createNewAnalysisBtnText = this.$t("new-data-upload").toString();
      this.updateTableRowState(this.$t("PICK_ME_UP").toString());
    });
    uploadService.on(UploadEvent.FAILED, () => {
      this.updateTableRowState(this.$t("UPLOAD_FAILED").toString());
    });
  }

  checkUploadState(): void {
    if (uploadService.hasState(UploadState.UPLOADING)) {
      this.updateToUploadState();
    }
  }

  // "this" is undefined in html component... so (")this(") is a workaround...
  trans(args: [string, any]): string {
    return this.$t(...args).toString();
  }

  async onPlantSelectionChanged() {
    await this.updateAnalysisRows();
  }

  private updateToUploadState() {
    if (this.updateTableRowState(Math.round(uploadService.progress() * 100) + "%")) {
      this.createNewAnalysisBtnText = this.$t("return-to-upload").toString();
    }
  }

  private updateTableRowState(value: string): boolean {
    const analysisId = uploadService.getMetadata<IAnalysisId>();
    if (this.analysisRows && analysisId) {
      this.uploadStateProcess = value;

      return true;
    }

    return false;
  }

  private async updateAnalysisRows() {
    this.isLoading = true;

    try {
      const plant_id_filter = (this.selectedPlantId && { plant_id: this.selectedPlantId }) || undefined;
      this.analysisRows = (await volateqApi.getAllAnalysis(plant_id_filter)).map((a: AnalysisSchema) => {
        const row = {
          id: a.id,
          name: a.name,
          date: new Date(Date.parse(a.created_at)).toLocaleString(),
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
    const plants: PlantSchema[] = await volateqApi.getAllPlants();
    // Hide the filter if one plant is available
    if (plants.length > 1) {
      this.plants = plants.map(plant => ({ value: plant.id, text: plant.name }));
      this.plants.unshift({ value: null, text: "" });
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

.app-analysis-plants-filter-select {
  width: 200px !important;
  float: right;
}
.app-analysis-plants-filter-label {
  float: right;
  margin-top: 5px;
  padding-right: 1em;
}
</style>
