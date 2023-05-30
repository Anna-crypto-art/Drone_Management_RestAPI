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
  hot_glass_tube_ends: boolean;
  recommended_action_class: number;
  glass_tube_temperature_class: number;
  sca_tracking_angle: number;
  oxygen_penetration: boolean;
  glass_tube_temperature_class_limits: number[];
  position_in_loop: number[];
  hce_position_support_vertical_offset: number;
  hce_position_support_lateral_offset: number;
  hce_position_support_offset_class: number;
  hce_position_center_vertical_offset: number;
  hce_position_center_lateral_offset: number;
  hce_position_center_offset_class: number;
  white_glass_tube: boolean;
}

export interface AnalysisResultCspPtcHceComparedSchema extends AnalysisResultCspPtcHceSchema {
  ambient_temperature__diff: number;
  wind_speed__diff: number;
  glass_tube_temperature__diff: number;
  h2_concentration__diff: number;
  missing_glass_tube__diff: number;
  oxygen_penetration__diff: number;
  hot_glass_tube_ends__diff: number;
  glass_tube_temperature_class__diff: number;
  recommended_action_class__diff: number;
  white_glass_tube__diff: number;
}