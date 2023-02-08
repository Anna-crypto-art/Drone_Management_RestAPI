import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingSwivel from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-swivel";
import { AnalysisResultCspPtcSwivelSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-swivel-schema";
import { FeatureLike } from "ol/Feature";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";

export class SwivelKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcSwivelSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSwivel;

  protected showPcsZoomLevel = 19;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      image: new Circle({
        radius: 3,
        fill: new Fill({ 
          color: this.enableCompare && this.compareAnalysisResult && this.getDiffColor(this.getProperties(feature)) || this.getColor() }),
        stroke: new Stroke({
          color: KeyFigureColors.black,
          width: 1,
        }),
      }),
      text: this.showText(feature),
    });
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.getColor();
  }

  protected getColor(): string {
    return this.color!;
  }
}
