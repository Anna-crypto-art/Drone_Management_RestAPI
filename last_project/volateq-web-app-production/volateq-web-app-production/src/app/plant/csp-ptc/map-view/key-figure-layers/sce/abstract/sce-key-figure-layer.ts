import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";

export abstract class SceKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcSceSchema> {
  public readonly analysisResultMapping = analysisResultCspPtcMappingSce;

  protected showPcsZoomLevel = 18;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.getColor(),
      }),
      text: this.showText(feature),
    });
  }

  protected abstract getColor(): string;
}
