import { CustomerPlantTuple } from "@/app/settings/drones/types";

export interface DroneModelSchema {
  id: string;
  name: string;
  name_abbrev: string;
  vendor: string;
  flight_time: number;
  recharge_time: number;
  battery_swap_time: number;
  supported: boolean;
}

export interface DroneSchema {
  id: string;
  customer_plants?: CustomerPlantTuple[];
  drone_model: DroneModelSchema;
  custom_name: string;
  serial_number: string;
  number_available_batteries: number;
  retired: boolean;
  internal_identifier: string;
  notes: string;
}

