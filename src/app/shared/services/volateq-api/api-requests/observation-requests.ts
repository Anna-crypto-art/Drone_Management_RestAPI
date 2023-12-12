import { ApiKeyFigure } from "../api-key-figures";

export interface ObservationCCPValueRequest {
  ccp_id: string;
  value: string;
}

export interface ObservationPIValueRequest {
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

export interface SummerizedObservationRequest {
  from?: string;
  to?: string;
  period?: string;
  page?: number;
  limit?: number;
}

export type ObservFilterValue = string | number | boolean | [number, number] | undefined;