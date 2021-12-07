import { AnalysisResultCspPtcSchemaBase } from "./analysis-result-csp-ptc-schema-base";

export interface AnalysisResultCspPtcSceSchema extends AnalysisResultCspPtcSchemaBase {
  absolute_orientation: number;
  orientation_uncertainty: number;
  orientation_offset: number;
}