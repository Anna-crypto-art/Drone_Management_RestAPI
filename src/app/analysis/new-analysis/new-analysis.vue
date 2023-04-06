<template>
  <app-content :title="$t('new-data-upload')" :navback="true" :subtitle="plantName" eventId="newAnalysis">
    <div class="app-new-analysis mar-bottom-2x">
      <b-form-group v-show="plantOptions.length > 1" label-cols-lg="2" :label="$t('plant')">
        <b-form-select required v-model="selectedPlantId" :options="plantOptions"></b-form-select>
      </b-form-group>
      <b-form-group label-cols-lg="2" :label="$t('acquisition-date')">
        <app-datepicker v-model="flownAt" required /> 
      </b-form-group>
      <b-form-group v-show="productPackagesSelection.length > 0" label-cols-lg="2" :label="$t('product-packages')">
        <app-multiselect 
          v-model="selectedProductPackages"
          :options="productPackagesSelection"
        />
      </b-form-group>
      <b-form-group v-show="droneOptions.length > 0" label-cols-lg="2" :label="$t('drone')">
        <b-form-select v-model="selectedDroneId" :options="droneOptions"></b-form-select>
      </b-form-group>
    </div>
    <app-analysis-uploader
      :plantId="selectedPlantId"
      :analysis="analysis"
      :flownAt="flownAt"
      :orderProductPackageIds="selectedProductPackages"
    >
      <template #addActions>
        <app-button variant="secondary" @click="onCreateEmptyAnalysisClick" :loading="loadingEmptyAnalysis">
          {{ $t("create-empty-analysis") }}
        </app-button>
      </template>
    </app-analysis-uploader>
  </app-content>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppAnalysisUploader from "@/app/analysis/shared/analysis-uploader.vue";
import AppMultiselect from "@/app/shared/components/app-multiselect/app-multiselect.vue";
import AppDatepicker from "@/app/shared/components/app-datepicker/app-datepicker.vue";
import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { MultiselectOption } from "@/app/shared/components/app-multiselect/types";
import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";


@Component({
  name: "app-new-analysis",
  components: {
    AppContent,
    AppButton,
    AppAnalysisUploader,
    AppMultiselect,
    AppDatepicker,
  },
})
export default class AppNewAnalysis extends BaseAuthComponent {
  plants!: PlantSchema[];
  drones!: DroneSchema[];

  selectedPlantId: string | null = null;
  plantOptions: Array<any> = [];

  flownAt: string | null = null;

  analysis: AnalysisSchema | null = null;

  productPackagesSelection: MultiselectOption[] = [];
  selectedProductPackages: string[] | null = null;

  selectedDroneId: string | null = null;
  droneOptions: Array<any> = [];

  loadingEmptyAnalysis = false;

  @CatchError()
  async created() {
    this.preparePlantSelection();
  }

  @Watch('selectedPlantId') async onSelectedPlantIdChanged() {
    await this.loadProductPackagesSelection();
  }

  @Watch('flownAt') async onFlownAtChanged() {
    await this.loadProductPackagesSelection();
    await this.prepareDroneSelection();
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

  @CatchError("loadingEmptyAnalysis")
  async onCreateEmptyAnalysisClick() {
    if (!this.flownAt) {
      throw { 
        error: 'INVALID_OR_MISSING_PARAMS', 
        message: this.$t('missing').toString() + " " + this.$t('acquisition-date').toString() 
      };
    }

    if (!this.selectedPlantId) {
      throw { 
        error: 'INVALID_OR_MISSING_PARAMS', 
        message: this.$t('missing').toString() + " " + this.$t('plant').toString() 
      };
    }

    const analysisId = await volateqApi.createEmptyAnalysis({
      flown_at: this.flownAt,
      plant_id: this.selectedPlantId,
      order_product_package_ids: this.selectedProductPackages || undefined,
      drone_id: this.selectedDroneId || undefined,
    });

    this.showSuccess(this.$t("analysis-created-success").toString());

    await this.$nextTick();

    this.$router.push({ name: "EditAnalysis", params: { id: analysisId.id }});
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
  private async prepareDroneSelection() {
    const droneFilter: { customer_id?: string, plant_id?: string } = {};
    if (this.selectedPlantId) {
      droneFilter.plant_id = this.selectedPlantId;
    }
    this.drones = await volateqApi.getDrones(droneFilter);

    this.droneOptions = this.drones.map(drone => ({ value: drone.id, text: drone.custom_name }));

    if (this.drones.length === 1) {
      this.selectedDroneId = this.drones[0].id;
    }
  }

  @CatchError()
  private async loadProductPackagesSelection() {
    this.productPackagesSelection = [];

    if (!this.selectedPlantId || !this.flownAt) {
      return;
    }

    this.productPackagesSelection = await volateqApi.getOrderPPsMulitselectOptions(this.selectedPlantId, this.flownAt);
    this.selectedProductPackages = (await volateqApi.getNewAnalysisProductPackagesProposal(this.selectedPlantId, this.flownAt))
      .map(orderPP => orderPP.id);
  }
}
</script>
