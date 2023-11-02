import { Legend, PropsFeature } from "../types";
import { GeoJSON } from "@/app/shared/components/app-map/types";
import { FeatureLike } from "ol/Feature";
import { CCPDataType, CustomComponentPropertySchema, DataTypeOptionInfo, NumberRangeInfosSchema, ValueListInfosSchema } from "@/app/shared/services/volateq-api/api-schemas/custom-component-property-schema";
import { DateRange } from "../../observations/types";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ComponentLayer } from "./component-layer";
import { Style } from "ol/style";
import { CcpService } from "../../plant-settings/ccp-service";
import { KeyFigureBaseLayer, ObservationGeoJSON } from "./types";
import { BaseLayer } from "./base-layer";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisResultMappingEntry } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";

export class ObservationCcpLayer extends BaseLayer {
  private geoJSON: ObservationGeoJSON | undefined = undefined; 

  constructor(
    plant: PlantSchema,
    protected readonly mappingEntry: AnalysisResultMappingEntry,
    protected readonly dateRange: DateRange,
  ) {
    super(plant);

    this.zIndex = 50;
    this.invisibleAutoSelection = false;
  }

  public get id(): string {
    return [this.nameId, this.dateRange.from, this.dateRange.to].join("__");
  }

  public get name(): string {
    return this.mappingEntry.transName;
  }

  public get nameId(): string {
    return AnalysisResultMappingHelper.getEntryId(this.mappingEntry);
  }

  public getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  public async load(): Promise<GeoJSON<PropsFeature> | undefined> {
    // continue here
  }

  public getStyle(feature: FeatureLike): Style {
    const style = (this.componentLayer.style(feature) as Style[])[0];

    style.getStroke()?.setColor(this.color);
    style.getStroke()?.setWidth(5);
    style.getFill()?.setColor(this.color);

    return style;
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
}