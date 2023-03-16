import { ApiStates } from "../api-states";

export interface NewEmptyAnalysis {
  plant_id: string;
  flown_at: string;
  order_product_package_ids?: string[];
}

export interface UpdateAnalysisState {
  state_id: ApiStates;
  message?: string;
  do_send_mail?: boolean;

  /* Only for SUPER_ADMINs. Allows to set to data_complete, even if analysis.data_complete is false. */
  force?: boolean;
}
