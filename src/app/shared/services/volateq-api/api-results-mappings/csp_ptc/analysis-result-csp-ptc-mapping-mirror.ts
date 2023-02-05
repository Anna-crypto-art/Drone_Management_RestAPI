import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcMirrorComparedSchema, AnalysisResultCspPtcMirrorSchema } from "../../api-schemas/analysis-result-csp-ptc-mirror-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingMirror: AnalysisResultMappings<
  AnalysisResultCspPtcMirrorSchema, AnalysisResultCspPtcMirrorComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.is_missing,
    transName: "is-missing-mirror",
    keyFigureId: ApiKeyFigure.MISSING_MIRROR_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.is_missing__diff,
  },
];

export default analysisResultCspPtcMappingMirror;
