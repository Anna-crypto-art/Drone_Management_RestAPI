<template>
  <div class="app-map-view-pv">
    <app-map-view
      :plant="plant"
      :analyses="analyses"
      :componentLayerTypes="componentLayerTypes"
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
import AppMapView from "../../shared/map-view/map-view.vue";

@Component({
  name: "app-map-view-pv",
  components: {
    AppMapView,
  },
})
export default class AppMapViewPv extends BaseAuthComponent {
  componentLayerTypes = COMPONENT_LAYERS;
  keyFigureLayers = KEY_FIGURE_LAYERS;

  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
}
</script>
