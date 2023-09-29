<template>
  <app-map-view-layer-selection :visible="visible">
    <template #title>
      <b-icon icon="speedometer2" /><span class="pad-left">{{ $t("performance-indicators") }}</span>
    </template>
    <div class="app-map-view-key-figure-layer-selection" v-show="visible">
      <app-map-view-layer-group v-for="compGroupLayer in compGroupLayers" :key="compGroupLayer.componentId"
        v-model="compGroupLayer.collapsed" 
        v-show="compGroupLayer.visible"
      >
        <div v-for="(childLayer, index) in compGroupLayer.childLayers" :key="childLayer.id || index">
          <div v-if="childLayer.childLayers" class="app-map-view-key-figure-layer-selection-group">
            <h5>{{ $t(childLayer.layerOptions.displayName || childLayer.layerOptions.keyName) }}</h5>
            <app-geo-json-layer-checkbox v-for="subChildLayer in childLayer.childLayers" :key="subChildLayer.id"
              :geoLayer="subChildLayer"
              :map="map"
            />
          </div>
          <div v-if="!childLayer.childLayers" class="app-map-view-key-figure-layer-selection-single">
            <app-geo-json-layer-checkbox :geoLayer="childLayer" :map="map" />
          </div>
        </div>
      </app-map-view-layer-group>
    </div>
  </app-map-view-layer-selection>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/app/shared/components/base-component/base-component";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { Map } from "ol";
import { KeyFigureLayerOptions, KeyFigureTypeMap } from "../layers/types";
import { GeoVisualQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { ComponentGroupKeyFigureLayer, GroupKeyFigureLayer } from "./types";
import { IAnalysisSelectionComponent } from "../../selection-sidebar/analysis-selection/types";
import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { AnalysisSelectionService } from "../../selection-sidebar/analysis-selection/analysis-selection-service";
import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { KeyFigureLayer } from "../layers/key-figure-layer";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import AppMapViewLayerSelection from "./app-map-view-layer-selection.vue";
import AppMapViewLayerGroup from "./app-map-view-layer-group.vue";
import AppGeoJsonLayerCheckbox from "@/app/shared/components/app-map/app-geo-json-layer-checkbox.vue";

@Component({
  name: "app-map-view-key-figure-layer-selection",
  components: {
    AppMapViewLayerSelection,
    AppMapViewLayerGroup,
    AppGeoJsonLayerCheckbox,
  },
})
export default class AppMapViewKeyFigureLayerSelection extends BaseComponent implements IAnalysisSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) map!: Map;
  @Prop({ required: true }) analyses!: AnalysisForViewSchema[];
  @Prop({ required: true }) keyFigureLayers!: KeyFigureTypeMap<GeoVisualQuery>[];
  @Prop({ default: false }) multiSelection!: boolean;

  visible = false;
  compGroupLayers: ComponentGroupKeyFigureLayer[] = [];
  
  analysisSelectionService: AnalysisSelectionService | null = null;
  private selectedAnalyses: Record<string, AnalysisForViewSchema> = {};

  created() {
    this.analysisSelectionService = new AnalysisSelectionService(this);

    this.setupCompGroupLayers();
  }

  async mounted() {
    await this.analysisSelectionService?.register();
  }

  async unmounted() {
    await this.analysisSelectionService?.unregister();
  }

  async onAnalysisSelected() {
    this.visible = true;

    const selectedAnalysisId = this.analysisSelectionService?.firstAnalysis?.id;
    if (selectedAnalysisId && !(selectedAnalysisId in this.selectedAnalyses)) {
      this.selectedAnalyses[selectedAnalysisId] = this.analysisSelectionService!.firstAnalysis!;
      this.addLayersForAnalysis();
    }

    const selectedLayerNames = await this.updateLayers();
    
    await this.selectLayers(selectedLayerNames);
  }

  async onMultiAnalysesSelected() {
    this.visible = true;

    const selectedAnalysisId = this.analysisSelectionService?.firstAnalysis?.id;
    if (selectedAnalysisId && !(selectedAnalysisId in this.selectedAnalyses)) {
      this.selectedAnalyses[selectedAnalysisId] = this.analysisSelectionService!.firstAnalysis!;
      this.addLayersForAnalysis();
    }

    const selectedLayerNames = await this.updateLayers();
    
    await this.selectLayers(selectedLayerNames);
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
          const keyFigureLayer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery> = new keyFigureTypeMap.layerType(
            this.plant,
            analysisResult,
            keyFigureTypeMap.keyFigureId,
            keyFigureTypeMap.layerOptions,
            keyFigureTypeMap.query,
            keyFigureTypeMap.color,
          );

          compGroupLayer.childLayers.push(keyFigureLayer);
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

              const keyFigureLayer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery> = new keyFigureTypeMap.layerType(
                this.plant,
                analysisResult,
                keyFigureTypeMap.keyFigureId,
                childLayerOptions,
                subLayer.query,
                subLayer.color,
                subLayer.invisibleAutoSelection,
              );

              groupKeyFigureLayer.childLayers.push(keyFigureLayer);
            }
          }

          compGroupLayer.childLayers.push(groupKeyFigureLayer);
        }
      }
    }
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

  private async updateLayer(layer: KeyFigureLayer<AnalysisResultSchemaBase, GeoVisualQuery>): Promise<boolean> {
    if (layer.isCompareEnabled) {
      const newCompareAnalysisResult = this.analysisSelectionService?.compareAnalysisResult || null;
      const oldCompareAnalysisResult = layer.compareAnalysisResult;
      
      layer.setCompareAnalysisResult(newCompareAnalysisResult);

      if (newCompareAnalysisResult != oldCompareAnalysisResult) {
        layer.reloadLayer();
      }
    }

    const analysisResult = this.analysisSelectionService?.firstAnalysisResult;
    if (analysisResult) {
      const visible = layer.analysisResult.id === analysisResult.id && (!layer.compareAnalysisResult || layer.hasKeyFigureForCompareAnalysisResult());
      layer.setVisible(visible);
    }

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

            if (!this.multiSelection) {
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

          if (layerSelected && !this.multiSelection) {
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
      });
    }
  }

}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

</style>