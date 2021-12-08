import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcMirrorSchema } from "../api-schemas/analysis-result-csp-ptc-mirror-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingMirror: AnalysisResultCspPtcMappings<AnalysisResultCspPtcMirrorSchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.is_missing,
    transName: "is-missing-mirror",
    keyFigureId: AnalysisResultKeyFigure.MISSING_MIRROR_ID,
  },
];

export default analysisResultCspPtcMappingMirror;