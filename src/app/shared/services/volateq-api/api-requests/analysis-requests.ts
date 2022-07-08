import { ApiStates } from "../api-states";

export interface NewEmptyAnalysis {
  plant_id: string;
  flown_at: string;
  customer_id?: string;
}

export interface NewAnalysis extends NewEmptyAnalysis {
  files: string[];
}

export interface UpdateAnalysisState {
  state_id: ApiStates;
  message?: string;
  do_send_mail?: boolean;
}

export interface CreateReferenceMeasurement {
  measure_date: string;
  notes?: string;
}

export interface AddReferenceMeasurmentValue {
  reference_measurement_id: string;
  pcs: string;
  notes?: string;
  hce_temperature?: number;
  hce_broken_glass?: boolean;
  hce_coating_degraded?: boolean;
}
