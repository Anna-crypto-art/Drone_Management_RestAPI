import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcSwivelSchema, AnalysisResultCspPtcSwivelComparedSchema } from "../../api-schemas/analysis-result-csp-ptc-swivel-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingSwivel: AnalysisResultMappings<
  AnalysisResultCspPtcSwivelSchema, AnalysisResultCspPtcSwivelComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.has_friction_potential,
    transName: "has-friction-potential",
    keyFigureId: ApiKeyFigure.SWIVEL_FRICTION_POTENTIAL_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.has_friction_potential__diff,
  },
];

export default analysisResultCspPtcMappingSwivel;
