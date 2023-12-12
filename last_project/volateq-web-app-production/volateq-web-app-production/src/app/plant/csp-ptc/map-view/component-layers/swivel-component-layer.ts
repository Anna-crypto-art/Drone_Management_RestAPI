import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "@/app/plant/shared/map-view/layers/component-layer";
import { Style, Stroke, Circle, Fill } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/map-view/layers/types";

export class SwivelComponentLayer extends ComponentLayer {
  public readonly componentId = ApiComponent.CSP_PTC_SWIVEL;
  protected readonly color = LayerColor.darkGrey;
  public readonly allowRefMeasures = true;
  public readonly name = "rotation-joints";

  protected showPcsZoomLevel = 19;
  public zIndex = 5;

  protected zoomWidths = {
    17.5: 2,
    18: 3,
    18.5: 4,
    19: 6,
    19.5: 8,
    20: 10,
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      image: new Circle({
        radius: this.getWidth() + 2,
        fill: new Fill({ color: this.getColor(feature) }),
        stroke: new Stroke({
          color: LayerColor.black,
          width: this.getWidth(),
        }),
      }),
      text: this.showText(feature),
    });
  }
}