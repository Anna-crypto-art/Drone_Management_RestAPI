<template>
  <app-content :title="$t('results-of-analysis')" :navback="true" :subtitle="$t('results-of-analysis_descr')">
    <div class="app-analysis-results">
      <div class="app-analysis-results-toolbox">
        <div class="app-analysis-results-toolbox-search pull-left">
          <b-input-group class="app-analysis-results-toolbox-search-input">
            <b-form-input :placeholder="$t('search-kks')" type="search"></b-form-input>
            <b-input-group-append>
              <b-icon icon="search"></b-icon>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="app-analysis-results-toolbox-export-csv pull-left">
          <app-button variant="secondary" :title="$t('export-csv')"><b-icon icon="table"></b-icon></app-button>
        </div>
        <div class="clearfix"></div>
      </div>
      <app-table-container>
        <b-tabs>
          <b-tab :title="$t('absorber-tubes')" active>
            <b-table hover :fields="columns" :items="analysisResultRows" class="bordered"
              head-variant="light"
              :emptyText="$t('no-data')">
              <template #head(irIntensity)="column">
                {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
              </template>
              <template #head(classSubfield)="column">
                {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
              </template>
              <template #head(classSca)="column">
                {{ column.label }} <span class="help-icon"><b-icon icon="question-circle-fill"></b-icon></span>
              </template>
            </b-table>

          </b-tab>
          <b-tab :title="$t('single-collector-elements')">
          </b-tab>
          <b-tab :title="$t('mirrors')">
          </b-tab>
        </b-tabs>
      </app-table-container>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Watch, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import { CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { RouteSchema } from "@/app/shared/services/volateq-api/api-schemas/route-schema";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { NewAnalysis } from "@/app/shared/services/volateq-api/api-requests/analysis-requests";
import AppFileUpload from "@/app/shared/components/app-file-upload/app-file-upload.vue";
import { IAppFileUpload } from "@/app/shared/components/app-file-upload/types";
import AppChecklist from "@/app/shared/components/app-checklist/app-checklist.vue"
import AppChecklistItem from "@/app/shared/components/app-checklist/app-checklist-item.vue"
import { CheckListItems, IAnalysisId, IAppNewAnalysisFetched } from "@/app/analysis/new-analysis/types";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppTableContainer from "@/app/shared/components/app-table-container/app-table-container.vue";
import { IAppButton } from "@/app/shared/components/app-button/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { ApiErrors } from "@/app/shared/services/volateq-api/api-errors";
import { IFetchComponent } from "@/app/shared/components/fetch-component/fetch-component";
import uploadService from "@/app/shared/services/upload-service/upload-service";
import { IUploadListener, IResumableFile, UploadState, UploadEvent } from "@/app/shared/services/upload-service/types";
import { NEW_ANALYSIS_STORAGE_KEY } from "@/app/shared/components/fetch-component/storage-keys";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { BFormSelectOption, BFormSelectOptionGroup, BvTableFieldArray } from "bootstrap-vue";
import { PlantBlockSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-block-schema";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppButton,
    AppTableContainer
  }
})
export default class AppAnalysisResult extends BaseAuthComponent {
  columns: BvTableFieldArray = [];
  analysisResultRows: Array<any> = [];

  async created() {
    this.columns = [
      { key: "kks", label: this.$t("kks").toString(), sortable: true },
      { key: "irIntensity", label: this.$t("ir-intensity").toString(), sortable: true },
      { key: "classSubfield", label: this.$t("class-subfield").toString(), sortable: true },
      { key: "classSca", label: this.$t("class-sca").toString(), sortable: true },
      { key: "orderSubfield", label: this.$t("order-subfield").toString(), sortable: true },
      { key: "orderSca", label: this.$t("order-sca").toString(), sortable: true },
    ];

    this.analysisResultRows = [
      { kks: "RE01N11", irIntensity: 11, classSubfield: 2, classSca: 3, orderSubfield: 902, orderSca: 35 },
      { kks: "RE01N12", irIntensity: -5, classSubfield: 2, classSca: 2, orderSubfield: 499, orderSca: 28 },
      { kks: "RE01N13", irIntensity: -17, classSubfield: 2, classSca: 2, orderSubfield: 313, orderSca: 17 },
      { kks: "RE01N21", irIntensity: -25, classSubfield: 1, classSca: 3, orderSubfield: 188, orderSca: 15 },
      { kks: "RE01N22", irIntensity: -16, classSubfield: 2, classSca: 1, orderSubfield: 324, orderSca: 19 },
      { kks: "RE01N23", irIntensity: 1, classSubfield: 2, classSca: 2, orderSubfield: 692, orderSca: 32 },
      { kks: "RE01N31", irIntensity: -2, classSubfield: 2, classSca: 2, orderSubfield: 598, orderSca: 31 },
      { kks: "RE01N32", irIntensity: -15, classSubfield: 2, classSca: 3, orderSubfield: 337, orderSca: 22 },
      { kks: "RE01N33", irIntensity: -58, classSubfield: 1, classSca: 1, orderSubfield: 5, orderSca: 4 },
      { kks: "RE01N41", irIntensity: -30, classSubfield: 1, classSca: 2, orderSubfield: 14, orderSca: 114 },
      { kks: "RE01N42", irIntensity: -13, classSubfield: 2, classSca: 2, orderSubfield: 374, orderSca: 22 },
    ]
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
.app-analysis-results {
  .help-icon {
    color: $blue;
    margin-left: 5px;
  }

  .app-analysis-results-toolbox-search {
  max-width: 300px;
  margin-right: 10px;

  &-input {
    input {
      border-right: none;
    }
    .input-group-append {
      margin-left: 0;
      border: 1px solid $blue-60pc;
      border-left: none;
      background-color: $white;
      padding: 10px;
      color: $blue;
    }
  }
}
}


</style>
