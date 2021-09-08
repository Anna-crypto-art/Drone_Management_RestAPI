import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { ComponentLayer } from "./shared/component-layer";
import { Style, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";

export class MirrorComponentLayer extends ComponentLayer {
  protected readonly componentId = AnalysisResultComponent.CSP_PTC_MIRROR;
  public readonly name = "mirrors";

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: '#c2cfff',
      }),
      text: this.showText(feature),
    });
  }
}