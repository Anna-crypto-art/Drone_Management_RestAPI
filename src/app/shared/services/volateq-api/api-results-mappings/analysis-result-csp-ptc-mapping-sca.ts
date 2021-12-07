import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcScaSchema } from "../api-schemas/analysis-result-csp-ptc-sca-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingSca: AnalysisResultCspPtcMappings<AnalysisResultCspPtcScaSchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.encoder_value,
    transName: "angle-value",
    transDescr: "angle-value_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
  },
  {
    getValue: r => r.orientation_at_drive,
    transName: "orientation-at-drive",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
  },
  {
    getValue: r => r.uncertainty_at_drive,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
  },
  {
    getValue: r => r.orientation_at_drive_offset,
    transName: "avg-orientation-offset",
    transDescr: "avg-orientation-offset_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
  },
  {
    getValue: r => r.torsion_caused_friction_mean,
    transName: "torsion-caused-friction-mean",
    transDescr: "torsion-caused-friction-mean_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_FRICTION_ID,
  },
  {
    getValue: r => r.torsion_caused_friction_north,
    transName: "torsion-caused-friction-north",
    transDescr: "torsion-caused-friction-north_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_FRICTION_ID,
  },
  {
    getValue: r => r.torsion_caused_friction_south,
    transName: "torsion-caused-friction-south",
    transDescr: "torsion-caused-friction-south_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_FRICTION_ID,
  },
];

export default analysisResultCspPtcMappingSca;