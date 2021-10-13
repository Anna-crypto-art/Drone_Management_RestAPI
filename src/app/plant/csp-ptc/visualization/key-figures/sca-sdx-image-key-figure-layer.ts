import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import analysisResultCspPtcMappingSca from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-sca";
import { AnalysisResultCspPtcScaSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sca-schema";
import { KeyFigureLayer } from "./shared/key-figure-layer";

export class ScaSdxImageKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcScaSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSca;

  public readonly name = "SDX-Images";

  
}