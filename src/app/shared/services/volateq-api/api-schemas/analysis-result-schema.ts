import { AnalysisResultCspPtcSchema } from "./analysis-result-csp-ptc-schema";
import { ComponentKeyFigureSchema } from "./component-key-figure-schema";

export interface AnalysisResultSchema {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisResultDetailedSchema extends AnalysisResultSchema {
  analysis_id: string;
  component_key_figures: ComponentKeyFigureSchema[];
  csp_ptc: AnalysisResultCspPtcSchema;
}