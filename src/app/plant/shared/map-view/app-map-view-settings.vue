<template>
  <div class="app-map-view-settings">
    <app-map-pop-button icon="gear-fill" :width="300">
      <p class="mar-bottom-half grayed"><b-icon icon="gear-fill" /><span class="pad-left-half">{{ $t("map-settings") }}</span></p>
      <div class="no-mar-top mar-bottom-half">
        <b-form-checkbox v-model="multiSelection" switch @change="onMultiSelectionChanged" :disabled="multiSelectionDisabled">
          {{ $t("multi-selection") }} <app-explanation>{{ $t("multi-selection-overlapping_expl") }}</app-explanation>
        </b-form-checkbox>
        <b-form-checkbox v-model="showCouldNotBeMeasured" switch @change="onShowCouldNotBeMeasuredChanged" :disabled="isShowCouldNotBeMeasuredDisabled">
          {{ $t("show-could-not-be-measured") }}
        </b-form-checkbox>
        <b-form-checkbox v-model="satelliteView" switch @change="onSatelliteViewChanged">
          {{ $t("satellite-view") }}
        </b-form-checkbox>
      </div>
      <hr>
      <app-osm-layer-checkbox :map="map" :satellite="satelliteView" v-model="osmSelected" />
    </app-map-pop-button>
  </div>
</template>

<script lang="ts">
import AppOsmLayerCheckbox from "@/app/shared/components/app-map/app-osm-layer-checkbox.vue";
import AppMapPopButton from "@/app/shared/components/app-map/app-map-pop-button.vue";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map, View } from "ol";
import { Component, Prop } from "vue-property-decorator";
import AppBox from "@/app/shared/components/app-box/app-box.vue";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { LayersService } from "./layers/layers-service";
import { KeyFigureColorScheme, LayerEvent } from "./layers/types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { IAnalysisSelectionComponent } from "../selection-sidebar/analysis-selection/types";
import { AnalysisSelectionService } from "../selection-sidebar/analysis-selection/analysis-selection-service";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";


const STORAGE_KEY_MULTISELECTION = "storage-key-multiselection";
const STORAGE_KEY_SHOWUNDEFINED = "storage-key-showundefined";
const STORAGE_KEY_SATELLITEVIEW = "storage-key-satelliteview";


@Component({
  name: "app-map-view-settings",
  components: {
    AppMapPopButton,
    AppOsmLayerCheckbox,
    AppBox,
    AppExplanation,
  },
})
export default class AppMapViewSettings extends BaseComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) map!: Map;

  multiSelection = false;
  showCouldNotBeMeasured = false;
  osmSelected = true;
  satelliteView = true;

  multiSelectionDisabled = false;
  isShowCouldNotBeMeasuredDisabled = false;

  layersService!: LayersService
  analysisSelectionService!: AnalysisSelectionService;

  async created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);

    this.layersService = LayersService.get(this.plant.id);
    
    this.setLayerSettings();

    this.satelliteView = appLocalStorage.getItem(STORAGE_KEY_SATELLITEVIEW);
  }

  async mounted() {
    await this.analysisSelectionService.register();
  }

  async unmounted() {
    this.analysisSelectionService.unregister();
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
    this.showCouldNotBeMeasured = 
      this.layersService.settings.showCouldNotBeMeasured =
      appLocalStorage.getItem(STORAGE_KEY_SHOWUNDEFINED) || false;
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-settings {
  overflow: visible;

  .box {
    border: 1px solid $border-color-grey;
  }
}
</style>