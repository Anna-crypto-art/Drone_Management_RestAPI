<template>
  <div class="app-analysis-upload">
    <b-form-checkbox
      v-show="analysis"
      v-model="dataComplete"
      @change="onChangeDataComplete"
      :disabled="!hasPlantMetadata"
    >
      {{ $t("data-complete") }} <app-explanation>{{ dataCompleteMetadataExpl }}</app-explanation>
    </b-form-checkbox>
    <app-uploader v-if="uploaderService" :uploaderService="uploaderService" :title="$t('browse-or-drag-drop-files')" />
  </div>
</template>

<script lang="ts">
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { AppContentEventService } from "@/app/shared/components/app-content/app-content-event-service";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppUploader from "@/app/shared/components/app-file-upload/app-uploader.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisUploaderService } from "@/app/analysis/shared/analysis-uploader-service";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { AnalysisEventService } from "./analysis-event-service";
import { AnalysisEvent } from "./types";

@Component({
  name: "app-analysis-uploader",
  components: {
    AppContent,
    AppUploader,
    AppButton,
    AppExplanation,
  },
})
export default class AppAnalysisUploader extends BaseAuthComponent {
  @Prop({ default: null }) plantId!: string | null;
  @Prop({ default: null }) flownAt!: string | null;
  @Prop({ default: null }) analysis!: AnalysisSchema | null;

  dataComplete = false;

  uploaderService: AnalysisUploaderService | null = null;

  private appContentEventId = "newAnalysis";

  async created() {
    await super.created();

    this.uploaderService = new AnalysisUploaderService(this.plantId || undefined, this.analysis?.id);

    this.dataComplete = this.analysis ? this.analysis.data_complete : false;

    if (this.analysis) {
      this.appContentEventId = this.analysis.id;
    }

    this.registerUploadEvents();
  }

  @Watch("analysis") onAnalysisChanged() {
    this.dataComplete = this.analysis ? this.analysis.data_complete : false;
  }

  @Watch("plantId") onPlantIdChanged() {
    if (this.plantId) {
      this.uploaderService!.setPlantId(this.plantId);
    }
  }

  @Watch("flownAt") onFlownAtChanged() {
    if (this.flownAt) {
      this.uploaderService!.setFlownAt(this.flownAt);
    }
  }

  registerUploadEvents() {
    this.uploaderService!.onStartUpload(async () => {
      if (!this.analysis) {
        this.analysis = await volateqApi.getAnalysis(this.uploaderService!.analysisId);
      }
    });

    this.uploaderService!.onUploadComplete(async () => {
      if (this.analysis!.has_plant_metadata && !this.analysis!.data_complete) {
          AppContentEventService.showInfo(this.appContentEventId, this.$t("analysis-with-metdata-data-complete_quest").toString());
      }
    });
  }

  get hasPlantMetadata(): boolean {
    return (this.analysis && this.analysis.has_plant_metadata) || false;
  }

  get dataCompleteMetadataExpl(): string {
    return (
      (!this.hasPlantMetadata && this.$t("missing-plant-metadata").toString()) ||
      this.$t("data-complete_expl").toString()
    );
  }

  async onChangeDataComplete() {
    try {
      if (!this.analysis!.plant.in_setup_phase && this.dataComplete) {
        if (!confirm(this.$t("data-complete-sure-quest").toString())) {
          this.dataComplete = false;
          return;
        }
      }

      await volateqApi.updateAnalysis(this.analysis!.id, { data_complete: this.dataComplete });

      AnalysisEventService.emit(this.analysis!.id, AnalysisEvent.UPDATE_ANALYSIS);
    } catch (e) {
      this.showError(e);
    }
  }
}
</script>

<style lang="scss"></style>
