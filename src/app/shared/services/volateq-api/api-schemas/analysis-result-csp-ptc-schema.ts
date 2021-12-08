export interface AnalysisResultCspPtcSchema {
    id: string;
    analysis_result_id: string;
    sca_set_point: number;
    sca_orientation_offset_class_limits: number[];
    sce_orientation_offset_class_limits: number[];
    sca_torsion_class_limits: number[];
    sce_sdx_rms_class_limits: number[];
    created_at: string;
}