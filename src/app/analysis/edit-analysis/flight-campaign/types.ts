import { DroneSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";
import { PlantStatusSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-status-schema";

export interface FlightRouteItemSchema {
  id: number | null;
  start_time: string | null;
  drone: DroneSchema | null;
  plant_area: string | null;
  plant_status: PlantStatusSchema | null;
  duration: number | null;
  action: string | null;
}