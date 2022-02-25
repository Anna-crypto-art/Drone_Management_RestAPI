import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";

export class LoopComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_LOOP;
  public readonly name = "loop";

  protected showPcsZoomLevel = 16;
  protected zIndex = 2;

  public getStyle(feature: FeatureLike): Style {
    const props = feature.getProperties();
    
    let width = 1;
    let color = "#888888";

    if ("value" in props) {
      width = 2;
      if (props["value"] === "inlet") {
        color = "#0000FF";
      } else if (props["value"] === "outlet") {
        color = "#FF0000";
      }
    }

    return new Style({
      stroke: new Stroke({ color, width }),
      text: this.showText(feature),
    });
  }
}
