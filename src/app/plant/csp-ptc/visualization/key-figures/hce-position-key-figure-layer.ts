import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { OffsetClassKeyFigureLayer } from "./shared/offset-class-key-figure-layer";

export class HcePositionKeyFigureLayer extends OffsetClassKeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected analysisResultMapping = analysisResultCspPtcMappingHce;

  protected getOffsetClassLimits(): number[] {
    return this.analysisResult.csp_ptc.hce_position_total_class_limits;
  }

  protected getQueryOffsetClass(): number | undefined {
    return this.query?.hce_position_offset_class;
  }
}
