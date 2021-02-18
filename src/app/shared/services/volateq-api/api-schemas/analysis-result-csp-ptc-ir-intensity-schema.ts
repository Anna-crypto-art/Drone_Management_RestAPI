import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface AnalysisResultCspPtcIrIntensitySchema {
    id: string;
    ir_intensity: string;
    absorber_temperature: number;
    fieldgeometry_component: FieldgeometryComponentSchema;
}