<template>
  <div class="app-analysis-upload">
    <div class="mar-bottom-2x">
      <b-form-checkbox
        v-model="dataComplete"
        @change="onChangeDataComplete"
        :disabled="!hasPlantMetadata"
      >
        {{ $t("data-complete") }} <app-explanation>{{ dataCompleteMetadataExpl }}</app-explanation>
      </b-form-checkbox>
    </div>
    <b-alert :show="!allowUploadFurtherData" variant="info">
      {{ $t("cannot-upload-further-data-while-data-complete") }}
    </b-alert>
    <app-uploader v-if="uploaderService"
      v-show="allowUploadFurtherData"
      :uploaderService="uploaderService"
      :title="$t('browse-or-drag-drop-files')" 
      :disableAfterUpload="!analysis"
    >
      <!-- Pass slots through -->
      <template v-for="(_, slot) in $slots" :slot="slot">
        <slot :name="slot" />
      </template>
    </app-uploader>
    <div class="pull-right mar-top mar-bottom" v-if="gotoNewAnalysis">
      <app-button @click="onGotoNewAnalysisClick">{{ $t("goto-analysis", { analysis: gotoNewAnalysis.name }) }}</app-button>
    </div>
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { analysisEventService } from "./analysis-event-service";
import { AnalysisEvent } from "./types";
import { CatchError } from "@/app/shared/services/helper/catch-helper";

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
  @Prop({ default: null }) orderProductPackageIds!: string[] | null;

  dataComplete = false;
  hasPlantMetadata = false;

  uploaderService: AnalysisUploaderService | null = null;

  gotoNewAnalysis: AnalysisSchema | null = null;

  private appContentEventId = "newAnalysis";

  async created() {
    await super.created();

    this.uploaderService = new AnalysisUploaderService(this.plantId || undefined, this.analysis?.id);

    this.dataComplete = this.analysis ? this.analysis.data_complete : false;
    this.hasPlantMetadata = this.analysis && this.analysis.has_plant_metadata || false;

    if (this.analysis) {
      this.appContentEventId = this.analysis.id;
    }

    this.registerUploadEvents();
  }

  @Watch("analysis") onAnalysisChanged() {
    this.dataComplete = this.analysis ? this.analysis.data_complete : false;
    this.hasPlantMetadata = this.analysis && this.analysis.has_plant_metadata || false;
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

  @Watch("orderProductPackageIds") onOrderProductPackageIdsChanged() {
    if (this.orderProductPackageIds) {
      this.uploaderService!.setOrderProductPackageIds(this.orderProductPackageIds);
    }
  }

  registerUploadEvents() {
    this.uploaderService!.onStartUpload(async () => {
      const analysis = this.analysis || (await volateqApi.getAnalysis(this.uploaderService!.analysisId));
      this.hasPlantMetadata = analysis.has_plant_metadata || false;
    });

    this.uploaderService!.onUploadComplete(async () => {
      const analysis = await volateqApi.getAnalysis(this.uploaderService!.analysisId);
      if (analysis.has_plant_metadata && analysis.data_complete) {
        AppContentEventService.showInfo(this.appContentEventId, this.$t("analysis-with-metdata-data-complete_quest").toString());
      }

      this.hasPlantMetadata = analysis.has_plant_metadata || false;

      if (!this.analysis) {
        this.gotoNewAnalysis = analysis;
      }
    });

    this.uploaderService!.onUploadCanceled(async () => {
      if (!this.analysis) {
        this.gotoNewAnalysis = await volateqApi.getAnalysis(this.uploaderService!.analysisId);
      }
    });
  }

  get dataCompleteMetadataExpl(): string {
    return (
      (!this.hasPlantMetadata && this.$t("missing-plant-metadata").toString()) ||
      this.$t("data-complete_expl").toString()
    );
  }

  get allowUploadFurtherData(): boolean {
    return !!(!this.dataComplete || !this.analysis);
  }

  @CatchError()
  async onChangeDataComplete() {
    const analysis = await volateqApi.getAnalysis(this.uploaderService!.analysisId);

    if (analysis.plant.in_setup_phase && this.dataComplete) {
      if (!confirm(this.$t("data-complete-sure-quest").toString())) {
        this.dataComplete = false;
        return;
      }
    }

    await volateqApi.updateAnalysis(analysis.id, { data_complete: this.dataComplete });

    analysisEventService.emit(analysis.id, AnalysisEvent.UPDATE_ANALYSIS); 
  }

  @CatchError()
  onGotoNewAnalysisClick() {
    this.$router.push({ name: "EditAnalysis", params: { id: this.gotoNewAnalysis!.id }});
  }
}
</script>

<style lang="scss"></style>
