<template>
  <div class="plant-view-tabs" id="tabbar">
    <b-tabs v-model="selectedTab" align="center" @changed="onTabsChanged">
      <div class="plant-name" align="center" translate="no">
        {{ plant.name }}
      </div>    
      <b-tab>
        <template #title>
          <b-icon icon="map" /> <span class="pad-left">{{ $t("map") }}</span>
        </template>
        <slot name="visual" />
      </b-tab>
      <b-tab v-if="hasSelectAnalysisResults" lazy>
        <template #title><b-icon icon="table" /> <span class="pad-left">{{ $t("table") }}</span></template>
        <slot name="tables" />
      </b-tab>
      <b-tab v-if="hasSelectAnalysisResults" lazy>
        <template #title><b-icon icon="bar-chart-fill" /> <span class="pad-left">{{ $t("statistics") }}</span></template>
        <slot name="diagram" />
      </b-tab>
      <b-tab v-if="isSuperAdmin && hasSelectAnalysisResults">
        <template #title><b-icon icon="shield-shaded" /><span class="pad-left">{{ $t("admin") }}</span></template>
        <slot name="admin" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Watch, Ref } from "vue-property-decorator";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { PlantViewTabs } from "./types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { getMobileQuery } from "@/app/shared/services/helper/mobile-helper";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";

@Component({
  name: "app-plant-view-tabs"
})
export default class AppPlantViewTabs extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  analysisSelectionService: AnalysisSelectionService | null = null;

  selectedTab = PlantViewTabs.MAP;
  tabsLoaded = 0;
  allTabsLoaded = false;

  // Special case of openlayers...
  mapLoaded = false;
  timeoutMapLoaded: any | undefined = undefined;

  notMapTabLoaded = false;
  zoomToHome = false;

  private routeQueryHelper = new RouteQueryHelper(this);

  @CatchError()
  created() {
    this.setBrowserTitle(this.plant.name);

    this.routeQueryHelper.queryChanged(async () => {
      this.selectedTab = this.queryTab;
    });

    this.analysisSelectionService = new AnalysisSelectionService(this);

    window.addEventListener('resize', (event) => {
      const tabbarElement = document.querySelectorAll("#tabbar")[0].children[0].children[0];
      const tabBarHeight = tabbarElement.getBoundingClientRect().height;
      this.$store.direct.commit.sidebar.set({ tabBarHeight: tabBarHeight });
      // console.log(tabBarHeight);
    });
  }

  async mounted() {
    await this.analysisSelectionService?.register();    
  }
  

  @Watch("selectedTab") async onSelectedTabChanged() {
    if (!this.allTabsLoaded) {
      return;
    }

    // Special case of openlayers: 
    // Zoom to home does not work properly if canvas has no focus for about 1 sec
    // So we have to make sure that zoom home events gets called, always, 
    // as long as canvas has no focus for at least 1 sec....
    if (this.selectedTab === PlantViewTabs.MAP) {
      this.rerenderOLCanvas();

      this.timeoutMapLoaded = setTimeout(() => {
        if (this.selectedTab === PlantViewTabs.MAP) {
          this.mapLoaded = true;
        }
        this.timeoutMapLoaded = undefined;
      }, 1000);
    } else if (this.timeoutMapLoaded !== undefined) {
      clearTimeout(this.timeoutMapLoaded);
      this.timeoutMapLoaded = undefined;
    }
    

    if (this.selectedTab !== this.queryTab) { // Tab changed by user
      // Push a new query route to the browser history
      const nextView = PlantViewTabs[this.selectedTab].toString().toLowerCase() as any;
      await this.routeQueryHelper.pushRoute({ view: nextView });
    }
  }

  onTabsChanged() {
    // onTabsChanged gets called, when a tab has been added or removed.
    // depending on the "v-if" conditions the number of the raised events variates...
    // 3 times (because to conditions are identical) with analysis results
    // 1 time without analysis results

    this.tabsLoaded++;

    if ((this.tabsLoaded === 1 && !this.hasResults) || this.tabsLoaded === 3) {
      this.allTabsLoaded = true;
      this.onTabsLoaded();
    }
  }

  protected async onTabsLoaded() {
    if (this.selectedTab !== this.queryTab) { // selectedTab is Map but queryTab is not map (table or diagram...)
      this.selectedTab = this.queryTab; // triggers "onSelectedTabChanged"
    } else { // selectedTab is Map
      await this.onSelectedTabChanged();
    }
  }

  async onAnalysisSelected() {
    this.rerenderOLCanvas();
  }

  async onMultiAnalysesSelected() {
    this.rerenderOLCanvas();
  }

  get hasResults(): boolean {
    return this.analyses && this.analyses.filter(analysis => analysis.analysis_result).length > 0 || false;
  }

  get hasSelectAnalysisResults(): boolean {
    return this.analysisSelectionService?.hasAnyAnalysisSelected() || false;
  }

  private rerenderOLCanvas(timeout = 0): void {
    setTimeout(() => {
      // triggers openlayers canvas element to rerender
      window.dispatchEvent(new UIEvent("resize"));

      if (!this.mapLoaded) {
        window.dispatchEvent(new CustomEvent("app-visualization:go-home"));
      }
    }, timeout);
  }

  get queryTab(): number {
    const queryTabName = (this.$route.query.view || "map" ).toString().toUpperCase();
    return Object.values(PlantViewTabs).findIndex(tabName => tabName == queryTabName) || 0;
  }

  async unmounted() {
    this.analysisSelectionService?.unregister();
    this.$nextTick(() => {console.log(document.querySelectorAll("#__BVID__107__BV_tab_controls_")[0].clientHeight);});

  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.plant-view-tabs {
  height: 100%;
  width: 100%;

  @media (max-width: 1000px) {
    .nav-item .nav-link span {
      display: none;
    }
  }

  .plant-name {
    width: 120px;
    position: absolute;
    z-index: 1030;
    top: -25px;
    left:65px;
    color: white;
    font-size: 15px;
  }
}
</style>
