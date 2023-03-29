import { CustomerPlantTuple } from "@/app/settings/drones/types";
import { CustomerSchema } from "./customer-schemas";
import { PlantSchema } from "./plant-schema";

export interface DroneModelSchema {
  id: number;
  name: string;
  name_abbrev: string;
  vendor: string;
  flight_time: number;
  recharge_time: number;
  battery_swap_time: number;
  supported: boolean;
}

export interface DroneSchema {
  id: number;
  customer_plants?: CustomerPlantTuple[];
  drone_model: DroneModelSchema;
  custom_name: string;
  serial_number: string;
  number_available_batteries: number;
  retired: boolean;
}

