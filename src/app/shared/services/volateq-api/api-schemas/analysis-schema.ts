import { AnalysisStateSchema } from "./analysis-state-schema";
import { CustomerSchema } from "./customer-schemas";
import { SimpleUserSchema } from "./user-schemas";
import { AnalysisResultDetailedSchema, AnalysisResultSchema } from "./analysis-result-schema";
import { PlantSchema } from "./plant-schema";
import { OrderProductPackageSchema } from "./order-schema";
import { ApiKeyFigure } from "../api-key-figures";
import { DroneSchema } from "./drone-schemas";

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

export interface SimpleAnalysisOrderPPSchema extends SimpleAnalysisSchema {
  order_product_packages: OrderProductPackageSchema[];
}

export interface AnalysisKeyFigureSchema {
  key_figure_id: ApiKeyFigure;
}

export interface AnalysisSchema extends SimpleAnalysisSchema {
  current_state?: AnalysisStateSchema;
  plant: PlantSchema;
  customer: CustomerSchema;
  files?: AnalysisFilesSchema;
  user: SimpleUserSchema;
  data_complete: boolean;
  flown_at: string;
  analysis_result: AnalysisResultSchema;
  has_plant_metadata: boolean;
  task_id: string;
  order_product_packages: OrderProductPackageSchema[];
  analysis_key_figures: AnalysisKeyFigureSchema[];
  drone: DroneSchema;
}

export interface AnalysisFileInfoSchema {
  [filename: string]: { size: number, uploaded_at: string } | undefined;
}

export interface AnalysisForViewSchema {
  id: string;
  name: string;
  customer: CustomerSchema;
  plant: PlantSchema;
  analysis_result?: AnalysisResultDetailedSchema;
  flown_at: string;
  order_product_packages: OrderProductPackageSchema[];
  has_key_figures: boolean;
  drone: DroneSchema;
}