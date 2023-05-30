import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcSwivelSchema, AnalysisResultCspPtcSwivelComparedSchema } from "../../api-schemas/analysis-result-csp-ptc-swivel-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingSwivel: AnalysisResultMappings<
  AnalysisResultCspPtcSwivelSchema, AnalysisResultCspPtcSwivelComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.htf_temperature_both_motions,
    transName: "htf-temperature-both-motions",
    unit: "°C",
    superAdminOnly: true
  },
  {
    getValue: r => r.htf_temperature_avg,
    transName: "htf-temperature-avg",
    unit: "°C"
  },
  {
    getValue: r => r.gripping_potential_class,
    transName: "rotation-joint-gripping-potential-class",
    transDescr: "rotation-joint-gripping-potential-class_expl",
    keyFigureId: ApiKeyFigure.SWIVEL_GRIPPING_POTENTIAL_CLASS_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.gripping_potential_class__diff,
    enableForRefMeasure: true,
  },
  {
    getValue: r => r.hce_displacement,
    transName: "hce-displacement",
    transDescr: "hce-displacement_expl",
    keyFigureId: ApiKeyFigure.SWIVEL_GRIPPING_POTENTIAL_CLASS_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "mm",
  },
  {
    getValue: r => r.rotation_joint_angle,
    transName: "swivel-rotation-joint-angle",
    transDescr: "swivel-rotation-joint-angle_expl",
    keyFigureId: ApiKeyFigure.ROTATION_JOINT_GEOMETRY_STATUS_ID,
    unit: "°",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForRefMeasure: true,
    getDiffValue: r => r.rotation_joint_angle__diff,
  },
  {
    getValue: r => r.rotation_joint_angle_avg_subfield,
    transName: "swivel-rotation-joint-angle-avg-subfield",
    transDescr: "swivel-rotation-joint-angle-avg-subfield_expl",
    keyFigureId: ApiKeyFigure.ROTATION_JOINT_GEOMETRY_STATUS_ID,
    unit: "°",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.rotation_joint_angle_deviation,
    transName: "swivel-rotation-joint-angle-deviation",
    transDescr: "swivel-rotation-joint-angle-deviation_expl",
    keyFigureId: ApiKeyFigure.ROTATION_JOINT_GEOMETRY_STATUS_ID,
    unit: "°",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.rotation_joint_angle_gripping_potential_class,
    transName: "swivel-rotation-joint-angle-gripping-potential-class",
    transDescr: "swivel-rotation-joint-angle-gripping-potential-class_expl",
    keyFigureId: ApiKeyFigure.ROTATION_JOINT_GEOMETRY_STATUS_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.rotation_joint_angle_gripping_potential_class__diff,
    enableForRefMeasure: true,
  },
];

export default analysisResultCspPtcMappingSwivel;
