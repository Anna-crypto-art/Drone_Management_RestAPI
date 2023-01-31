import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcSwivelSchema extends AnalysisResultSchemaBase {
  has_friction_potential: boolean;
}

export interface AnalysisResultCspPtcSwivelComparedSchema extends AnalysisResultCspPtcSwivelSchema {
  has_friction_potential__diff: number;
}