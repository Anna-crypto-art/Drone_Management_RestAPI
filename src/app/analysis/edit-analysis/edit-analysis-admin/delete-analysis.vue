<template>
  <div class="admin-box">
    <h4>{{ $t("delete-analysis") }}</h4>
    <app-button type="button" variant="danger" :loading="loading" @click="onDeleteAnalysisClick">
      {{ $t("delete") }}
    </app-button>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { UPLOAD_ANALYSIS_STORAGE_KEY } from "@/app/shared/components/fetch-component/storage-keys";

@Component({
  name: "app-delete-analysis",
  components: {
    AppButton,
  },
})
export default class AppDeleteAnalysis extends BaseAuthComponent {
  @Prop({ required: true }) analysis!: AnalysisSchema;

  loading = false;

  async onDeleteAnalysisClick() {
    try {
      if (confirm("Delete analysis and all according files? This cannot be undone.")) {
        this.loading = true;

        appLocalStorage.removeItem(UPLOAD_ANALYSIS_STORAGE_KEY + "-" + this.analysis.id);

        await volateqApi.deleteAnalysis(this.analysis.id);

        this.$router.push({ name: "Analyses" });
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }
}
</script>
