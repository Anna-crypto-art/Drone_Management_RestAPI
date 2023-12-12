import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultPvModuleSchema extends AnalysisResultSchemaBase {
    timestamp: string;
    ambient_temperature: number;
    wind_speed: number;
    tracker_tracking_angle: number;
    broken_glass_class: number;
    pid: boolean;
    open_circuit: boolean;
    bypass_diode_active: boolean;
    substring_open_circuit_class: number;
    cell_hotspot: number;
    cell_transfer_resistance_class: number;
    soiling_level: number;
    ortho_image_rgb: string;
    ortho_image_ir: string;
    shadowing: boolean;
}

export interface AnalysisResultPvModuleComparedSchema extends AnalysisResultPvModuleSchema {
  ambient_temperature__diff: number;
  wind_speed__diff: number;
  tracker_tracking_angle__diff: number;
  broken_glass_class__diff: number;
  pid__diff: number;
  open_circuit__diff: number;
  bypass_diode_active__diff: number;
  substring_open_circuit_class__diff: number;
  cell_hotspot__diff: number;
  cell_transfer_resistance_class__diff: number;
  soiling_level__diff: number;
  shadowing__diff: number;
}
