import { SimpleUserSchema } from "./user-schemas";

export interface ReferenceMeasurementSchema {
  id: string;
  analysis_id: string;
  measure_time_from: string;
  measure_time_to: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  user_created: SimpleUserSchema;
}

export interface RefMeasureEntryKeyFigureSchema {
  key_figure_id: number;
  column_name: string;
  entry_key_name: string;
}

export type RefMeasureEntryValue = string | number | boolean;

export interface RefMeasureEntry {
  entry_id: string;
  user: { id: string, name: string }
  pcs: string;
  measure_time: string;
  notes?: string;
  values?: Record<string, RefMeasureEntryValue>;
  editable: boolean,
}

export interface ReferenceMeasurementEntriesSchema {
  key_figures: RefMeasureEntryKeyFigureSchema[];
  entries: RefMeasureEntry[];
}
