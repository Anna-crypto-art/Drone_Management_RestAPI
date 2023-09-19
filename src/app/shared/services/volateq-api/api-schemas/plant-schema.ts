import { SimpleCustomerSchema } from "./customer-schemas";
import { FieldgeometrySchema } from "./fieldgeometry-schema";
import { OrderSchema } from "./order-schema";
import { TechnologySchema } from "./technology-schema";

export interface SimplePlantSchema {
  id: string;
  name: string;
}

export interface PlantSchema extends SimplePlantSchema {
  in_setup_phase: boolean;
  technology_id: number;
  technology: TechnologySchema;
  fieldgeometry?: FieldgeometrySchema;
  analysis_results_count?: number;
  current_orders: OrderSchema[];
  /**
   * only available for SUPER_ADMINS
   */
  customers?: SimpleCustomerSchema[];
}

