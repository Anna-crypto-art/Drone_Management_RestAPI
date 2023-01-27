import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";

export class SwivelComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_SWIVEL;
  public readonly name = "swivels";

  protected showPcsZoomLevel = 19;
  protected zIndex = 5;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: KeyFigureColors.black,
        width: 2,
      }),
      text: this.showText(feature),
    });
  }
}
