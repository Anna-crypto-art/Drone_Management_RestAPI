<template>
  <div class="app-map-view-legend" :class="{ 'selection-sidebar-open': layerSelectionOpen }" v-show="visible">
    <div v-show="selectedAnalysisName"
      class="app-map-view-legend-container"
      :class="{ 'inactive': !isAnalysisLegendsActive }"
    >
      <div class="grayed mar-bottom-half">
        <small><b>{{ selectedAnalysisName }}</b></small>
      </div>
      <div v-for="(entry, index) in analysislegendEntries" :key="index"
        class="app-map-view-legend-container-entry" 
        :class="{ 'pad-left': entry.indent }"
      >
        <div class="app-map-view-legend-container-entry-color" :style="`background: ${entry.color}`"></div>
        <div class="app-map-view-legend-container-entry-name" v-html="entry.name"></div>
      </div>
    </div>
    <div class="app-map-view-legend-container"
      :class="{ 'mar-top-half': !!selectedAnalysisName, 'inactive': !isObservationsLegendsActive }"
      v-show="selectedObservName"
    >
      <div class="grayed mar-bottom-half">
        <small><b>{{ selectedObservName }}</b></small>
      </div>
      <div v-for="(entry, index) in observationslegendEntries" :key="index" class="app-map-view-legend-container-entry" :class="{ 'pad-left': entry.indent }">
        <div class="app-map-view-legend-container-entry-color" :style="`background: ${entry.color}`"></div>
        <div class="app-map-view-legend-container-entry-name" v-html="entry.name"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop, Watch } from "vue-property-decorator";
import { LayersService } from "./layers/layers-service";
import { Legend, LegendEntry } from "./types";
import { KeyFigureBaseLayer, LayerEvent } from "./layers/types";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { IObservationSelectionComponent } from "../selection-sidebar/observation-selection/types";
import { ObservationSelectionService } from "../selection-sidebar/observation-selection/observation-selection-service";
import { RefMeasureLayerEvent, RefMeasureLayersService } from "./layers/ref-measure-layers-service";
import { Map } from "ol";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { ObservationCcpLayer } from "./layers/observation-ccp-layer";
import { BaseLayer } from "./layers/base-layer";
import { ObservationLayer } from "./layers/observation-layer";


@Component({
  name: "app-map-view-legend",
  components: {
  },
})
export default class AppMapViewLegend extends BaseComponent implements IAnalysisSelectionComponent, IObservationSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) map!: Map;
  
  analysisSelectionService: AnalysisSelectionService | null = null;
  observationSelectionService: ObservationSelectionService | null = null;
  refMeasureLayersService!: RefMeasureLayersService;
  layersService!: LayersService;

  routeQueryHelper = new RouteQueryHelper(this);

  analysisLegends: Legend[] = [];
  obersvationLegends: Legend[] = [];

  isAnalysisLegendsActive = true;
  isObservationsLegendsActive = true;

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.observationSelectionService = new ObservationSelectionService(this);
    this.refMeasureLayersService = RefMeasureLayersService.get(this.plant, this.map);
    
    this.layersService = LayersService.get(this.plant.id);
    this.layersService.on(
      this.plant.id,
      LayerEvent.ON_KEY_FIGURE_SELECTED,
      async (layer: KeyFigureBaseLayer) => {
        this.onKeyFigureLayerSelected(layer);

        await this.routeQueryHelper.replaceRoute({
          layer: this.layersService.keyFigureLayers.filter(l => l.selected).map(l => l.name),
        });
      }
    );
    this.layersService.on(
      this.plant.id,
      LayerEvent.ON_INV_AUTO_SELECT_SELECTED,
      async (layer: KeyFigureBaseLayer) => {
        this.onKeyFigureLayerSelected(layer);
      }
    );
    this.layersService.on(
      this.plant.id,
      LayerEvent.ON_OBSERV_SELECTED,
      async (layer: ObservationLayer) => {
        this.onObservLayerSelected(layer);

        await this.routeQueryHelper.replaceRoute({
          ccpId: this.layersService.observationLayers.filter(l => l.selected)
            .map(l => l.ccp.id + (l.filterValue !== undefined && l.filterValue !== null ?
              "__" + l.filterValue.toString() :
              "")),
        });
      }
    )

    this.refMeasureLayersService.on(this.plant.id, RefMeasureLayerEvent.ON_REF_MEASURE_LAYERS_CHANGED, () => {
      const li = this.analysisLegends.findIndex(l => l.id === this.refMeasureLayersService.refMeasurLegendId);
      if (li !== -1) {
        this.analysisLegends.splice(li, 1);
      }

      const refMeasureLegend = this.refMeasureLayersService.getLegend();
      if (refMeasureLegend) {
        this.analysisLegends.push(refMeasureLegend);
      }
    });
  }

  async mounted() {
    await this.analysisSelectionService!.register();
    await this.observationSelectionService!.register();
  }

  async unmounted() {
    this.analysisSelectionService!.unregister();
    this.observationSelectionService!.unregister();
  }

  get layerSelectionOpen(): boolean {
    return (this.$store.direct.state.sidebar.analysesSelection || this.$store.direct.state.sidebar.observationsSelection) && !this.isMobile;
  }

  get isMobile(): boolean {
    return this.$store.direct.state.mobile.isMobile;
  }

  get visible(): boolean {
    return this.analysislegendEntries.length > 0;
  }

  get analysislegendEntries(): LegendEntry[] {
    const legendEntries: LegendEntry[] = [];
    
    for (const legend of this.analysisLegends) {
      legendEntries.push(...legend.entries);
    }

    return legendEntries;
  }

  get observationslegendEntries(): LegendEntry[] {
    const legendEntries: LegendEntry[] = [];
    
    for (const legend of this.obersvationLegends) {
      legendEntries.push(...legend.entries);
    }

    return legendEntries;
  }

  get selectedAnalysisName(): string {
    return this.analysisSelectionService?.firstAnalysis?.name || "";
  }

  get selectedObservName(): string {
    return this.obersvationLegends.length > 0 && this.observationSelectionService?.hasSelectedObservations &&
      this.$t("observations").toString() + " " + this.observationSelectionService.date ||
      "";
  }

  get isAnalysesSidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.analyses;
  }
  get isObservationsSidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.observations;
  }

  onKeyFigureLayerSelected(layer: KeyFigureBaseLayer) {
    this.onLayerSelected(layer, this.analysisLegends);
  }

  onObservLayerSelected(layer: ObservationLayer) {
    this.onLayerSelected(layer, this.obersvationLegends);
  }

  @Watch("isAnalysesSidebarOpen")
  @Watch("isObservationsSidebarOpen")
  private updateOpacityBySidebarsOpenState() {
    const sidebar = this.$store.direct.state.sidebar;

    this.isAnalysisLegendsActive = sidebar.analyses || (!sidebar.observations && sidebar.lastActiveSidebarName === "analyses");
    this.isObservationsLegendsActive = sidebar.observations || (!sidebar.analyses && sidebar.lastActiveSidebarName === "observations");

    const inactiveLayerOpacity = 0.3;

    this.layersService.keyFigureLayers.forEach(l => l.setOpacity(this.isAnalysisLegendsActive ? 1 : inactiveLayerOpacity));
    this.refMeasureLayersService.setOpacity(this.isAnalysisLegendsActive ? 1 : inactiveLayerOpacity);
    this.layersService.observationLayers.forEach(l => l.setOpacity(this.isObservationsLegendsActive ? 1 : inactiveLayerOpacity));
  }

  private onLayerSelected(layer: BaseLayer, legends: Legend[]) {
    this.updateOpacityBySidebarsOpenState();

    const legend = layer.getLegend();

    if (legend) {
      const existingLegendIndex = legends.findIndex(l => l.id === legend.id);
      const existingLegend = existingLegendIndex != -1 ? legends[existingLegendIndex] : undefined;

      if (layer.selected) {
        if (existingLegend) {
          legends.splice(existingLegendIndex, 1, legend)
        } else {
          legends.push(legend);
        }
      } else {
        if (existingLegend) {
          legends.splice(existingLegendIndex, 1);
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-legend {
  transition: left 0.3s ease-in-out;
  position: absolute;
  bottom: 0.5em;
  left: 0.5em;
  width: auto;
  height: auto;

  &.selection-sidebar-open {
    left: calc($layer-selection-width + 0.5em);
  }

  &-container {
    @supports (backdrop-filter: blur(5px)) {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.7);
    }
    @supports not (backdrop-filter: blur(5px)) {
      background: rgba(255, 255, 255, 0.8);
    }

    padding: 10px 15px 5px 15px;
    box-shadow: 3px 3px 5px $dark-40pc;

    &.inactive {
      opacity: 0.5;
    }

    &-entry {
      display: flex;
      height: 25px;
      margin-bottom: 10px;

      &-color {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        margin-top: 5px;
        flex-shrink: 0;
      }
      &-name {
        width: auto;
        word-break: break-all;
        overflow: hidden;
      }
    }
  }
}
</style>