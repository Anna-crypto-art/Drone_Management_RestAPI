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
    getValue: r => r.class_subfield,
    transName: "class-subfield",
    transDescr: "class-sca_expl",
    keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID,
  },
  {
    getValue: r => r.missing_glass_cladding_tube,
    transName: "missing-gct",
    transDescr: "missing-gct_expl",
    keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_CLADDING_TUBE_ID,
  },
];

export default analysisResultCspPtcMappingIrIntensity;