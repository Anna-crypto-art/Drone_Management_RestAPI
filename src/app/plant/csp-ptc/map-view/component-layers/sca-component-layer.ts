import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "@/app/plant/shared/map-view/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/map-view/layers/types";

export class ScaComponentLayer extends ComponentLayer {
  public readonly componentId = ApiComponent.CSP_PTC_SCA;
  protected readonly color = LayerColor.darkGrey;
  public readonly allowRefMeasures = true;

  public selected = true;
  protected showPcsZoomLevel = 16.5;
  public zIndex = 3;

  protected zoomWidths = {
    18: 2,
    18.5: 3,
    19: 5,
    19.5: 7,
    20: 12,
  }

  public readonly name = "solar-collector-assembly";
  public readonly autoZoom = true;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth(),
      }),
      text: this.showText(feature),
    });
  }
}
