import { DroneSchema } from "./drone-schemas";
import { PlantStatusSchema } from "./plant-status-schema";

export interface FlightRouteSchema {
  id: number;
  drone: DroneSchema;
  plant_status: PlantStatusSchema;
  start_time: string;
  plant_area: string;
  duration: number;
}
