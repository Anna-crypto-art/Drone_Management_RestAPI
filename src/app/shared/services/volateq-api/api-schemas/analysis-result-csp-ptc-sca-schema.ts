import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcScaSchema extends AnalysisResultCspPtcSchemaBase {
  encoder_value: number;
  orientation_at_drive: number;
  uncertainty_at_drive: number;
  orientation_at_drive_offset: number;
  torsion_caused_friction_mean: number;
  sdx_rms_value: number;
}