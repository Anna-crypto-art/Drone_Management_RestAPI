import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Fill, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/visualization/layers/types";

export class SceComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_SCE;
  protected readonly color = LayerColor.middleLightGrey;
  protected readonly allowRefMeasures = true;
  public readonly name = "single-collector-elements";

  protected showPcsZoomLevel = 18;
  protected zIndex = 4;

  protected zoomWidths = {
    18: 2,
    18.5: 3,
    19: 5,
    19.5: 7,
    20: 12,
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.getColor(feature),
      }),
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth(),
      }),
      text: this.showText(feature, { rotation: -(Math.PI / 2.8) }),
    });
  }
}
