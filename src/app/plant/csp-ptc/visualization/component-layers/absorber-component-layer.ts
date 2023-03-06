import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/visualization/layers/types";

export class AbsorberComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_ABSORBER;
  protected readonly color = LayerColor.black;
  protected readonly allowRefMeasures = true;
  public readonly name = "absorber-tubes";
  protected readonly width = 3;

  protected showPcsZoomLevel = 19.5;
  protected zIndex = 5;

  protected zoomWidths = {
    17.5: 5,
    18: 10,
    18.5: 15,
    19: 20,
    19.5: 25,
    20: 30,
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(feature),
        width: this.getWidth(),
      }),
      text: this.showText(feature, { rotation: -(Math.PI / 2.8) }),
    });
  }
}
