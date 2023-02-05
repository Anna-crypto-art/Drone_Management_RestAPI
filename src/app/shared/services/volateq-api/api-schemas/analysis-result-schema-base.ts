import { FieldgeometryComponentSchema } from "./fieldgeometry-component-schema";

export interface AnalysisResultSchemaBase {
  id: string;
  fieldgeometry_component: FieldgeometryComponentSchema;
  comment?: string;
}
