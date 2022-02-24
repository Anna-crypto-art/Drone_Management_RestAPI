import { FieldgeometrySchema } from "../shared/services/volateq-api/api-schemas/fieldgeometry-schema";

export interface PlantItem {
  id: string;
  customerId: string;
  name: string;
  digitized: boolean;
  analysesCount: number;
  established: boolean,
  fieldgeometry?: FieldgeometrySchema;
}
