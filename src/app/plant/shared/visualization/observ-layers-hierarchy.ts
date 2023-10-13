import { GroupLayer, LayerType } from "@/app/shared/components/app-geovisualization/types/layers";
import { ComponentGroupObservLayer, IPlantVisualization, ValueRangeGroupObservLayer } from "./types";
import { DateRange } from "../observations/types";
import { apiComponentNames } from "@/app/shared/services/volateq-api/api-components/api-components-name";
import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ObservationCcpLayer } from "./layers/observation-ccp-layer";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { CCPDataType, CustomComponentPropertySchema, NumberRangeInfosSchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { ComponentLayer } from "./layers/component-layer";
import { ApiTechnology } from "@/app/shared/services/volateq-api/api-technologies";
import { COMPONENT_LAYERS as CSP_PTC_COMPONENT_LAYERS } from "@/app/plant/csp-ptc/visualization/layers";
import { COMPONENT_LAYERS as PV_COMPONENT_LAYERS } from "@/app/plant/pv/visualization/layers";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import { BaseAuthComponent } from "@/app/shared/components/base-auth-component/base-auth-component";

export class ObservLayersHierarchy {
  public readonly groupLayers: LayerType[] = [];
  private readonly layersHierarchy: ComponentGroupObservLayer[] = [];
  private readonly componentLayers: ComponentLayer[];

  constructor(
    private readonly vueComponent: BaseAuthComponent & IPlantVisualization,
  ) {
    this.componentLayers = this.getComponentLayerTypes().map(t => new (t as any)(this.vueComponent));
  }

  public async refreshLayers(
    dateRange: DateRange | undefined, 
    ccps: CustomComponentPropertySchema[],
  ) {
    for (const apiComponent in apiComponentNames) {
      const comp: ApiComponent = Number(apiComponent);

      let selectedLayerNameIds: string[] = [];

      const componentGroupObservLayerIndex = this.layersHierarchy.findIndex(g => g.componentId === comp);      
      if (componentGroupObservLayerIndex >= 0) {
        selectedLayerNameIds = await this.unselectAndRemoveChildLayers(this.layersHierarchy[componentGroupObservLayerIndex]);

        this.layersHierarchy.splice(componentGroupObservLayerIndex, 1);
        this.groupLayers.splice(componentGroupObservLayerIndex, 1);
      } 

      const compCcps = ccps.filter(ccp => ccp.component.id === comp);
      if (compCcps.length > 0) {
        const componentGroupObservLayer: ComponentGroupObservLayer = {
            componentId: comp,
            groupLayer: this.createGroupLayer(comp),
            childLayers: [],
            componentLayer: this.componentLayers.find(c => c.componentId === comp)!,
          };

        this.layersHierarchy.push(componentGroupObservLayer);
        this.groupLayers.push(componentGroupObservLayer.groupLayer);

        const compCcps = ccps.filter(ccp => ccp.component.id === comp);
        for (const ccp of compCcps) {
          if (ccp.data_type === CCPDataType.NUMBER_RANGE || ccp.data_type === CCPDataType.VALUE_LIST) {
            const childLayer = this.createValueRangeGroupLayer(ccp, dateRange!);
            componentGroupObservLayer.childLayers.push(childLayer)
            componentGroupObservLayer.groupLayer.childLayers.push(childLayer.groupLayer);

            this.selectLayers(childLayer.childLayers, selectedLayerNameIds);
          } else {
            let filterValue: ObservFilterValue = undefined;
            if (ccp.data_type === CCPDataType.BOOLEAN) {
              filterValue = true
            }

            const childLayer = this.createObservCcpLayer(ccp, dateRange!, filterValue);
            componentGroupObservLayer.childLayers.push(childLayer)
            componentGroupObservLayer.groupLayer.childLayers.push(childLayer.toGeoLayer())

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
    return new ObservationCcpLayer(
      this.vueComponent, 
      ccp,
      this.componentLayers.find(cl => cl.componentId === ccp.component.id)!,
      dateRange,
      observFilterValue,
    )
  }

  private createValueRangeGroupLayer(
    ccp: CustomComponentPropertySchema,
    dateRange: DateRange,
  ): ValueRangeGroupObservLayer {
    const childLayers = this.createValueRangeLayers(ccp, dateRange);

    return {
      ccp,
      childLayers,
      groupLayer: {
        type: "group",
        name: ccp.name,
        description: ccp.description,
        singleSelection: false,
        visible: true,
        childLayers: childLayers.map(cl => cl.toGeoLayer()),
      },
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

  private createGroupLayer(apiComponent: ApiComponent): GroupLayer {
    return {
      name: this.vueComponent.$t(apiComponentNames[apiComponent]).toString(),
      type: "group",
      childLayers: [],
      visible: true,
      singleSelection: true,
      collapsable: true,
      events: new SequentialEventEmitter(), 
    };
  }

  private async unselectAndRemoveChildLayers(componentGroupObservLayer: ComponentGroupObservLayer): Promise<string[]> {
    const unselectedLayerNameIds: string[] = [];

    for (const childLayer of componentGroupObservLayer.childLayers) {
      if (childLayer instanceof ObservationCcpLayer) {
        if (childLayer.getSelected()) {
          unselectedLayerNameIds.push(await this.unselectAndRemoveLayer(childLayer));
        }
      } else {
        for (const grandChildLayer of childLayer.childLayers) {
          if (grandChildLayer.getSelected()) {
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

  private getComponentLayerTypes(): (typeof ComponentLayer)[] {
    switch (this.vueComponent.plant.technology_id) {
      case ApiTechnology.CSP_PTC:
        throw Error("Blub")
        // return CSP_PTC_COMPONENT_LAYERS;

      case ApiTechnology.PV:
        // return PV_COMPONENT_LAYERS;
        throw Error("Blub")
    }

    throw Error("Unsupported technology id for getting component layer types")
  }
}