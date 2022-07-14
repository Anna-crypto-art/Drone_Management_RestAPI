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
    <div v-if="!hasLegend" :class="'visualization-actions' + (sidebarOpen ? ' sidebar-open' : '')">
      <app-button 
        v-show="!refMeasureId"
        variant="secondary"
        icon="clipboard-check"
        :hideText="true"
        @click="onRefMeasureClick"
        :loading="refMeasureButtonLoading"
      >
        {{ $t("acquire-reference-measurement") }}
      </app-button>
      <app-button 
        v-show="refMeasureId"
        variant="primary"
        icon="clipboard-check"
        @click="onRefMeasureFinishClick"
      >
        {{ $t("finish-reference-measurement") }}
      </app-button>
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
          <b-col>
            {{ featureInfo.value }}
            <span v-if="featureInfo.unit">
              {{ featureInfo.unit }}
            </span>
          </b-col>
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

    <app-modal-form
      id="reference-measurement-modal"
      ref="refMeasureModal"
      :title="$t('acquire-reference-measurement')"
      :ok-title="$t('start')"
      :modalLoading="refMeasureModalLoading"
      @submit="onStartRefMeasure"
    >
      <div v-if="refMeasure">
        <b-alert variant="secondary" v-model="refMeasure.analysisLoaded">
          <span v-if="refMeasure.analysisId !== null" 
          v-html="$t('acquire-reference-measurement-for-analyis', { analysis: refMeasure.analysisName })">
          </span>
          <span v-if="refMeasure.analysisId === null">
            {{ $t("acquire-reference-measurement-and-create-analyis") }}
          </span>
        </b-alert>
        <b-form-group v-if="refMeasureCusomterSelection">
          <b-form-select v-model="refMeasure.customerId" :options="refMeasureCusomterSelection" required @change="onRefMeasureCustomerSelected" />
        </b-form-group>

        <b-form-group v-show="oldRefMeasures" :label="$t('continue-reference-measurement')">
          <b-form-select v-model="refMeasure.oldMeasureId" :options="oldRefMeasures" />
        </b-form-group>

        <div v-show="refMeasure.oldMeasureId === null">
          <b-form-group :label="$t('measure-date')">
            <b-datepicker v-model="refMeasure.measureDate" required />
          </b-form-group>
          <b-form-group :label="$t('notes')">
            <b-textarea v-model="refMeasure.notes" />
          </b-form-group>
          <b-form-group>
            <b-form-checkbox v-model="refMeasure.gps" switch>{{ $t("use-gps") }}</b-form-checkbox>
          </b-form-group>
        </div>
      </div>
    </app-modal-form>
  </div>
</template>

<script lang="ts">
import { PILayersHierarchy } from "@/app/plant/shared/visualization/pi-layers-hierarchy";
import { FeatureInfos, IPlantVisualization, KeyFigureTypeMap, Legend, ReferenceMeasurementEventObject, ReferenceMeasurementOptions } from "@/app/plant/shared/visualization/types";
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
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { EventEmitter } from "events";
import AppModalForm from "@/app/shared/components/app-modal/app-modal-form.vue";
import { IAppModalForm } from "@/app/shared/components/app-modal/types";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { AnalysisSelectionService } from "../analysis-selection-sidebar/analysis-selection-service";
import { AnalysisSelectionEvent } from "../analysis-selection-sidebar/types";
import { ApiStates } from "@/app/shared/services/volateq-api/api-states";

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
    AppModalForm,
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
  @State(state => state.sidebar["layer-switcher"]) layersSidebarOpen!: boolean;

  @Ref() openLayers!: IOpenLayersComponent;
  @Ref() refMeasureModal!: IAppModalForm;

  piLayersHierarchy!: PILayersHierarchy;
  componentLayers: ComponentLayer[] = [];
  layers: LayerType[] = [];
  showPCS = false;
  legends: Legend[] = [];
  piToastInfo: FeatureInfos = { title: "", records: [{ name: "", descr: "", value: "" }] };
  loading = false;
  toastDropdownButtonLoading = false;
  piHeadGroup: GroupLayer | null = null;

  enableMultiSelection = false;
  showCouldNotBeMeasured = true;
  satelliteView = false;

  refMeasureId: string | null = null;
  refMeasureButtonLoading = false;
  refMeasureModalLoading = false;
  refMeasure: ReferenceMeasurementOptions | null = null;
  refMeasureCusomterSelection: { value: string, text: string }[] | null = null;
  oldRefMeasures: { value: string | null, text: string }[] | null = null; 

  private worldMapLayer!: OSMLayer;

  private isMounted = false;
  private firstLoad = true;

  async created() {
    await super.created();

    this.enableMultiSelection = appLocalStorage.getItem(STORAGE_KEY_MULTISELECTION) || false;
    this.showCouldNotBeMeasured = appLocalStorage.getItem(STORAGE_KEY_SHOWUNDEFINED) || false;
    this.satelliteView = appLocalStorage.getItem(STORAGE_KEY_SATELLITEVIEW) || false;

    this.createLayers();    
  }

  async mounted() {
    await this.$nextTick();

    // wait for DOM before render OpenLayers
    this.isMounted = true;
  }

  protected async onAnalysisSelected() {
    this.piLayersHierarchy.addAndSelectAnalysisResult(this.firstAnalysisResult?.id);
    this.piLayersHierarchy.setCompareAnalysisResult(null);
    this.piLayersHierarchy.toggleMultiSelection(true, true);
    this.piLayersHierarchy.toggleMultiSelection(this.enableMultiSelection);
    this.piLayersHierarchy.updateVisibility();

    if (this.firstLoad) {
      this.firstLoad = false;

      await this.$nextTick();

      this.piLayersHierarchy.toggleShowUndefined(this.showCouldNotBeMeasured);
      this.piLayersHierarchy.toggleMultiSelection(this.enableMultiSelection);

      if (this.$route.query.pi) {
        const keyFigureId: number = parseInt(this.$route.query.pi as string);
        if (!Object.values(ApiKeyFigure).includes(keyFigureId)) {
          this.showError({ error: "PI_NOT_FOUND", message: this.$t("pi-not-found").toString() });
        } else {
          this.piLayersHierarchy.selectKeyFigureLayer(keyFigureId);
        }
      }
    }

    this.piHeadGroup!.visible = !!this.firstAnalysisResult;

    this.hideToast();
  }

  protected async onMultiAnalysesSelected() {
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
      this.loading = true;
      
      let mergedFeatureInfos: FeatureInfos | undefined;
      for (const kpiLayer of this.piLayersHierarchy.getAllChildLayers()) {
        if (kpiLayer.isVisible) {
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
      }
  
      if (mergedFeatureInfos) {
        this.piToastInfo = mergedFeatureInfos;
        this.$bvToast.show("piInfoToast");
      } else {
        this.hideToast();

        for (const componentLayer of this.componentLayers) {
          if (componentLayer.isVisible) {
            const layer = componentLayer.getVectorGeoLayer();
            if (layer) {
              const feature = features.find(feature => 
                layer.getSource()?.getFeatures().find(layerFeature => layerFeature.get('name') === feature.get('name')));
              if (feature) {
                await componentLayer.onClick(feature);
              }
            }
          }
        }
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
    this.worldMapLayer.events!.emit("setSelected", false);
    this.worldMapLayer.events!.emit("setSelected", true);
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
        events: new EventEmitter(),
      };
  
      this.piHeadGroup = {
        name: this.$t("performance-indicators").toString(),
        type: "group",
        childLayers: this.piLayersHierarchy.groupLayers,
        singleSelection: true,
        visible: true,
      },

      this.layers.push(
        this.piHeadGroup,
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
  
            this.piLayersHierarchy.getAllChildLayers().forEach(kpiLayer => {
              kpiLayer.showPCS(selected);
              kpiLayer.rerenderMap();
            });
            this.componentLayers.forEach(compLayer => {
              compLayer.showPCS(selected),
              compLayer.rerenderMap();
            });

            
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

  async onRefMeasureClick() {
    this.refMeasureButtonLoading = true;
    try {
      this.refMeasure = {
        analysisLoaded: false,
        analysisId: null,
        analysisName: null,
        customerId: null,
        oldMeasureId: null,
        measureDate: null,
        notes: null,
        gps: true,
      }

      if (this.plant.customers && this.plant.customers.length > 1) {
        this.refMeasureCusomterSelection = this.plant.customers.map(customer => ({ value: customer.id, text: customer.name }));
      } else {
        this.refMeasureCusomterSelection = null;

        await this.loadAnalysisForReferenceMeasurement();
      }

      if (this.refMeasure.analysisId) {
        const me = await volateqApi.getMe();

        const myReferenceMeasurements = (await volateqApi.getReferenceMeasurements(this.refMeasure.analysisId))
          .filter(referenceMeasurement => referenceMeasurement.user_id === me.id);

        if (myReferenceMeasurements.length > 0) {
          this.oldRefMeasures = [
            { value: null, text: "" },
            ...myReferenceMeasurements.map(referenceMeasurement => ({
              value: referenceMeasurement.id,
              text: (new Date(Date.parse(referenceMeasurement.measure_date))).toLocaleDateString() + " - " 
                + (referenceMeasurement.notes || ""),
            }))
          ];
        } else {
          this.oldRefMeasures = null;
        }
      }

      this.refMeasureModal.show();
    } catch (e) {
      this.showError(e)
    } finally {
      this.refMeasureButtonLoading = false;
    }
  }

  async onRefMeasureCustomerSelected() {
    this.loadAnalysisForReferenceMeasurement();
  }

  async loadAnalysisForReferenceMeasurement() {
    const incompleteAnalysis = (await volateqApi.getAllAnalysis({
      plant_id: this.plant.id, 
      customer_id: this.refMeasure?.customerId || undefined,
    })).find(analysis => analysis.current_state.state.id < ApiStates.DATA_COMPLETE);

    if (incompleteAnalysis) {
      this.refMeasure!.analysisId = incompleteAnalysis.id;
      this.refMeasure!.analysisName = incompleteAnalysis.name;
    } 

    this.refMeasure!.analysisLoaded = true;
  }

  async onStartRefMeasure() {
    this.refMeasureModalLoading = true;
    try {
      if ((this.refMeasure!.analysisId === null || this.refMeasure!.oldMeasureId === null) && this.refMeasure!.measureDate === null) {
        throw { error: "MISSING_MEASURE_DATE", message: "Please select a measurement date" }
      }

      if (this.refMeasure!.analysisId === null) {
        this.refMeasure!.analysisId = (await volateqApi.createEmptyAnalysis({
          plant_id: this.plant.id,
          flown_at: this.refMeasure!.measureDate!,
          customer_id: this.refMeasure!.customerId || undefined
        })).id;
      }

      this.refMeasureId = this.refMeasure!.oldMeasureId
      if (this.refMeasureId === null) {
        this.refMeasureId = (await volateqApi.createReferenceMeasurement(this.refMeasure!.analysisId, { 
          measure_date: this.refMeasure!.measureDate!,
          notes: this.refMeasure!.notes || undefined,
        })).id;
      }

      const refMeasureValues = await volateqApi.getReferencMeasurementValues(this.refMeasure!.analysisId, this.refMeasureId);

      AnalysisSelectionService.emit(this.plant.id, AnalysisSelectionEvent.UNSELECT_ALL);
      if (this.sidebarOpen) {
        this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
      }
      if (this.layersSidebarOpen) {
        this.$store.direct.commit.sidebar.toggle({ name: "layer-switcher" });
      }

      this.$emit("startReferenceMeasurement", {
          options: this.refMeasure,
          componentLayers: this.componentLayers,
          piLayersHierarchy: this.piLayersHierarchy,
          refMeasureId: this.refMeasureId,
          refMeasureValues: refMeasureValues,
        } as ReferenceMeasurementEventObject);

      this.refMeasureModal.hide();

    } catch (e) {
      this.showError(e);
    } finally {
      this.refMeasureModalLoading = false;
    }
  }

  onRefMeasureFinishClick() {
    if (confirm(this.$t('finish-reference-measurement-are-you-sure').toString())) {
      this.$emit("finishReferenceMeasurement", {
          options: this.refMeasure,
          componentLayers: this.componentLayers,
          piLayersHierarchy: this.piLayersHierarchy,
          refMeasureId: this.refMeasureId,
        } as ReferenceMeasurementEventObject);

      this.refMeasureId = null;
      this.refMeasure = null;

      AnalysisSelectionService.emit(this.plant.id, AnalysisSelectionEvent.SELECT_FIRST);
      if (!this.sidebarOpen) {
        this.$store.direct.commit.sidebar.toggle({ name: "analysis" });
      }
      if (!this.layersSidebarOpen) {
        this.$store.direct.commit.sidebar.toggle({ name: "layer-switcher" });
      }
    }
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
      left: calc($sidebar-width + 0.5em);
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

.visualization-actions .app-button:hover {
  background-color: $hover-light-blue;
}
</style>
