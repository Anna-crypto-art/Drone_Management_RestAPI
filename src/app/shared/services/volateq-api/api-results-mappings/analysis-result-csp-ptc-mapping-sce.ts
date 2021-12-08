import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcSceSchema } from "../api-schemas/analysis-result-csp-ptc-sce-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingSce: AnalysisResultCspPtcMappings<AnalysisResultCspPtcSceSchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.absolute_orientation,
    transName: "actual-angle",
    transDescr: "actual-angle_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ORIENTATION_ID,
  },
  {
    getValue: r => r.orientation_offset,
    transName: "alignment-offset",
    transDescr: "sce-alignment-offset_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ORIENTATION_ID,
  },
  {
    getValue: r => r.orientation_uncertainty,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ORIENTATION_ID,
  },
  {
    getValue: r => r.sdx_rms_value,
    transName: "sdx-rms",
    transDescr: "sce-sdx-rms_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_SDX_ID,
  },
];

export default analysisResultCspPtcMappingSce;