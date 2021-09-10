<template>
  <div class="visual-csp-ptc">
    <open-layers ref="openLayers" v-if="hasLayers" :layers="layers" @click="onOpenLayersClick" @sidebarToggle="onSidebarToggled">
      <template #pcs>
        {{ $t("pcs") }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
      </template>
      <template #irIntensity>
        {{ $t("ir-intensity-class") }} <app-explanation><span v-html="$t('ir-intensity-class_expl')"></span></app-explanation>
      </template>
      <template #glassTubeTemperature>
        {{ $t("glass-tube-temperature-class") }} <app-explanation><span v-html="$t('glass-tube-temperature-class_expl')"></span></app-explanation>
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
      <template #recommendedAction>
        {{ $t("recommended-action") }} <app-explanation><span v-html="$t('recommended-action_expl')"></span></app-explanation>
      </template>

    </open-layers>
    <div v-if="hasLegend" class="visual-csp-ptc-legend">
      <div v-for="entry in legendEntries" :key="entry.color" class="visual-csp-ptc-legend-entry">
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
import { GroupLayer, IOpenLayersComponent, LayerType, OpenLayers } from 'volateq-geovisualization';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultKeyFigure } from '@/app/shared/services/volateq-api/api-analysis-result-key-figures';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import { KeyFigureLayer } from './key-figures/shared/key-figure-layer';
import { AnalysisResultCspPtcSchemaBase } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base';
import { ComponentLayer } from './components/shared/component-layer';
import { IAnalysisResultSelection } from '../types';
import { FeatureInfos, Legend } from './key-figures/shared/types';
import { FeatureLike } from "ol/Feature";
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { AnalysisResultComponent } from '@/app/shared/services/volateq-api/api-analysis-result-components';
import { GroupKPILayer } from "./types";
import { COMPONENT_LAYERS, KEY_FIGURE_LAYERS } from "./layers";


@Component({
  name: 'app-visual-csp-ptc',
  components: {
    OpenLayers,
    AppExplanation
  }
})
export default class AppVisualCspPtc extends BaseAuthComponent implements IAnalysisResultSelection {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() openLayers!: IOpenLayersComponent;

  private selectedAnalysisResult?: AnalysisResultDetailedSchema;
  private parentComponentKpiLayers!: GroupKPILayer[];
  private componentLayers!: ComponentLayer[];

  layers: LayerType[] = [];
  showPCS = false;
  legends: Legend[] = [];
  piToastInfo: FeatureInfos = { title: "", records: [{ name: "", descr: "", value: "" }] };

  async created() {
    this.createLayers();
  }

  selectAnalysisResult(analysisResultId: string | undefined): void {
    this.selectedAnalysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultId);
    
    for (const parentComponentKpiLayer of this.parentComponentKpiLayers) {
      let allInvisble = true;
      for (const kpiLayer of parentComponentKpiLayer.kpiLayers) {
        const visible = this.selectedAnalysisResult && kpiLayer.analysisResult.id == this.selectedAnalysisResult.id || false;
        kpiLayer.setVisible(visible);

        if (visible) {
          allInvisble = false;
        }
      }

      parentComponentKpiLayer.groupLayer.visible = !allInvisble
    }

    this.hideToast();
  }

  get hasLayers(): boolean {
    return this.layers.length > 0;
  }

  get hasLegend(): boolean {
    return this.legends.length > 0;
  }

  get legendEntries(): { color: string, name: string }[] {
    let legendEntries: { color: string, name: string }[] = [];
    for (const legend of this.legends) {
      legendEntries = legendEntries.concat(legend.entries)
    }
    
    return legendEntries;
  }

  onOpenLayersClick(features: FeatureLike[]) {
    const piToastInfo = this.getKpiLayers().map(kpiLayer => kpiLayer.onClick(features))
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

  onSidebarToggled(toggleState: boolean) {

    console.log("blub2");
    this.$emit("sidebarToggle", toggleState);
  }

  private createLayers(): void {
    this.createComponentLayers();
    this.createKPILayers();

    this.layers.push(
      {
        name: this.$t('world-map').toString(),
        type: "osm",
        selected: true,
        styleClass: "to-bottom",
      },
      {
        name: "pcs",
        type: "custom",
        customLoader: () => { return; },
        onSelected: (selected: boolean) => { 
          this.showPCS = selected;

          this.getKpiLayers().forEach(kpiLayer => kpiLayer.showPCS(selected));
          this.componentLayers.forEach(compLayer => compLayer.showPCS(selected));
        },
        selected: false,
        styleClass: "to-bottom",
      },
      {
        name: this.$t("performance-indicators").toString(),
        type: "group",
        childLayers: this.parentComponentKpiLayers.map(parentComponentKpiLayer => parentComponentKpiLayer.groupLayer),
      },
      {
        name: this.$t('components').toString(),
        type: "group",
        childLayers: this.componentLayers.map(compLayer => compLayer.toGeoLayer()),
        visible: this.isSuperAdmin
      }
    );
  }

  private createKPILayers(): void {
    const parentComponentLayers: Record<number, GroupKPILayer> = {};

    for (const analysisResult of this.analysisResults) {
      for (const keyFigure of analysisResult.key_figures) {
        if (!(keyFigure.component.id in parentComponentLayers)) {
          parentComponentLayers[keyFigure.component.id] = {
            componentId: keyFigure.component.id,
            groupLayer: {
              name: this.getComponentName(keyFigure.component.id),
              type: "group",
              childLayers: [],
              visible: false,
              groupSelection: true,
            },
            kpiLayers: [],
          }
        }

        const kpiLayer = this.getKPILayer(analysisResult, keyFigure.id);
        if (kpiLayer) {
          const groupLayer = parentComponentLayers[keyFigure.component.id];
          groupLayer.kpiLayers.push(kpiLayer)
          groupLayer.groupLayer.childLayers.push(kpiLayer.toGeoLayer())
        }
      }
    }

    this.parentComponentKpiLayers = Object.keys(parentComponentLayers).map(componentId => parentComponentLayers[componentId])
  }

  private getKPILayer(
    anaysisResult: AnalysisResultDetailedSchema,
    keyFigureId: AnalysisResultKeyFigure
  ): KeyFigureLayer<AnalysisResultCspPtcSchemaBase> | undefined {
    const keyFigureLayer = KEY_FIGURE_LAYERS.find(keyFigureLayer => keyFigureLayer.keyFigureId === keyFigureId);
    if (keyFigureLayer) {
      return new keyFigureLayer.layerType(this.plant, this, anaysisResult, 
        (selected, legend) => this.onSelected(selected, legend));
    }

    return undefined;
  }

  private createComponentLayers(): void {
    this.componentLayers = COMPONENT_LAYERS.map(componentType => new (componentType as any)(this.plant, this));
  }

  private getComponentName(componentId: AnalysisResultComponent): string {
    switch (componentId) {
      case AnalysisResultComponent.CSP_PTC_ABSORBER:
        return this.$t('absorber-tubes').toString();
      
      case AnalysisResultComponent.CSP_PTC_SCA:
        return this.$t('solar-collector-assembly').toString();

      case AnalysisResultComponent.CSP_PTC_SCE:
        return this.$t('single-collector-elements').toString();

      case AnalysisResultComponent.CSP_PTC_LOOP:
        return this.$t('loop').toString();

      case AnalysisResultComponent.CSP_PTC_MIRROR:
        return this.$t('mirrors').toString();
    }

    throw new Error(`Name for componentId ${componentId} not supported`);
  }

  private getKpiLayers(): KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[] {
    let kpiLayers: KeyFigureLayer<AnalysisResultCspPtcSchemaBase>[] = []
    for (const parentComponentKpiLayer of this.parentComponentKpiLayers) {
      kpiLayers = kpiLayers.concat(parentComponentKpiLayer.kpiLayers);
    }

    return kpiLayers;
  }

  private onSelected(selected: boolean, legend?: Legend) {
    if (legend) {
      if (selected) {
        this.legends.push(legend);
      } else {
        this.legends.splice(this.legends.findIndex(l => l.id === legend.id), 1);
      }
    }

    this.hideToast();
  }

  private hideToast() {
    this.$bvToast.hide("piInfoToast");
  }
}
</script>

<style lang="scss">
@import '@/scss/_colors.scss';

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
      background: rgba(255, 255, 255, 0.7);
    }
    @supports not (backdrop-filter: blur(5px)) {
      background: rgba(255, 255, 255, 0.8);
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
.toggle-button {
  border: none;

  &:hover {
    background-color: $background-grey !important;
  }
}
</style>