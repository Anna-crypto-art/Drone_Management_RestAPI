import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcSceSchema extends AnalysisResultSchemaBase {
  absolute_orientation: number;
  orientation_uncertainty: number;
  orientation_offset: number;
  sdx_rms_value: number;
}