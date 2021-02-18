import { ComponentSchema } from "./component-schema";
import { KeyFigureSchema } from "./key-figure-schema";

export interface ComponentKeyFigureSchema {
    id: string;
    component: ComponentSchema;
    key_figure: KeyFigureSchema;
}