import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface AnalysisResultCspPtcSceAngleSchema {
  id: string;
  set_angle: number;
  angle_value: number;
  actual_angle: number;
  fieldgeometry_component: FieldgeometryComponentSchema;
  angle_deviation: number;
  uncertainty: number;
  deviation_to_drive: number;
}