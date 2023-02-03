import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke, Circle, Fill } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";

export class SwivelComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_SWIVEL;
  public readonly name = "rotation-joints";

  protected showPcsZoomLevel = 19;
  protected zIndex = 5;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      image: new Circle({
        radius: 3,
        fill: new Fill({ color: '#888888' }),
        stroke: new Stroke({
          color: KeyFigureColors.black,
          width: 1,
        }),
      }),
      text: this.showText(feature),
    });
  }
}
