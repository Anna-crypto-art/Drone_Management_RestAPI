import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcIrIntensitySchema } from "../api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import { AnalysisResultCspPtcScaOrientationSchema } from "../api-schemas/analysis-result-csp-ptc-sca-orientation-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingScaOrientation: AnalysisResultCspPtcMappings<AnalysisResultCspPtcScaOrientationSchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.orientation_at_drive,
    transName: "orientation-at-drive",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
  },
  {
    getValue: r => r.uncertainty,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
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

export default analysisResultCspPtcMappingScaOrientation;