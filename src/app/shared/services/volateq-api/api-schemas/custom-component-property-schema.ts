import { ComponentSchema } from "./component-schema";
import { SimplePlantSchema } from "./plant-schema";
import { SimpleUserSchema } from "./user-schemas";

export enum CCPDataType {
  BOOLEAN = "BOOLEAN",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  NUMBER_RANGE = "NUMBER_RANGE",
  VALUE_LIST = "VALUE_LIST",
}

export type CCPDataTypeValueRange = string[] | [number, number]

export interface DataTypeOptionInfo {
  label?: string;
  color?: string;
  description?: string;
}

export type ValueListInfosSchema = Record<string, DataTypeOptionInfo>

export interface NumberRangeInfoSchema {
  number_range: [number, number];
  info: DataTypeOptionInfo;
}

export type NumberRangeInfosSchema = Array<NumberRangeInfoSchema>;

export interface DataTypeValueRangeSchema {
  options: CCPDataTypeValueRange;
  infos?: ValueListInfosSchema | NumberRangeInfosSchema;
}

export interface CustomComponentPropertySchema {
  id: string;
  plant: SimplePlantSchema;
  component: ComponentSchema;
  name: string;
  data_type: CCPDataType;
  data_type_value_range: DataTypeValueRangeSchema;
  created_at: string;
  color?: string;
  updated_at?: string;
  description?: string;
  updated_by_user?: SimpleUserSchema;
  created_by_user?: SimpleUserSchema;
}

export const ccpDataTypeNames: Record<CCPDataType, string> = {
  [CCPDataType.BOOLEAN]: "true-false-checkbox",
  [CCPDataType.TEXT]: "text",
  [CCPDataType.NUMBER]: "number",
  [CCPDataType.NUMBER_RANGE]: "numeric-value-range",
  [CCPDataType.VALUE_LIST]: "options",
}