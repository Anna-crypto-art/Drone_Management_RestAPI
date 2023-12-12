import { ComponentSchema } from "./component-schema";

export interface KeyFigureSchema {
  id: number;
  component_id: number;
  name: string;
  description: string;
  component: ComponentSchema;
}
