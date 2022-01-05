import { AnalysisStateSchema } from "./analysis-state-schema";
import { CustomerSchema } from "./customer-schemas";
import { UserInfoSchema } from "./user-schemas";
import { AnalysisResultSchema } from "./analysis-result-schema";
import { PlantSchema } from "./plant-schema";


export interface AnalysisFilesSchema {
  video_files: string[];
  drone_metadata_files: string[];
  other_files: string[];
}


export interface SimpleAnalysisSchema {
  id: string;
  name: string;
  created_at: string;
}


export interface AnalysisSchema extends SimpleAnalysisSchema {
  in_debug_phase: boolean;
  current_state: AnalysisStateSchema;
  plant: PlantSchema;
  customer: CustomerSchema;
  files: AnalysisFilesSchema;
  user: UserInfoSchema;
  analysis_result: AnalysisResultSchema;
}