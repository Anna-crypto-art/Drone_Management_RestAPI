import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { ComponentLayer } from "./shared/component-layer";
import { Style, Fill, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";

export class SceComponentLayer extends ComponentLayer {
  protected readonly componentId = AnalysisResultComponent.CSP_PTC_SCE;
  public readonly name = "single-collector-elements";

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: '#aaaaaa',
      }),
      stroke: new Stroke({
        color: '#888888',
        width: 1,
      }),
      text: this.showText(feature),
    });
  }
}