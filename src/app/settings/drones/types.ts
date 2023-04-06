import { DroneModelSchema } from "@/app/shared/services/volateq-api/api-schemas/drone-schemas";

export interface DroneModelSchemaItem {
  id: string;
  name: string;
  name_abbrev: string;
  vendor: string;
  flight_time: number;
  recharge_time: number;
  battery_swap_time: number;
  supported: boolean;
}

export interface DroneSchemaItem {
  id: string;
  customer_plants?: CustomerPlantTuple[];
  drone_model: DroneModelSchema;
  custom_name: string;
  serial_number: string;
  number_available_batteries: number;
  retired: boolean;
}

export interface CustomerPlantTuple {
  customer_id: string;
  customer_name?: string;
  plant_id: string;
  plant_name?: string;
}