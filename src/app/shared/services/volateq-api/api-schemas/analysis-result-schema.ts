import { ApiKeyFigure } from "../api-key-figures";
import { AnalysisResultCspPtcSchema } from "./analysis-result-csp-ptc-schema";
import { SimpleAnalysisSchema } from "./analysis-schema";
import { KeyFigureSchema } from "./key-figure-schema";

export interface AnalysisResultSchema {
  id: string;
  created_at: string;
  updated_at: string;
  released: boolean;
}

export interface AnalysisResultDetailedSchema extends AnalysisResultSchema {
  analysis_id: string;
  key_figures: KeyFigureSchema[];
  csp_ptc: AnalysisResultCspPtcSchema;
  analysis: SimpleAnalysisSchema;
}

export interface AnalysisResultChangeHistorySchema {
  id: string;
  analysis_result_id: string;
  key_figure_id: ApiKeyFigure
  kks: string
  column_name?: string;
  previous_value: string;
  created_at: string;
}