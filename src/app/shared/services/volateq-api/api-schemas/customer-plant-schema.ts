export interface CustomerPlantSchema {
  id: number;
  customer_id: number;
  plant_id: number;
}

export interface CustomerPlantForDroneSchema {
  id: number;
  customer_id?: string;
  plant_id?: string;
  available_plant_ids: any[];
}
