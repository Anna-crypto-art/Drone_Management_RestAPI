<template>
  <div class="app-map-view-popup" v-show="visible">
    <div class="app-map-view-popup-close-button" @click="onClose">x</div>
    <div class="app-map-view-popup-title">
      <h3>
        <div>{{ pcs }}</div>
        <div v-if="componentName"><small class="grayed">{{ componentName }}</small></div>
      </h3>
    </div>
    <div class="app-map-view-popup-body">
      <app-loading v-show="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { Component, Prop, Watch } from "vue-property-decorator";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { BaseComponent } from '@/app/shared/components/base-component/base-component';
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisForViewSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-schema';
import { IAnalysisSelectionComponent } from '../selection-sidebar/analysis-selection/types';
import { AnalysisSelectionService } from '../selection-sidebar/analysis-selection/analysis-selection-service';
import { LayersService } from './layers/layers-service';
import { FeatureLike } from 'ol/Feature';
import { KeyFigureBaseLayer } from './layers/types';
import { KeyFigureLayer } from './layers/key-figure-layer';
import AppLoading from '@/app/shared/components/app-loading/app-loading.vue';
import { apiComponentNames } from '@/app/shared/services/volateq-api/api-components/api-components-name';
import { ComponentLayer } from './layers/component-layer';

@Component({
  name: "app-map-view-popup",
  components: {
    AppExplanation,
    AppDropdownButton,
    AppButton,
    AppSuperAdminMarker,
    AppLoading,
  }
})
export default class AppMapViewPopup extends BaseComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ default: null }) mapFeature!: FeatureLike | null;

  visible = false;
  loading = false;

  analysisSelectionService!: AnalysisSelectionService;
  layersService!: LayersService;

  pcs = "";
  componentName = "";

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);
  }

  @Watch("mapFeature")
  async onMapFeatureChanged() {
    console.log("onMapFeatureChanged: ", this.mapFeature);

    if (this.mapFeature === null) {
      this.visible = false;

      return;
    }

    this.visible = true;

    await this.updatePopup();
  }

  async mounted() {
    this.analysisSelectionService.register();
  }

  async unmounted() {
    this.analysisSelectionService.unregister();
  }

  @CatchError()
  onClose() {
    this.visible = false;
  }

  @CatchError("loading")
  async updatePopup() {
    const pcs: string = this.mapFeature!.getProperties().name;
    this.pcs = pcs;

    const clickedLayers = this.layersService.layers.filter(l => l.selected && 
      l.loadedLayer?.getSource()?.getFeatures().find(f => f.getProperties().name === pcs));

    const keyFigureLayer: KeyFigureBaseLayer | undefined = clickedLayers.find(l => l instanceof KeyFigureLayer) as KeyFigureBaseLayer;
    if (keyFigureLayer) {
      this.componentName = this.$t(apiComponentNames[keyFigureLayer.keyFigure.component_id]).toString();

      // continue here
    } else {
      const componentLayer: ComponentLayer | undefined = clickedLayers.find(l => l instanceof ComponentLayer) as ComponentLayer;
      if (componentLayer) {
        this.componentName = this.$t(apiComponentNames[componentLayer.componentId]).toString();
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-popup {
  position: absolute;
  left: 50%;
  bottom: 0.5em;
  transform: translate(-50%, 0);
  width: 500px;
  padding: 0.5em;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.7);
  }
  @supports not (backdrop-filter: blur(5px)) {
    background: rgba(255, 255, 255, 0.8);
  }

  &-close-button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    padding: 0 0.25em;
  }

  &-body {
    min-height: 150px;
  }
}

</style>