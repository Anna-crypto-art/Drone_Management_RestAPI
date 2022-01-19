import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcScaSchema extends AnalysisResultSchemaBase {
  encoder_value: number;
  orientation_at_drive: number;
  uncertainty_at_drive: number;
  tracking_encoder_offset: number;
  average_tracking_offset: number;
  torsion_caused_friction_mean: number;
  sdx_rms_value: number;
  torsion_banana_image_url?: string;
  ortho_image_rgb_url?: string;
  ortho_image_ir_url?: string;
  ortho_image_sdx_url?: string;
}
