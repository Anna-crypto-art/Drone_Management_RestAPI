<template>
  <app-map-view-layer-selection :value="selectionSidebarOpen" @input="onSelectionSidebarOpenChanged">
    <template #title>
      <span v-html="$t('observations-of', { date: selectedDate })" />
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
                {{ childLayer.ccp.name }}
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
import { COMPONENT_LAYERS as CSP_PTC_COMPONENT_LAYERS } from "@/app/plant/csp-ptc/map-view/layers";
import { COMPONENT_LAYERS as PV_COMPONENT_LAYERS } from "@/app/plant/pv/map-view/layers";
import { DateRange } from "../../observations/types";
import { CCPDataType, CustomComponentPropertySchema, NumberRangeInfosSchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import { ObservationCcpLayer } from "../layers/observation-ccp-layer";
import AppExplWrap from "@/app/shared/components/app-explanation/app-expl-wrap.vue";
import { State } from "vuex-class";
import { RouteQueryHelper } from "../../helper/route-query-helper";
import { PlantRouteQuery } from "../../types";
import { AnalysisResultMappingEntry, PI, PIDataType } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { ObservationPiLayer } from "../layers/observation-pi-layer";
import { ObservationLayer } from "../layers/observation-layer";

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
  @State(state => state.sidebar["observationsSelection"]) selectionSidebarOpen!: boolean;

  get tabBarHeight(): number { return (this.$store.direct.state.sidebar.tabBarHeight || 0) * -1; }

  compGroupLayers: ComponentGroupObservationLayer[] = [];
  
  observationSelectionService: ObservationSelectionService | null = null;
  layersService!: LayersService;

  componentLayers!: ComponentLayer[];

  private routeQueryHelper = new RouteQueryHelper(this);

  created() {
    this.observationSelectionService = new ObservationSelectionService(this);
    this.layersService = LayersService.get(this.plant.id);

    this.componentLayers = this.getComponentLayerTypes().map(t => new (t as any)(this.plant));

    this.routeQueryHelper.queryChanged(async () => { await this.loadLayersFromUrlQuery(); });
  }

  async mounted() {
    await this.observationSelectionService?.register();
  }

  async unmounted() {
    this.observationSelectionService?.unregister();
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

  get selectedDate(): string {
    return this.observationSelectionService?.date || "";
  }

  @Watch('isSidebarOpen')
  onSidebarOpenChanged() {
    const isOpen = !!this.observationSelectionService?.hasSelectedObservations && this.isSidebarOpen;

    this.$store.direct.commit.sidebar.set({ name: "observationsSelection", state: isOpen });
  }

  onSelectionSidebarOpenChanged(open: boolean) {
    this.$store.direct.commit.sidebar.set({ name: "observationsSelection", state: open });
  }

  async onObservationSelected(selectedByQueryRoute?: boolean) {
    this.onSidebarOpenChanged();

    await this.refreshLayers(
      this.observationSelectionService!.dateRange,
      this.observationSelectionService!.selectedCcps,
      this.observationSelectionService!.selectedPIs,
    );

    if (selectedByQueryRoute) {
      await this.loadLayersFromUrlQuery();
    }

    this.$store.direct.commit.sidebar.set({ 
      name: "observationsSelection", 
      state: this.observationSelectionService!.hasSelectedObservations && 
        (!selectedByQueryRoute || this.$route.query.sidebar === "observations")
    });
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
    pis: PI[],
  ) {
    for (const apiComponent in apiComponentNames) {
      const comp: ApiComponent = Number(apiComponent);
      let selectedLayerNameIds: string[] = [];

      const componentGroupObservLayerIndex = this.compGroupLayers.findIndex(g => g.componentId === comp);      
      if (componentGroupObservLayerIndex >= 0) {
        selectedLayerNameIds = await this.unselectAndRemoveChildLayers(this.compGroupLayers[componentGroupObservLayerIndex]);

        this.compGroupLayers.splice(componentGroupObservLayerIndex, 1);

        await this.$nextTick(); // waiting for VUE removing elements from DOM
      }

      const compCcps = ccps.filter(ccp => ccp.component.id === comp);
      const compPis = pis.filter(pi => pi.componentId === comp);
      if (compCcps.length > 0 || compPis.length > 0) {
        const componentGroupObservLayer: ComponentGroupObservationLayer = {
            componentId: comp,
            name: this.$t(apiComponentNames[comp]).toString(),
            childLayers: [],
            componentLayer: this.componentLayers.find(c => c.componentId === comp)!,
            collapsed: false,
            visible: true,
          };

        this.compGroupLayers.push(componentGroupObservLayer);

        let hasSelectedChildLayers = false;

        for (const ccp of compCcps) {
          let layersSelected = false;

          if (ccp.data_type === CCPDataType.NUMBER_RANGE || ccp.data_type === CCPDataType.VALUE_LIST) {
            const childLayer = this.createValueRangeGroupLayer(ccp, dateRange!);
            componentGroupObservLayer.childLayers.push(childLayer)

            layersSelected = this.selectLayers(childLayer.childLayers, selectedLayerNameIds);
          } else {
            let filterValue: ObservFilterValue = undefined;
            if (ccp.data_type === CCPDataType.BOOLEAN) {
              filterValue = true
            }

            const childLayer = this.createObservCcpLayer(ccp, dateRange!, filterValue);
            componentGroupObservLayer.childLayers.unshift(childLayer);

            layersSelected = this.selectLayers([childLayer], selectedLayerNameIds);
          }

          hasSelectedChildLayers = !hasSelectedChildLayers && layersSelected || hasSelectedChildLayers;
        }

        for (const pi of compPis) {
          let layersSelected = false;

          let filterValue: ObservFilterValue = pi.dataType === PIDataType.BOOLEAN ? true : undefined;
          const childLayer = this.createObservPiLayer(pi, dateRange!, filterValue);

          componentGroupObservLayer.childLayers.push(childLayer);

          layersSelected = this.selectLayers([childLayer], selectedLayerNameIds);
          hasSelectedChildLayers = !hasSelectedChildLayers && layersSelected || hasSelectedChildLayers;
        }

        componentGroupObservLayer.collapsed = hasSelectedChildLayers;
      }
    }

    if (this.compGroupLayers.length > 0 && !this.compGroupLayers.find(g => g.collapsed)) {
      this.compGroupLayers[0].collapsed = true;
    }
  }

  private createObservCcpLayer(
    ccp: CustomComponentPropertySchema,
    dateRange: DateRange,
    observFilterValue?: ObservFilterValue,
  ): ObservationCcpLayer {
    const layer = new ObservationCcpLayer(
      this.plant,
      this.componentLayers.find(cl => cl.componentId === ccp.component.id)!,
      dateRange,
      observFilterValue,
      ccp,
    );

    this.layersService.addLayers(layer);

    return layer;
  }

  private createObservPiLayer(
    pi: PI,
    dateRange: DateRange,
    observFilterValue?: ObservFilterValue,
  ): ObservationPiLayer {
    const layer = new ObservationPiLayer(
      this.plant,
      this.componentLayers.find(cl => cl.componentId === pi.componentId)!,
      dateRange,
      observFilterValue,
      pi,
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
      if (childLayer instanceof ObservationLayer) {
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

  private async unselectAndRemoveLayer(layer: ObservationLayer): Promise<string> {
    layer.reloadLayer(); // removes the layer from operlayers map
    await layer.setSelected(false);
    
    this.layersService.removeLayer(layer.id);
    
    return layer.nameId;
  }

  private selectLayers(layers: ObservationLayer[], selectedLayerNameIds: string[]): boolean {
    let selected = false;

    if (selectedLayerNameIds.length > 0) {
      for (const layer of layers) {
        if (selectedLayerNameIds.includes(layer.nameId)) {
          layer.selectSilent();

          selected = true;
        }
      }
    }

    return selected;
  }

  private async loadLayersFromUrlQuery(): Promise<void> {
    const plantRouteQuery: PlantRouteQuery = this.$route.query;
    if (plantRouteQuery.ccpId) {
      const ccpIds = typeof plantRouteQuery.ccpId === "string" ? [plantRouteQuery.ccpId] : plantRouteQuery.ccpId;
      for (const ccpId of ccpIds) {
        const ccpIdAndFilterValue = ccpId.split("__");
        const ci = ccpIdAndFilterValue[0]
        const fv = ccpIdAndFilterValue.length > 1 ? ccpIdAndFilterValue[1] : null;
        const layer = this.layersService.observationLayers
          .find(l => l instanceof ObservationCcpLayer && l.ccp.id === ci && (fv === null || l.filterValue?.toString() === fv));
        if (layer) {
          await layer.setSelected(true);
        }
      }
    }

    if (plantRouteQuery.piId) {
      const piIds = typeof plantRouteQuery.piId === "string" ? [plantRouteQuery.piId] : plantRouteQuery.piId;
      for (const piId of piIds) {
        const layer = this.layersService.observationLayers
          .find(l => l instanceof ObservationPiLayer && l.pi.id === piId);
        if (layer) {
          await layer.setSelected(true);
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_colors.scss";
@import "@/scss/_variables.scss";

.app-map-view-layer-selection {
  top: 0;
  height: 100%;
}

.app-map-view-observ-layer-selection {
    @media(max-width: 1000px) {
      left: -250px;
      height: calc(100% - $header-height - $tab-height)
    }
}

</style>