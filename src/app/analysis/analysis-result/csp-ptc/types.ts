import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";

export interface IActiveComponent {
  exists: boolean;
  active?: boolean;
  componentKeyFigure?: ComponentKeyFigureSchema;
}