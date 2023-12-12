import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcMirrorComparedSchema, AnalysisResultCspPtcMirrorSchema } from "../../api-schemas/analysis-result-csp-ptc-mirror-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings, PIDataType } from "../types";

const analysisResultCspPtcMappingMirror: AnalysisResultMappings<
  AnalysisResultCspPtcMirrorSchema, AnalysisResultCspPtcMirrorComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.is_missing,
    transName: "missing-mirror",
    keyFigureId: ApiKeyFigure.MISSING_MIRROR_ID,
    enableForFilter: true,
    dataType: PIDataType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.is_missing__diff,
    enableForObservation: true,
  },
];

export default analysisResultCspPtcMappingMirror;
