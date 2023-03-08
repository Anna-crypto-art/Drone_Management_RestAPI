<template>
  <div class="visualization">
    <app-geovisualization ref="openLayers" v-if="hasLayers" :layers="layers" :loading="loading" @click="onOpenLayersClick">
      <template #pcs>
        {{ $t("pcs") }} <app-explanation>{{ $t("pcs_expl") }}</app-explanation>
      </template>

      <template #displaySettings>
        <div class="visualization-display-settings-container">
          <b-form-checkbox v-model="enableMultiSelection" switch @change="onMultiSelectionChanged" :disabled="multiSelectionDisabled">
            {{ $t("multi-selection") }} <app-explanation>{{ $t("multi-selection-overlapping_expl") }}</app-explanation>
          </b-form-checkbox>
          <b-form-checkbox v-model="showCouldNotBeMeasured" switch @change="onShowCouldNotBeMeasuredChanged" :disabled="isShowCouldNotBeMeasuredDisabled">
            {{ $t("show-could-not-be-measured") }}
          </b-form-checkbox>
          <b-form-checkbox v-model="satelliteView" switch @change="onSatelliteViewChanged">
            {{ $t("satellite-view") }}
          </b-form-checkbox>
          <b-form-checkbox v-if="isSuperAdmin" v-model="enableResultsModification" switch>
            {{ $t("enable-results-modification") }} <app-super-admin-marker />
          </b-form-checkbox>
          <hr v-show="hasLoadedOrthoImages">
          <app-button v-show="hasLoadedOrthoImages"
            variant="secondary"
            size="sm"
            @click="onClearOrthoImagesClick"
          >
            {{ $t('clear-ortho-images') }}
          </app-button>
          <hr v-show="availableOrthoImages.length > 0">
          <app-dropdown-button 
            v-show="availableOrthoImages.length > 0"
            variant="primary"
            :title="$t('load-all-ortho-images')"
            :loading="loadAllOrhtoImagesLoading"
            size="sm"
          >
            <b-dropdown-item-button v-for="orthoImage in availableOrthoImages" :key="orthoImage.name"
              @click="onLoadAllOrhtoImagesClick(orthoImage)"
            >
              {{ orthoImage.name }}
            </b-dropdown-item-button>
          </app-dropdown-button>
        </div>
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

    <app-feature-infos-toast toastId="piInfoToast" :featureInfos="piToastInfo" />
    <app-reference-measurements
      ref="appReferenceMeasurements"
      @referenceMeasurmentAdded="onReferenceMeasurmentAdded"
      @referenceMeasurmentRemoved="onReferenceMeasurmentRemoved" />
  </div>
</template>

<script lang="ts">
import { PILayersHierarchy } from "@/app/plant/shared/visualization/pi-layers-hierarchy";
import { FeatureInfos, FeatureInfosMeta, IPlantVisualization, KeyFigureTypeMap, Legend } from "@/app/plant/shared/visualization/types";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import AppGeovisualization from "@/app/shared/components/app-geovisualization/app-geovisualization.vue";
import { IOpenLayersComponent } from "@/app/shared/components/app-geovisualization/types/components";
import { GroupLayer, LayerType, OSMLayer } from "@/app/shared/components/app-geovisualization/types/layers";
import { appLocalStorage } from "@/app/shared/services/app-storage/app-storage";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { FeatureLike } from "ol/Feature";
import { Component, Prop, Ref } from "vue-property-decorator";
import { ComponentLayer } from "./layers/component-layer";
import { State } from "vuex-class";
import { AnalysisSelectionBaseComponent } from "../analysis-selection-sidebar/analysis-selection-base-component";
import AppButton from "@/app/shared/components/app-button/app-button.vue";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { RefMeasureLayers } from "./ref-measure-layers";
import { layerEvents } from "./layer-events";
import { OrthoImage } from "./layers/types";
import { OrhtoImageMixin } from "./mixins/ortho-image-mixin";
import AppReferenceMeasurements from "../reference-measurements/reference-measurements.vue";
import { RouteQueryHelper } from "../helper/route-query-helper";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import { IAppRefMeasure } from "../reference-measurements/types";
import AppFeatureInfosToast from "./feature-infos-toast.vue";
import AppDropdownButton from "@/app/shared/components/app-dropdown-button/app-dropdown-button.vue";
import AppSuperAdminMarker from "@/app/shared/components/app-super-admin-marker/app-super-admin-marker.vue";
import { analysisResultEventService } from "../plant-admin-view/analysis-result-event-service";
import { AnalysisResultEvent } from "../plant-admin-view/types";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { RefMeasureEntry, RefMeasureEntryKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/reference-measurement-schema";
import { LayerBase } from "./layers/layer-base";
import { FieldgeometryComponentSchema } from "@/app/shared/services/volateq-api/api-schemas/fieldgeometry-component-schema";

const STORAGE_KEY_MULTISELECTION = "storage-key-multiselection";
const STORAGE_KEY_SHOWUNDEFINED = "storage-key-showundefined";
const STORAGE_KEY_SATELLITEVIEW = "storage-key-satelliteview";

@Component({
  name: "app-visualization",
  components: {
    AppGeovisualization,
    AppExplanation,
    AppButton,
    AppReferenceMeasurements,
    AppFeatureInfosToast,
    AppDropdownButton,
    AppSuperAdminMarker,
  },
})
export default class AppVisualization
  extends AnalysisSelectionBaseComponent
  implements IPlantVisualization
{
  @Prop() plant!: PlantSchema;
  @Prop() analyses!: AnalysisForViewSchema[];
  @Prop() componentLayerTypes!: typeof ComponentLayer[];
  @Prop() keyFigureLayers!: KeyFigureTypeMap<GeoVisualQuery>[];

  @State(state => state.sidebar["analysis"]) sidebarOpen!: boolean;

  @Ref() openLayers!: IOpenLayersComponent;
  @Ref() appReferenceMeasurements!: IAppRefMeasure;

  piLayersHierarchy: PILayersHierarchy | null = null;
  refMeasureLayers: RefMeasureLayers | null = null;

  componentLayers: ComponentLayer[] = [];
  layers: LayerType[] = [];
  worldMapLayer!: OSMLayer;
  piHeadGroup: GroupLayer | null = null;

  // referenced by all component layers. Avoid referencation!
  refMeasuredPcsCodes: string[] = [];

  legends: Legend[] = [];
  
  piToastInfo: FeatureInfos = { groups: [] };
  
  loading = false;

  showPCS = false;

  enableMultiSelection = false;
  multiSelectionDisabled = false;

  // Consider to set the default value in "doEnableShowCouldNotBeMeasured", too
  showCouldNotBeMeasured = true; 
  showCouldNotBeMeasuredDisabled = false; // "compare view" disables showCouldNotBeMeasured

  satelliteView = false;

  hasLoadedOrthoImages = false;
  availableOrthoImages: OrthoImage[] = [];
  loadAllOrhtoImagesLoading = false;

  enableResultsModification = false;

  private isMounted = false;
  private firstLoad = true;

  private routeQueryHelper = new RouteQueryHelper(this);

  async created() {
    await super.created();

    this.doEnableMultiSelection();
    this.showCouldNotBeMeasured = appLocalStorage.getItem(STORAGE_KEY_SHOWUNDEFINED) || this.showCouldNotBeMeasured;
    this.satelliteView = appLocalStorage.getItem(STORAGE_KEY_SATELLITEVIEW) || this.satelliteView;

    this.createLayers();

    layerEvents.onOrthoImageLoaded(() => {
      this.hasLoadedOrthoImages = true;
    });
    layerEvents.onRemoveOrthoImages(() => {
      this.hasLoadedOrthoImages = false;
    });

    for (const analysis of this.analyses) {
      if (analysis.analysis_result) {
        analysisResultEventService.on(analysis.analysis_result.id, AnalysisResultEvent.MODIFIED, async () => {
          await this.piLayersHierarchy!.reselectAllLayers(this.enableMultiSelection);
        });
      }
    }

    this.routeQueryHelper.queryChanged(async () => { await this.loadQueryPi(); });
  }

  async mounted() {
    await this.$nextTick();

    // wait for DOM before render OpenLayers
    this.isMounted = true;
  }

  @CatchError("loading")
  protected async onAnalysisSelected() {
    const analysisSelectionChanged = 
      this.piLayersHierarchy!.getSelectedAnalysisResultId() !== this.firstAnalysisResult?.id;

    this.piLayersHierarchy!.addAndSelectAnalysisResult(this.firstAnalysisResult?.id);
    
    const multiAnalysesSelectedBefore = !!this.piLayersHierarchy!.getCompareAnalysisResultId();
    this.piLayersHierarchy!.setCompareAnalysisResult(null);

    if (multiAnalysesSelectedBefore) {
      // Recover subgroup multiselection, because compare view disabled multiselection on all levels.
      this.piLayersHierarchy!.toggleMultiSelectionDeep(true);

      // If we had multiple analysis selected before, we need to restore and enable multiselection again
      this.doEnableMultiSelection();
      this.piLayersHierarchy!.toggleMultiSelection(this.enableMultiSelection);

      this.doEnableShowCouldNotBeMeasured();
      await this.piLayersHierarchy!.toggleShowUndefined(this.showCouldNotBeMeasured, false);
    }

    if (analysisSelectionChanged || multiAnalysesSelectedBefore) {
      if (!this.firstLoad) {
        await this.piLayersHierarchy!.reselectAllLayers(this.enableMultiSelection);
      }

      await this.reloadRefMeasureComponents();
    }

    this.piLayersHierarchy!.updateVisibility();
    this.availableOrthoImages = this.piLayersHierarchy!.getAvailableOrthoImages();

    await this.refMeasureLayers!.addAndSelectAnalysis(this.firstAnalysis?.id);
    this.refMeasureLayers!.updateVisibility();

    const hasPISelected = await this.onFirstLoad();
    if (!hasPISelected && analysisSelectionChanged) {
      await this.piLayersHierarchy!.collapseFirstParentComponentLayer();
    }

    this.piHeadGroup!.visible = !!this.firstAnalysisResult;

    this.hideToast();
  }

  @CatchError("loading")
  protected async onMultiAnalysesSelected() {
    const selectionChanged = this.piLayersHierarchy!.getSelectedAnalysisResultId() !== this.firstAnalysisResult?.id ||
      this.piLayersHierarchy!.getCompareAnalysisResultId() !== this.compareAnalysisResult?.id;
    
    this.piLayersHierarchy!.addAndSelectAnalysisResult(this.firstAnalysisResult?.id);
    this.piLayersHierarchy!.setCompareAnalysisResult(this.compareAnalysisResult || null);
    
    // "Multi selection" and "show could not be measured" is not allowed for compare mode
    this.disableMultiSelection();
    this.disableShowCouldNotBeMeasured();
    
    if (selectionChanged) {
      this.piLayersHierarchy!.toggleMultiSelection(false);
      this.piLayersHierarchy!.toggleMultiSelectionDeep(false);

      await this.piLayersHierarchy!.toggleShowUndefined(false, false);

      await this.piLayersHierarchy!.reselectAllLayers(false);
    }
    
    this.piLayersHierarchy!.updateVisibility();

    this.availableOrthoImages = this.piLayersHierarchy!.getAvailableOrthoImages();

    await this.refMeasureLayers!.addAndSelectAnalysis(undefined);
    this.refMeasureLayers!.updateVisibility();

    const hasPISelected = await this.onFirstLoad();
    if (!hasPISelected && selectionChanged) {
      await this.piLayersHierarchy!.collapseFirstParentComponentLayer();

      await this.reloadRefMeasureComponents();
    }

    this.piHeadGroup!.visible = !!this.firstAnalysisResult;

    this.hideToast();
  }

  private async onFirstLoad(): Promise<boolean> {
    if (this.firstLoad) {
      this.firstLoad = false;
    } else {
      return false;
    }

    await this.$nextTick();

    await this.piLayersHierarchy!.toggleShowUndefined(this.showCouldNotBeMeasured);
    this.piLayersHierarchy!.toggleMultiSelection(this.enableMultiSelection);

    return await this.loadQueryPi();
  }

  async loadQueryPi(): Promise<boolean> {
    let piSelected = false;

    let selectedPIs: (string | null)[] = Array.isArray(this.$route.query.pi!) ? 
      this.$route.query.pi! : 
      [this.$route.query.pi!];
    for (const selectedPI of selectedPIs) {
      if (selectedPI) {
        const keyFigureId: number = parseInt(selectedPI);
        if (!Object.values(ApiKeyFigure).includes(keyFigureId)) {
          this.showError({ error: "PI_NOT_FOUND", message: this.$t("pi-not-found").toString() });
        } else {
          // Wait for analysis result to be loaded
          await this.$nextTick(); 
          await this.$nextTick();

          await this.piLayersHierarchy!.selectKeyFigureLayer(keyFigureId);

          piSelected = true;
        }

        if (this.compareAnalysisResult !== null) {
          // do not select multiple key figures in compare view
          break;
        }
      }
    }

    return piSelected;
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

  get isShowCouldNotBeMeasuredDisabled(): boolean {
    return this.analysisResults.length === 0 || this.showCouldNotBeMeasuredDisabled;
  }

  @CatchError("loading")
  async onOpenLayersClick(features: FeatureLike[]) {
    let mergedFeatureInfos: FeatureInfos | undefined = undefined;
    const featureInfosMeta: FeatureInfosMeta = {};

    // Multiselection is not supported
    if (features.length > 1 || features.length === 0) {
      return;
    }

    const feature = features[0];

    mergedFeatureInfos = await this.clickLayers(feature, this.piLayersHierarchy!.getAllChildLayers(), mergedFeatureInfos, featureInfosMeta);
    mergedFeatureInfos = await this.clickLayers(feature, this.componentLayers, mergedFeatureInfos, featureInfosMeta);
    mergedFeatureInfos = await this.clickLayers(feature, this.refMeasureLayers!.referenceMeasurementLayers, mergedFeatureInfos, featureInfosMeta);

    if (mergedFeatureInfos && mergedFeatureInfos.title) {
      this.piToastInfo = mergedFeatureInfos;
      this.$bvToast.show("piInfoToast");
    } else {
      this.hideToast();
    }
  }

  private async clickLayers(
    feature: FeatureLike,
    layers: LayerBase[],
    mergedFeatureInfos: FeatureInfos | undefined,
    featureInfosMeta: FeatureInfosMeta,
  ): Promise<FeatureInfos | undefined> {
    for (const layer of layers) {
      const featureInfos = await layer.onClick(feature, featureInfosMeta);

      mergedFeatureInfos = this.mergeFeatureInfos(mergedFeatureInfos, featureInfos);
    }

    return mergedFeatureInfos;
  }

  private mergeFeatureInfos(mergedFeatureInfos: FeatureInfos | undefined, newFeatureInfos: FeatureInfos | undefined): FeatureInfos | undefined {
    if (newFeatureInfos) {
      if (!mergedFeatureInfos) {
        return newFeatureInfos;
      }

      if (!mergedFeatureInfos.title) {
        mergedFeatureInfos.title = newFeatureInfos.title;
      }

      for (const newFeatureInfoGroup of newFeatureInfos.groups) {
        const existInMerged = !!newFeatureInfos.groups.find(g => mergedFeatureInfos.groups.find(mg => mg.title === g.title));
        if (!existInMerged) {
          mergedFeatureInfos.groups.push(newFeatureInfoGroup);
        }
      }

      if (newFeatureInfos.actionsSummaries) {
        if (!mergedFeatureInfos.actionsSummaries) {
          mergedFeatureInfos.actionsSummaries = newFeatureInfos.actionsSummaries;
        } else {
          for (const newFeatureInfoActions of newFeatureInfos.actionsSummaries) {
            const existInMerged = !!mergedFeatureInfos.actionsSummaries.find(a => newFeatureInfoActions.name === a.name);
            if (!existInMerged) {
              mergedFeatureInfos.actionsSummaries.push(newFeatureInfoActions);
            }
          }
        }
      }
    }

    return mergedFeatureInfos;
  }

  private disableMultiSelection() {
    this.enableMultiSelection = false;
    this.multiSelectionDisabled = true;
  }

  private doEnableMultiSelection() {
    this.enableMultiSelection = appLocalStorage.getItem(STORAGE_KEY_MULTISELECTION) || false;
    this.multiSelectionDisabled = this.analysisResults.length === 0;
  }

  private disableShowCouldNotBeMeasured() {
    this.showCouldNotBeMeasured = false;
    this.showCouldNotBeMeasuredDisabled = true;
  }

  private doEnableShowCouldNotBeMeasured() {
    this.showCouldNotBeMeasured = appLocalStorage.getItem(STORAGE_KEY_SHOWUNDEFINED) || true;
    this.showCouldNotBeMeasuredDisabled = false;
  }

  async onLayerSelected(selected: boolean, legend: Legend | undefined) {
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

    await this.piLayersHierarchy!.onLayerSelected();

    const selectedLayers = this.piLayersHierarchy!.getSelectedLayers();
    this.routeQueryHelper.replaceRoute({ pi: selectedLayers.map(selectedLayer => selectedLayer.keyFigureId.toString() )});
    
    this.hideToast();
  }

  @CatchError()
  async onMultiSelectionChanged() {
    appLocalStorage.setItem(STORAGE_KEY_MULTISELECTION, this.enableMultiSelection);

    this.piLayersHierarchy!.toggleMultiSelection(this.enableMultiSelection);
    await this.piLayersHierarchy!.reselectAllLayers(this.enableMultiSelection);

    // Group Layer "performance-indicators"
    (this.layers[0] as GroupLayer).singleSelection = !this.enableMultiSelection;
  }

  @CatchError()
  async onShowCouldNotBeMeasuredChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SHOWUNDEFINED, this.showCouldNotBeMeasured);

    await this.piLayersHierarchy!.toggleShowUndefined(this.showCouldNotBeMeasured);
  }

  @CatchError()
  async onSatelliteViewChanged() {
    appLocalStorage.setItem(STORAGE_KEY_SATELLITEVIEW, this.satelliteView);

    this.worldMapLayer.satellite = this.satelliteView;
    this.worldMapLayer.reloadLayer = true;
    await this.worldMapLayer.events!.emit("setSelected", false);
    await this.worldMapLayer.events!.emit("setSelected", true);
  }

  @CatchError()
  onClearOrthoImagesClick() {
    this.piLayersHierarchy!.clearOrthoImages();
  }

  @CatchError("loadAllOrhtoImagesLoading")
  async onLoadAllOrhtoImagesClick(orthoImage: OrthoImage) {
    if (!confirm(this.$t('load-all-ortho-images-sure').toString())) {
      return;
    }

    await OrhtoImageMixin.loadOrthoImage(
      orthoImage,
      this.plant,
      this.firstAnalysisResult!.id,
    );
  }

  @CatchError()
  private createLayers(): void {
    this.componentLayers = this.componentLayerTypes
      .map(componentType => new (componentType as any)(this)); 

    this.piLayersHierarchy = new PILayersHierarchy(
      this,
      this.analysisResults,
      this.keyFigureLayers,
      this.showCouldNotBeMeasured,
      this.enableMultiSelection
    );
    this.refMeasureLayers = new RefMeasureLayers(this, this.analyses);

    this.worldMapLayer = {
      name: this.$t("world-map").toString(),
      type: "osm",
      selected: true,
      satellite: this.satelliteView,
      events: new SequentialEventEmitter(),
    };

    this.piHeadGroup = {
      name: this.$t("performance-indicators").toString(),
      type: "group",
      icon: "speedometer2",
      childLayers: this.piLayersHierarchy!.groupLayers,
      singleSelection: true,
      visible: this.analysisResults.length > 0,
    },

    this.layers.push(
      this.piHeadGroup,
      this.refMeasureLayers.groupLayer,
      {
        name: this.$t("components").toString(),
        type: "group",
        icon: "app-indicator",
        childLayers: this.componentLayers.map(compLayer => compLayer.toGeoLayer()),
      },
      {
        name: this.$t("display-settings").toString(),
        type: "group",
        icon: "gear-fill",
        customSlot: "displaySettings",
        childLayers: [
          {
            name: "pcs",
            type: "custom",
            customLoader: () => {
              return;
            },
            onSelected: (selected: boolean) => {
              this.showPCS = selected;
    
              this.piLayersHierarchy!.getAllChildLayers().forEach(kpiLayer => {
                kpiLayer.showPCS(selected);
                kpiLayer.rerenderMap();
              });
              this.componentLayers.forEach(compLayer => {
                compLayer.showPCS(selected),
                compLayer.rerenderMap();
              });
            },
            selected: false,
          },
          this.worldMapLayer,
        ]
      },
    );
  }

  private async loadRefMeasurePcsCodes() {
    // clear array without loosing the reference
    this.refMeasuredPcsCodes.length = 0;

    const refMeasureEntries = await volateqApi.getReferenceMeasurementEntries(this.firstAnalysis!.id);
    for (const refMeasureEntry of refMeasureEntries.entries) {
      this.refMeasuredPcsCodes.push(refMeasureEntry.pcs);
    }
  }

  private async rerenderComponentLayers() {
    for (const componentLayer of this.componentLayers) {
      if (componentLayer.isVisible && componentLayer.getSelected()) {
        await componentLayer.rerender();
      }
    }
  }

  private selectAnalysisForComponents() {
    for (const componentLayer of this.componentLayers) {
      componentLayer.setSelectedAnalysis(this.firstAnalysis);
    }
  }

  private async reloadRefMeasureComponents() {
    this.selectAnalysisForComponents();
    await this.loadRefMeasurePcsCodes();
    await this.rerenderComponentLayers();
  }

  public hideToast() {
    this.$bvToast.hide("piInfoToast");
  }

  public showRefMeasureModal(
    fieldgeometryComponent: FieldgeometryComponentSchema,
    myRefMeasureEntry: RefMeasureEntry | null,
    myRefMeasureEntryKeyFigures: RefMeasureEntryKeyFigureSchema[] | null,
  ) {
    this.appReferenceMeasurements.show(
      this.firstAnalysis!.id,
      fieldgeometryComponent,
      myRefMeasureEntry,
      myRefMeasureEntryKeyFigures,
    );

    this.hideToast();
  }
  
  @CatchError()
  async onReferenceMeasurmentRemoved(fieldgeometryComponent: FieldgeometryComponentSchema) {
    const rmIndex = this.refMeasuredPcsCodes.findIndex(c => c === fieldgeometryComponent.kks)
    if (rmIndex >= 0) {
      this.refMeasuredPcsCodes.splice(rmIndex, 1);
    }

    await this.rerenderComponentLayers();
    await this.refMeasureLayers!.updateRefMeasuresOfSelectedAnalysis();
  }

  @CatchError()
  async onReferenceMeasurmentAdded(fieldgeometryComponent: FieldgeometryComponentSchema) {
    this.refMeasuredPcsCodes.push(fieldgeometryComponent.kks);

    await this.rerenderComponentLayers();
    await this.refMeasureLayers!.updateRefMeasuresOfSelectedAnalysis();
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// Fix that toaster overlays popover
.b-popover {
  z-index: 1101;
}

.visualization {
  position: relative;
  height: calc(100vh - $header-height - $tab-height);
  width: 100%;

  &-actions {
    transition: left 0.3s ease-in-out;
    position: absolute;
    bottom: 0.5em;
    left: 0.5em;

    &.sidebar-open {
      @media(min-width: 526px) {
        left: calc($sidebar-width + 0.5em);
      }
    }
  }

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
        flex-shrink: 0;
      }
      &-name {
        width: auto;
        word-break: break-all;
        overflow: hidden;
      }
    }
  }

  &-display-settings-container {
    padding: 1em;
    margin-bottom: 1em;
    background-color: $grey;
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

@media (max-width: 576px) {
  .toggle-button.show-label .toggle-button-text,
	.toggle-button:hover .toggle-button-text {
    display: none;
  }
}

</style>
