import { ApiKeyFigure } from "../api-key-figures";
import { ApiStates } from "../api-states";

export interface NewEmptyAnalysisRequest {
  plant_id: string;
  flown_at: string;
  order_product_package_ids?: string[];
}

export interface UpdateAnalysisRequest {
  data_complete?: boolean;
  flown_at?: string;
  order_product_package_ids?: string[];
  key_figure_ids?: ApiKeyFigure[];
}

export interface UpdateAnalysisStateRequest {
  state_id: ApiStates;
  message?: string;
  do_send_mail?: boolean;

  /* Only for SUPER_ADMINs. Allows to set to data_complete, even if analysis.data_complete is false. */
  force?: boolean;
}
