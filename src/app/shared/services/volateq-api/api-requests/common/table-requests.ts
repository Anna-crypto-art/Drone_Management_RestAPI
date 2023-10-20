import { FilterFieldValueType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { ApiComponent } from "../../api-components/api-components";

export interface TableRequest {
  limit?: number;
  page?: number;
  order_by?: string | null;
  order_direction?: "asc" | "desc";
  search_text?: string;
  search_mode?: "contains" | "equals";
  key_figure_image_url?: ApiKeyFigure;
  sums?: 0 | 1;
}

export interface ColumnFuncCondition {
  compare_mode: "equal" | "less" | "greater" | "between";
  compare_values: number[];
}

export interface QueryColumn {
  name: string
  entity_type: 'CCP' | 'PI',
}

export interface TableColumnSelect {
  column: QueryColumn;
  func?: "sum" | "avg" | "count";
  func_condition?: ColumnFuncCondition;
  label?: string;
}

export interface QueryColumnFilter {
  column: QueryColumn;
  filter_value: FilterFieldValueType;
}

export interface TableFilterRequest {
  filters?: QueryColumnFilter[];
  component_filter?: { component_id?: ApiComponent, codes?: string[], grouped?: boolean };
  columns_selection?: TableColumnSelect[];
}