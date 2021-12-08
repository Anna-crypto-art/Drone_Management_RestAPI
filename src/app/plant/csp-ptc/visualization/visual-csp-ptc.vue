<template>
  <div class="visual-csp-ptc">
    <app-geovisualization ref="openLayers" v-if="hasLayers" :layers="layers" @click="onOpenLayersClick" @sidebarToggle="onSidebarToggled">
      <template #topContent v-if="isSuperAdmin">
        <b-form-checkbox v-show="analysisResultReleased !== null" v-model="analysisResultReleased" switch @change="onReleaseChanged">
          {{ analysisResultReleased ? $t("released") : $t("invisible-for-customer") }}
        </b-form-checkbox>
      </template>

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
      <template #recommendedActionClass1>
        {{ $t("recommended-action-class-1") }} <app-explanation><span v-html="$t('recommended-action-class-1_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass2>
        {{ $t("recommended-action-class-2") }} <app-explanation><span v-html="$t('recommended-action-class-2_expl')"></span></app-explanation>
      </template>
      <template #recommendedActionClass3>
        {{ $t("recommended-action-class-3") }} <app-explanation><span v-html="$t('recommended-action-class-3_expl')"></span></app-explanation>
      </template>


    </app-geovisualization>
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
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisResultDetailedSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema';
import { ComponentLayer } from './components/shared/component-layer';
import { IAnalysisResultSelection } from '../types';
import { FeatureInfos, Legend } from './key-figures/shared/types';
import { FeatureLike } from "ol/Feature";
import AppExplanation from '@/app/shared/components/app-explanation/app-explanation.vue';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { IPlantVisualization } from "./types";
import { COMPONENT_LAYERS } from "./layers";
import { PILayersHierarchy } from "@/app/plant/csp-ptc/visualization/pi-layers-hierarchy";
import AppGeovisualization from "@/app/shared/components/app-geovisualization/app-geovisualization.vue";
import { IOpenLayersComponent } from '@/app/shared/components/app-geovisualization/types/components';
import { LayerType } from '@/app/shared/components/app-geovisualization/types/layers';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';


@Component({
  name: 'app-visual-csp-ptc',
  components: {
    AppGeovisualization,
    AppExplanation
  }
})
export default class AppVisualCspPtc extends BaseAuthComponent implements IAnalysisResultSelection, IPlantVisualization {
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Ref() openLayers!: IOpenLayersComponent;

  private selectedAnalysisResult?: AnalysisResultDetailedSchema;
  private componentLayers!: ComponentLayer[];
  private piLayersHierarchy!: PILayersHierarchy;

  layers: LayerType[] = [];
  showPCS = false;
  legends: Legend[] = [];
  piToastInfo: FeatureInfos = { title: "", records: [{ name: "", descr: "", value: "" }] };
  analysisResultReleased: boolean | null = null;

  async created(): Promise<void> {
    this.createLayers();
  }

  selectAnalysisResult(analysisResultId: string | undefined): void {
    this.selectedAnalysisResult = this.analysisResults.find(analysisResult => analysisResult.id === analysisResultId);
    
    this.analysisResultReleased = this.selectedAnalysisResult ? this.selectedAnalysisResult.released : null;
    this.piLayersHierarchy.setVisibility(this.selectedAnalysisResult?.id);

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

  async onOpenLayersClick(features: FeatureLike[]) {
    let featureInfos: FeatureInfos | undefined;
    for (const kpiLayer of this.piLayersHierarchy.getAllChildLayers()) {
      featureInfos = await kpiLayer.onClick(features);
      if (featureInfos) {
        break;
      }
    }

    console.log("featureInfos:");
    console.log(featureInfos);

    if (featureInfos) {
      this.piToastInfo = featureInfos;
    }

    if (featureInfos) {
      this.$bvToast.show("piInfoToast");
    } else {
      this.hideToast();
    }
  }

  onSidebarToggled(toggleState: boolean) {
    this.$emit("sidebarToggle", toggleState);
  }

  onLayerSelected(selected: boolean, legend?: Legend) {
    if (legend) {
      if (selected) {
        this.legends.push(legend);
      } else {
        const removeIndex = this.legends.findIndex(l => l.id === legend.id);
        if (removeIndex != -1) {
          this.legends.splice(removeIndex, 1);
        }
      }
    }

    this.hideToast();
  }

  async onReleaseChanged() {
    if (this.selectedAnalysisResult) {
      await volateqApi.updateAnalysisResult(this.selectedAnalysisResult.id, { release: this.analysisResultReleased as boolean });
    }
  }

  private createLayers(): void {
    this.createComponentLayers();
    this.piLayersHierarchy = new PILayersHierarchy(this, this.analysisResults);

    this.layers.push(
      {
        name: this.$t("performance-indicators").toString(),
        type: "group",
        childLayers: this.piLayersHierarchy.getGeoJSONLayers(),
        singleSelection: true
      },
      {
        name: this.$t('components').toString(),
        type: "group",
        childLayers: this.componentLayers.map(compLayer => compLayer.toGeoLayer()),
        // Customer Cubico needs to check the PCS codes of his plant
        // visible: this.isSuperAdmin 
      },
      {
        name: "pcs",
        type: "custom",
        customLoader: () => { return; },
        onSelected: (selected: boolean) => { 
          this.showPCS = selected;

          this.piLayersHierarchy.getAllChildLayers().forEach(kpiLayer => kpiLayer.showPCS(selected));
          this.componentLayers.forEach(compLayer => compLayer.showPCS(selected));
        },
        selected: false,
        styleClass: "margin-top",
      },
      {
        name: this.$t('world-map').toString(),
        type: "osm",
        selected: true,
      },
    );

    console.log(this.layers);
  }

  private createComponentLayers(): void {
    this.componentLayers = COMPONENT_LAYERS.map(componentType => new (componentType as any)(this));
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