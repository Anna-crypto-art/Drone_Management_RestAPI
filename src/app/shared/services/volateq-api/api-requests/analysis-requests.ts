import { ApiStates } from "../api-states";

export interface NewEmptyAnalysis {
  plant_id: string;
  flown_at: string;
}

export interface NewAnalysis extends NewEmptyAnalysis {
  files: string[];
  order_product_package_ids?: string[];
}

export interface UpdateAnalysisState {
  state_id: ApiStates;
  message?: string;
  do_send_mail?: boolean;

  /* Only for SUPER_ADMINs. Allows to set to data_complete, even if analysis.data_complete is false. */
  force?: boolean;
}

export interface CreateReferenceMeasurement {
  measure_date: string;
  notes?: string;
}

export interface AddReferenceMeasurmentValue {
  pcs: string;
  notes?: string;
  hce_temperature?: number;
  hce_broken_glass?: boolean;
  hce_coating_degraded?: boolean;
}
