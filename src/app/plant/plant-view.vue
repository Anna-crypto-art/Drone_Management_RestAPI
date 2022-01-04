<template>
  <div>
    <app-header fluid />
    <app-plant-view-csp-ptc v-if="isCspPtc" :plant="plant" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import AppHeader from "@/app/shared/components/app-header/app-header.vue";
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import AppPlantViewCspPtc from "@/app/plant/csp-ptc/plant-view-csp-ptc.vue";
import { PlantSchema } from '../shared/services/volateq-api/api-schemas/plant-schema';
import appContentEventBus from '../shared/components/app-content/app-content-event-bus';
import { ApiException } from '../shared/services/volateq-api/api-errors';


@Component({
  components: {
    AppContent,
    AppPlantViewCspPtc,
    AppHeader
  }
})
export default class AppPlantView extends Vue {
  plant: PlantSchema | null = null;
  
  async created() {
    try {
      this.plant = await volateqApi.getPlant(this.$route.params.id);
    } catch (e) {
      appContentEventBus.showError(e as ApiException);
    } 
  }

  get isCspPtc(): boolean {
    return this.plant && this.plant.technology_id === 1 || false; // CSP_PTC
  }
  get plantName(): string {
    return this.plant && this.plant.name || "";
  }
}
</script>