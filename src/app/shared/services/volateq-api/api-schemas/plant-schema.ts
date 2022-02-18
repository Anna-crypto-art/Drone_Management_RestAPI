import { Fieldgeometry } from "./fieldgeometry";

export interface PlantSchema {
  id: string;
  name: string;
  in_setup_phase: boolean;
  customer_id: string;
  technology_id: number;
  fieldgeometry?: Fieldgeometry;
}
