<template>
  <app-content :title="$t('new-data-upload')" :navback="true" :subtitle="$t('create-new-analysis_descr')">
    <div class="app-new-analysis">
      <app-analysis-upload @startUpload="onStartUpload" @cancelUpload="onCancelUpload">
        <template #uploadForm>
          <b-row style="margin-bottom: 25px" v-if="plantOptions.length > 1">
            <b-col sm="4">
              <b-form-group label-cols="auto" :label="$t('plant')">
                <b-form-select required v-model="selected_plant_id" :options="plantOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </template>
        <template #cancelButton>
          {{ $t("cancel-and-delete-all-files") }}
        </template>
      </app-analysis-upload>
    </div>
  </app-content>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import { IAppAnalysisUpload } from "@/app/analysis/shared/types";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppButton,
    AppAnalysisUpload,
  },
})
export default class AppNewAnalysis extends BaseAuthComponent {
  selected_plant_id: string | null = null;
  plantOptions: Array<any> = [];

  analysis: AnalysisSchema | null = null;

  async created() {
    try {
      const plants = await volateqApi.getAllPlants();
      this.plantOptions = plants.map(plant => ({ value: plant.id, text: plant.name }));
      if (plants.length === 1) {
        this.selected_plant_id = plants[0].id;
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  async onStartUpload(files: string[], done: (analysis: AnalysisSchema) => void) {
    try {
      const analysisIdObj = await volateqApi.createAnalysis({
        plant_id: this.selected_plant_id!,
        files: files,
      });
  
      this.analysis = await volateqApi.getAnalysis(analysisIdObj.id);

      done(this.analysis);
    } catch (e) {
      appContentEventBus.showError(e as ApiException)
    }
  }

  async onCancelUpload(done: () => void) {
    if (!this.analysis) {
      return;
    }

    try {
      await volateqApi.cancelAnalysisUpload(this.analysis.id);
      await volateqApi.deleteAnalysis(this.analysis.id);

      done();
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }
}
</script>

<style lang="scss"></style>
