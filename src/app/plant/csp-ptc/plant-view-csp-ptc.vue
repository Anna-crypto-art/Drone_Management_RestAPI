<template>
  <div class="plant-view-csp-ptc" v-if="analyses">
    <app-analysis-selection-sidebar
      :plant="plant"
      :analyses="analyses"
    />
    <app-plant-view-tabs :plant="plant" :analyses="analyses">
      <template #visual>
        <app-visual-csp-ptc :analyses="analyses" :plant="plant" />
      </template>
      <template #tables>
        <app-tables-csp-ptc :analyses="analyses" :plant="plant" />
      </template>
      <template #diagram>
        <app-plant-diagram-view-csp-ptc :analyses="analyses" :plant="plant" />
      </template>
      <template #settings>
        <b-container>
          <app-custom-component-properties :plant="plant" />
        </b-container>
      </template>
      <template #admin>
        <app-plant-admin-view-csp-ptc :selectedAnalysisResult="firstAnalysisResult" :plant="plant" />
      </template>
    </app-plant-view-tabs>
  </div>
</template>

<script lang="ts">
import AppPlantAdminViewCspPtc from "@/app/plant/csp-ptc/plant-admin-view-csp-ptc.vue";
import AppTablesCspPtc from "@/app/plant/csp-ptc/tables/tables-csp-ptc.vue";
import AppVisualCspPtc from "@/app/plant/csp-ptc/visualization/visual-csp-ptc.vue";
import AppAnalysisSelectionSidebar from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-sidebar.vue";
import AppPlantViewTabs from "@/app/plant/shared/plant-view-tabs/plant-view-tabs.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop } from "vue-property-decorator";
import AppPlantDiagramViewCspPtc from "@/app/plant/csp-ptc/plant-diagram-view-csp-ptc.vue";
import AppCustomComponentProperties from "@/app/plant/shared/plant-settings/custom-component-properties.vue";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { AnalysisSelectionBaseComponent } from "../shared/analysis-selection-sidebar/analysis-selection-base-component";

@Component({
  name: "app-plant-view-csp-ptc",
  components: {
    AppPlantViewTabs,
    AppVisualCspPtc,
    AppTablesCspPtc,
    AppAnalysisSelectionSidebar,
    AppPlantAdminViewCspPtc,
    AppPlantDiagramViewCspPtc,
    AppCustomComponentProperties,
  },
})
export default class AppPlantViewCspPtc extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;

  analyses: AnalysisForViewSchema[] | null = null;

  @CatchError()
  async created(): Promise<void> {
    await super.created();

    this.analyses = await volateqApi.getAnalysesForView(this.plant.id);
  }

  async mounted() {
    await super.mounted();
  }

  unmounted() {
    super.unmounted();
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

$left-width: 400px;

.plant-view-csp-ptc {
  height: calc(100vh - #{$header-height});
  width: 100%;
  display: flex;
  position: relative;
}
</style>
