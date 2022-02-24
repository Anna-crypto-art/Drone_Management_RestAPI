import { ApiStates } from "../api-states";

export interface NewAnalysis {
  plant_id: string;
  files: string[];
  flown_at: string;
}

export interface UpdateAnalysisState {
  state_id: ApiStates;
  message?: string;
  do_send_mail?: boolean;
}
