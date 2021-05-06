<template>
  <app-content :title="plantName">
    <app-plant-view-csp-ptc v-if="isCspPtc" :plant="plant">
    </app-plant-view-csp-ptc>

  </app-content>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppContent from "@/app/shared/components/app-content/app-content.vue";
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import AppPlantViewCspPtc from "@/app/plant/csp-ptc/plant-view-csp-ptc.vue";
import { PlantSchema } from '../shared/services/volateq-api/api-schemas/plant-schema';
import appContentEventBus from '../shared/components/app-content/app-content-event-bus';


@Component({
  components: {
    AppContent,
    AppPlantViewCspPtc,
  }
})
export default class AppPlantView extends Vue {
  plant: PlantSchema | null = null;
  
  async created() {
    try {
      this.plant = await volateqApi.getPlant(this.$route.params.id);
    } catch (e) {
      appContentEventBus.showError(e);
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