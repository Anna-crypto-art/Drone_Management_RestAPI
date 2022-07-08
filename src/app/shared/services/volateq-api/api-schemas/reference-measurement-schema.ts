import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface ReferenceMeasurementValueSchema {
  id: string;
  reference_measurement_id: string;
  fieldgeometry_component_id: string;
  notes?: string;
  hce_temperature?: number;
  hce_broken_glass?: boolean;  
  fieldgeometry_component?: FieldgeometryComponentSchema;
}
