import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface AnalysisResultCspPtcScaOrientationSchema {
  id: string;
  orientation_at_drive: number;
  fieldgeometry_component: FieldgeometryComponentSchema;
  uncertainty: number;
}