import { ApiStates } from "../api-states";

export interface NewAnalysis {
  customer_id?: string;
  files: string[];
  plant_metadata_file?: string;
  plant_medatata_file_id?: string;
}

export interface UpdateAnalysisState {
  state: ApiStates;
  message?: string;
}