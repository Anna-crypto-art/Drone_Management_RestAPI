import { CustomerSchema } from "../shared/services/volateq-api/api-schemas/customer-schemas";
import { FieldgeometrySchema } from "../shared/services/volateq-api/api-schemas/fieldgeometry-schema";

export interface PlantItem {
  id: string;
  name: string;
  digitized: boolean;
  analysesCount: number;
  established: boolean,
  customers?: string;
  fieldgeometry?: FieldgeometrySchema;
}
