import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";

export interface IAnalysisSelectionSidebar {
  analysisResults: AnalysisResultDetailedSchema[] | null;
  sidebarOpen: boolean;
}


export enum AnalysisSelectionEvent {
  ANALYSIS_SELECTED = "analysis_selected",
  MULTI_ANALYSES_SELECTED = "multi_analyses_selected",
}