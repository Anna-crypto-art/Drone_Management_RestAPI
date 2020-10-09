import { CustomerSchema } from "./customer-schemas";
import { RouteSchema } from "./route-schema";

export interface PlantRouteSchema {
  id: string;
  is_deployed: boolean;
  in_setup_phase: boolean;
  route: RouteSchema;
  customer: CustomerSchema;
}