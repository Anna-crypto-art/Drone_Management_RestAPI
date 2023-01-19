import { KeyFigureSchema } from "../api-schemas/key-figure-schema";

export interface CreateProductPackageRequest {
  name: string;
  technology_id: number;
  key_figures: number[];
}
