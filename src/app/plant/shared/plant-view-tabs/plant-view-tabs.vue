<template>
  <div class="plant-view-tabs">
    <b-tabs v-model="selectedTab" align="center" @changed="onTabsChanged">
      <b-tab>
        <template #title>
          <b-icon icon="map" /> <span class="pad-left">{{ $t("map") }}</span>
        </template>
        <slot name="visual" />
      </b-tab>
      <b-tab v-if="hasSelectAnalysisResults">
        <template #title><b-icon icon="table" /> <span class="pad-left">{{ $t("table") }}</span></template>
        <div v-if="loadTables">
          <slot name="tables" />
        </div>
      </b-tab>
      <b-tab v-if="hasSelectAnalysisResults">
        <template #title><b-icon icon="bar-chart-fill" /> <span class="pad-left">{{ $t("statistics") }}</span></template>
        <div v-if="loadDiagrams">
          <slot name="diagram" />
        </div>
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { analysisSelectEventService } from "../analysis-selection-sidebar/analysis-selection-service";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { PlantViewTabs } from "./types";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { AnalysisSelectionEvent } from "../analysis-selection-sidebar/types";
import { getMobileQuery } from "@/app/shared/services/helper/mobile-helper";

@Component({
  name: "app-plant-view-tabs"
})
export default class AppPlantViewTabs extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  selectedTab = 0;
  tabsLoaded = 0;
  allTabsLoaded = false;

  // Load table data if user switches to table view, only
  // So we avoid keeping REST-API busy for no reason.
  loadTables = false;
  loadDiagrams = false; // same for diagrams
  loadMap = false;

  notMapTabLoaded = false;
  zoomToHome = false;

  private routeQueryHelper = new RouteQueryHelper(this);

  private isMobile!: boolean;
  private isMobileQuery!: MediaQueryList;
  private async isMobileListener<Evt extends { matches: boolean }>(e: Evt) {
    this.isMobile = e.matches;

    this.$store.direct.commit.sidebar.setAll(!this.isMobile);
    await this.updateLeftSidebarAbsolute();
  }

  @CatchError()
  async created(): Promise<void> {
    await super.created();

    this.setBrowserTitle(this.plant.name);

    this.routeQueryHelper.queryChanged(async () => {
      this.selectedTab = this.queryTab;
    });

    this.isMobileQuery = getMobileQuery()
    this.isMobileQuery.addEventListener("change", this.isMobileListener);
    this.isMobileListener(this.isMobileQuery);
  }

  @Watch("selectedTab") async onSelectedTabChanged() {
    if (!this.allTabsLoaded) {
      return;
    }

    if (this.selectedTab !== this.queryTab) {
      // Special case of openlayers: 
      // Zoom to home does not work properly if canvas has no focus...
      // So we have to call it again...
      // if (!this.loadMap && this.selectedTab === PlantViewTabs.MAP) {
      //   this.zoomToHome = true;
      // }
      
      const nextView = PlantViewTabs[this.selectedTab].toString().toLowerCase() as any;
      await this.routeQueryHelper.pushRoute({ view: nextView });
    }

    await this.updateLeftSidebarAbsolute();

    await this.loadTabContent();
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
      this.rerenderOLCanvas();
      // No need to call whazzup to avoid that onAnalysisSelected (in visualization.vue) gets fired twice...
      this.loadMap = true;  

      await this.onSelectedTabChanged();
    }
  }

  protected async onAnalysisSelected() {
    this.rerenderOLCanvas();
  }

  protected async onMultiAnalysesSelected() {
    this.rerenderOLCanvas();
  }

  get hasResults(): boolean {
    return this.analyses && this.analyses.filter(analysis => analysis.analysis_result).length > 0 || false;
  }

  get hasSelectAnalysisResults(): boolean {
    return !!this.firstAnalysisResult;
  }

  private rerenderOLCanvas(timeout = 0): void {
    setTimeout(() => {
      // triggers openlayers canvas element to rerender
      window.dispatchEvent(new UIEvent("resize"));

      if (!this.loadMap) {
        window.dispatchEvent(new CustomEvent("app-visualization:go-home"));
      }
    }, timeout);
  }

  get queryTab(): number {
    const queryTabName = (this.$route.query.view || "map" ).toString().toUpperCase();
    return Object.values(PlantViewTabs).findIndex(tabName => tabName == queryTabName) || 0;
  }

  private async callWhazzup() {
    if (this.firstAnalysisResult) {
      // wait for tables or map component to be loaded and
      // fire last Analysis event to load data or rerender
      await this.$nextTick();

      console.log("call whazzup")

      await analysisSelectEventService.whazzup(this.plant.id);
    }
  }

  private async loadTabContent() {
    if (this.hasResults) {
      if (this.selectedTab === PlantViewTabs.TABLE && !this.loadTables) {
        await this.callWhazzup();
        this.loadTables = true;
      } else if (this.selectedTab === PlantViewTabs.DIAGRAM && !this.loadDiagrams) {
        await this.callWhazzup();
        this.loadDiagrams = true;
      } else if (this.selectedTab === PlantViewTabs.MAP && !this.loadMap) {
        await this.callWhazzup();
        this.loadMap = true;
      }
    }
  }

  unmounted() {
    this.isMobileQuery.removeEventListener("change", this.isMobileListener);
  }

  async updateLeftSidebarAbsolute() {
    const leftSidebarAbsolute = this.isMobile || this.selectedTab === PlantViewTabs.MAP;

    await analysisSelectEventService.emit(
      this.plant.id, 
      AnalysisSelectionEvent.SIDEBAR_ABSOLUTE, 
      leftSidebarAbsolute
    );
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.plant-view-tabs {
  height: 100%;
  width: 100%;

  @media (max-width: 576px) {
    .nav-item .nav-link:not(.active) span {
      display: none;
    }
  }
}
</style>
