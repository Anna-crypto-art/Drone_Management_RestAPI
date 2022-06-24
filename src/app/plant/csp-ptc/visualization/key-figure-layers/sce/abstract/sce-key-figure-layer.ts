import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import analysisResultCspPtcMappingSca from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sca";
import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { Legend } from "@/app/plant/shared/visualization/types";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";

export abstract class SceKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcSceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSce;

  protected showPcsZoomLevel = 18;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.color,
      }),
      text: this.showText(feature),
    });
  }
}
