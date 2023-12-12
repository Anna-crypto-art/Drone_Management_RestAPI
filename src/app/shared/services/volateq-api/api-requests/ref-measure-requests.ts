export interface AddReferenceMeasurementRequest {
  measure_time: string;
  pcs: string;
  key_figure_ids?: number[];
  key_figure_names?: string[];
  key_figure_values?: string[];
  notes?: string;
}
