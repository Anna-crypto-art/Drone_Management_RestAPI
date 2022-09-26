<template>
  <app-content :title="$t('new-data-upload')" :navback="true" :subtitle="plantName" eventId="newAnalysis">
    <div class="app-new-analysis">
      <app-analysis-upload
      :analysis="analysis"
      @startUpload="onStartUpload"
      @cancelUpload="onCancelUpload"
      @retryUpload="onRetryUpload">
        <template #uploadForm>
          <b-row style="margin-bottom: 25px">
            <b-col lg="4" v-if="plantOptions.length > 1">
              <b-form-group label-cols="auto" :label="$t('plant')">
                <b-form-select required v-model="selectedPlantId" :options="plantOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="4">
              <b-form-group label-cols="auto" :label="$t('acquisition-date')">
                <b-datepicker v-model="flownAt" required /> 
              </b-form-group>
            </b-col>
            <b-col lg="4" v-show="productPackagesSelection.length > 0">
              <b-form-group label-cols="auto" :label="$t('product-packages')">
                <app-multiselect v-model="selectedProductPackages" :options="productPackagesSelection" />
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
import { Component, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppAnalysisUpload from "@/app/analysis/shared/analysis-upload.vue";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";

@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppButton,
    AppAnalysisUpload,
    AppMultiselect,
  },
})
export default class AppNewAnalysis extends BaseAuthComponent {
  plants!: PlantSchema[];
  
  selectedPlantId: string | null = null;
  plantOptions: Array<any> = [];

  flownAt: string | null = null;

  analysis: AnalysisSchema | null = null;

  productPackagesSelection: MultiselectOption[] = [];
  selectedProductPackages: string[] | null = null;

  @CatchError()
  async created() {
    this.preparePlantSelection();
  }

  @Watch('selectedPlantId') async onSelectedPlantIdChanged() {
    await this.loadProductPackagesSelection();
  }

  @Watch('flownAt') async onFlownAtChanged() {
    await this.loadProductPackagesSelection();
  }

  async onStartUpload(files: string[], resume: boolean, done: (analysis: AnalysisSchema | null) => void) {
    try {
      if (resume) {
        done(this.analysis!);
        return;
      }

      if (!this.flownAt) {
        throw { 
          error: 'INVALID_OR_MISSING_PARAMS', 
          message: this.$t('missing').toString() + " " + this.$t('acquisition-date').toString() 
        };
      }

      if (!files || files.length === 0) {
        throw { 
          error: 'INVALID_OR_MISSING_PARAMS',
          message: this.$t("no-files-for-uploaded-selected").toString(),
        };
      }

      const analysisIdObj = await volateqApi.createAnalysis({
        plant_id: this.selectedPlantId!,
        files: files,
        flown_at: this.flownAt!,
        order_product_package_ids: this.selectedProductPackages || undefined,
      });
  
      this.analysis = await volateqApi.getAnalysis(analysisIdObj.id);

      done(this.analysis);
    } catch (e) {
      this.showError(e);

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
      this.showError(e);

      done(true);
    }
  }

  onRetryUpload() {
    // Forward to existing analysis
    this.$router.push({ name: "EditAnalysis", params: { id: this.analysis!.id } });
  }

  get plantName(): string {
    this.selectedPlantId; // keep this, to make vue reaction working....

    if (this.plants) {
      const plant = this.plants.find(plant => plant.id === this.selectedPlantId);
      if (plant) {
        return plant.name;
      }
    }

    return "";
  }

  private async preparePlantSelection() {
    this.plants = await volateqApi.getPlants();

    let plantId: string | (string | null)[] | undefined = this.$route.query.plantId;
    if (plantId && !Array.isArray(plantId)) {      
      this.plants = this.plants.filter(plant => plant.id === plantId);      
    } else {
      plantId = undefined;
    }

    const analyses = await volateqApi.getAllAnalysis({ plant_id: plantId });
    this.plants = this.plants.filter(plant => {
      return !analyses.find(analysis => analysis.plant.id === plant.id && 
        (analysis.current_state && analysis.current_state.state.id <= ApiStates.DATA_INCOMPLETE));
    });

    if (this.plants.length === 0) {
      this.$router.push({ name: "Analyses"});
      return;
    }

    this.plantOptions = this.plants.map(plant => ({ value: plant.id, text: plant.name }));
    if (this.plants.length === 1) {
      this.selectedPlantId = this.plants[0].id;
    }
  }

  @CatchError()
  private async loadProductPackagesSelection() {
    this.productPackagesSelection = [];

    if (!this.selectedPlantId || !this.flownAt) {
      return;
    }

    const orderPPs = await volateqApi.getOrderProductPackages(this.selectedPlantId, this.flownAt);
    if (orderPPs.length === 0) {
      return;
    }

    this.productPackagesSelection = orderPPs.map(orderPP => ({
      id: orderPP.id,
      label: orderPP.quantity ? 
        orderPP.product_package.name + " - Yearly " + orderPP.quantity : 
        orderPP.product_package.name
    }));

    this.selectedProductPackages = (await volateqApi.getNewAnalysisProductPackagesProposal(this.selectedPlantId, this.flownAt))
      .map(orderPP => orderPP.id);
  }
}
</script>

<style lang="scss"></style>
