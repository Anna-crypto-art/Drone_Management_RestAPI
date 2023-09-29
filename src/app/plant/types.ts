import { SimpleCustomerSchema } from "../shared/services/volateq-api/api-schemas/customer-schemas";
import { FieldgeometrySchema } from "../shared/services/volateq-api/api-schemas/fieldgeometry-schema";
import { OrderProductPackageSchema } from "../shared/services/volateq-api/api-schemas/order-schema";

export interface PlantItem {
  id: string;
  name: string;
  digitized: boolean;
  analysesCount: number;
  established: boolean,
  technology: string;
  customerNames?: string;
  customers?: SimpleCustomerSchema[];
  fieldgeometry?: FieldgeometrySchema;
  productPackages: OrderProductPackageSchema[];
}

export interface EditPlantProductPackages {
  customer: { id: string; name: string; };
  
  // ("id_yearly")
  productPackages: string[];
}

export interface EditPlant {
  id: string;
  name: string;
  digitized: boolean;
  inSetupPhase: boolean;
  orientation?: number;
}

export enum PlantViewEvent {
  TOGGLE_LOADING = "TOGGLE_LOADING",
}