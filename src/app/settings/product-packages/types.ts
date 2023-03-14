import { KeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/key-figure-schema";
import { PlantStatusSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-status-schema";

export interface ProductPackageWithKeyFiguresSchemaItem {
  id: number;
  name: string;
  technology_id: number;
  key_figures: KeyFigureSchema[];
  plant_status: PlantStatusSchema[];
}
