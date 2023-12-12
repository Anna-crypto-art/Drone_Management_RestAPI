import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcSceComparedSchema, AnalysisResultCspPtcSceSchema } from "../../api-schemas/analysis-result-csp-ptc-sce-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings, PIDataType } from "../types";

const analysisResultCspPtcMappingSce: AnalysisResultMappings<
  AnalysisResultCspPtcSceSchema, AnalysisResultCspPtcSceComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.absolute_orientation,
    transName: "actual-angle",
    transDescr: "actual-angle_expl",
    keyFigureId: ApiKeyFigure.SCE_ORIENTATION_ID,
    dataType: PIDataType.NUMERIC,
    enableForFilter: true,
    unit: "°",
    enableForObservation: true,
  },
  {
    getValue: r => r.alignment_deviation_to_drive,
    transName: "sce-alignment-offset",
    transDescr: "sce-alignment-offset_expl",
    keyFigureId: ApiKeyFigure.SCE_ALIGNMENT_ID,
    dataType: PIDataType.NUMERIC,
    enableForFilter: true,
    enableForDiagram: true,
    getDiffValue: r => r.alignment_deviation_to_drive__diff,
    unit: "°",
  },
  {
    getValue: r => r.orientation_uncertainty,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: ApiKeyFigure.SCE_ORIENTATION_ID,
    dataType: PIDataType.NUMERIC,
    enableForFilter: true,
    unit: "°",
  },
  {
    getValue: r => r.sdx_rms_value,
    transName: "sce-slope-deviation",
    transDescr: "sce-slope-deviation_expl",
    keyFigureId: ApiKeyFigure.SCE_SDX_ID,
    dataType: PIDataType.NUMERIC,
    enableForFilter: true,
    enableForDiagram: true,
    getDiffValue: r => r.sdx_rms_value__diff,
    unit: "[mrad]",
  },
  
];

export default analysisResultCspPtcMappingSce;
