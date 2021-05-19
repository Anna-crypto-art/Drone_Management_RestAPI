import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcSceAngleSchema } from "../api-schemas/analysis-result-csp-ptc-sce-angle-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingSceAngle: AnalysisResultCspPtcMappings<AnalysisResultCspPtcSceAngleSchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.set_angle,
    transName: "set-angle",
  },
  {
    getValue: r => r.angle_value,
    transName: "angle-value",
    transDescr: "angle-value_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID
  },
  {
    getValue: r => r.actual_angle,
    transName: "actual-angle",
    transDescr: "actual-angle_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID,
  },
  {
    getValue: r => r.angle_deviation,
    transName: "angle-deviation",
    transDescr: "angle-deviation_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID,
  },
  {
    getValue: r => r.uncertainty,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID,
  },
  {
    getValue: r => r.deviation_to_drive,
    transName: "deviation-to-drive",
    transDescr: "deviation-to-drive_expl",
    keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID,
  },
];

export default analysisResultCspPtcMappingSceAngle;