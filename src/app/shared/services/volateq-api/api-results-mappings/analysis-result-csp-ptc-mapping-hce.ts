import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcHceSchema } from "../api-schemas/analysis-result-csp-ptc-hce-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingHce: AnalysisResultCspPtcMappings<AnalysisResultCspPtcHceSchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.htf_temperature,
    transName: "absorber-temperature",
  },
  {
    getValue: r => r.ir_intensity,
    transName: "ir-intensity",
    transDescr: "ir-intensity_expl",
    keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID,
  },
  {
    getValue: r => r.ir_intensity_class,
    transName: "ir-intensity-class",
    transDescr: "ir-intensity-class_expl",
    keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID,
  },
  {
    getValue: r => r.glass_tube_temperature,
    transName: "glass-tube-temperature",
    transDescr: "glass-tube-temperature_expl",
    keyFigureId: AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
  },
  {
    getValue: r => r.glass_tube_temperature_class,
    transName: "glass-tube-temperature-class",
    transDescr: "glass-tube-temperature-class_expl",
    keyFigureId: AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
  },
  {
    getValue: r => r.missing_glass_tube,
    transName: "missing-gct",
    transDescr: "missing-gct_expl",
    keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_TUBE_ID,
  },
  {
    getValue: r => r.coating_degraded,
    transName: "oxygen-penetration",
    transDescr: "oxygen-penetration_expl",
    keyFigureId: AnalysisResultKeyFigure.COATING_DEGRADATION_ID,
  },
  {
    getValue: r => r.h2_concentration,
    transName: "high-hydrogen-concentration",
    transDescr: "high-hydrogen-concentration_expl",
    keyFigureId: AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
  }

];

export default analysisResultCspPtcMappingHce;