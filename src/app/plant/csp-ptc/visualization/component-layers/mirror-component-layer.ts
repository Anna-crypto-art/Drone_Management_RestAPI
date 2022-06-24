import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Fill, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";

export class MirrorComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_MIRROR;
  public readonly name = "mirrors";

  protected showPcsZoomLevel = 22;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: "#c2cfff",
      }),
      stroke: new Stroke({
        color: "#888888",
        width: 1,
      }),
      text: this.showText(feature),
    });
  }
}
