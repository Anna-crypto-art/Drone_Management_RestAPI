<template>
  <app-content v-if="analysis" :title="analysis.name || ''" :navback="true">
    <template #subtitle>
      <div><b>{{ $t(analysis.current_state.state.name) }}</b></div>
      <div>{{ $t("created-at") }} {{ new Date(Date.parse(analysis.created_at)).toLocaleString() }}</div>
    </template>
    <div class="app-edit-analysis">
      <b-tabs>
        <b-tab :title="$t('upload')">
          <app-analysis-upload :analysis_id="analysis.id"></app-analysis-upload>
        </b-tab>
      </b-tabs>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import appContentEventBus from "../shared/components/app-content/app-content-event-bus";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { ApiException } from "../shared/services/volateq-api/api-errors";
import { AnalysisSchema } from "../shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "../shared/services/volateq-api/volateq-api";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppAnalysisUpload from "@/app/analysis/analysis-upload.vue";

@Component({
  name: "app-edit-analysis",
  components: {
    AppContent,
    AppAnalysisUpload
  }
})
export default class AppEditAnalysis extends BaseAuthComponent {
  analysis: AnalysisSchema | null = null;

  async created() {
    try {
      this.analysis = await volateqApi.getAnalysis(this.$route.params.id);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }


}

</script>

<style lang="scss">

</style>