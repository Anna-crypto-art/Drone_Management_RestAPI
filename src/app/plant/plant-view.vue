<template>
  <div>
    <app-header fluid />
    <app-plant-view-csp-ptc v-if="isCspPtc" :plant="plant" />
    <app-plant-view-pv v-if="isPv" :plant="plant" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppHeader from "@/app/shared/components/app-header/app-header.vue";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import AppPlantViewCspPtc from "@/app/plant/csp-ptc/plant-view-csp-ptc.vue";
import AppPlantViewPv from "@/app/plant/pv/plant-view-pv.vue";
import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";
import { BaseAuthComponent } from "../shared/components/base-auth-component/base-auth-component";
import { ApiTechnology } from "@/app/shared/services/volateq-api/api-technologies";

@Component({
  components: {
    AppContent,
    AppPlantViewCspPtc,
    AppPlantViewPv,
    AppHeader,
  },
})
export default class AppPlantView extends BaseAuthComponent {
  plant: PlantSchema | null = null;

  async created() {
    try {
      this.plant = await volateqApi.getPlant(this.$route.params.id);
    } catch (e) {
      this.showError(e);
    }
  }

  get isCspPtc(): boolean {
    return (this.plant && this.plant.technology_id === ApiTechnology.CSP_PTC) || false;  
  }
  get isPv(): boolean {
    return (this.plant && this.plant.technology_id === ApiTechnology.PV) || false;
  }
  get plantName(): string {
    return (this.plant && this.plant.name) || "";
  }
}
</script>
