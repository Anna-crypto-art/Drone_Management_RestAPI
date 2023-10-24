<template>
  <div class="app-map-view-settings">
    <app-map-pop-button icon="gear-fill" :width="300">
      <p class="mar-bottom-half grayed"><b-icon icon="gear-fill" /><span class="pad-left-half">{{ $t("map-settings") }}</span></p>
      <div class="no-mar-top mar-bottom-half">
        <b-form-checkbox v-model="multiSelection" switch @change="onMultiSelectionChanged" :disabled="multiSelectionDisabled">
          <app-expl-wrap :expl="$t('multi-selection-overlapping_expl')">
            {{ $t("multi-selection") }}
          </app-expl-wrap>
        </b-form-checkbox>
        <b-form-checkbox v-model="showCouldNotBeMeasured" switch @change="onShowCouldNotBeMeasuredChanged" :disabled="isShowCouldNotBeMeasuredDisabled">
          {{ $t("show-could-not-be-measured") }}
        </b-form-checkbox>
        <b-form-checkbox v-model="showPCS" switch @change="onShowPcsChanged">
          {{ $t("pcs") }}
        </b-form-checkbox>
        <b-form-checkbox v-model="satelliteView" switch @change="onSatelliteViewChanged">
          {{ $t("satellite-view") }}
        </b-form-checkbox>
        <b-form-checkbox v-if="isSuperAdmin" v-model="enableResultsModification" switch @change="onEnableResultModChanged">
          {{ $t("enable-results-modification") }} <app-super-admin-marker />
        </b-form-checkbox>
      </div>
      <hr>
      <app-osm-layer-checkbox :map="map" :satellite="satelliteView" v-model="osmSelected" />
      <div v-if="orthoImages.length > 0">
        <hr>
        <app-dropdown-button variant="primary" :loading="orthoLoading" size="sm">
          <template #title>
            <b-icon-image-fill /><span class="pad-left-half">{{ $t("load-all-ortho-images") }}</span>
          </template>
          <b-dropdown-item v-for="orthoImage in orthoImages" :key="orthoImage.keyFigureId" @click="onShowAllOrthoClick(orthoImage)">
            {{ orthoImage.name }}
          </b-dropdown-item>
        </app-dropdown-button>
        <app-button v-show="hasLoadedOrthoImages"
          cls="mar-top-half"
          variant="secondary"
          size="sm"
          @click="onClearOrthoImagesClick"
          :loading="clearOrthoLoading"
        >
          {{ $t('clear-ortho-images') }}
        </app-button>
      </div>
    </app-map-pop-button>
  </div>
</template>

<script lang="ts">
import AppOsmLayerCheckbox from "@/app/shared/components/app-map/app-osm-layer-checkbox.vue";
import AppMapPopButton from "@/app/shared/components/app-map/app-map-pop-button.vue";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map } from "ol";
import { Component, Prop } from "vue-property-decorator";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { LayersService } from "./layers/layers-service";
import { KeyFigureColorScheme, LayerEvent, OrthoImage } from "./layers/types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
import { OrthoImageEvent, OrthoImagesLayer } from "./layers/ortho-images-layer";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";
import { STORAGE_KEY_MULTISELECTION, STORAGE_KEY_SHOWUNDEFINED, STORAGE_KEY_SATELLITEVIEW, STORAGE_KEY_ENABLERESULTMOD } from "./storage-keys";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";

@Component({
  name: "app-map-view-settings",
  components: {
    AppMapPopButton,
    AppOsmLayerCheckbox,
    AppBox,
    AppExplanation,
    AppDropdownButton,
    AppButton,
    AppSuperAdminMarker,
    AppExplWrap
  },
})
export default class AppMapViewSettings extends BaseAuthComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) map!: Map;

  multiSelection = false;
  showCouldNotBeMeasured = false;
  osmSelected = true;
  satelliteView = true;
  showPCS = false;
  enableResultsModification = false;

  multiSelectionDisabled = false;
  isShowCouldNotBeMeasuredDisabled = false;

  hasLoadedOrthoImages = false;
  orthoLoading = false;
  clearOrthoLoading = false;

  layersService!: LayersService
  analysisSelectionService: AnalysisSelectionService | null = null;
  orthoImagesLayer: OrthoImagesLayer | null = null;

  async created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);
    this.orthoImagesLayer = OrthoImagesLayer.get(this.plant, this.map);

    this.orthoImagesLayer.on(this.plant.id, OrthoImageEvent.ON_ORTHO_IMAGE_CHANGED, () => {
      this.hasLoadedOrthoImages = this.orthoImagesLayer!.hasLoadedImages();
    })
    
    this.setLayerSettings();    
  }

  async mounted() {
    await this.analysisSelectionService!.register();
  }

  async unmounted() {
    this.analysisSelectionService!.unregister();
  }

  @CatchError()
  onSatelliteViewChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SATELLITEVIEW, this.satelliteView);
  }

  @CatchError()
  async onMultiSelectionChanged() {
    appLocalStorage.setItem(STORAGE_KEY_MULTISELECTION, this.multiSelection);
    this.layersService.settings.multiSelection = this.multiSelection;

    let firstSelectedLayer = true;
    for (const keyFigureLayer of this.layersService.keyFigureLayers) {
      keyFigureLayer.setColorScheme(this.multiSelection ? KeyFigureColorScheme.RAINBOW : KeyFigureColorScheme.TRAFFIC_LIGHT);
      
      if (keyFigureLayer.loadedLayer) {
        keyFigureLayer.rerender();
      }

      if (keyFigureLayer.selected) {
        if (!firstSelectedLayer && !this.multiSelection) {
          await keyFigureLayer.setSelected(false);
        } else {
          if (firstSelectedLayer) {
            firstSelectedLayer = false;
          }
        }
      }
    }
  }

  @CatchError()
  async onShowCouldNotBeMeasuredChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SHOWUNDEFINED, this.showCouldNotBeMeasured);
    this.layersService.settings.showCouldNotBeMeasured = this.showCouldNotBeMeasured;

    await this.layersService.emit(this.plant.id, LayerEvent.ON_SHOW_COULD_NOT_BE_MEASURED_CHANGED);
  }

  @CatchError()
  onShowPcsChanged() {
    const loadedLayers = this.layersService.layers.filter(l => l.loadedLayer);
    for (const loadedLayer of loadedLayers) {
      loadedLayer.showPCS(this.showPCS);
      loadedLayer.rerender();
    }
  }

  @CatchError()
  onEnableResultModChanged() {
    appLocalStorage.setItem(STORAGE_KEY_ENABLERESULTMOD, this.enableResultsModification);
  }

  get orthoImages(): OrthoImage[] {
    return this.analysisSelectionService?.firstAnalysisResult && 
      this.orthoImagesLayer?.getAvailableOrthoImages(this.analysisSelectionService?.firstAnalysisResult)
        .filter(o => o.keyFigureId !== ApiKeyFigure.TRACKER_RAW_IMAGES_IR_ID) || // Special case: Load all raw pv tracker images is not allowed
      [];
  }

  @CatchError("orthoLoading")
  async onShowAllOrthoClick(orthoImage: OrthoImage) {
    if (!confirm(this.$t('load-all-ortho-images-sure').toString())) {
      return;
    }

    await this.orthoImagesLayer!.loadImages(orthoImage, this.analysisSelectionService!.firstAnalysisResult!);
  }

  @CatchError("clearOrthoLoading")
  onClearOrthoImagesClick() {
    this.orthoImagesLayer!.removeAllImages();
  }

  async onMultiAnalysesSelected() {
    this.isShowCouldNotBeMeasuredDisabled = true;
    this.multiSelectionDisabled = true;

    this.multiSelection = this.layersService.settings.multiSelection = false;
    this.showCouldNotBeMeasured = this.layersService.settings.showCouldNotBeMeasured = false;
  }

  async onAnalysisSelected() {
    this.isShowCouldNotBeMeasuredDisabled = false;
    this.multiSelectionDisabled = false;

    this.setLayerSettings();
  }

  private setLayerSettings() {
    this.multiSelection = 
      this.layersService.settings.multiSelection = 
      appLocalStorage.getItem(STORAGE_KEY_MULTISELECTION) || false;
    
    const showCouldNotBeMeasured = appLocalStorage.getItem(STORAGE_KEY_SHOWUNDEFINED);
    this.showCouldNotBeMeasured = 
      this.layersService.settings.showCouldNotBeMeasured =
      showCouldNotBeMeasured !== null ? showCouldNotBeMeasured : true;

    this.satelliteView = !!appLocalStorage.getItem(STORAGE_KEY_SATELLITEVIEW);

    if (this.isSuperAdmin) {
      this.enableResultsModification = appLocalStorage.getItem(STORAGE_KEY_ENABLERESULTMOD) || false;
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-settings {
  overflow: visible;
}
</style>