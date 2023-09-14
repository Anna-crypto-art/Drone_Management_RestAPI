import { ApiKeyFigure } from "../api-key-figures";

export interface ObservationCCPValueRequest {
  id?: string;
  ccp_id: string;
  value: string;
}

export interface ObservationPIValueRequest {
  id?: string;
  key_figure_id: ApiKeyFigure;
  pi_field_name: string;
  value: string;
}

export interface ObservationRequest {
  pcs: string;
  observed_at: string;
  ccp_values?: Array<ObservationCCPValueRequest>;
  pi_values?: Array<ObservationPIValueRequest>;
  notes?: string;
  external_id?: string;
}