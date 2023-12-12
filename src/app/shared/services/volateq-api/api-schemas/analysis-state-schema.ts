import { StateSchema } from "./state-schema";

export interface AnalysisStateSchema {
  id: string;
  analysis_id: string;
  started_at: string;
  finished_at?: string;
  message?: string;
  state: StateSchema;
}
