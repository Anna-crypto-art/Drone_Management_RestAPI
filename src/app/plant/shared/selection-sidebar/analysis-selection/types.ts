import { AnalysisForViewSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-schema";
import { PlantSchema } from "@/app/shared/services/volateq-api/api-schemas/plant-schema";
import { AnalysisSelectionService } from "./analysis-selection-service";

export enum AnalysisSelectionEvent {
  ANALYSIS_SELECTED = "analysis_selected",
  MULTI_ANALYSES_SELECTED = "multi_analyses_selected",
  UNSELECT_ALL = "unselect_all",
}

export interface IAnalysisSelectionComponent {
  analysisSelectionService: AnalysisSelectionService;
  plant: PlantSchema;
  analyses: AnalysisForViewSchema[] | null;
  mounted(): Promise<void>;
  unmounted(): Promise<void>;
  onAnalysisSelected(): Promise<void>;
  onMultiAnalysesSelected(): Promise<void>;
}