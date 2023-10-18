<template>
  <app-map-view-layer-selection :value="visible" @input="onVisibilityChanged">
    <template #title>
      <b-icon icon="clipboard-data" /><span class="pad-left-half">{{ $t("observations") }}</span>
    </template>
    <div class="app-map-view-observ-layer-selection">
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
          <div v-if="childLayer.childLayers" class="app-map-view-observation-layer-selection-group">
            <div class="pad-bottom-half font-md" :class="{ 'pad-top': !isFirstVisibleGroup(compGroupLayer, index) }">
              <app-expl-wrap :expl="childLayer.ccp.description" placement="right">
                {{ $t(childLayer.ccp.name) }}
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
          <div v-if="!childLayer.childLayers" class="app-map-view-observation-layer-selection-single">
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
import { ComponentGroupKeyFigureLayer, ComponentGroupObservationLayer, ValueRangeGroupObservLayer } from "./types";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import AppMapViewLayerSelection from "./map-view-layer-selection.vue";
import AppMapViewLayerGroup from "./map-view-layer-group.vue";
import AppGeoJsonLayerCheckbox from "@/app/shared/components/app-map/app-geo-json-layer-checkbox.vue";
import { LayersService } from "../layers/layers-service";
import AppExplanation from "@/app/shared/components/app-explanation/app-explanation.vue";
import { IObservationSelectionComponent } from "../../selection-sidebar/observation-selection/types";
import { ObservationSelectionService } from "../../selection-sidebar/observation-selection/observation-selection-service";
import { ComponentLayer } from "../layers/component-layer";
import { ApiTechnology } from "@/app/shared/services/volateq-api/api-technologies";
import { COMPONENT_LAYERS as CSP_PTC_COMPONENT_LAYERS } from "@/app/plant/csp-ptc/visualization/layers";
import { COMPONENT_LAYERS as PV_COMPONENT_LAYERS } from "@/app/plant/pv/visualization/layers";
import { DateRange } from "../../observations/types";
import { CCPDataType, CustomComponentPropertySchema, NumberRangeInfosSchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import { ObservationCcpLayer } from "../layers/observation-ccp-layer";
import { CatchError } from "@/app/shared/services/helper/catch-helper";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";

@Component({
  name: "app-map-view-observ-layer-selection",
  components: {
    AppMapViewLayerSelection,
    AppMapViewLayerGroup,
    AppGeoJsonLayerCheckbox,
    AppExplanation,
    AppExplWrap,
  },
})
export default class AppMapViewObservLayerSelection extends BaseComponent implements IObservationSelectionComponent {
  @Prop({ required: true }) plant!: PlantSchema;
  @Prop({ required: true }) map!: Map;

  visible = false;
  compGroupLayers: ComponentGroupObservationLayer[] = [];
  
  observationSelectionService!: ObservationSelectionService;
  layersService!: LayersService;

  componentLayers!: ComponentLayer[];

  created() {
    this.observationSelectionService = new ObservationSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);

    this.componentLayers = this.getComponentLayerTypes().map(t => new (t as any)(this.plant));
  }

  async mounted() {
    this.observationSelectionService.register();
  }

  async unmounted() {
    this.observationSelectionService.unregister();
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

  get isSidebarOpen(): boolean { return this.$store.direct.state.sidebar.observations; }

  @Watch('isSidebarOpen')
  onSidebarOpenChanged() {
    const visible = !!this.observationSelectionService.hasSelectedObservations && this.isSidebarOpen;

    if (visible !== this.visible) {
      this.onVisibilityChanged(visible);
    }
  }

  @CatchError()
  onVisibilityChanged(visible: boolean) {
    this.visible = visible;
    this.$emit("openChanged", this.visible);
  }

  async onObservationSelected() {
    this.onSidebarOpenChanged();

    await this.refreshLayers(
      this.observationSelectionService.dateRange,
      this.observationSelectionService.selectedCcps
    );

    this.visible = this.observationSelectionService.hasSelectedObservations;
  }

  private getComponentLayerTypes(): (typeof ComponentLayer)[] {
    switch (this.plant.technology_id) {
      case ApiTechnology.CSP_PTC:
        return CSP_PTC_COMPONENT_LAYERS;

      case ApiTechnology.PV:
        return PV_COMPONENT_LAYERS;
    }

    throw Error("Unsupported technology id for getting component layer types")
  }

  public async refreshLayers(
    dateRange: DateRange | null, 
    ccps: CustomComponentPropertySchema[],
  ) {
    for (const apiComponent in apiComponentNames) {
      const comp: ApiComponent = Number(apiComponent);
      let selectedLayerNameIds: string[] = [];

      const componentGroupObservLayerIndex = this.compGroupLayers.findIndex(g => g.componentId === comp);      
      if (componentGroupObservLayerIndex >= 0) {
        selectedLayerNameIds = await this.unselectAndRemoveChildLayers(this.compGroupLayers[componentGroupObservLayerIndex]);

        this.compGroupLayers.splice(componentGroupObservLayerIndex, 1);
      } 

      const compCcps = ccps.filter(ccp => ccp.component.id === comp);
      if (compCcps.length > 0) {
        const componentGroupObservLayer: ComponentGroupObservationLayer = {
            componentId: comp,
            name: this.$t(apiComponentNames[comp]).toString(),
            childLayers: [],
            componentLayer: this.componentLayers.find(c => c.componentId === comp)!,
            collapsed: false,
            visible: true,
          };

        this.compGroupLayers.push(componentGroupObservLayer);

        const compCcps = ccps.filter(ccp => ccp.component.id === comp);
        for (const ccp of compCcps) {
          if (ccp.data_type === CCPDataType.NUMBER_RANGE || ccp.data_type === CCPDataType.VALUE_LIST) {
            const childLayer = this.createValueRangeGroupLayer(ccp, dateRange!);
            componentGroupObservLayer.childLayers.push(childLayer)

            this.selectLayers(childLayer.childLayers, selectedLayerNameIds);
          } else {
            let filterValue: ObservFilterValue = undefined;
            if (ccp.data_type === CCPDataType.BOOLEAN) {
              filterValue = true
            }

            const childLayer = this.createObservCcpLayer(ccp, dateRange!, filterValue);
            componentGroupObservLayer.childLayers.unshift(childLayer);

            this.selectLayers([childLayer], selectedLayerNameIds);
          }
        }
      }
    }
  }

  private createObservCcpLayer(
    ccp: CustomComponentPropertySchema,
    dateRange: DateRange,
    observFilterValue?: ObservFilterValue,
  ): ObservationCcpLayer {
    const layer = new ObservationCcpLayer(
      this.plant,
      ccp,
      this.componentLayers.find(cl => cl.componentId === ccp.component.id)!,
      dateRange,
      observFilterValue,
    );

    this.layersService.addLayers(layer);

    return layer;
  }

  private createValueRangeGroupLayer(
    ccp: CustomComponentPropertySchema,
    dateRange: DateRange,
  ): ValueRangeGroupObservLayer {
    return {
      ccp,
      childLayers: this.createValueRangeLayers(ccp, dateRange),
      visible: true,
    };
  }

  private createValueRangeLayers(ccp: CustomComponentPropertySchema, dateRange: DateRange): ObservationCcpLayer[] {
    if (ccp.data_type === CCPDataType.NUMBER_RANGE) {
      return (ccp.data_type_value_range.infos as NumberRangeInfosSchema)
        .map((info, index) => this.createObservCcpLayer(ccp, dateRange, index));
    }

    if (ccp.data_type === CCPDataType.VALUE_LIST) {
      return (ccp.data_type_value_range.options as string[]).map(option => this.createObservCcpLayer(ccp, dateRange, option));
    }

    throw new Error("Cannot create value range layer for data type " + ccp.data_type);
  }

  private async unselectAndRemoveChildLayers(componentGroupObservLayer: ComponentGroupObservationLayer): Promise<string[]> {
    const unselectedLayerNameIds: string[] = [];

    for (const childLayer of componentGroupObservLayer.childLayers) {
      if (childLayer instanceof ObservationCcpLayer) {
        if (childLayer.selected) {
          unselectedLayerNameIds.push(await this.unselectAndRemoveLayer(childLayer));
        }
      } else {
        for (const grandChildLayer of childLayer.childLayers) {
          if (grandChildLayer.selected) {
            unselectedLayerNameIds.push(await this.unselectAndRemoveLayer(grandChildLayer));
          }
        }
      }
    }

    return unselectedLayerNameIds;
  }

  private async unselectAndRemoveLayer(layer: ObservationCcpLayer): Promise<string> {
    layer.reloadLayer(); // removes the layer from operlayers map
    await layer.setSelected(false);
    
    this.layersService.removeLayer(layer.id);
    
    return layer.nameId;
  }

  private selectLayers(layers: ObservationCcpLayer[], selectedLayerNameIds: string[]) {
    if (selectedLayerNameIds.length > 0) {
      for (const layer of layers) {
        if (selectedLayerNameIds.includes(layer.nameId)) {
          layer.selectSilent();
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-observ-layer-selection {
    @media(max-width: 1000px) {
      left: -250px;
      height: calc(100vh - $header-height - $tab-height)
    }
}

</style>