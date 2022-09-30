import { KeyFigureSchema } from "./key-figure-schema";

export interface ProductPackageSchema {
  id: number;
  name: string;
}

export interface ProductPackageWithKeyFiguresSchema {
  id: number;
  name: string;
  key_figures: KeyFigureSchema[];
}