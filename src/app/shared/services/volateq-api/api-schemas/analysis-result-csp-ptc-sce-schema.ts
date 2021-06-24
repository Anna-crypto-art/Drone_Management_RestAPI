import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcSceSchema extends AnalysisResultCspPtcSchemaBase {
  set_angle: number;
  angle_value: number;
  actual_angle: number;
  angle_deviation: number;
  uncertainty: number;
  deviation_to_drive: number;
}