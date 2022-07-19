import { CustomerSchema, SimpleCustomerSchema } from "./customer-schemas";
import { FieldgeometrySchema } from "./fieldgeometry-schema";
import { TechnologySchema } from "./technology-schema";

export interface PlantSchema {
  id: string;
  name: string;
  in_setup_phase: boolean;
  technology_id: number;
  technology: TechnologySchema;
  fieldgeometry?: FieldgeometrySchema;
  analysis_results_count?: number;
  /**
   * only available for SUPER_ADMINS
   */
  customers?: SimpleCustomerSchema[];
}
