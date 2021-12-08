import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-sce";
import { OrientationKeyFigureLayer } from "./shared/orientation-key-figure-layer";


export class SceOrientationKeyFigureLayer extends OrientationKeyFigureLayer<AnalysisResultCspPtcSceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSce;

  protected showPcsZoomLevel = 18;

  protected getOrientationOffsetClassLimits() {
    return this.analysisResult.csp_ptc.sce_orientation_offset_class_limits;
  }
}