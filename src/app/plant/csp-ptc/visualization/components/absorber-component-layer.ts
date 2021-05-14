import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { ComponentLayer } from "./shared/component-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";

export class AbsorberComponentLayer extends ComponentLayer {
  protected readonly componentId = AnalysisResultComponent.CSP_PTC_ABSORBER;
  public readonly name = "absorber-tubes";

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: '#000000',
        width: 1,
      }),
      text: this.showText(feature),
    });
  }
}