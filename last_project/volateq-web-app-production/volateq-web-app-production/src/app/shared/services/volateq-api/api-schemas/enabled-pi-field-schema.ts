import { KeyFigureSchema } from "./key-figure-schema";

export interface EnabledPiFieldSchema {
  id: string;
  plant_id: string;
  pi_field_name: string;
  created_at: string;
  key_figure: KeyFigureSchema;
}