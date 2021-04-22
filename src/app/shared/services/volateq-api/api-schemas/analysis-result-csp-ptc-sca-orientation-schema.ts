import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface AnalysisResultCspPtcScaOrientationSchema {
  id: string;
  orientation_at_drive: number;
  fieldgeometry_component: FieldgeometryComponentSchema;
  uncertainty: number;
  torsion_caused_friction_mean: number;
  torsion_caused_friction_south: number;
  torsion_caused_friction_north: number;
}