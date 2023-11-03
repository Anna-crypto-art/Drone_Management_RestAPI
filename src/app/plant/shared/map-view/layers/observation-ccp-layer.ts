import { Legend, PropsFeature } from "../types";
import { GeoJSON } from "@/app/shared/components/app-map/types";
import { FeatureLike } from "ol/Feature";
import { CCPDataType, CustomComponentPropertySchema, DataTypeOptionInfo, NumberRangeInfosSchema, ValueListInfosSchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { DateRange } from "../../observations/types";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ComponentLayer } from "./component-layer";
import { CcpService } from "../../plant-settings/ccp-service";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { ObservationLayer } from "./observation-layer";

export class ObservationCcpLayer extends ObservationLayer {
  protected readonly dataTypeOptionInfo: DataTypeOptionInfo | undefined;

  constructor(
    plant: PlantSchema,
    componentLayer: ComponentLayer,
    dateRange: DateRange,
    filterValue: ObservFilterValue,
    public readonly ccp: CustomComponentPropertySchema,
  ) {
    super(plant, componentLayer, dateRange, filterValue);

    this.dataTypeOptionInfo = this.getDataTypeOptionInfo();
  }

  public get id(): string {
    return [this.ccp.id, this.dateRange.from, this.dateRange.to, this.filterValue].join("__");
  }

  public get name(): string {
    return this.dataTypeOptionInfo?.label || this.ccp.name;
  }

  public getDisplayName(): string {
    return this.name;
  }

  public get nameId(): string {
    return this.ccp.id + "__" + this.name;
  }

  public getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  public async load(): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      this.geoJSON = await volateqApi.getObservationsGeoVisualCcp(
        this.plant.id,
        this.ccp.id,
        this.dateRange.from,
        this.dateRange.to,
        this.filterValue
      );

      return this.geoJSON;
    } catch (e) {
      this.appLayerCheckbox?.showError(e);
    }

    return undefined;
  }

  protected get color(): string {
    return this.dataTypeOptionInfo?.color || this.ccp.color || CcpService.defaultColor;
  }

  public getLegend(): Legend | undefined {
    return {
      id: this.id!,
      entries: [{ name: this.name + " (" + (this.geoJSON?.features.length || 0) + ")", color: this.color }],
    };
  }

  private getDataTypeOptionInfo(): DataTypeOptionInfo | undefined {
    if (this.filterValue !== undefined && this.ccp.data_type_value_range?.infos) {
      if (this.ccp.data_type === CCPDataType.NUMBER_RANGE) {
        const infos = this.ccp.data_type_value_range.infos as NumberRangeInfosSchema;
        return infos[this.filterValue as number]?.info;
      }

      if (this.ccp.data_type === CCPDataType.VALUE_LIST) {
        const infos = this.ccp.data_type_value_range.infos as ValueListInfosSchema;
        if ((this.filterValue as string) in infos) {
          return infos[this.filterValue as string];
        }
      }
    }

    return undefined;
  }
}