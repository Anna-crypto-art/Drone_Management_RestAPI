import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcMirrorSchema extends AnalysisResultSchemaBase {
  is_missing: boolean;
}

export interface AnalysisResultCspPtcMirrorComparedSchema extends AnalysisResultCspPtcMirrorSchema {
  is_missing__diff: number;
}