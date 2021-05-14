import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcScaOrientationSchema extends AnalysisResultCspPtcSchemaBase {
  orientation_at_drive: number;
  uncertainty: number;
  torsion_caused_friction_mean: number;
  torsion_caused_friction_south: number;
  torsion_caused_friction_north: number;
}