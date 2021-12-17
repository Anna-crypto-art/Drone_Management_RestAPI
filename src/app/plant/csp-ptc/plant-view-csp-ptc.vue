<template>
  <div class="plant-view-csp-ptc">
    <app-analysis-selection-sidebar ref="analysisSelectionSidebar"
      :plant="plant"
      :open="false"
      @sidebarToggled="onSidebarToggled"
      @analysisResultSelected="onAnalysisResultSelected" />
    <div :class="'plant-view-csp-ptc-rightside ' + (sidebarOpen ? 'open' : '')">
      <b-tabs>
        <b-tab>
          <template #title><b-icon icon="map" />{{ $t("map") }}</template>
          <app-visual-csp-ptc v-if="hasResults" 
            ref="visualCspPtc" 
            :analysisResults="analysisResults" 
            :plant="plant" 
            v-show="mapView" 
            @sidebarToggle="onRightSidebarToggle" />
        </b-tab>
        <b-tab>
          <template #title><b-icon icon="table" />{{ $t("table") }}</template>
          <app-tables-csp-ptc v-if="hasResults" 
            ref="tablesCspPtc" 
            :analysisResults="analysisResults" 
            :plant="plant" 
            v-show="tableView" />
        </b-tab>
      </b-tabs>  
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'vue-property-decorator';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import AppVisualCspPtc from '@/app/plant/csp-ptc/visualization/visual-csp-ptc.vue';
import AppTableContainer from '@/app/shared/components/app-table-container/app-table-container.vue';
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import AppSidebar from '@/app/shared/components/app-sidebar/app-sidebar.vue';
import AppTablesCspPtc from '@/app/plant/csp-ptc/tables/tables-csp-ptc.vue';
import { IAnalysisSelectionSidebar } from "@/app/plant/shared/analysis-selection-sidebar/types";
import { IAnalysisResultSelection } from '../shared/types';


@Component({
  name: 'app-plant-view-csp-ptc',
  components: {
    AppVisualCspPtc,
    AppTableContainer,
    AppExplanation,
    AppTablesCspPtc,
    AppSidebar,
  }
})
export default class AppPlantViewCspPtc extends Vue {
  @Prop() plant!: PlantSchema;
  @Ref() analysisSelectionSidebar!: IAnalysisSelectionSidebar;
  @Ref() visualCspPtc!: IAnalysisResultSelection;
  @Ref() tablesCspPtc!: IAnalysisResultSelection;

  async created(): Promise<void> {
    
  }

  get hasResults(): boolean {
    return !!this.analysisSelectionSidebar.analysisResults;
  }

  get sidebarOpen(): boolean {
    return this.analysisSelectionSidebar.sidebarOpen;
  }

  onAnalysisResultSelected(selectedAnalysisResultId: string | undefined): void {
    this.visualCspPtc.selectAnalysisResult(selectedAnalysisResultId);
    this.tablesCspPtc.selectAnalysisResult(selectedAnalysisResultId);
  }

  onSidebarToggled(open: boolean): void {
    if (!open) {
      this.rerenderOLCanvas(300);
    }
  }

  onRightSidebarToggle(toggleState: boolean): void {
    this.rerenderOLCanvas(300);
  }

  private rerenderOLCanvas(timeout = 0): void {
    setTimeout(() => {
      // triggers openlayers canvas element to rerender
      window.dispatchEvent(new UIEvent("resize"));
    }, timeout)
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

  &-title {
    font-size: 3rem;
    margin-bottom: 0px;
  }

  &-rightside {
    height: 100%;
    width: 100%;

    &.open {
      width: calc(100% - #{$left-width});
    }
  }
}
</style>