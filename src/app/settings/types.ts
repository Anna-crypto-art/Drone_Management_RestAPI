import { PlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";

export interface SelectPlant {
  plant: PlantSchema;
  selected: boolean;
  otherCustomers?: string;
}