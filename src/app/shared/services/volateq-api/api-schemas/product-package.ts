import { KeyFigureSchema } from "./key-figure-schema";

export interface ProductPackageSchema {
  id: number;
  name: string;
  technology_id: number;
}

export interface ProductPackageWithKeyFiguresSchema {
  id: number;
  name: string;
  technology_id: number;
  key_figures: KeyFigureSchema[];
}