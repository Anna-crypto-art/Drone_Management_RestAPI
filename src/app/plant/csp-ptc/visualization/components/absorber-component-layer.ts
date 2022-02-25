import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";

export class AbsorberComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_ABSORBER;
  public readonly name = "absorber-tubes";

  protected showPcsZoomLevel = 19.5;
  protected zIndex = 5;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: "#000000",
        width: 1,
      }),
      text: this.showText(feature, { rotation: -(Math.PI / 2.8) }),
    });
  }
}
