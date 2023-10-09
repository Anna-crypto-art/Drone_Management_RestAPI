<template>
  <div class="plant-view-pv" v-if="analyses">
    <app-sidebar-button-menu :plant="plant" :analyses="analyses" />
    <app-analysis-selection-sidebar :plant="plant" :analyses="analyses" />
    <app-observation-selection-sidebar :plant="plant" />
    <app-plant-view-tabs :plant="plant" :analyses="analyses">
      <template #visual>
        <app-visual-pv :analyses="analyses" :plant="plant" />
      </template>
      <template #tables>
        <app-tables-pv :analyses="analyses" :plant="plant" />
      </template>
      <template #settings>
        <b-container>
          <app-custom-component-properties :plant="plant" />
        </b-container>
      </template>
      <template #admin>
        <app-plant-admin-view-pv :selectedAnalysisResult="firstAnalysisResult" :plant="plant" />
      </template>
    </app-plant-view-tabs>
  </div>
</template>

<script lang="ts">
import AppPlantViewTabs from "@/app/plant/shared/plant-view-tabs/plant-view-tabs.vue";
import AppVisualPv from "@/app/plant/pv/visualization/visual-pv.vue";
import AppTablesPv from "@/app/plant/pv/tables/tables-pv.vue";
import AppPlantAdminViewPv from "@/app/plant/pv/plant-admin-view-pv.vue";
import AppCustomComponentProperties from "@/app/plant/shared/plant-settings/custom-component-properties.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { Component, Prop } from "vue-property-decorator";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { IAnalysisSelectionComponent } from "../shared/selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../shared/selection-sidebar/analysis-selection/analysis-selection-service";
import AppAnalysisSelectionSidebar from "@/app/plant/shared/selection-sidebar/analysis-selection/analysis-selection-sidebar.vue";
import AppObservationSelectionSidebar from "@/app/plant/shared/selection-sidebar/observation-selection/observation-selection-sidebar.vue";
import AppSidebarButtonMenu from "@/app/plant/shared/app-sidebar-button-menu/app-sidebar-button-menu.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";


@Component({
  name: "app-plant-view-pv",
  components: {
    AppPlantViewTabs,
    AppVisualPv,
    AppTablesPv,
    AppPlantAdminViewPv,
    AppCustomComponentProperties,
    AppObservationSelectionSidebar,
    AppAnalysisSelectionSidebar,
    AppSidebarButtonMenu,
  },
})
export default class AppPlantViewPv extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop() plant!: PlantSchema;

  analysisSelectionService!: AnalysisSelectionService;

  analyses: AnalysisForViewSchema[] | null = null;

  @CatchError()
  async created(): Promise<void> {
    this.analysisSelectionService = new AnalysisSelectionService(this);

    this.analyses = await volateqApi.getAnalysesForView(this.plant.id);
  }

  async mounted() {
    await this.analysisSelectionService?.register();
  }

  async unmounted() {
    this.analysisSelectionService?.unregister();
  }

  get firstAnalysisResult(): AnalysisResultDetailedSchema | null {
    return this.analysisSelectionService?.firstAnalysisResult || null;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

$left-width: 400px;

.plant-view-pv {
  height: calc(100vh - #{$header-height});
  width: 100%;
  display: flex;
  position: relative;
}
</style>
