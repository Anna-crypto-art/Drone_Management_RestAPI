<template>
  <div class="visual-csp-ptc">
    <open-layers ref="openlayercomp" v-if="hasLayers" :layers="layers" @click="onOpenLayersClick">
      <template #pcs>
        {{ $t("pcs") }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
      </template>
      <template #irIntensity>
        {{ $t("ir-intensity-class") }} <app-explanation><span v-html="$t('ir-intensity-class_expl')"></span></app-explanation>
      </template>
      <template #missingGhr>
        {{ $t("missing-gct") }} <app-explanation><span v-html="$t('missing-gct_expl')"></span></app-explanation>
      </template>
      <template #O2Penetration>
        {{ $t("oxygen-penetration") }} <app-explanation><span v-html="$t('oxygen-penetration_expl')"></span></app-explanation>
      </template>
      <template #H2Concentration>
        {{ $t("high-hydrogen-concentration") }} <app-explanation><span v-html="$t('high-hydrogen-concentration_expl')"></span></app-explanation>
      </template>
      <template #sceAngle>
        {{ $t("sce-alignment-offset") }} <app-explanation>{{ $t("angle-deviation_expl") }}</app-explanation>
      </template>
    </open-layers>
    <div v-if="hasLegend" class="visual-csp-ptc-legend">
      <div v-for="entry in legend.entries" :key="entry.color" class="visual-csp-ptc-legend-entry">
        <div class="visual-csp-ptc-legend-entry-color" :style="`background: ${entry.color}`"></div>
        <div class="visual-csp-ptc-legend-entry-name" v-html="entry.name"></div>
      </div>
    </div>
    <b-toast id="piInfoToast" no-auto-hide solid toaster="b-toaster-bottom-center">
      <template #toast-title>
        <h3>{{ piToastInfo.title }}</h3>
      </template>
      <div>
        <b-row v-for="featureInfo in piToastInfo.records" :key="featureInfo.name" :class="featureInfo.bold && 'font-weight-bold'">
          <b-col>
            {{ featureInfo.name }} 
            <app-explanation v-if="featureInfo.descr">
              <span v-html="$t(featureInfo.descr)"></span>
            </app-explanation>
          </b-col>
          <b-col>{{ featureInfo.value }}</b-col>
        </b-row>
      </div>
    </b-toast>
  </div>
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
import { MissingGhrKeyFigureLayer } from './key-figures/missing-ghr-key-figure-layer';
import { CoatingDegratedKeyFigureLayer } from './key-figures/coating-degrated-key-figure-layer';
import { H2ConcentrationKeyFigureLayer } from './key-figures/h2-concentration-key-figure-layer';
import { ComponentLayer } from './components/shared/component-layer';
import { ScaComponentLayer } from './components/sca-component-layer';
import { AbsorberComponentLayer } from './components/absorber-component-layer';
import { SceComponentLayer } from './components/sce-component-layer';
import { IAnalysisResultSelection } from '../types';
import { FeatureInfos, Legend } from './key-figures/shared/types';
import { FeatureLike } from "ol/Feature";
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';


@Component({
  name: 'app-visual-csp-ptc',
  components: {
    OpenLayers,
    AppExplanation
  }
})
export default class AppVisualCspPtc extends Vue implements IAnalysisResultSelection {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() openlayercomp!: Vue;

  private selectedAnalysisResult?: AnalysisResultDetailedSchema;
  private kpiLayers!: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[];
  private componentLayers!: ComponentLayer[];

  layers: LayerType[] = [];
  showPCS = false;
  legend: Legend | null = null;
  piToastInfo: FeatureInfos = { title: "", records: [{ name: "", descr: "", value: "" }] };

  async created() {
    this.createLayers();
  }

  selectAnalysisResult(analysisResultId: string): void {
    this.selectedAnalysisResult = this.analysisResults.filter(analysisResult => analysisResult.id === analysisResultId)[0];

    for (const kpiLayer of this.kpiLayers) {
      kpiLayer.setVisible(kpiLayer.analysisResult.id == this.selectedAnalysisResult.id);
    }

    this.hideToast();
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }

  get hasLegend(): boolean {
    return this.legend !== null;
  }

  onOpenLayersClick(features: FeatureLike[]) {
    const piToastInfo = this.kpiLayers.map(kpiLayer => kpiLayer.onClick(features))
      .find(featureInfos => featureInfos !== undefined); 
    if (piToastInfo) {
      this.piToastInfo = piToastInfo;
    }

    if (piToastInfo) {
      this.$bvToast.show("piInfoToast");
    } else {
      this.hideToast();
    }
  }

  private createLayers(): void {
    this.createComponentLayers();
    this.createKPILayers();

    this.layers.push(
      {
        name: this.$t('world-map').toString(),
        type: "osm",
        selected: true,
        childLayers: undefined,
      },
      {
        name: "pcs",
        type: "custom",
        customLoader: () => { return; },
        onSelected: (selected: boolean) => { 
          this.showPCS = selected;

          this.kpiLayers.forEach(kpiLayer => kpiLayer.showPCS(selected));
          this.componentLayers.forEach(compLayer => compLayer.showPCS(selected));
        },
        selected: false,
      },
      {
        name: this.$t("performance-indicators").toString(),
        type: "group",
        singleSelection: true,
        childLayers: this.kpiLayers.map(kpiLayer => kpiLayer.toGeoLayer())
      },
      {
        name: this.$t('components').toString(),
        type: "group",
        childLayers: this.componentLayers.map(compLayer => compLayer.toGeoLayer())
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
        return new IrIntensityKeyFigureLayer(this.plant, this, anaysisResult, 
          (selected, legend) => this.onSelected(selected, legend)) as any;
      
      case AnalysisResultKeyFigure.SCE_ANGLE_ID:
        return new SceAngleKeyFigureLayer(this.plant, this, anaysisResult, 
          (selected, legend) => this.onSelected(selected, legend)) as any;

      case AnalysisResultKeyFigure.MISSING_GLASS_CLADDING_TUBE_ID:
        return new MissingGhrKeyFigureLayer(this.plant, this, anaysisResult,
          (selected, legend) => this.onSelected(selected, legend)) as any;

      case AnalysisResultKeyFigure.COATING_DEGRATION_ID:
        return new CoatingDegratedKeyFigureLayer(this.plant, this, anaysisResult,
          (selected, legend) => this.onSelected(selected, legend)) as any;

      case AnalysisResultKeyFigure.H2_CONCENTRATION_ID:
        return new H2ConcentrationKeyFigureLayer(this.plant, this, anaysisResult,
          (selected, legend) => this.onSelected(selected, legend)) as any;
    }

    return undefined;
  }

  private createComponentLayers(): void {
    this.componentLayers = [
      new ScaComponentLayer(this.plant, this),
      new AbsorberComponentLayer(this.plant, this),
      new SceComponentLayer(this.plant, this)
    ];
  }

  private onSelected(selected: boolean, legend: Legend) {
    this.legend = selected && legend || null;

    this.hideToast();
  }

  private hideToast() {
    this.$bvToast.hide("piInfoToast");
  }
}
</script>

<style lang="scss">
// Fix that toaster overlays popover
.b-popover {
  z-index: 1;
}
.b-toaster {
  z-index: 0;
}

.visual-csp-ptc {
  position: relative;
  height: 100%;
  width: 100%;

  &-legend {
    @supports (backdrop-filter: blur(5px)) {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.5);
    }
    @supports not (backdrop-filter: blur(5px)) {
      background: rgba(255, 255, 255, 0.5);
    }

    position: absolute;
    bottom: 0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
    padding: 10px 15px 0px 15px;

    &-entry {
      display: flex;
      height: 25px;
      margin-bottom: 10px;

      &-color {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        margin-top: 5px;
      }
      &-name {
        width: auto;
      }
    }
  }
}
.openlayers-map {
  height: 100%;
  width: 100%;
}
</style>