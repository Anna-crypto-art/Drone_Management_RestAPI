<template>
  <app-content :title="$t('new-data-upload')" :navback="true" :subtitle="$t('create-new-analysis_descr')">
    <div class="app-new-analysis">
      <app-analysis-upload
      :analysis="analysis"
      @startUpload="onStartUpload"
      @cancelUpload="onCancelUpload"
      @retryUpload="onRetryUpload">
        <template #uploadForm>
          <b-row style="margin-bottom: 25px">
            <b-col sm="4" v-if="plantOptions.length > 1">
              <b-form-group label-cols="auto" :label="$t('plant')">
                <b-form-select required v-model="selectedPlantId" :options="plantOptions" @change="onPlantSelectionChanged"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4" v-if="customerOptions.length > 1">
              <b-form-group label-cols="auto" :label="$t('customer')">
                <b-form-select required v-model="selectedCustomerId" :options="customerOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label-cols="auto" :label="$t('acquisition-date')">
                <b-datepicker v-model="flownAt" required /> 
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
import { Component } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import appContentEventBus from "@/app/shared/components/app-content/app-content-event-bus";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { ApiException } from "@/app/shared/services/volateq-api/api-errors";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppButton,
    AppAnalysisUpload,
  },
})
export default class AppNewAnalysis extends BaseAuthComponent {
  plants!: PlantSchema[];
  
  selectedPlantId: string | null = null;
  plantOptions: Array<any> = [];

  selectedCustomerId: string | null = null;
  customerOptions: Array<any> = [];

  flownAt: string | null = null;

  analysis: AnalysisSchema | null = null;

  async created() {
    try {
      this.plants = await volateqApi.getPlants();
      this.plantOptions = this.plants.map(plant => ({ value: plant.id, text: plant.name }));
      if (this.plants.length === 1) {
        this.selectedPlantId = this.plants[0].id;
      }
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    }
  }

  onPlantSelectionChanged() {
    const plant = this.plants.find(plant => plant.id === this.selectedPlantId);
    if (plant && plant.customers.length > 1) {
      this.customerOptions = plant.customers.map(customer => ({ value: customer.id, text: customer.name }));
    } else {
      this.customerOptions = [];
    }
  }

  async onStartUpload(files: string[], resume: boolean, done: (analysis: AnalysisSchema | null) => void) {
    try {
      if (resume) {
        done(this.analysis!);
        return;
      }

      const analysisIdObj = await volateqApi.createAnalysis({
        plant_id: this.selectedPlantId!,
        files: files,
        flown_at: this.flownAt!,
        customer_id: this.selectedCustomerId || undefined,
      });
  
      this.analysis = await volateqApi.getAnalysis(analysisIdObj.id);

      done(this.analysis);
    } catch (e) {
      appContentEventBus.showError(e as ApiException)
      done(null);
    }
  }

  async onCancelUpload(done: (failed: boolean) => void) {
    if (!this.analysis) {
      return;
    }

    try {
      await volateqApi.cancelAnalysisUpload(this.analysis.id);
      await volateqApi.deleteAnalysis(this.analysis.id);

      done(false);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);

      done(true);
    }
  }

  onRetryUpload() {
    // Forward to existing analysis
    this.$router.push({ name: "EditAnalysis", params: { id: this.analysis!.id } });
  }
}
</script>

<style lang="scss"></style>
