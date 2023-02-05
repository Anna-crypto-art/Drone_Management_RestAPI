import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultPvModuleSchema extends AnalysisResultSchemaBase {
    timestamp: string;
    ambient_temperature: number;
    wind_speed: number;
    tracker_tracking_angle: number;
    broken_glass_class: number;
    short_circuit_class: number;
    open_circuit_class: number;
    substring_short_circuit_class: number;
    substring_open_circuit_class: number;
    cell_broken_class: number;
    cell_transfer_resistance_class: number;
    soiling_level: number;
    ortho_image_rgb: string;
    ortho_image_ir: string;
}

export interface AnalysisResultPvModuleComparedSchema extends AnalysisResultPvModuleSchema {
  ambient_temperature__diff: number;
  wind_speed__diff: number;
  tracker_tracking_angle__diff: number;
  broken_glass_class__diff: number;
  short_circuit_class__diff: number;
  open_circuit_class__diff: number;
  substring_short_circuit_class__diff: number;
  substring_open_circuit_class__diff: number;
  cell_broken_class__diff: number;
  cell_transfer_resistance_class__diff: number;
  soiling_level__diff: number;
}
