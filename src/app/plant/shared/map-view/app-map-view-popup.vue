<template>
  <div class="app-map-view-popup" v-show="visible">
    <div class="app-map-view-popup-close-button" @click="onClose">x</div>
    <div class="app-map-view-popup-title mar-bottom">
      <h3 class="no-mar-bottom">
        <div>{{ pcs }}</div>
        <div v-if="componentName"><small class="grayed">{{ componentName }}</small></div>
      </h3>
    </div>
    <div class="app-map-view-popup-actions mar-bottom">
      <app-dropdown-button v-if="orthoImages.length > 0" size="sm" variant="secondary" :loading="orthoLoading">
        <template #title>
          <b-icon-image-fill /><span class="pad-left-half">{{ $t("ortho") }}</span>
        </template>
        <b-dropdown-item v-for="orthoImage in orthoImages" :key="orthoImage.keyFigureId" @click="onOrthoImageClick(orthoImage)">
          {{ orthoImage.name }}
        </b-dropdown-item>
      </app-dropdown-button>
      <app-button v-if="hasObservAction" size="sm" variant="secondary" icon="clipboard-data" @click="onObservClick" >{{ $t("observ") }}</app-button>
      <app-button v-if="hasRefMeasureAction" size="sm" variant="secondary" icon="clipboard-check" @click="onRefMeasureClick" >{{ $t("ref-measure") }}</app-button>
      <app-dropdown-button v-if="resultModEnabled" size="sm" variant="secondary" :loading="resultModLoading">
        <template #title>
          {{ $t("modify") }} <app-super-admin-marker />
        </template>
        <b-dropdown-item v-for="resultModMode in resultModModes" :key="resultModMode" @click="onModifyResultClick(resultModMode)">
          {{ $t("set-to-" + resultModMode) }}
        </b-dropdown-item>
      </app-dropdown-button>
    </div>
    <div class="app-map-view-popup-image mar-bottom" v-if="imgUrl">
      <img :title="imgTitle" :src="imgUrl" />
    </div>
    <div class="app-map-view-popup-body">
      <app-loading v-show="loading" />
      <div v-if="piFeatureInfos.length > 0">
        <h4 class="no-mar-top mar-bottom-half">{{ $t("performance-indicators") }}</h4>
        <app-box class="app-map-view-popup-body-feature-infos no-mar-top no-mar-bottom">
          <div v-for="(piFeatureInfo, index) in piFeatureInfos" :key="index">
            <div v-show="piFeatureInfo._visible" v-if="piFeatureInfo.value">
              <div class="app-map-view-popup-body-feature-infos-name">
                <small class="grayed">
                  <b>{{ piFeatureInfo.name }}</b>
                  <app-super-admin-marker v-if="piFeatureInfo.superAdminOnly" />
                  <app-explanation v-if="piFeatureInfo.descr"><span v-html="$t(piFeatureInfo.descr)"></span></app-explanation>
                </small>
              </div>
              <div class="app-map-view-popup-body-feature-infos-value" :class="{ bold: piFeatureInfo.bold }">
                {{ piFeatureInfo.value }}
                <span v-if="piFeatureInfo.unit">
                  {{ piFeatureInfo.unit }}
                </span>
              </div>
              <hr class="mar-bottom-half mar-top-half" v-show="hasHiddenFeatures || index + 1 < piFeatureInfos.length" />
            </div>
          </div>
          <a href="#" @click.prevent="onShowMorePiFeaturesClick" v-if="hasHiddenFeatures">
            {{ hiddenFeaturesVisible ? $t("hide") : $t("show-more") }}
          </a>
        </app-box>
      </div>
      <div v-if="refMeasureFeatureInfos.length > 0" :class="{ 'mar-top': piFeatureInfos.length > 0 }">
        <h4 class="no-mar-top mar-bottom-half">{{ $t("reference-measurements") }}</h4>
        <app-box class="app-map-view-popup-body-feature-infos no-mar-top no-mar-bottom">
          <div v-for="(rmFeatureInfo, index) in refMeasureFeatureInfos" :key="index">
            <div class="app-map-view-popup-body-feature-infos-name">
              <small class="grayed">
                <b>{{ rmFeatureInfo.name }}</b>
                <app-explanation v-if="rmFeatureInfo.descr"><span v-html="$t(rmFeatureInfo.descr)"></span></app-explanation>
              </small>
            </div>
            <div class="app-map-view-popup-body-feature-infos-value" :class="{ bold: rmFeatureInfo.bold }">
              {{ rmFeatureInfo.value }}
              <span v-if="rmFeatureInfo.unit">
                {{ rmFeatureInfo.unit }}
              </span>
            </div>
            <hr class="mar-bottom-half mar-top-half" v-show="index + 1 < refMeasureFeatureInfos.length" />
          </div>
        </app-box>
      </div>
    </div>
    <app-reference-measurements ref="appReferenceMeasurements" :map="map" :plant="plant" />
    <app-observation-modal ref="appObservModal" :plant="plant" />
  </div>
</template>

<script lang="ts">
import { CatchError } from '@/app/shared/services/helper/catch-helper';
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
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
import { FeatureInfo, FeatureInfos, ResultModMode } from './types';
import { BaseLayer } from './layers/base-layer';
import AppBox from '@/app/shared/components/app-box/app-box.vue';
import { appLocalStorage } from '@/app/shared/services/app-storage/app-storage';
import { STORAGE_KEY_ENABLERESULTMOD } from './storage-keys';
import { FilterFieldType } from '../filter-fields/types';
import { analysisResultEventService } from '../plant-admin-view/analysis-result-event-service';
import { AnalysisResultEvent } from '../plant-admin-view/types';
import AppReferenceMeasurements from './app-reference-measurements/app-reference-measurements.vue';
import { IAppRefMeasure } from './app-reference-measurements/types';
import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from '@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema';
import { RefMeasureLayersService } from './layers/ref-measure-layers-service';
import dateHelper from '@/app/shared/services/helper/date-helper';
import AppObservationModal from '../observations/observation-modal.vue';
import { IAppObservationModal } from '../observations/types';
import { FieldgeometryComponentSchema } from '@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema';
import { CcpService } from '../plant-settings/ccp-service';

@Component({
  name: "app-map-view-popup",
  components: {
    AppExplanation,
    AppDropdownButton,
    AppButton,
    AppSuperAdminMarker,
    AppLoading,
    AppBox,
    AppReferenceMeasurements,
    AppObservationModal,
  }
})
export default class AppMapViewPopup extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) map!: Map;
  @Prop({ default: null }) mapFeature!: FeatureLike | null;

  @Ref() appReferenceMeasurements!: IAppRefMeasure;
  @Ref() appObservModal!: IAppObservationModal;

  visible = false;
  loading = false;
  orthoLoading = false;
  resultModLoading = false;

  analysisSelectionService!: AnalysisSelectionService;
  layersService!: LayersService;
  orthoImagesLayer!: OrthoImagesLayer;

  fieldgeometryComponent: FieldgeometryComponentSchema | null = null;
  orthoImages: OrthoImage[] = [];
  
  imgTitle = "";
  imgUrl = "";
  piFeatureInfos: FeatureInfo[] = [];
  hiddenFeaturesVisible = false;

  hasRefMeasureAction = false;
  refMeasureFeatureInfos: FeatureInfo[] = [];
  myRefMeasureEntry: RefMeasureEntry | null = null;
  myRefMeasureEntryKeyFigures: RefMeasureEntryKeyFigureSchema[] | null = null;

  hasObservAction = false;

  resultModEnabled = false;
  resultModModes: ResultModMode[] = [];

  currentSelectedLayers: BaseLayer[] = [];

  async created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);
    this.orthoImagesLayer = OrthoImagesLayer.get(this.plant, this.map);

    this.hasObservAction = (await CcpService.get(this.plant.id).getCcps()).length > 0;
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
    this.resetPopupValues();

    const pcs: string = this.mapFeature!.getProperties().name;
    if (!pcs) {
      return;
    }

    await this.setFielgeoComp(pcs);

    if (this.analysisSelectionService.firstAnalysisResult) {
      this.orthoImages = this.orthoImagesLayer.getAvailableOrthoImages(this.analysisSelectionService.firstAnalysisResult);
    }

    this.currentSelectedLayers = this.layersService.layers.filter(l => l.selected);

    this.setResultModModes();
    await this.setPiFeatureInfos();
    await this.setRefMeasureFeatureInfos();

    this.hasRefMeasureAction = this.selectedKeyFigureLayers.length > 0 || 
      !!(this.currentSelectedLayers as ComponentLayer[]).find(l => l.allowRefMeasures);
  }

  get pcs(): string {
    return this.fieldgeometryComponent?.kks || "";
  }

  get componentId(): ApiComponent | null {
    return this.fieldgeometryComponent?.component_id || null;
  }

  get componentName(): string {
    return this.componentId && this.$t(apiComponentNames[this.componentId]).toString() || ""; 
  }

  @CatchError("orthoLoading")
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

  get hasHiddenFeatures(): boolean {
    return !!this.piFeatureInfos.find(f => f.hidden);
  }

  @CatchError()
  onShowMorePiFeaturesClick() {
    for (const piFeatureInfo of this.piFeatureInfos) {
      if (piFeatureInfo.hidden) {
        piFeatureInfo._visible = !piFeatureInfo._visible;
      }
    }
    this.hiddenFeaturesVisible = !this.hiddenFeaturesVisible;
  }

  @CatchError("resultModLoading")
  async onModifyResultClick(mode: ResultModMode) {
    if (!confirm(this.$t("apply-are-you-sure").toString())) {
      return;
    }

    const keyFigureLayer: KeyFigureBaseLayer = this.selectedKeyFigureLayers[0];

    const mappingHelper = new AnalysisResultMappingHelper(
      keyFigureLayer.analysisResultMapping,
      keyFigureLayer.analysisResult,
    );
    const entry = keyFigureLayer.getMappingEntry();

    await volateqApi.setAnalysisResultValueToNullOrFalseOrTrue(keyFigureLayer.analysisResult.id, {
      key_figure_id: keyFigureLayer.keyFigureId,
      kks: this.pcs!,
      property_name: entry ? mappingHelper.getPropertyName(entry) : undefined,
      new_value: mode,
    });
    
    keyFigureLayer.reloadLayer();
    await keyFigureLayer.setSelected(false);
    await keyFigureLayer.setSelected(true);

    this.visible = false;

    analysisResultEventService.emit(keyFigureLayer.analysisResult.id, AnalysisResultEvent.MODIFIED);
  }

  @CatchError()
  onObservClick() {
    this.appObservModal.show(this.fieldgeometryComponent!);

    this.visible = false;
  }

  @CatchError()
  onRefMeasureClick() {
    this.appReferenceMeasurements.show(
      this.analysisSelectionService.firstAnalysis!.id,
      this.pcs,
      this.componentId!,
      this.myRefMeasureEntry,
      this.myRefMeasureEntryKeyFigures
    );

    this.visible = false;
  }

  async onAnalysisSelected() {
    this.visible = false;
  }

  async onMultiAnalysesSelected() {
    this.visible = false;
  }

  private resetPopupValues() {
    this.imgTitle = "";
    this.imgUrl = "",
    this.orthoImages = [];
    this.fieldgeometryComponent = null;
    this.piFeatureInfos = [];
    this.hiddenFeaturesVisible = false;
    this.resultModEnabled = appLocalStorage.getItem(STORAGE_KEY_ENABLERESULTMOD) || false;
    this.currentSelectedLayers = [];
    this.hasRefMeasureAction = false;
    this.refMeasureFeatureInfos = [];
    this.myRefMeasureEntry = null;
    this.myRefMeasureEntryKeyFigures = null;
  }

  private async setFielgeoComp(pcs: string) {
    this.fieldgeometryComponent = await volateqApi.getFieldgeometryComponent(
      this.plant.fieldgeometry!.id,
      pcs,
    );
  }

  private async setPiFeatureInfos() {
    const keyFigureLayers = this.selectedKeyFigureLayers;
    if (keyFigureLayers.length > 0) {
      const details = await this.getAnalysisResultSchemaDetails();
      if (details) {
        const featureInfos = this.mapDetailsToFeatureInfos(details);

        // Currently image gets overwritten for the edge case, that multiple images should be displayed.
        // TODO: Implement an Image slider for this edge case...
        if (featureInfos.images && featureInfos.images.length > 0) {
          this.imgTitle = featureInfos.images[0].title;
          this.imgUrl = featureInfos.images[0].url;
        }

        this.piFeatureInfos = featureInfos.infos;        
      }
    }
  }

  private async getAnalysisResultSchemaDetails(): Promise<AnalysisResultSchemaBase | undefined> {
    let specAnalysisResultParams: TableRequest = {};
    const keyFigureLayers = this.selectedKeyFigureLayers;

    for (const keyFigureLayer of keyFigureLayers) {
      specAnalysisResultParams = {
        ...specAnalysisResultParams,
        ...keyFigureLayer.getMoreSpecificAnalysisResultParams()
      }
    }

    const results = await volateqApi.getSpecificAnalysisResult(
      this.analysisSelectionService.firstAnalysisResult!.id, 
      this.componentId!, 
      {
        search_text: this.pcs,
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

  private mapDetailsToFeatureInfos(result: AnalysisResultSchemaBase): FeatureInfos {
    const keyFigureLayers = this.selectedKeyFigureLayers;

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

      const featureInfo = mappingHelper.toFeatureInfo(entry, recordValue, keyFigureLayers[0].keyFigureId);
      featureInfo._visible = !featureInfo.hidden;

      recordFeatureInfos.push(featureInfo);
    }

    const featureInfos = {
      infos: recordFeatureInfos,
    };

    for (const keyFigureLayer of keyFigureLayers) {
      keyFigureLayer.modifyFeatureInfos(featureInfos, result);
    }

    return featureInfos;
  }

  private setResultModModes() {
    const keyFigureLayers = this.selectedKeyFigureLayers;

    if (keyFigureLayers.length !== 1) {
      this.resultModEnabled = false;
      this.resultModModes = [];

      return;
    }

    if (keyFigureLayers[0].getMappingEntry()?.filterType === FilterFieldType.BOOLEAN) {
      this.resultModModes = ["null", "false", "true"];
    } else {
      this.resultModModes = ["null"];
    }
  }

  private get selectedKeyFigureLayers(): KeyFigureBaseLayer[] {
    return this.currentSelectedLayers.filter(l => l instanceof KeyFigureLayer) as KeyFigureBaseLayer[];
  }

  private async setRefMeasureFeatureInfos() {
    const mappings = AnalysisResultMappingHelper.getMappingsByComponentId(this.componentId!);

    const refMeasureLayersService = RefMeasureLayersService.get(this.plant, this.map);

    if (mappings && refMeasureLayersService.hasPCS(this.pcs) && this.analysisSelectionService.firstAnalysis) {
      const mappingHelper = new AnalysisResultMappingHelper(mappings)
      
      const refMeasureEntries = await volateqApi.getReferenceMeasurementEntries(
        this.analysisSelectionService.firstAnalysis.id, 
        { pcs: this.pcs }
      );

      for (const refMeasureEntry of refMeasureEntries.entries) {
        this.refMeasureFeatureInfos.push({
          name: this.$t("measure-timestamp").toString(), 
          value: dateHelper.toDateTime(refMeasureEntry.measure_time),
        });

        if (refMeasureEntry.notes) {
          this.refMeasureFeatureInfos.push({
            name: this.$t("notes").toString(),
            value: refMeasureEntry.notes,
          });
        }

        const rmMappingEntries = mappingHelper.getRefMeasureEntries(refMeasureEntry, refMeasureEntries.key_figures)
        for (const rmMappingEntry of rmMappingEntries) {
          this.refMeasureFeatureInfos.push(
            mappingHelper.toFeatureInfo(
              rmMappingEntry.entry,
              rmMappingEntry.value.toString(),
            )
          );
        }

        if (refMeasureEntry.editable) {
          this.myRefMeasureEntry = refMeasureEntry;
          this.myRefMeasureEntryKeyFigures = refMeasureEntries.key_figures;
        }
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

  &-actions {
    .b-dropdown, .app-button {
      margin-right: 0.5em;
    }
  }

  &-body {
    position: relative;
    min-height: 50px;

    &-feature-infos {
      max-height: 500px;
      overflow-y: auto;

      &-name {
        line-height: 1;
      }
      &-value.bold {
        font-weight: bold;
      }
    }
  }
}

</style>