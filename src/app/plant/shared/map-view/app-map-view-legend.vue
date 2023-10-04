<template>
  <div class="app-map-view-legend" :class="{ 'sidebar-open': sidebarOpen, 'selection-sidebar-open': selectionSidebarOpen }">
    <div v-for="entry in legendEntries" :key="entry.color" class="app-map-view-legend-entry" :class="{ 'pad-left': entry.indent }">
      <div class="app-map-view-legend-entry-color" :style="`background: ${entry.color}`"></div>
      <div class="app-map-view-legend-entry-name" v-html="entry.name"></div>
    </div>
  </div>
</template>
<script lang="ts">
import AppMapPopButton from "@/app/shared/components/app-map/app-map-pop-button.vue";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map } from "ol";
import { Component, Prop } from "vue-property-decorator";
import { ComponentLayer } from "./layers/component-layer";
import AppGeoJsonLayerCheckbox from "@/app/shared/components/app-map/app-geo-json-layer-checkbox.vue";
import { LayersService } from "./layers/layers-service";
import { Legend, LegendEntry } from "./types";
import { LayerEvent } from "./layers/types";
import { BaseLayer } from "./layers/base-layer";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { IObservationSelectionComponent } from "../selection-sidebar/observation-selection/types";
import { ObservationSelectionService } from "../selection-sidebar/observation-selection/observation-selection-service";


@Component({
  name: "app-map-view-legend",
  components: {
  },
})
export default class AppMapViewLegend extends BaseComponent implements IAnalysisSelectionComponent, IObservationSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  
  analysisSelectionService: AnalysisSelectionService | null = null;
  observationSelectionService!: ObservationSelectionService;

  legends: Legend[] = [];

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.observationSelectionService = new ObservationSelectionService(this);

    LayersService.get(this.plant.id).on(
      this.plant.id,
      LayerEvent.ON_KEY_FIGURE_SELECTED,
      async (layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>) => {
        await this.onLayerSelected(layer);
      }
    );
    LayersService.get(this.plant.id).on(
      this.plant.id,
      LayerEvent.ON_KEY_FIGURE_SELECTED,
      async (layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>) => {
        await this.onLayerSelected(layer);
      }
    );
  }

  async mounted() {
    await this.analysisSelectionService!.register();
  }

  async unmounted() {
    this.analysisSelectionService!.unregister();
  }

  get legendEntries(): LegendEntry[] {
    const legendEntries: LegendEntry[] = [];
    
    for (const legend of this.legends) {
      legendEntries.push(...legend.entries);
    }

    return legendEntries;
  }

  get sidebarOpen(): boolean {
    return this.$store.direct.state.sidebar.analysis; //|| this.$store.direct.state.sidebar.observations;
  }

  get selectionSidebarOpen(): boolean {
    return !!(this.analysisSelectionService?.firstAnalysisResult || this.observationSelectionService.hasSelectedObservations);
  }

  async onLayerSelected(layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>) {
    const legend = layer.getLegend();

    if (legend) {
      let existingLegend = this.legends.find(l => l.id === legend.id || l.merge?.metaIds?.includes(legend.id));

      if (layer.selected) {
        if (legend.merge) {
          // Merge multiple Legends that have "merge" property and the same color.
          // Currently used by ReferenceMeasurementLayer, only

          legend.merge.metaSum = legend.merge.count;
          legend.merge.metaIds = [];

          const mergeLegend = this.legends.find(l => l.merge && l.entries[0].color === legend.entries[0].color);
          if (mergeLegend) {
            legend.merge.metaSum += mergeLegend.merge!.metaSum || mergeLegend.merge!.count;
            legend.merge.metaIds.push(mergeLegend.id);
            
            const mergeLegendIndex = this.legends.findIndex(l => l.id === mergeLegend.id);

            this.legends.splice(mergeLegendIndex, 1);
          }

          legend.entries[0].name = legend.merge.metaSum + " " + legend.merge.name;
        }

        if (!existingLegend) {
          this.legends.push(legend);
        } else {
          console.error("Legend id " + legend.id + " already added")
        }
      } else {
        if (existingLegend) {
          if (legend.merge && existingLegend.merge!.metaSum! > legend.merge.count) {
            // The ("legend.merge")-code mutated to a complex thing.... 
            // I feel sorry for the developer, who is trying to understand...

            existingLegend.merge!.metaSum! -= legend.merge.count;

            const metaIdIndex = existingLegend.merge!.metaIds!.findIndex(id => id === legend.id);
            if (metaIdIndex != -1) {
              existingLegend.merge!.metaIds!.splice(metaIdIndex, 1);
            } else {
              existingLegend.id = existingLegend.merge!.metaIds![0];
            }
            
            existingLegend.entries[0].name = existingLegend.merge!.metaSum + " " + existingLegend.merge!.name;
          } else {
            this.legends.splice(this.legends.findIndex(l => l.id === existingLegend!.id), 1);
          }
        }
      }
    }

    // await this.piLayersHierarchy!.onLayerSelected();

    // const selectedLayers = this.piLayersHierarchy!.getSelectedLayers();
    // this.routeQueryHelper.replaceRoute({ layer: selectedLayers.map(selectedLayer => selectedLayer.noTransName)});
    
    // this.hideToast();
  }

  async onAnalysisSelected() { 
    console.log("onAnalysisSelected", this.analysisSelectionService!.firstAnalysis)

    /* why do i exist? */
  }

  async onObservationSelected() { /* why do i exist? */}

  async onMultiAnalysesSelected() { /* why do i exist? */}
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-legend {
  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.7);
  }
  @supports not (backdrop-filter: blur(5px)) {
    background: rgba(255, 255, 255, 0.8);
  }

  transition: left 0.3s ease-in-out;
  position: absolute;
  bottom: 0.5em;
  left: 0.5em;
  width: auto;
  height: auto;
  padding: 10px 15px 0px 15px;

  &.sidebar-open {
    left: calc($sidebar-width + 0.5em);

    &.selection-sidebar-open {
      left: calc($sidebar-width + 300px + 0.5em);
    }
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
</style>