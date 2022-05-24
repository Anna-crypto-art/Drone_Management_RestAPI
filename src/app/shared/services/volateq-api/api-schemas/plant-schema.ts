import { CustomerSchema } from "./customer-schemas";
import { FieldgeometrySchema } from "./fieldgeometry-schema";

export interface SimplePlantSchema {
  id: string;
  name: string;
  in_setup_phase: boolean;
  technology_id: number;
}

export interface PlantSchema extends SimplePlantSchema {
  customers: CustomerSchema[];
  fieldgeometry?: FieldgeometrySchema;
  analysis_results_count?: number;
}
