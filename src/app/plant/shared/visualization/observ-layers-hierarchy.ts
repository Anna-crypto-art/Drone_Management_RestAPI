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

      const componentGroupObservLayerIndex = this.layersHierarchy.findIndex(g => g.componentId === comp);
      if (componentGroupObservLayerIndex >= 0) {
        await this.removeChildLayers(this.layersHierarchy[componentGroupObservLayerIndex]);

        this.layersHierarchy.splice(componentGroupObservLayerIndex, 1);
        this.groupLayers.splice(componentGroupObservLayerIndex, 1);
      } 

      const compCcps = ccps.filter(ccp => ccp.component.id === comp);
      if (compCcps.length > 0) {
        const componentGroupObservLayer = {
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
            componentGroupObservLayer.groupLayer.childLayers.push(childLayer.groupLayer);
          } else {
            let filterValue: ObservFilterValue = undefined;
            if (ccp.data_type === CCPDataType.BOOLEAN) {
              filterValue = true
            }

            const childLayer = this.createObservCcpLayer(ccp, dateRange!, filterValue);
            componentGroupObservLayer.groupLayer.childLayers.push(childLayer.toGeoLayer())
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

  private createValueRangeGroupLayer(ccp: CustomComponentPropertySchema, dateRange: DateRange): ValueRangeGroupObservLayer {
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

  private async removeChildLayers(componentGroupObservLayer: ComponentGroupObservLayer) {
    for (const childLayer of componentGroupObservLayer.childLayers) {
      if (childLayer instanceof ObservationCcpLayer) {
        if (childLayer.getSelected()) {
          await childLayer.setSelected(false);
        }

        // childLayer.setVisible(false);
      } else {
        for (const grandChildLayer of childLayer.childLayers) {
          if (grandChildLayer.getSelected()) {
            await grandChildLayer.setSelected(false);
          }

          // grandChildLayer.setVisible(false);
        }

        // childLayer.groupLayer.visible = false;
        // childLayer.groupLayer.childLayers.length = 0;
        // childLayer.childLayers.length = 0;
      }
    }

    // componentGroupObservLayer.groupLayer.childLayers.length = 0;
    // componentGroupObservLayer.childLayers.length = 0;
    // componentGroupObservLayer.groupLayer.visible = false;
  }

  private getComponentLayerTypes(): (typeof ComponentLayer)[] {
    switch (this.vueComponent.plant.technology_id) {
      case ApiTechnology.CSP_PTC:
        return CSP_PTC_COMPONENT_LAYERS;

      case ApiTechnology.PV:
        return PV_COMPONENT_LAYERS;
    }

    throw Error("Unsupported technology id for getting component layer types")
  }
}