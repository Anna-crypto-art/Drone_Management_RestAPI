import { ComponentKeyFigureSchema } from "@/app/shared/services/volateq-api/api-schemas/component-key-figure-schema";

export interface IActiveComponent {
  exists: boolean;
  tabIndex: number;
  label: string;
  componentId: number;
  refComponentName: string;
  active?: boolean;
  componentKeyFigure?: ComponentKeyFigureSchema;
}