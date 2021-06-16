import { AnalysisResultKeyFigure } from "../api-analysis-result-key-figures";
import { AnalysisResultCspPtcIrIntensitySchema } from "../api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import analysisResultCspPtcMappingBase from "./analysis-result-csp-ptc-mapping-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingIrIntensity: AnalysisResultCspPtcMappings<AnalysisResultCspPtcIrIntensitySchema> = [
  ...analysisResultCspPtcMappingBase,
  {
    getValue: r => r.absorber_temperature,
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
    getValue: r => r.missing_glass_cladding_tube,
    transName: "missing-gct",
    transDescr: "missing-gct_expl",
    keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_CLADDING_TUBE_ID,
  },
  {
    getValue: r => r.coating_degration,
    transName: "coating-degration",
    transDescr: "coating-degration_expl",
    keyFigureId: AnalysisResultKeyFigure.COATING_DEGRATION_ID,
  },
  {
    getValue: r => r.coating_degrated,
    transName: "oxygen-penetration",
    transDescr: "oxygen-penetration_expl",
    keyFigureId: AnalysisResultKeyFigure.COATING_DEGRATION_ID,
  },
  {
    getValue: r => r.h2_concentration,
    transName: "high-hydrogen-concentration",
    transDescr: "high-hydrogen-concentration_expl",
    keyFigureId: AnalysisResultKeyFigure.H2_CONCENTRATION_ID,
  }

];

export default analysisResultCspPtcMappingIrIntensity;