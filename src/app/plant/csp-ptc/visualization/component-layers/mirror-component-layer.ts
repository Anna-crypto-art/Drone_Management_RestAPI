import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Fill, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/visualization/layers/types";

export class MirrorComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_MIRROR;
  protected readonly color = LayerColor.metallicBlue;
  protected readonly allowRefMeasures = true;
  protected readonly minZoomLevel = 19;
  public readonly name = "mirrors";

  protected showPcsZoomLevel = 22;
  protected zIndex = 5;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.getColor(feature),
      }),
      stroke: new Stroke({
        color: LayerColor.darkGrey,
        width: this.getWidth(),
      }),
      text: this.showText(feature),
    });
  }
}
