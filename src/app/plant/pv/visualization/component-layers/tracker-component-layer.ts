import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { Style, Stroke, Fill } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { Geometry } from "ol/geom";
import { Feature } from "ol";
import { PvComponentLayer } from "./abstract/pv-component-layer";
import { LayerColor } from "@/app/plant/shared/map-view/layers/types";

export class TrackerComponentLayer extends PvComponentLayer {
  public readonly componentId = ApiComponent.PV_TRACKER;
  protected readonly color = LayerColor.darkGrey;
  public readonly allowRefMeasures = true;
  
  protected showPcsZoomLevel = 18.5;
  protected zIndex = 3;
  protected disabled = true;
  protected width = 1;

  public readonly name = "pv-tracker";
  public readonly selected = true;
  public readonly autoZoom = true;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth(),
      }),
      fill: new Fill({
        color: LayerColor.metallicBlue,
      }),
      text: this.showText(feature),
    });
  }
}
