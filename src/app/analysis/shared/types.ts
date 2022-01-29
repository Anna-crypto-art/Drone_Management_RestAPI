import { AnalysisSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";

export interface IAppAnalysisUpload {
  setAnalysisCallback(getAnalysis: () => AnalysisSchema | null): void;
}