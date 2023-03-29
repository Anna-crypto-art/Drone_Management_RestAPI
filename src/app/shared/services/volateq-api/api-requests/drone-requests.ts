import { CustomerPlantTuple } from "@/app/settings/drones/types";

export interface CreateDroneModelRequest {
  name: string;
  name_abbrev: string;
  vendor: string;
  flight_time: number;
  recharge_time: number;
  battery_swap_time: number;
  supported: boolean;
}

export interface UpdateDroneModelRequest {
  name: string;
  name_abbrev: string;
  vendor: string;
  flight_time: number;
  recharge_time: number;
  battery_swap_time: number;
  supported: boolean;
}


export interface CreateDroneRequest {
  customer_plant_ids_encoded?: CustomerPlantTuple[];
  drone_model_id: number;
  custom_name: string;
  serial_number: string;
  number_available_batteries: number;
  retired: boolean;
}

export interface UpdateDroneRequest {
  customer_plant_ids_encoded?: CustomerPlantTuple[];
  drone_model_id: number;
  custom_name: string;
  serial_number: string;
  number_available_batteries: number;
  retired: boolean;
}
