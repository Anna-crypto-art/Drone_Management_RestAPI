import { AnalysisResultCspPtcSchemaBase } from "../api-schemas/analysis-result-csp-ptc-schema-base";
import { AnalysisResultCspPtcMappings } from "./types";

const analysisResultCspPtcMappingBase: AnalysisResultCspPtcMappings<AnalysisResultCspPtcSchemaBase> = [
  {
    getValue: r => r.fieldgeometry_component.kks,
    transName: 'pcs',
    transDescr: 'pcs_expl',
  }
];

export default analysisResultCspPtcMappingBase;