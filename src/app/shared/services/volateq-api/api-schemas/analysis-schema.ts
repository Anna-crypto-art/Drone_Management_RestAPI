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
  flown_at: string;
}

export interface AnalysisSchema extends SimpleAnalysisSchema {
  current_state: AnalysisStateSchema;
  plant: PlantSchema;
  customer: CustomerSchema;
  files: AnalysisFilesSchema;
  user: UserInfoSchema;
  data_complete: boolean;
  flown_at: string;
  analysis_result: AnalysisResultSchema;
  has_plant_metadata: boolean;
  task_id: string;
}

export interface AnalysisFileInfoSchema {
  [filename: string]: { size: number, uploaded_at: string } | undefined;
}