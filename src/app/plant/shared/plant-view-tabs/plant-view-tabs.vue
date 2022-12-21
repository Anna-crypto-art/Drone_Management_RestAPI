<template>
  <div class="plant-view-tabs">
    <b-tabs v-model="selectedTab" align="center">
      <b-tab>
        <template #title>
          <b-icon icon="map" /> <span class="pad-left">{{ $t("map") }}</span>
        </template>
        <slot name="visual" />
      </b-tab>
      <b-tab v-if="hasResults && hasSelectAnalysisResults">
        <template #title><b-icon icon="table" /> <span class="pad-left">{{ $t("table") }}</span></template>
        <div v-if="loadTables">
          <slot name="tables" />
        </div>
      </b-tab>
      <b-tab v-if="hasResults && hasSelectAnalysisResults">
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
import { AnalysisSelectionService } from "../analysis-selection-sidebar/analysis-selection-service";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { PlantViewTabs } from "./types";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { AnalysisSelectionEvent } from "../analysis-selection-sidebar/types";

@Component({
  name: "app-plant-view-tabs",
})
export default class AppPlantViewTabs extends AnalysisSelectionBaseComponent {
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];

  selectedTab = 0;

  // Load table data if user switches to table view, only
  // So we avoid keeping REST-API busy for no reason.
  loadTables = false;
  loadDiagrams = false; // same for diagrams

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

    this.selectedTab = this.currentTab;

    await this.loadTabContent();

    if (this.selectedTab !== PlantViewTabs.MAP) {
      this.notMapTabLoaded = true;
    }

    this.routeQueryHelper.queryChanged(async () => {
      this.selectedTab = this.currentTab;
    });

    this.isMobileQuery = window.matchMedia("screen and (max-width: 1000px)");
    this.isMobileQuery.addEventListener("change", this.isMobileListener);
    this.isMobileListener(this.isMobileQuery);
  }

  @Watch("selectedTab") async onSelectedTabChanged() {
    if (this.selectedTab !== this.currentTab) {
      // Special case of openlayers: 
      // Zoom to home does not work properly if canvas has no focus...
      // So we have to call it again...
      if (this.notMapTabLoaded && this.selectedTab === PlantViewTabs.MAP) {
        this.zoomToHome = true;
      }
      
      const nextView = PlantViewTabs[this.selectedTab].toString().toLowerCase() as any;
      await this.routeQueryHelper.pushRoute({ view: nextView });
    }

    await this.updateLeftSidebarAbsolute();

    await this.loadTabContent();
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

      if (this.zoomToHome) {
        window.dispatchEvent(new CustomEvent("app-visualization:go-home"));

        this.zoomToHome = false;
        this.notMapTabLoaded = false;
      }
    }, timeout);
  }

  get currentTab(): number {
    const queryTabName = (this.$route.query.view || "map" ).toString().toUpperCase();
    return Object.values(PlantViewTabs).findIndex(tabName => tabName == queryTabName) || 0;
  }

  private async loadTabContent() {
    if (this.hasResults) {
      if (this.selectedTab === PlantViewTabs.TABLE) {
        this.loadTables = true; 
      } else if (this.selectedTab === PlantViewTabs.DIAGRAM) {
        this.loadDiagrams = true; 
      }

      if ([PlantViewTabs.MAP, PlantViewTabs.TABLE, PlantViewTabs.DIAGRAM].includes(this.selectedTab)) {
        // wait for tables or map component to be loaded and
        // fire last Analysis event to load data or rerender
        if (this.firstAnalysisResult) {
          await this.$nextTick();

          await AnalysisSelectionService.whazzup(this.plant.id);
        }
      }
    }
  }

  unmounted() {
    this.isMobileQuery.removeEventListener("change", this.isMobileListener);
  }

  async updateLeftSidebarAbsolute() {
    const leftSidebarAbsolute = this.isMobile || this.selectedTab === PlantViewTabs.MAP;

    await AnalysisSelectionService.emit(
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
}
</style>
