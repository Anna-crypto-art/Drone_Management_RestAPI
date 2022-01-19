import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { ComponentLayer } from "../../../shared/visualization/layers/component-layer";
import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";

export class LoopComponentLayer extends ComponentLayer {
  protected readonly componentId = AnalysisResultComponent.CSP_PTC_LOOP;
  public readonly name = "loop";

  protected showPcsZoomLevel = 16;
  protected zIndex = 2;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: "#888888",
        width: 1,
      }),
      text: this.showText(feature),
    });
  }
}
