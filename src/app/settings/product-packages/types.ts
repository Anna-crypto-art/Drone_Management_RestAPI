import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";

export interface ProductPackageWithKeyFiguresSchemaItem {
  id: number;
  name: string;
  technology_id: number;
  key_figures: KeyFigureSchema[];
}