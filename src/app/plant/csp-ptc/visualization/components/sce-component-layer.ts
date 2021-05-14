import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { ComponentLayer } from "./shared/component-layer";
import { Style, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";

export class SceComponentLayer extends ComponentLayer {
  protected readonly componentId = AnalysisResultComponent.CSP_PTC_SCE;
  public readonly name = "single-collector-elements";

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: '#aaaaaa',
      }),
      text: this.showText(feature),
    });
  }
}