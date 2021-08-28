import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcHceSchema extends AnalysisResultCspPtcSchemaBase {
    ir_intensity: number;
    htf_temperature: number;
    timestamp: string;
    ambient_temperature: number;
    wind_speed: number
    missing_glass_tube: boolean;
    glass_tube_temperature: number;
    ir_intensity_class: number;
    coating_degraded: boolean;
    h2_concentration: boolean;
    recommended_action_class: number;
    glass_tube_temperature_class: number;
}