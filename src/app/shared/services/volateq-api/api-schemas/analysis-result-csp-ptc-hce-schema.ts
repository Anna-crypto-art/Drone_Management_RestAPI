import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcHceSchema extends AnalysisResultSchemaBase {
  ir_intensity: number;
  htf_temperature: number;
  timestamp: string;
  ambient_temperature: number;
  wind_speed: number;
  missing_glass_tube: boolean;
  glass_tube_temperature: number;
  ir_intensity_class: number;
  coating_degraded: boolean;
  h2_concentration: boolean;
  recommended_action_class: number;
  glass_tube_temperature_class: number;
  sca_tracking_angle: number;
  oxygen_penetration: boolean;
  glass_tube_temperature_class_limits: number[];
  position_in_loop: number[];
  hce_position_vertical_offset: number;
  hce_position_lateral_offset: number;
  hce_position_total_offset: number;
  hce_position_offset_class: number;
}

export interface AnalysisResultCspPtcHceComparedSchema extends AnalysisResultCspPtcHceSchema {
  ambient_temperature__diff: number;
  wind_speed__diff: number;
  glass_tube_temperature__diff: number;
  h2_concentration__diff: number;
  missing_glass_tube__diff: number;
  oxygen_penetration__diff: number;
  glass_tube_temperature_class__diff: number;
}