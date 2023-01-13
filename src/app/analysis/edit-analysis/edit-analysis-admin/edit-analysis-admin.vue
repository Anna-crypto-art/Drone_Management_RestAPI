<template>
  <div>
    <b-row>
      <b-col sm>
        <app-update-analysis-state :analysis="analysis" />
      </b-col>
      <b-col sm>
        <app-import-analysis-result :analysis="analysis" />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm>
        <app-analysis-file-actions :analysis="analysis" />
      </b-col>
      <b-col sm>
        <app-run-q-fly-for-analysis :analysis="analysis" />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm>
        <app-delete-analysis :analysis="analysis" />
      </b-col>
      <b-col sm>
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppUpdateAnalysisState from "@/app/analysis/edit-analysis/edit-analysis-admin/update-analysis-state.vue";
import AppImportAnalysisResult from "@/app/analysis/edit-analysis/edit-analysis-admin/import-analysis-result.vue";
import AppDeleteAnalysis from "@/app/analysis/edit-analysis/edit-analysis-admin/delete-analysis.vue";
import AppRunQFlyForAnalysis from "@/app/analysis/edit-analysis/edit-analysis-admin/run-qfly-for-analysis.vue";
import AppAnalysisFileActions from "@/app/analysis/edit-analysis/edit-analysis-admin/analysis-file-actions.vue";

@Component({
  name: "app-edit-analysis-result-admin",
  components: {
    AppUpdateAnalysisState,
    AppImportAnalysisResult,
    AppDeleteAnalysis,
    AppRunQFlyForAnalysis,
    AppAnalysisFileActions,
  },
})
export default class AppEditAnalysisAdmin extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;
}
</script>
