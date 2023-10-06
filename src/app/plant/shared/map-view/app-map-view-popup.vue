<template>
  <div class="app-map-view-popup" v-show="visible">
    <div class="app-map-view-popup-close-button" @click="onClose">x</div>
    <div class="app-map-view-popup-title">
      <h3>
        <div>{{ pcs }}</div>
        <div v-if="componentName"><small class="grayed">{{ componentName }}</small></div>
      </h3>
    </div>
    <div class="app-map-view-popup-actions">
      <b-dropdown v-if="orthoImages" variant="secondary">
        <template #button-content>
          <b-icon-image-fill /><span class="pad-left-half">{{ $t("ortho") }}</span>
        </template>
        <b-dropdown-item v-for="orthoImage in orthoImages" :key="orthoImage.keyFigureId" @click="onOrthoImageClick(orthoImage)">
          {{ orthoImage.name }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="app-map-view-popup-image mar-bottom" v-if="imgUrl">
      <img :title="imgTitle" :src="imgUrl" />
    </div>
    <div class="app-map-view-popup-body">
      <app-loading v-show="loading" />
      <div class="app-map-view-popup-body-feature-infos" v-if="piFeatureInfos">
        <h4>{{ $t("performance-indicators") }}</h4>
        
        <app-box>
          <div v-for="(piFeatureInfo, index) in piFeatureInfos.infos" :key="index">
            <div><small class="grayed">{{ piFeatureInfo.name }}</small></div>
            <div>{{ piFeatureInfo.value }}</div>
            <hr v-if="index + 1 < piFeatureInfos.infos.length" />
          </div>
        </app-box>
      </div>
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
import { PlantSchema } from '@/app/shared/services/volateq-api/api-schemas/plant-schema';
import { AnalysisForViewSchema } from '@/app/shared/services/volateq-api/api-schemas/analysis-schema';
import { IAnalysisSelectionComponent } from '../selection-sidebar/analysis-selection/types';
import { AnalysisSelectionService } from '../selection-sidebar/analysis-selection/analysis-selection-service';
import { LayersService } from './layers/layers-service';
import { FeatureLike } from 'ol/Feature';
import { KeyFigureBaseLayer, OrthoImage } from './layers/types';
import { KeyFigureLayer } from './layers/key-figure-layer';
import AppLoading from '@/app/shared/components/app-loading/app-loading.vue';
import { apiComponentNames } from '@/app/shared/services/volateq-api/api-components/api-components-name';
import { ComponentLayer } from './layers/component-layer';
import { OrthoImagesLayer } from './layers/ortho-images-layer';
import { Map } from 'ol';
import { ApiComponent } from '@/app/shared/services/volateq-api/api-components/api-components';
import { ApiKeyFigure } from '@/app/shared/services/volateq-api/api-key-figures';
import volateqApi from '@/app/shared/services/volateq-api/volateq-api';
import { TableRequest } from '@/app/shared/services/volateq-api/api-requests/common/table-requests';
import { AnalysisResultMappingHelper } from '@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper';
import { AnalysisResultSchemaBase } from '@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base';
import { BaseAuthComponent } from '@/app/shared/components/base-auth-component/base-auth-component';
import { FeatureInfo, FeatureInfos } from './types';

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
export default class AppMapViewPopup extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) map!: Map;
  @Prop({ default: null }) mapFeature!: FeatureLike | null;

  visible = false;
  loading = false;

  analysisSelectionService!: AnalysisSelectionService;
  layersService!: LayersService;
  orthoImagesLayer!: OrthoImagesLayer;

  pcs = "";
  componentId: ApiComponent | null = null;
  orthoImages: OrthoImage[] | null = null;
  imgTitle = "";
  imgUrl = "";

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);
    this.orthoImagesLayer = OrthoImagesLayer.get(this.plant, this.map);
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

    if (this.analysisSelectionService.firstAnalysisResult) {
      const orthoImages = this.orthoImagesLayer.getAvailableOrthoImages(this.analysisSelectionService.firstAnalysisResult);
      if (orthoImages.length > 0) {
        this.orthoImages = orthoImages;
      } else {
        this.orthoImages = null;
      }
    }

    const clickedLayers = this.layersService.layers.filter(l => l.selected && 
      l.loadedLayer?.getSource()?.getFeatures().find(f => f.getProperties().name === pcs));

    const keyFigureLayer: KeyFigureBaseLayer | undefined = clickedLayers.find(l => l instanceof KeyFigureLayer) as KeyFigureBaseLayer;
    if (keyFigureLayer) {
      this.componentId = keyFigureLayer.keyFigure.component_id;

      

      // continue here
    } else {
      const componentLayer: ComponentLayer | undefined = clickedLayers.find(l => l instanceof ComponentLayer) as ComponentLayer;
      if (componentLayer) {
        this.componentId = componentLayer.componentId;
      }
    }
  }

  get componentName(): string {
    return this.componentId && this.$t(apiComponentNames[this.componentId]).toString() || ""; 
  }

  @CatchError("loading")
  async onOrthoImageClick(orthoImage: OrthoImage) {
    if (orthoImage.keyFigureId === ApiKeyFigure.TRACKER_RAW_IMAGES_IR_ID) {
      const features = await this.orthoImagesLayer.getImageFeatures(
        orthoImage, 
        this.analysisSelectionService.firstAnalysisResult!,
        this.componentId!,
        this.pcs,
      );

      this.imgUrl = features[0].get("image");
      this.imgTitle = orthoImage.name;
    } else {
      await this.orthoImagesLayer.loadImages(
        orthoImage, 
        this.analysisSelectionService.firstAnalysisResult!,
        this.componentId!,
        this.pcs,
      );
    }
  }

  private async getResultDetails(
    pcs: string,
    keyFigureLayers: KeyFigureBaseLayer[],
  ): Promise<AnalysisResultSchemaBase | undefined> {
    let specAnalysisResultParams: TableRequest = {};

    for (const keyFigureLayer of keyFigureLayers) {
      specAnalysisResultParams = {
        ...specAnalysisResultParams,
        ...keyFigureLayer.getMoreSpecificAnalysisResultParams()
      }
    }

    const results = await volateqApi.getSpecificAnalysisResult(
      this.analysisSelectionService.firstAnalysis!.id, 
      keyFigureLayers[0].keyFigure.component_id, 
      {
        search_text: pcs,
        limit: 1,
        search_mode: "equals",
        ...specAnalysisResultParams,
      }
    );

    if (results.items.length > 0) {
      return results.items[0] as AnalysisResultSchemaBase;
    }

    return undefined;
  }

  private mapResultToFeatureInfos(result: AnalysisResultSchemaBase, keyFigureLayers: KeyFigureBaseLayer[]): FeatureInfos | undefined {
    const mappingHelper = new AnalysisResultMappingHelper(
      keyFigureLayers[0].analysisResultMapping,
      this.analysisSelectionService.firstAnalysisResult!,
      this.isSuperAdmin,
    );
    const resultItem = mappingHelper.getItem(result);

    const recordFeatureInfos: FeatureInfo[] = [];
    for (const entry of mappingHelper.getEntries()) {
      if (entry.transName === "pcs") {
        continue;
      }

      let recordValue: string | undefined | null = (resultItem[entry.transName] as any)?.toString();
      if (recordValue === undefined || recordValue === null) {
        recordValue = "";
      }

      recordFeatureInfos.push(mappingHelper.toFeatureInfo(entry, recordValue, keyFigureLayers[0].keyFigureId));
    }

    const featureInfos: FeatureInfos = {
      title: result.fieldgeometry_component.kks,
      groups: [{ title: i18n.t("performance-indicators").toString(), records: recordFeatureInfos }],
    };

    return featureInfos;
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
  padding: 1em;
  box-shadow: 3px 3px 5px $dark-40pc;

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

  &-image {
    width: 100%;
    img {
      max-width: calc(100% - 2em);
      max-height: 500px;
      display: block;
      margin: 0 auto;
    }
  }

  &-body {
    position: relative;
    min-height: 150px;
  }
}

</style>