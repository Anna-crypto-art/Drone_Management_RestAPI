export interface AnalysisResultSetNullOrFalseRequest {
  key_figure_id: number;
  kks: string;
  property_name?: string;
  new_value: "null" | "false",
}