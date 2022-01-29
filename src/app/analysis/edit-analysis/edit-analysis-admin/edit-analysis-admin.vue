<template>
  <div>
    <b-row>
      <b-col>
        <app-update-analysis-state ref="updateAnalysisState" :analysis="analysis" @updateAnalysis="onUpdateAnalysis" />
      </b-col>
      <b-col>
        <app-import-analysis-result
          ref="importAnalysisResult"
          :analysis="analysis"
          @updateAnalysis="onUpdateAnalysis"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <app-delete-analysis :analysis="analysis" />
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IUpdateEditAnalysis } from "@/app/analysis/edit-analysis/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppUpdateAnalysisState from "@/app/analysis/edit-analysis/edit-analysis-admin/update-analysis-state.vue";
import AppImportAnalysisResult from "@/app/analysis/edit-analysis/edit-analysis-admin/import-analysis-result.vue";
import AppDeleteAnalysis from "@/app/analysis/edit-analysis/edit-analysis-admin/delete-analysis.vue";

@Component({
  name: "app-edit-analysis-result-admin",
  components: {
    AppUpdateAnalysisState,
    AppImportAnalysisResult,
    AppDeleteAnalysis,
  },
})
export default class AppEditAnalysisAdmin extends BaseAuthComponent implements IUpdateEditAnalysis {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  @Ref() updateAnalysisState!: IUpdateEditAnalysis;
  @Ref() importAnalysisResult!: IUpdateEditAnalysis;

  async created() {
    this.updateAnalysis(this.analysis);
  }

  updateAnalysis(analysis: AnalysisSchema) {
    this.analysis = analysis;

    if (this.updateAnalysisState && this.importAnalysisResult) {
      this.updateAnalysisState.updateAnalysis(analysis);
      this.importAnalysisResult.updateAnalysis(analysis);
    }
  }

  onUpdateAnalysis() {
    this.$emit("updateAnalysis");
  }
}
</script>
