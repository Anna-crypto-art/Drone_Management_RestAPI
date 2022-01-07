import { ApiStates } from "../api-states";

export interface NewAnalysis {
  plant_id: string;
  files: string[];
}

export interface UpdateAnalysisState {
  state: ApiStates;
  message?: string;
}
