import { DroneSchema } from "./drone-schemas";
import { PlantStatusSchema } from "./plant-status-schema";

export interface FlightCampaignSchema {
  id: string;
  name: string;
  analysis_id: string;
  drone: DroneSchema;
  start_date: string;
  original_start_date: string;
  battery_hotswapping: boolean;
  product_package_ids: string[];
  force_add_flight_type_ids: string[];
  plant_status: PlantStatusSchema[];
  is_being_generated: boolean;
}

export interface FlightCampaignItemSchema {
  id: string;
  name: string;
  drone: DroneSchema;
  start_date: string;
  original_start_date: string;
  plant_status: PlantStatusSchema[];
  is_being_generated: boolean;
}
