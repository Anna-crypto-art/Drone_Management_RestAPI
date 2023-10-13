<template>
  <app-map-view-layer-selection :value="visible" @input="onVisibilityChanged">
    <template #title>
      <b-icon icon="speedometer2" /><span class="pad-left-half">{{ $t("performance-indicators") }}</span>
    </template>
    <div class="app-map-view-key-figure-layer-selection" v-show="visible">
      <app-map-view-layer-group v-for="compGroupLayer in compGroupLayers" :key="compGroupLayer.componentId"
        v-model="compGroupLayer.collapsed" 
        v-show="compGroupLayer.visible"
        :title="compGroupLayer.name"
      >
        <div v-for="(childLayer, index) in compGroupLayer.childLayers"
          :key="childLayer.id || index"
          
          :class="{'pad-bottom': isLastVisibleGroup(compGroupLayer, index) }"
          v-show="childLayer.visible"
        >
          <div v-if="childLayer.childLayers" class="app-map-view-key-figure-layer-selection-group">
            <div class="pad-bottom-half font-md" :class="{ 'pad-top': !isFirstVisibleGroup(compGroupLayer, index) }">
              <app-expl-wrap :expl="childLayer.layerOptions.description && $t(childLayer.layerOptions.description)" placement="right">
                {{ $t(childLayer.layerOptions.displayName || childLayer.layerOptions.keyName) }}  
              </app-expl-wrap>
            </div>
            <div class="pad-left-half">
              <app-geo-json-layer-checkbox v-for="subChildLayer in childLayer.childLayers" :key="subChildLayer.id"
                :geoLayer="subChildLayer"
                :map="map"
                descrPlacement="right"
              />
            </div>
          </div>
          <div v-if="!childLayer.childLayers" class="app-map-view-key-figure-layer-selection-single">
            <app-geo-json-layer-checkbox :geoLayer="childLayer" :map="map" descrPlacement="right" />
          </div>
        </div>
      </app-map-view-layer-group>
    </div>
  </app-map-view-layer-selection>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map } from "ol";
import { KeyFigureBaseLayer, KeyFigureColorScheme, KeyFigureLayerOptions, KeyFigureTypeMap, LayerEvent } from "../layers/types";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { ComponentGroupKeyFigureLayer, GroupKeyFigureLayer } from "./types";
import { IAnalysisSelectionComponent } from "../../selection-sidebar/analysis-selection/types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { AnalysisSelectionService } from "../../selection-sidebar/analysis-selection/analysis-selection-service";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { KeyFigureLayer } from "../layers/key-figure-layer";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import AppMapViewLayerSelection from "./map-view-layer-selection.vue";
import AppMapViewLayerGroup from "./map-view-layer-group.vue";
import AppGeoJsonLayerCheckbox from "@/app/shared/components/app-map/app-geo-json-layer-checkbox.vue";
import { LayersService } from "../layers/layers-service";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { LayerColor } from "../../visualization/layers/types";
import { PlantRouteQuery } from "../../types";
import { RouteQueryHelper } from "../../helper/route-query-helper";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";

@Component({
  name: "app-map-view-key-figure-layer-selection",
  components: {
    AppMapViewLayerSelection,
    AppMapViewLayerGroup,
    AppGeoJsonLayerCheckbox,
    AppExplanation,
    AppExplWrap,
  },
})
export default class AppMapViewKeyFigureLayerSelection extends BaseComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) map!: Map;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) keyFigureLayers!: KeyFigureTypeMap<GeoVisualQuery>[];

  visible = false;
  compGroupLayers: ComponentGroupKeyFigureLayer[] = [];
  
  analysisSelectionService!: AnalysisSelectionService;
  layersService!: LayersService;

  private routeQueryHelper = new RouteQueryHelper(this);

  private selectedAnalyses: Record<string, AnalysisForViewSchema> = {};

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);
    
    this.layersService = LayersService.get(this.plant.id);
    this.layersService.on(
      this.plant.id,
      LayerEvent.ON_KEY_FIGURE_SELECTED,
      async (layer: KeyFigureBaseLayer) => {
        await this.selectInvAutoSelectLayer(layer);

        if (layer.selected) {
          await this.unselectOtherLayers(layer);
        }
      }
    );
    this.layersService.on(
      this.plant.id,
      LayerEvent.ON_SHOW_COULD_NOT_BE_MEASURED_CHANGED,
      async () => {
        await this.handleCouldNotBeMeasuredChanged();
      }
    )

    this.routeQueryHelper.queryChanged(async () => { await this.loadLayersFromUrlQuery(); });

    this.setupCompGroupLayers();
  }

  async mounted() {
    await this.analysisSelectionService?.register();
  }

  async unmounted() {
    await this.analysisSelectionService?.unregister();
  }

  get isSidebarOpen(): boolean { return this.$store.direct.state.sidebar.analyses; }

  @Watch('isSidebarOpen')
  onSidebarOpenChanged() {
    const visible = !!this.analysisSelectionService.firstAnalysisResult && this.isSidebarOpen;

    if (visible !== this.visible) {
      this.onVisibilityChanged(visible);
    }
  }

  @CatchError()
  onVisibilityChanged(visible: boolean) {
    this.visible = visible;
    this.$emit("openChanged", this.visible);
  }

  async onAnalysisSelected(selectedByQueryRoute?: boolean) {
    await this.handleAnalysesSelection(selectedByQueryRoute);
  }

  async onMultiAnalysesSelected(selectedByQueryRoute?: boolean) {
    await this.handleAnalysesSelection(selectedByQueryRoute);
  }

  isFirstVisibleGroup(compGroupLayer: ComponentGroupKeyFigureLayer, index: number) {
    for (let i = 0; i < index; i++) {
      if (compGroupLayer.childLayers[i].visible) {
        return false;
      }
    }

    return true;
  }

  isLastVisibleGroup(compGroupLayer: ComponentGroupKeyFigureLayer, index: number) {
    for (let i = index + 1; i < compGroupLayer.childLayers.length; i++) {
      if (compGroupLayer.childLayers[i].visible) {
        return false;
      }
    }

    return true;
  }

  private async handleAnalysesSelection(selectedByQueryRoute?: boolean) {    
    this.onSidebarOpenChanged();

    const selectedAnalysisId = this.analysisSelectionService?.firstAnalysis?.id;
    if (selectedAnalysisId && !(selectedAnalysisId in this.selectedAnalyses)) {
      this.selectedAnalyses[selectedAnalysisId] = this.analysisSelectionService!.firstAnalysis!;
      this.addLayersForAnalysis();
    }

    const selectedLayerNames = await this.updateLayers();
    await this.selectLayers(selectedLayerNames);

    if (selectedByQueryRoute) {
      await this.loadLayersFromUrlQuery();
    }
  }

  private async loadLayersFromUrlQuery(): Promise<boolean> {
    const plantRouteQuery: PlantRouteQuery = this.$route.query;
    if (plantRouteQuery.layer) {
      const layerNames = typeof plantRouteQuery.layer === "string" ? [plantRouteQuery.layer] : plantRouteQuery.layer;
      await this.selectLayers(layerNames);

      return true;
    }

    return false;
  }

  private async selectInvAutoSelectLayer(layer: KeyFigureBaseLayer) {
    if (this.layersService.settings.showCouldNotBeMeasured) {
      const invAutoSelLayer = this.findInvAutoSelLayer(layer);
      if (invAutoSelLayer) {
        if (!invAutoSelLayer.hasSelectedSiblings && invAutoSelLayer.layer.selected) {
          await invAutoSelLayer.layer.setSelected(false);
        } else if (invAutoSelLayer.hasSelectedSiblings && !invAutoSelLayer.layer.selected) {
          await invAutoSelLayer.layer.setSelected(true);
        }
      }
    }
  }

  private async unselectOtherLayers(layer: KeyFigureBaseLayer) {
    if (this.layersService.settings.multiSelection) {
      return;
    }

    const layerGroup = this.findLayerGroup(layer);
    const selectedLayers = this.layersService.keyFigureLayers.filter(l => l.selected);
    for (const selectedLayer of selectedLayers) {
      if (selectedLayer.id !== layer.id) {
        if ((layerGroup as ComponentGroupKeyFigureLayer).componentId) {
          await selectedLayer.setSelected(false);

        } else {
          const sibling = (layerGroup as GroupKeyFigureLayer).childLayers.find(l => l.id === selectedLayer.id);
          if (!sibling) {
            await selectedLayer.setSelected(false);
          }
        }
      }
    }
  }

  private async handleCouldNotBeMeasuredChanged() {
    for (const layer of this.layersService.keyFigureLayers) {
      if (!layer.invisibleAutoSelection) {
        layer.setShowCouldNotBeMeasured(this.layersService.settings.showCouldNotBeMeasured);
        
        if (layer.loadedLayer && layer.query?.undefined !== undefined) {
          layer.reloadLayer();
        }
  
        if (layer.selected) {
          const invAutoSelLayer = this.findInvAutoSelLayer(layer);
          if (invAutoSelLayer) {
            await invAutoSelLayer.layer.setSelected(this.layersService.settings.showCouldNotBeMeasured);
          } else {
            await layer.setSelected(false);
            await layer.setSelected(true);
          }
        }
      }
    }
  }

  private findInvAutoSelLayer(layer: KeyFigureBaseLayer): { layer: KeyFigureBaseLayer, hasSelectedSiblings: boolean } | undefined {
    for (const groupLayer of this.compGroupLayers) {
      if (groupLayer.visible) {
        for (const childLayer of groupLayer.childLayers) {
          if (!(childLayer instanceof KeyFigureLayer)) {
            for (const subChildLayer of childLayer.childLayers) {
              if (subChildLayer.id === layer.id) {
                const autoSelLayer = childLayer.childLayers.find(l => l.invisibleAutoSelection);
                if (autoSelLayer) {
                  return { 
                    layer: autoSelLayer,
                    hasSelectedSiblings: !!childLayer.childLayers.find(l => !l.invisibleAutoSelection && l.selected),
                  };
                }
              }
            }
          }
        }
      }
    }

    return undefined;
  } 
  
  private findLayerGroup(layer: KeyFigureBaseLayer): ComponentGroupKeyFigureLayer | GroupKeyFigureLayer {
    for (const groupLayer of this.compGroupLayers) {
      for (const childLayer of groupLayer.childLayers) {
        if (childLayer instanceof KeyFigureLayer) {
          if (layer.id === childLayer.id) {
            return groupLayer;
          }
        } else {
          const foundLayer = childLayer.childLayers.find(l => l.id === layer.id);
          if (foundLayer) {
            return childLayer;
          }
        }
      }
    }

    throw new Error("Cannot find layer group for layer: " + layer.id);
  }

  private addLayersForAnalysis() {
    const analysisResult = this.analysisSelectionService?.firstAnalysisResult;
    if (!analysisResult) {
      return;
    }

    for (const keyFigureTypeMap of this.keyFigureLayers) {
      const keyFigure: KeyFigureSchema | undefined = analysisResult.key_figures
        .find(keyFigure => keyFigure.id === keyFigureTypeMap.keyFigureId);
      
      if (keyFigure) {
        const compGroupLayer = this.compGroupLayers.find(cgl => cgl.componentId === keyFigure.component_id)!;

        if (!keyFigureTypeMap.subLayers) {
          const keyFigureLayer = this.createLayer(
            keyFigureTypeMap,
            analysisResult,
            keyFigureTypeMap.layerOptions,
            keyFigureTypeMap.query,
            keyFigureTypeMap.color,
          );

          compGroupLayer.childLayers.push(keyFigureLayer);
          this.layersService.addLayers(keyFigureLayer);
        } else {
          const groupKeyFigureLayer: GroupKeyFigureLayer = {
            keyFigureId: keyFigureTypeMap.keyFigureId,
            layerOptions: keyFigureTypeMap.layerOptions,
            childLayers: [],
            visible: false,
          };

          for (const subLayer of keyFigureTypeMap.subLayers) {
            if (!subLayer.displayCondition || subLayer.displayCondition(analysisResult)) {
              const childLayerOptions: KeyFigureLayerOptions = subLayer.layerOptions || {};
              childLayerOptions.displayName = subLayer.layerOptions?.displayName || keyFigureTypeMap.layerOptions?.displayName;
              childLayerOptions.keyName = childLayerOptions.keyName || keyFigureTypeMap.layerOptions?.keyName;

              const keyFigureLayer = this.createLayer(
                keyFigureTypeMap,
                analysisResult,
                childLayerOptions,
                subLayer.query,
                subLayer.color,
                subLayer.invisibleAutoSelection,
              );

              groupKeyFigureLayer.childLayers.push(keyFigureLayer);
            }
          }

          compGroupLayer.childLayers.push(groupKeyFigureLayer);
          this.layersService.addLayers(groupKeyFigureLayer.childLayers);
        }
      }
    }
  }

  private createLayer(
    keyFigureTypeMap: KeyFigureTypeMap<GeoVisualQuery>,
    analysisResult: AnalysisResultDetailedSchema, 
    childLayerOptions?: KeyFigureLayerOptions,
    query?: GeoVisualQuery,
    color?: LayerColor,
    invisibleAutoSelection?: boolean,
  ): KeyFigureBaseLayer {
    const keyFigureLayer: KeyFigureBaseLayer = new keyFigureTypeMap.layerType(
      this.plant,
      analysisResult,
      keyFigureTypeMap.keyFigureId,
      childLayerOptions,
      query,
      color,
      invisibleAutoSelection,
    );

    keyFigureLayer.setColorScheme(this.layersService.settings.multiSelection ?
      KeyFigureColorScheme.RAINBOW : KeyFigureColorScheme.TRAFFIC_LIGHT);

    keyFigureLayer.setShowCouldNotBeMeasured(this.layersService.settings.showCouldNotBeMeasured);

    return keyFigureLayer;
  }

  private async updateLayers(): Promise<string[]> {
    const selectedLayerNames: string[] = [];

    for (const compGroupLayer of this.compGroupLayers) {
      for (const childLayer of compGroupLayer.childLayers) {
        if (childLayer instanceof KeyFigureLayer) {
          if (await this.updateLayer(childLayer)) {
            selectedLayerNames.push(childLayer.name);
          }
        } else {
          for (const subChildLayer of childLayer.childLayers) {
            if (await this.updateLayer(subChildLayer)) {
              selectedLayerNames.push(subChildLayer.name);
            }
          }

          childLayer.visible = !!childLayer.childLayers.find(l => l.visible);
        }
      }

      compGroupLayer.visible = !!compGroupLayer.childLayers.find(l => l.visible);
    }

    return selectedLayerNames;
  }

  private async updateLayer(layer: KeyFigureBaseLayer): Promise<boolean> {
    if (layer.isCompareEnabled) {
      const newCompareAnalysisResult = this.analysisSelectionService?.compareAnalysisResult || null;
      const oldCompareAnalysisResult = layer.compareAnalysisResult;
      
      layer.setCompareAnalysisResult(newCompareAnalysisResult);

      if (newCompareAnalysisResult != oldCompareAnalysisResult) {
        layer.reloadLayer();
      }
    }

    const analysisResult = this.analysisSelectionService?.firstAnalysisResult;
    const visible = analysisResult && layer.analysisResult.id === analysisResult.id &&
      (!layer.compareAnalysisResult || layer.hasKeyFigureForCompareAnalysisResult()) || false;
    layer.setVisible(visible);

    if (layer.selected) {
      if (!layer.isVisible) {
        await layer.setSelected(false);
      }

      return true;
    }

    return false;
  }

  
  private async selectLayers(layerNames: string[]) {
    if (layerNames.length === 0) {
      const collapsedGroups = this.compGroupLayers.filter(g => g.visible && g.collapsed);
      if (collapsedGroups.length === 0) {
        const firstVisibleGroup = this.compGroupLayers.find(g => g.visible);
        if (firstVisibleGroup) {
          firstVisibleGroup.collapsed = true;
        }
      }

      return;
    }

    for (const compGroupLayer of this.compGroupLayers) {
      for (const childLayer of compGroupLayer.childLayers) {
        if (childLayer instanceof KeyFigureLayer) {
          if (layerNames.includes(childLayer.name) && childLayer.isVisible) {
            await childLayer.setSelected(true);

            if (!compGroupLayer.collapsed) {
              compGroupLayer.collapsed = true;
            }

            if (!this.layersService.settings.multiSelection) {
              return;
            }
          }
        } else {
          let layerSelected = false;
          for (const subChildLayer of childLayer.childLayers) {
            if (layerNames.includes(subChildLayer.name) && subChildLayer.isVisible) {
              await subChildLayer.setSelected(true);

              layerSelected = true;

              if (!compGroupLayer.collapsed) {
                compGroupLayer.collapsed = true;
              }
            }
          }

          if (layerSelected && !this.layersService.settings.multiSelection) {
            return;
          }
        }
      }
    }
  }

  private setupCompGroupLayers() {
    for (const apiComponent in apiComponentNames) {
      this.compGroupLayers.push({
        componentId: Number(apiComponent),
        childLayers: [],
        visible: false,
        collapsed: false,
        name: this.$t(apiComponentNames[apiComponent]).toString(),
      });
    }
  }

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

// .app-map-view-key-figure-layer-selection {
//   height: 100%;
//   overflow-y: auto;
// }

</style>