<template>
  <div>
    <b-row>
      <b-col cols="12" lg="6">
        <app-update-analysis-state :analysis="analysis" />
      </b-col>
      <b-col cols="12" lg="6">
        <app-import-analysis-result :analysis="analysis" />
      </b-col>
      <b-col cols="12" lg="6">
        <app-analysis-notes-and-history :analysis="analysis" />
      </b-col>
      <b-col cols="12" lg="6">
        <app-analysis-file-actions :analysis="analysis" />
        <app-delete-analysis :analysis="analysis" />
      </b-col>
      <!-- as we have a complete server monitoring now, we do not need the single server stuff visible per analysis anymore -->
      <!-- <b-col  cols="12">
        <app-run-q-fly-for-analysis :analysis="analysis" />
      </b-col> -->
      <b-col cols="12" lg="6">
        
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import { Component,  Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppUpdateAnalysisState from "@/app/analysis/edit-analysis/edit-analysis-admin/update-analysis-state.vue";
import AppImportAnalysisResult from "@/app/analysis/edit-analysis/edit-analysis-admin/import-analysis-result.vue";
import AppDeleteAnalysis from "@/app/analysis/edit-analysis/edit-analysis-admin/delete-analysis.vue";
import AppAnalysisFileActions from "@/app/analysis/edit-analysis/edit-analysis-admin/analysis-file-actions.vue";
import AppAnalysisNotesAndHistory from "@/app/analysis/edit-analysis/edit-analysis-admin/analysis-notes-and-history.vue";

@Component({
  name: "app-edit-analysis-result-admin",
  components: {
    AppUpdateAnalysisState,
    AppImportAnalysisResult,
    AppDeleteAnalysis,
    AppAnalysisFileActions,
    AppAnalysisNotesAndHistory
  },
})
export default class AppEditAnalysisAdmin extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
}
</script>
