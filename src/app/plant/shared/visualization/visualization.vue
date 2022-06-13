<template>
  <div class="visualization">
    <app-geovisualization ref="openLayers" v-if="hasLayers" :layers="layers" :loading="loading" @click="onOpenLayersClick">
      <template #topContent>
        <app-collapse name="displaySettings">
          <template #button>
            <b-icon icon="gear-fill" /> <span class="pad-left">{{ $t("display-settings") }}</span>
          </template>
          <b-form-checkbox v-model="enableMultiSelection" switch @change="onMultiSelectionChanged">
            {{ $t("multi-selection") }} <app-explanation>{{ $t("multi-selection-overlapping_expl") }}</app-explanation>
          </b-form-checkbox>
          <b-form-checkbox v-model="showCouldNotBeMeasured" switch @change="onShowCouldNotBeMeasuredChanged">
            {{ $t("show-could-not-be-measured") }}
          </b-form-checkbox>
          <b-form-checkbox v-model="satelliteView" switch @change="onSatelliteViewChanged">
            {{ $t("satellite-view") }}
          </b-form-checkbox>
          <br>
          <app-button variant="secondary" size="sm" @click="onClearOrthoImagesClick">{{ $t('clear-ortho-images') }}</app-button>
        </app-collapse>
      </template>

      <!-- Pass slots through -->
      <template v-for="(_, slot) in $slots">
        <template :slot="slot">
          <slot :name="slot"></slot>
        </template>
      </template>
    </app-geovisualization>

    <div v-if="hasLegend" :class="'visualization-legend' + (sidebarOpen ? ' sidebar-open' : '')">
      <div v-for="entry in legendEntries" :key="entry.color" :class="'visualization-legend-entry' + (entry.indent ? ' pad-left' : '')">
        <div class="visualization-legend-entry-color" :style="`background: ${entry.color}`"></div>
        <div class="visualization-legend-entry-name" v-html="entry.name"></div>
      </div>
    </div>
    <b-toast id="piInfoToast" no-auto-hide solid toaster="b-toaster-bottom-center">
      <template #toast-title>
        <h5>{{ piToastInfo.title }}</h5>
      </template>
      <div>
        <div class="toaster-images" v-if="piToastInfo.images">
          <img v-for="image in piToastInfo.images" :key="image.title" :title="image.title" :src="image.url" />
        </div>
        <b-row
          v-for="featureInfo in piToastInfo.records"
          :key="featureInfo.name"
          :class="featureInfo.bold && 'font-weight-bold'"
        >
          <b-col>
            {{ featureInfo.name }}
            <app-explanation v-if="featureInfo.descr">
              <span v-html="$t(featureInfo.descr)"></span>
            </app-explanation>
          </b-col>
          <b-col>{{ featureInfo.value }}</b-col>
        </b-row>
      </div>
      <div v-if="piToastInfo.actions" class="toaster-actions">
        <app-dropdown-button 
          :variant="piToastInfo.actions.buttonVariant"
          :title="piToastInfo.actions.name"
          :loading="toastDropdownButtonLoading"
          size="sm"
        >
          <b-dropdown-item-button v-for="action in piToastInfo.actions.actions" :key="action.name"
            @click="onClickFeatureAction(action.name)"
          >
            {{ action.name }}
          </b-dropdown-item-button>
        </app-dropdown-button>
      </div>
    </b-toast>
  </div>
</template>

<script lang="ts">
import { PILayersHierarchy } from "@/app/plant/shared/visualization/pi-layers-hierarchy";
import { FeatureInfos, IPlantVisualization, KeyFigureTypeMap, Legend } from "@/app/plant/shared/visualization/types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppGeovisualization from "@/app/shared/components/app-geovisualization/app-geovisualization.vue";
import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer, LayerType, OSMLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import AppCollapse from "@/app/shared/components/app-collapse/app-collapse.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { FeatureLike } from "ol/Feature";
import { Component, Prop, Ref } from "vue-property-decorator";
import { ComponentLayer } from "./layers/component-layer";
import { State } from "vuex-class";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
import AppButton from "@/app/shared/components/app-button/app-button.vue";

const STORAGE_KEY_MULTISELECTION = "storage-key-multiselection";
const STORAGE_KEY_SHOWUNDEFINED = "storage-key-showundefined";
const STORAGE_KEY_SATELLITEVIEW = "storage-key-satelliteview";

@Component({
  name: "app-visualization",
  components: {
    AppGeovisualization,
    AppExplanation,
    AppCollapse,
    AppDropdownButton,
    AppButton,
  },
})
export default class AppVisualization
  extends AnalysisSelectionBaseComponent
  implements IPlantVisualization
{
  @Prop() plant!: PlantSchema;
  @Prop() analysisResults!: AnalysisResultDetailedSchema[];
  @Prop() componentLayerTypes!: typeof ComponentLayer[];
  @Prop() keyFigureLayers!: KeyFigureTypeMap[];
  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;

  @Ref() openLayers!: IOpenLayersComponent;

  piLayersHierarchy!: PILayersHierarchy;
  componentLayers: ComponentLayer[] = [];
  layers: LayerType[] = [];
  showPCS = false;
  legends: Legend[] = [];
  piToastInfo: FeatureInfos = { title: "", records: [{ name: "", descr: "", value: "" }] };
  loading = false;
  toastDropdownButtonLoading = false;

  enableMultiSelection = false;
  showCouldNotBeMeasured = true;
  satelliteView = false;

  private worldMapLayer!: OSMLayer;

  private isMounted = false;

  async created() {
    await super.created();

    this.enableMultiSelection = appLocalStorage.getItem(STORAGE_KEY_MULTISELECTION) || false;
    this.showCouldNotBeMeasured = appLocalStorage.getItem(STORAGE_KEY_SHOWUNDEFINED) || false;
    this.satelliteView = appLocalStorage.getItem(STORAGE_KEY_SATELLITEVIEW) || false;

    if (this.$route.query.pi) {
      const keyFigureId: number = parseInt(this.$route.query.pi as string);
      const keyFigureFigureLayer = this.keyFigureLayers.find(keyFigureLayer => keyFigureLayer.keyFigureId === keyFigureId);
      if (keyFigureFigureLayer) {
        keyFigureFigureLayer.selected = true;
      }
    }

    this.createLayers();    
  }

  async mounted() {
    await this.$nextTick();

    // wait for DOM before render OpenLayers
    this.isMounted = true;

    this.piLayersHierarchy.toggleShowUndefined(this.showCouldNotBeMeasured);
    this.piLayersHierarchy.toggleMultiSelection(this.enableMultiSelection);
  }

  protected onAnalysisSelected() {
    this.piLayersHierarchy.addAndSelectAnalysisResult(this.firstAnalysisResult?.id);
    this.piLayersHierarchy.setCompareAnalysisResult(null);
    this.piLayersHierarchy.toggleMultiSelection(true, true);
    this.piLayersHierarchy.toggleMultiSelection(this.enableMultiSelection);
    this.piLayersHierarchy.updateVisibility();

    this.hideToast();
  }

  protected onMultiAnalysesSelected() {
    this.piLayersHierarchy.addAndSelectAnalysisResult(this.firstAnalysisResult?.id);
    this.piLayersHierarchy.setCompareAnalysisResult(this.compareAnalysisResult || null);
    this.piLayersHierarchy.toggleMultiSelection(false, true);
    this.piLayersHierarchy.updateVisibility();

    this.hideToast();
  }

  get hasLayers(): boolean {
    return this.layers.length > 0 && this.isMounted;
  }

  get hasLegend(): boolean {
    return this.legends.length > 0;
  }

  get legendEntries(): { color: string; name: string }[] {
    const legendEntries: { color: string; name: string }[] = [];
    for (const legend of this.legends) {
      for (const entry of legend.entries) {
        if (!legendEntries.find(legendEntry => legendEntry.color === entry.color)) {
          legendEntries.push(entry);
        }
      }
    }

    return legendEntries;
  }

  async onOpenLayersClick(features: FeatureLike[]) {
    try {
      this.loading = false;
      
      let mergedFeatureInfos: FeatureInfos | undefined;
      for (const kpiLayer of this.piLayersHierarchy.getAllChildLayers()) {
        const featureInfos = await kpiLayer.onClick(features);
  
        if (featureInfos) {
          if (!mergedFeatureInfos) {
            mergedFeatureInfos = featureInfos;
          } else if (mergedFeatureInfos.title === featureInfos.title) {
            mergedFeatureInfos.records.forEach((featureInfo, index) => {
              if (!featureInfo.bold && featureInfos.records[index].bold) {
                featureInfo.bold = true;
              }
            });
          }
        }
      }
  
      if (mergedFeatureInfos) {
        this.piToastInfo = mergedFeatureInfos;
      }
  
      if (mergedFeatureInfos) {
        this.$bvToast.show("piInfoToast");
      } else {
        this.hideToast();
      }
    } finally {
      this.loading = false;
    }
  }

  onLayerSelected(selected: boolean, legend?: Legend) {
    if (legend) {
      const legendIndex = this.legends.findIndex(l => l.id === legend.id);
      if (selected) {
        if (legendIndex === -1) {
          this.legends.push(legend);
        } else {
          throw Error("Legend id " + legend.id + " already added");
        }
      } else {
        if (legendIndex != -1) {
          this.legends.splice(legendIndex, 1);
        }
      }
    }

    this.hideToast();
  }

  onMultiSelectionChanged() {
    appLocalStorage.setItem(STORAGE_KEY_MULTISELECTION, this.enableMultiSelection);

    this.piLayersHierarchy.toggleMultiSelection(this.enableMultiSelection);
    // Group Layer "performance-indicators"
    (this.layers[0] as GroupLayer).singleSelection = !this.enableMultiSelection;
  }

  onShowCouldNotBeMeasuredChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SHOWUNDEFINED, this.showCouldNotBeMeasured);

    this.piLayersHierarchy.toggleShowUndefined(this.showCouldNotBeMeasured);
  }

  onSatelliteViewChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SATELLITEVIEW, this.satelliteView);

    this.worldMapLayer.satellite = this.satelliteView;
    this.worldMapLayer.reloadLayer = true;
  }

  async onClickFeatureAction(actionName: string) {
    try {
      this.toastDropdownButtonLoading = true;

      await this.piToastInfo.actions!.actions.find(action => action.name === actionName)!.action();
    }
    finally {
      this.toastDropdownButtonLoading = false;
    }
  }

  onClearOrthoImagesClick() {
    this.piLayersHierarchy.clearOrthoImages();
  }

  private createLayers(): void {
    try {
      this.componentLayers = this.componentLayerTypes.map(componentType => new (componentType as any)(this));
      this.piLayersHierarchy = new PILayersHierarchy(this, this.analysisResults, this.keyFigureLayers);
  
      this.worldMapLayer = {
        name: this.$t("world-map").toString(),
        type: "osm",
        selected: true,
        satellite: this.satelliteView,
      };
  
      this.layers.push(
        {
          name: this.$t("performance-indicators").toString(),
          type: "group",
          childLayers: this.piLayersHierarchy.groupLayers,
          singleSelection: true,
        },
        {
          name: this.$t("components").toString(),
          type: "group",
          childLayers: this.componentLayers.map(compLayer => compLayer.toGeoLayer()),
        },
        {
          name: "pcs",
          type: "custom",
          customLoader: () => {
            return;
          },
          onSelected: (selected: boolean) => {
            this.showPCS = selected;
  
            this.piLayersHierarchy.getAllChildLayers().forEach(kpiLayer => kpiLayer.showPCS(selected));
            this.componentLayers.forEach(compLayer => compLayer.showPCS(selected));
          },
          selected: false,
          styleClass: "margin-top",
        },
        this.worldMapLayer
      );
    } catch (e) {
      this.showError(e);
    }
  }

  public hideToast() {
    this.$bvToast.hide("piInfoToast");
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix that toaster overlays popover
.b-popover {
  z-index: 1;
}
.b-toaster {
  z-index: 0;
}

.visualization {
  position: relative;
  height: calc(100vh - $header-height - $tab-height);
  width: 100%;

  &-legend {
    @supports (backdrop-filter: blur(5px)) {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.7);
    }
    @supports not (backdrop-filter: blur(5px)) {
      background: rgba(255, 255, 255, 0.8);
    }

    transition: left 0.3s ease-in-out;
    position: absolute;
    bottom: 0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
    padding: 10px 15px 0px 15px;

    &.sidebar-open {
      left: calc($sidebar-width + 0.5em);
    }

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

.toaster-images {
  img {
    max-width: calc(500px - 1.5rem);
  }
  margin-bottom: 0.75rem;
}
.toaster-actions {
  margin-top: 15px;
}
</style>
