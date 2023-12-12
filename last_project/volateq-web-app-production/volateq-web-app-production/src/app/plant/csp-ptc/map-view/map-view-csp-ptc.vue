<template>
  <div class="app-map-view-csp-ptc">
    <app-map-view 
      :plant="plant"
      :componentLayerTypes="componentLayerTypes" 
      :analyses="analyses"
      :keyFigureLayers="keyFigureLayers"
    />
  </div>
</template>

<script lang="ts">
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import AppMapView from "@/app/plant/shared/map-view/map-view.vue";

@Component({
  name: "app-map-view-csp-ptc",
  components: {
    AppMapView,
  },
})
export default class AppMapViewCspPtc extends BaseAuthComponent {
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
}
</script>
