import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultPvTrackerSchema extends AnalysisResultSchemaBase {
    timestamp: string;
    ambient_temperature: number;
    wind_speed: number;
    tracking_angle: number;
    ortho_image_rgb: string;
    ortho_image_ir: string;
    soiling_level: number;
    tracking_deviation: number;
}

export interface AnalysisResultPvTrackerComparedSchema extends AnalysisResultPvTrackerSchema {
  ambient_temperature__diff: number;
  wind_speed__diff: number;
  tracking_angle__diff: number;
  soiling_level__diff: number;
  tracking_deviation__diff: number;
}
