import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

export interface IUpdateEditAnalysis {
  updateAnalysis(analysis: AnalysisSchema): void;
}
