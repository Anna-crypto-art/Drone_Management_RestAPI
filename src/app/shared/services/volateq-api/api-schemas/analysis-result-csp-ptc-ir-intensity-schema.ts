import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface AnalysisResultCspPtcIrIntensitySchema {
    id: string;
    ir_intensity: number;
    absorber_temperature: number;
    fieldgeometry_component: FieldgeometryComponentSchema;
    class_subfield: number;
    missing_glass_cladding_tube: boolean;
}