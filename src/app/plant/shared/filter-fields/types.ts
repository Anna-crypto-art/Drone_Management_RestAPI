export enum FilterFieldType {
  NUMERIC_SIMPLE = 0,
  NUMERIC_EXTENDED = 1,
  BOOLEAN = 2,
  ARRAY = 3,
}

export interface FilterField {
  key: string | number;
  name: string;
  type: FilterFieldType;
  getValues?: () => { value: unknown, text?: string }[] | Promise<{ value: unknown, text?: string }[]>;
}

export type FilterFieldValueType = string | number | boolean | null;

export interface FilterFieldValue {
  filterField: FilterField | null;
  value: FilterFieldValueType;
}