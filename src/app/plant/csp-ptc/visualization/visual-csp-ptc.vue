<template>
  <open-layers ref="openlayercomp" v-if="hasLayers" :layers="layers"></open-layers>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'vue-property-decorator';
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
import { IAppVisualCspPtc } from './types';


@Component({
  name: 'app-visual-csp-ptc',
  components: {
    OpenLayers,
  }
})
export default class AppVisualCspPtc extends Vue implements IAppVisualCspPtc {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() openlayercomp!: Vue;

  private selectedAnalysisResult?: AnalysisResultDetailedSchema;
  private kpiLayers!: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[];

  layers: LayerType[] = [];
  showPCS = false;

  async created() {
    this.createLayers();
  }

  selectAnalysisResult(analysisResultId: string): void {
    this.selectedAnalysisResult = this.analysisResults.filter(analysisResult => analysisResult.id === analysisResultId)[0];

    for (const kpiLayer of this.kpiLayers) {
      kpiLayer.setVisible(kpiLayer.analysisResult.id == this.selectedAnalysisResult.id);
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
        childLayers: undefined,
      },
      {
        name: this.$t('pcs').toString(),
        type: "custom",
        customLoader: () => { return; },
        onSelected: (selected: boolean) => { this.showPCS = selected; },
        selected: false,
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
        const kpiLayer = this.getKPILayer(analysisResult, compKeyFigure);
        if (kpiLayer) {
          this.kpiLayers.push(kpiLayer);
        }
      }
    }
  }

  private getKPILayer(
    anaysisResult: AnalysisResultDetailedSchema,
    compKeyFigure: ComponentKeyFigureSchema
  ): KeyFigureLayer<AnalysisResultCspPtcSchemaBase> | undefined {
    // I get a Vetur(2322) that i do not understand... 
    // maybe it is a ts bug or (more likley) i am just too stupid to understand
    // anyhow... to solve this i use the so famous "any" type!
    // Please feel free to do further investigations and remove the "any" type if you can!

    switch (compKeyFigure.key_figure.id) {
      case AnalysisResultKeyFigure.IR_INTENSITY_ID:
        return new IrIntensityKeyFigureLayer(this.plant, this, anaysisResult) as any;
      
      case AnalysisResultKeyFigure.SCE_ANGLE_ID:
        return new SceAngleKeyFigureLayer(this.plant, this, anaysisResult) as any;
    }

    return undefined;
  }

  private getComponentLayers(): ComponentLayer[] {
    return [
      new ScaComponentLayer(this.plant, this),
      new AbsorberComponentLayer(this.plant, this),
      new SceComponentLayer(this.plant, this)
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