import { FeatureProperties, PropsFeature } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";

export abstract class HceKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;

  protected readonly strokeWidth = 5;
  protected showPcsZoomLevel = 19;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.enableCompare && this.compareAnalysisResult && this.getDiffColor(this.getProperties(feature))
          || this.getColor(),
        width: this.strokeWidth,
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
