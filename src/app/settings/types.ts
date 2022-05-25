import { SimplePlantSchema } from "../shared/services/volateq-api/api-schemas/plant-schema";

export interface SelectPlant {
  plant: SimplePlantSchema;
  selected: boolean;
  otherCustomers?: string;
}