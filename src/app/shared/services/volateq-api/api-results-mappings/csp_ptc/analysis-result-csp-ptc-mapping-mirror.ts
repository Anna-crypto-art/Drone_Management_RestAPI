import { AnalysisResultKeyFigure } from "../../api-analysis-result-key-figures";
import { AnalysisResultCspPtcMirrorSchema } from "../../api-schemas/analysis-result-csp-ptc-mirror-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingMirror: AnalysisResultMappings<AnalysisResultCspPtcMirrorSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.is_missing,
    transName: "is-missing-mirror",
    keyFigureId: AnalysisResultKeyFigure.MISSING_MIRROR_ID,
  },
];

export default analysisResultCspPtcMappingMirror;
