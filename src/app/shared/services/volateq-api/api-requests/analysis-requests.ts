export interface NewAnalysis {
  customer_id?: string;
  route_id: string;
  files: string[];
  plant_metadata_file?: string;
  plant_medatata_file_id?: string;
}

export interface UpdateAnalysisState {
  analysis_id: string;
  message?: string;
}