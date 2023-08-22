<template>
  <div class="plant-view-pv" v-if="analyses">
    <app-analysis-selection-sidebar
      :plant="plant"
      :analyses="analyses"
    />
    <app-plant-view-tabs :plant="plant" :analyses="analyses">
      <template #visual>
        <app-visual-pv :analyses="analyses" :plant="plant" />
      </template>
      <template #tables>
        <app-tables-pv :analyses="analyses" :plant="plant" />
      </template>
      <template #settings>
        <app-custom-component-properties :plant="plant" />
      </template>
      <template #admin>
        <app-plant-admin-view-pv :selectedAnalysisResult="firstAnalysisResult" :plant="plant" />
      </template>
    </app-plant-view-tabs>
  </div>
</template>

<script lang="ts">
import AppAnalysisSelectionSidebar from "@/app/plant/shared/analysis-selection-sidebar/analysis-selection-sidebar.vue";
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
import { AnalysisSelectionBaseComponent } from "../shared/analysis-selection-sidebar/analysis-selection-base-component";

@Component({
  name: "app-plant-view-pv",
  components: {
    AppPlantViewTabs,
    AppAnalysisSelectionSidebar,
    AppVisualPv,
    AppTablesPv,
    AppPlantAdminViewPv,
    AppCustomComponentProperties,
  },
})
export default class AppPlantViewPv extends AnalysisSelectionBaseComponent {
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

.plant-view-pv {
  height: calc(100vh - #{$header-height});
  width: 100%;
  display: flex;
  position: relative;
}
</style>
