import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcIrIntensitySchema extends AnalysisResultCspPtcSchemaBase {
    ir_intensity: number;
    absorber_temperature: number;
    class_subfield: number
}