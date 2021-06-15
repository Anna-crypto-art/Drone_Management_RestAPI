import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcIrIntensitySchema extends AnalysisResultCspPtcSchemaBase {
    ir_intensity: number;
    absorber_temperature: number;
    missing_glass_cladding_tube: boolean;
    actual_temperature: number;
    coating_degration: number;
    ir_intensity_class: number;
    coating_degrated: boolean;
    h2_concentration: boolean;
}