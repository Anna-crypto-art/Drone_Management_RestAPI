<template>
  <open-layers v-if="hasLayers" :layers="layers"></open-layers>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { LayerType, OpenLayers } from 'volateq-geovisualization';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultKeyFigure } from '@/app/shared/services/volateq-api/api-analysis-result-key-figures';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import { ComponentKeyFigureSchema } from '@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema';
import { KeyFigureLayer } from './key-figures/shared/key-figure-layer';
import { AnalysisResultCspPtcSchemaBase } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base';
import { IrIntensityKeyFigureLayer } from './key-figures/ir-intensity-key-figure-layer';
import { SceAngleKeyFigureLayer } from './key-figures/sce-angle-key-figure-layer';
import { ComponentLayer } from './components/shared/component-layer';
import { ScaComponentLayer } from './components/sca-component-layer';
import { AbsorberComponentLayer } from './components/absorber-component-layer';
import { SceComponentLayer } from './components/sce-component-layer';


@Component({
  components: {
    OpenLayers,
  }
})
export default class AppVisualCspPtc extends Vue {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];

  private selectedAnalysisResult?: AnalysisResultDetailedSchema;
  private kpiLayers!: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[];

  layers: LayerType[] = [];
  showPCS = false;

  async created() {
    this.createLayers();
  }

  async selectAnalysisResult(analysisResultId: string) {
    this.selectedAnalysisResult = this.analysisResults.filter(analysisResult => analysisResult.id === analysisResultId)[0];

    for (const kpiLayer of this.kpiLayers) {
      kpiLayer.setAnalysisResult(this.selectedAnalysisResult);
    }
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }

  private createLayers(): void {
    this.createKPILayers();

    this.layers.push(
      {
        name: this.$t('world-map').toString(),
        type: "osm",
        selected: true,
        childLayers: undefined
      },
      {
        name: this.$t('pcs').toString(),
        type: "custom",
        customLoader: () => { return; },
        onSelected: (selected: boolean) => { this.showPCS = selected; },
        selected: false
      },
      {
        name: this.$t("kpi").toString(),
        type: "group",
        singleSelection: true,
        childLayers: this.kpiLayers.map(kpiLayer => kpiLayer.toGeoLayer())
      },
      {
        name: this.$t('components').toString(),
        type: "group",
        childLayers: this.getComponentLayers().map(compLayer => compLayer.toGeoLayer())
      }
    );
  }

  private createKPILayers(): void {
    this.kpiLayers = [];

    for (const analysisResult of this.analysisResults) {
      for (const compKeyFigure of analysisResult.component_key_figures) {
        this.kpiLayers.push(this.getKPILayer(compKeyFigure));
      }
    }
  }

  private getKPILayer(compKeyFigure: ComponentKeyFigureSchema): KeyFigureLayer<AnalysisResultCspPtcSchemaBase> {
    switch (compKeyFigure.key_figure.id) {
      case AnalysisResultKeyFigure.IR_INTENSITY_ID:
        return new IrIntensityKeyFigureLayer(this.plant);
      
      case AnalysisResultKeyFigure.SCE_ANGLE_ID:
        return new SceAngleKeyFigureLayer(this.plant);
    }

    throw new Error('Unsupported key_figure_id');
  }

  private getComponentLayers(): ComponentLayer[] {
    return [
      new ScaComponentLayer(this.plant),
      new AbsorberComponentLayer(this.plant),
      new SceComponentLayer(this.plant)
    ];
  }
}
</script>

<style lang="scss">
.openlayers-map {
  height: 500px;
  width: 100%;
}
</style>