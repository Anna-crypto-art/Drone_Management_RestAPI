export interface AnalysisResultCspPtcSchema {
    id: string;
    analysis_result_id: string;
    sca_set_point: number;
    sca_tracking_encoder_offset_class_limits: number[];
    sce_alignment_deviation_to_drive_class_limits: number[];
    sca_average_tracking_offset_class_limits: number[];
    sca_torsion_class_limits: number[];
    sdx_rms_class_limits: number[];
    created_at: string;
}