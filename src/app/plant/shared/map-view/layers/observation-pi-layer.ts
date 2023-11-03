import { Legend, PropsFeature } from "../types";
import { GeoJSON } from "@/app/shared/components/app-map/types";
import { FeatureLike } from "ol/Feature";
import { DateRange } from "../../observations/types";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import volateqApi from "@/app/shared/services/volateq-api/volateq-api";
import { ComponentLayer } from "./component-layer";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { PI } from "@/app/shared/services/volateq-api/api-results-mappings/types";
import { AnalysisResultMappingHelper } from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-mapping-helper";
import { keyFigureRainbowColors } from "./key-figure-colors";
import { ObservationLayer } from "./observation-layer";

export class ObservationPiLayer extends ObservationLayer {
  constructor(
    plant: PlantSchema,
    componentLayer: ComponentLayer,
    dateRange: DateRange,
    filterValue: ObservFilterValue,
    public readonly pi: PI,
  ) {
    super(plant, componentLayer, dateRange, filterValue);
  }

  public get id(): string {
    return [this.nameId, this.dateRange.from, this.dateRange.to].join("__");
  }

  public get name(): string {
    return this.pi.transName;
  }

  public get nameId(): string {
    return AnalysisResultMappingHelper.getEntryId(this.pi);
  }

  public getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  public async load(): Promise<GeoJSON<PropsFeature> | undefined> {
    try {
      this.geoJSON = await volateqApi.getObservationsGeoVisualPi(
        this.plant.id,
        this.pi.keyFigureId!,
        this.pi.piFieldName,
        this.dateRange.from,
        this.dateRange.to,
        this.filterValue,
      );

      return this.geoJSON;
    } catch (e) {
      this.appLayerCheckbox?.showError(e);
    }

    return undefined;
  }

  protected get color(): string {
    return keyFigureRainbowColors[this.pi.keyFigureId!];
  }

  public getLegend(): Legend | undefined {
    return {
      id: this.id!,
      entries: [{ name: this.getDisplayName() + " (" + (this.geoJSON?.features.length || 0) + ")", color: this.color }],
    };
  }
}