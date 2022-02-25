import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Fill, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";

export class SceComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_SCE;
  public readonly name = "single-collector-elements";

  protected showPcsZoomLevel = 18;
  protected zIndex = 4;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: "#aaaaaa",
      }),
      stroke: new Stroke({
        color: "#888888",
        width: 1,
      }),
      text: this.showText(feature, { rotation: -(Math.PI / 2.8) }),
    });
  }
}
