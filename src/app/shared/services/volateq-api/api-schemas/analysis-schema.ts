import { AnalysisStateSchema } from "./analysis-state-schema";
import { PlantMetadataFileSchema } from "./plant-metadata-file-schema";
import { PlantRouteSchema } from "./plant-route-schema";

export interface AnalysisFilesSchema {
  video_files: string[];
  drone_metadata_files: string[];
}

export interface AnalysisSchema {
  id: string;
  in_debug_phase: boolean;
  current_state: AnalysisStateSchema;
  plant_route: PlantRouteSchema;
  plant_metadata_file: PlantMetadataFileSchema;
  files: AnalysisFilesSchema;
  created_at: string;
}