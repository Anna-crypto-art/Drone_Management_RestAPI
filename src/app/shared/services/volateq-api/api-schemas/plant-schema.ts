import { Fieldgeometry } from "./fieldgeometry";

export interface PlantSchema {
  id: string;
  name: string;
  customer_id: string;
  technology_id: number;
  fieldgeometry?: Fieldgeometry;
}