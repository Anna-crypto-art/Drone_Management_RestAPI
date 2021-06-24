import { AnalysisResultCspPtcSchema } from "./analysis-result-csp-ptc-schema";
import { KeyFigureSchema } from "./key-figure-schema";

export interface AnalysisResultSchema {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisResultDetailedSchema extends AnalysisResultSchema {
  analysis_id: string;
  key_figures: KeyFigureSchema[];
  csp_ptc: AnalysisResultCspPtcSchema;
}