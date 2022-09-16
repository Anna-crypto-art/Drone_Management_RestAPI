import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";
import { SimpleUserSchema } from "./user-schemas";

export interface ReferenceMeasurementSchema {
  id: string;
  analysis_id: string;
  user_id: string;
  measure_date: string;
  notes?: string;
  created_at: string;
  user: SimpleUserSchema;
}

export interface ReferenceMeasurementValueSchema {
  id: string;
  reference_measurement_id: string;
  fieldgeometry_component_id: string;
  notes?: string;
  hce_temperature?: number;
  hce_broken_glass?: boolean;  
  fieldgeometry_component?: FieldgeometryComponentSchema;
  ignore: boolean;
}
