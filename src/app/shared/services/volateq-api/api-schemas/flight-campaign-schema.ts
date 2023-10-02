import { DroneSchema } from "./drone-schemas";
import { PlantStatusSchema } from "./plant-status-schema";
import { SimpleUserSchema } from "./user-schemas";

export enum FlightCampaignState {
  GENERATING = 1,//'GENERATING',
  FINISHED_GENERATING = 2,//'FINISHED_GENERATING',
  FAILED_GENERATING = 3//'FAILED_GENERATING',
}

export interface FlightCampaignSchema {
  id: string;
  name: string;
  analysis_id: string;
  drone: DroneSchema;
  start_date: string;
  original_start_date: string;
  battery_hotswapping: boolean;
  order_product_package_ids: string[];
  force_add_flight_type_ids: string[];
  plant_status: PlantStatusSchema[];
  flight_campaign_state: number;
  user_created: SimpleUserSchema;
}

export interface FlightCampaignItemSchema {
  id: string;
  name: string;
  drone: DroneSchema;
  start_date: string;
  original_start_date: string;
  plant_status: PlantStatusSchema[];
  flight_campaign_state: number;
  user_created: string;
}
