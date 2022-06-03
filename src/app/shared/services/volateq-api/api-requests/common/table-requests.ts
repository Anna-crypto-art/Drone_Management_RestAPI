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

export interface TableColumnSelect {
  name: string;
  func?: "sum" | "avg" | "count";
  func_condition?: ColumnFuncCondition;
  label?: string;
}

export interface TableFilterRequest {
  filters?: Record<string, FilterFieldValueType>;
  component_filter?: { component_id?: ApiComponent, codes?: string[], grouped?: boolean };
  columns_selection?: { columns: TableColumnSelect[] };
}