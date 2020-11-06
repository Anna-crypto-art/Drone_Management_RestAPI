import { PlantBlockSchema } from "./plant-block-schema";

export interface PlantSchema {
  id: string;
  name: string;
  customer_id: string;
  technology_id: number;
  blocks: PlantBlockSchema[];
}