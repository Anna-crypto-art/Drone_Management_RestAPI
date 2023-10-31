import { ApiKeyFigure } from "../api-key-figures";

export interface CreateEnabledPiFieldRequest {
  key_figure_id: ApiKeyFigure;
  pi_field_name: string;
}

export interface EnablePiFieldsRequest {
  pi_fields: Array<CreateEnabledPiFieldRequest>;
}

export interface DisablePiFieldsRequest {
  enable_pi_field_ids: string[];
}