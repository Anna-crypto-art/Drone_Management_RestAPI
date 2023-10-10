<template>
  <div class="app-map-view-legend" :class="{ 'sidebar-open': sidebarOpen, 'selection-sidebar-open': selectionSidebarOpen }">
    <div v-for="(entry, index) in legendEntries" :key="index" class="app-map-view-legend-entry" :class="{ 'pad-left': entry.indent }">
      <div class="app-map-view-legend-entry-color" :style="`background: ${entry.color}`"></div>
      <div class="app-map-view-legend-entry-name" v-html="entry.name"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Component, Prop } from "vue-property-decorator";
import { LayersService } from "./layers/layers-service";
import { Legend, LegendEntry } from "./types";
import { LayerEvent } from "./layers/types";
import { KeyFigureLayer } from "./layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { IObservationSelectionComponent } from "../selection-sidebar/observation-selection/types";
import { ObservationSelectionService } from "../selection-sidebar/observation-selection/observation-selection-service";
import { RefMeasureLayerEvent, RefMeasureLayersService } from "./layers/ref-measure-layers-service";
import { Map } from "ol";


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
  observationSelectionService!: ObservationSelectionService;
  refMeasureLayersService!: RefMeasureLayersService;

  legends: Legend[] = [];

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.observationSelectionService = new ObservationSelectionService(this);
    this.refMeasureLayersService = RefMeasureLayersService.get(this.plant, this.map);

    LayersService.get(this.plant.id).on(
      this.plant.id,
      LayerEvent.ON_KEY_FIGURE_SELECTED,
      async (layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>) => {
        await this.onLayerSelected(layer);
      }
    );
    LayersService.get(this.plant.id).on(
      this.plant.id,
      LayerEvent.ON_INV_AUTO_SELECT_SELECTED,
      async (layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>) => {
        await this.onLayerSelected(layer);
      }
    );

    this.refMeasureLayersService.on(this.plant.id, RefMeasureLayerEvent.ON_REF_MEASURE_LAYERS_CHANGED, () => {
      const li = this.legends.findIndex(l => l.id === this.refMeasureLayersService.refMeasurLegendId);
      if (li !== -1) {
        this.legends.splice(li, 1);
      }

      const refMeasureLegend = this.refMeasureLayersService.getLegend();
      if (refMeasureLegend) {
        this.legends.push(refMeasureLegend);
      }
    });
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
    return this.$store.direct.state.sidebar.analyses || this.$store.direct.state.sidebar.observations;
  }

  get selectionSidebarOpen(): boolean {
    return !!(this.analysisSelectionService?.firstAnalysisResult || this.observationSelectionService.hasSelectedObservations);
  }

  async onLayerSelected(layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>) {
    const legend = layer.getLegend();

    if (legend) {
      const existingLegendIndex = this.legends.findIndex(l => l.id === legend.id);
      const existingLegend = existingLegendIndex != -1 ? this.legends[existingLegendIndex] : undefined;

      if (layer.selected) {
        if (existingLegend) {
          this.legends.splice(existingLegendIndex, 1, legend)
        } else {
          this.legends.push(legend);
        }
      } else {
        if (existingLegend) {
          this.legends.splice(existingLegendIndex, 1);
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