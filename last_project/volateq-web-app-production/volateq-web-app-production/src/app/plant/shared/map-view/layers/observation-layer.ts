import { FeatureLike } from "ol/Feature";
import { DateRange } from "../../observations/types";
import { ObservFilterValue } from "@/app/shared/services/volateq-api/api-requests/observation-requests";
import { ComponentLayer } from "./component-layer";
import { Style } from "ol/style";
import { ObservationGeoJSON } from "./types";
import { BaseLayer } from "./base-layer";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";

export abstract class ObservationLayer extends BaseLayer {
  protected geoJSON: ObservationGeoJSON | undefined = undefined; 

  constructor(
    plant: PlantSchema,
    protected readonly componentLayer: ComponentLayer,
    protected readonly dateRange: DateRange,
    public readonly filterValue: ObservFilterValue,
  ) {
    super(plant);

    this.zIndex = 50;
    this.invisibleAutoSelection = false;
  }

  public abstract get nameId(): string;
  protected abstract get color(): string;

  public getPcs(feature: FeatureLike): string | undefined {
    return feature.get("name");
  }

  public getStyle(feature: FeatureLike): Style {
    const style = (this.componentLayer.style(feature) as Style[])[0];

    style.getStroke()?.setColor(this.color);
    style.getStroke()?.setWidth(5);
    style.getFill()?.setColor(this.color);

    return style;
  }
}