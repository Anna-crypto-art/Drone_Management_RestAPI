import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcScaComparedSchema, AnalysisResultCspPtcScaSchema } from "../../api-schemas/analysis-result-csp-ptc-sca-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingSca: AnalysisResultMappings<
  AnalysisResultCspPtcScaSchema, AnalysisResultCspPtcScaComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.encoder_value,
    transName: "angle-value",
    transDescr: "angle-value_expl",
    keyFigureId: ApiKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "°",
  },
  {
    getValue: r => r.orientation_at_drive,
    transName: "orientation-at-drive",
    transDescr: "orientation-at-drive_expl",
    keyFigureId: ApiKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "°",
    enableForRefMeasure: true,
  },
  {
    getValue: r => r.uncertainty_at_drive,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: ApiKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "°",
  },
  {
    getValue: r => r.tracking_encoder_offset,
    transName: "tracking-offset",
    transDescr: "tracking-offset_expl",
    keyFigureId: ApiKeyFigure.SCA_TRACKING_DEVIATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "°",
  },
  {
    getValue: r => r.average_tracking_offset,
    transName: "average-tracking-offset",
    transDescr: "average-tracking-offset_expl",
    keyFigureId: ApiKeyFigure.SCA_TRACKING_DEVIATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "°",
    getDiffValue: r => r.average_tracking_offset__diff,
  },
  {
    getValue: r => r.torsion_caused_friction_mean,
    transName: "torsion-caused-friction-mean",
    transDescr: "torsion-caused-friction-mean_expl",
    keyFigureId: ApiKeyFigure.SCA_FRICTION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.torsion_caused_friction_mean__diff,
    unit: "°",
  },
  {
    getValue: r => r.sdx_rms_value,
    transName: "sca-slope-deviation",
    transDescr: "sca-slope-deviation_expl",
    keyFigureId: ApiKeyFigure.SCA_SDX_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.sdx_rms_value__diff,
    unit: "[mrad]",
  },
  {
    getValue: r => r.is_damaged_ball_joint_south,
    transName: "ball-joint-south-damaged",
    transDescr: "ball-joint-damaged_descr",
    keyFigureId: ApiKeyFigure.SCA_BALL_JOINT_FRICTION_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForRefMeasure: true,
  },
  {
    getValue: r => r.is_damaged_ball_joint_north,
    transName: "ball-joint-north-damaged",
    transDescr: "ball-joint-damaged_descr",
    keyFigureId: ApiKeyFigure.SCA_BALL_JOINT_FRICTION_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForRefMeasure: true,
  }
];

export default analysisResultCspPtcMappingSca;
