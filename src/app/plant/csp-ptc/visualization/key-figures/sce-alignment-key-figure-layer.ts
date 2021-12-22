import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-sce";
import { OrientationKeyFigureLayer } from "./shared/orientation-key-figure-layer";


export class SceAlignmentKeyFigureLayer extends OrientationKeyFigureLayer<AnalysisResultCspPtcSceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSce;

  protected showPcsZoomLevel = 18;

  protected getOrientationOffsetClassLimits() {
    return this.analysisResult.csp_ptc.sce_alignment_deviation_to_drive_class_limits;
  }
}