import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcSwivelSchema extends AnalysisResultSchemaBase {
  htf_temperature_both_motions: number[];
  htf_temperature_avg: number;
  hce_displacement: number;
  gripping_potential_class: number;
  gripping_risk_image_url?: string;
}

export interface AnalysisResultCspPtcSwivelComparedSchema extends AnalysisResultCspPtcSwivelSchema {
  gripping_potential_class__diff: number;
}