import { AnalysisResultComponent } from "@/app/shared/services/volateq-api/api-analysis-result-components";
import { ComponentLayer } from "./shared/component-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";

export class ScaComponentLayer extends ComponentLayer {
  protected readonly componentId = AnalysisResultComponent.CSP_PTC_SCA;
  public readonly name = "solar-collector-assembly";
  public readonly selected = true;
  public readonly autoZoom = true;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: '#888888',
        width: 1,
      }),
      text: this.showText(feature),
    });
  }
}