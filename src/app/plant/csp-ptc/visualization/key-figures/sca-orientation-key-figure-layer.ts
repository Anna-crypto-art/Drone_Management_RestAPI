import { OrientationKeyFigureLayer } from "./shared/orientation-key-figure-layer";
import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import analysisResultCspPtcMappingSca from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sca";


export class ScaOrientationKeyFigureLayer extends OrientationKeyFigureLayer<AnalysisResultCspPtcScaSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSca;

  protected showPcsZoomLevel = 16;

  protected getOrientationOffsetClassLimits() {
    return this.analysisResult.csp_ptc.sca_orientation_offset_class_limits;
  }
}