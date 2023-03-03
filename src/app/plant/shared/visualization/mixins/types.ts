import { ApiComponent } from "@/app/shared/services/volateq-api/api-components/api-components";
import { AnalysisResultDetailedSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema";
import { OrthoImage } from "../layers/types";

export interface IOrthoImageMixin {
  orthoImages: OrthoImage[] | null;
  analysisResult: AnalysisResultDetailedSchema | null;
}