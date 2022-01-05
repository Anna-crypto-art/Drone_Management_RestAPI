import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";

export interface IAnalysisSelectionSidebar {
  analysisResults: AnalysisResultDetailedSchema[] | null;
  sidebarOpen: boolean;
}