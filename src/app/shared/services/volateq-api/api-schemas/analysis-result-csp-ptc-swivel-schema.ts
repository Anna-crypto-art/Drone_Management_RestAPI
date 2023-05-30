import { AnalysisResultSchemaBase } from "./analysis-result-schema-base";

export interface AnalysisResultCspPtcSwivelSchema extends AnalysisResultSchemaBase {
  htf_temperature_both_motions: number[];
  htf_temperature_avg: number;
  hce_displacement: number;
  gripping_potential_class: number;
  gripping_risk_image_url?: string;
  rotation_joint_angle_image_url?: string;
  rotation_joint_angle: number;
  rotation_joint_angle_avg_subfield: number;
  rotation_joint_angle_deviation: number;
  rotation_joint_angle_gripping_potential_class: number;
}

export interface AnalysisResultCspPtcSwivelComparedSchema extends AnalysisResultCspPtcSwivelSchema {
  gripping_potential_class__diff: number;
  rotation_joint_angle_gripping_potential_class__diff: number;
  rotation_joint_angle__diff: number;
}