import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { LayerColor } from "@/app/plant/shared/visualization/layers/types";

export class LoopComponentLayer extends ComponentLayer {
  protected readonly componentId = ApiComponent.CSP_PTC_LOOP;
  protected readonly color = LayerColor.darkGrey;
  public readonly name = "loop";

  protected showPcsZoomLevel = 16;
  protected zIndex = 2;

  public getStyle(feature: FeatureLike): Style {
    const props = feature.getProperties();
    
    let width = this.getWidth();
    let color = this.getColor(feature);

    if ("value" in props) {
      width = 2;
      if (props["value"] === "inlet") {
        color = LayerColor.blue
      } else if (props["value"] === "outlet") {
        color = LayerColor.red;;
      }
    }

    return new Style({
      stroke: new Stroke({ color, width }),
      text: this.showText(feature),
    });
  }
}
