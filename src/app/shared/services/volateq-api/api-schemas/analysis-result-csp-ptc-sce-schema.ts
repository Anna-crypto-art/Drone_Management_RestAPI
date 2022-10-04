import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcSceSchema extends AnalysisResultSchemaBase {
  absolute_orientation: number;
  orientation_uncertainty: number;
  alignment_deviation_to_drive: number;
  sdx_rms_value: number;
  comment?: string;
}

export interface AnalysisResultCspPtcSceComparedSchema extends AnalysisResultCspPtcSceSchema {
  alignment_deviation_to_drive__diff: number;
}