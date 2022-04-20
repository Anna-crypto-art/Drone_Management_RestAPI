import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcSceSchema } from "../../api-schemas/analysis-result-csp-ptc-sce-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingSce: AnalysisResultMappings<AnalysisResultCspPtcSceSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.absolute_orientation,
    transName: "actual-angle",
    transDescr: "actual-angle_expl",
    keyFigureId: ApiKeyFigure.SCE_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.alignment_deviation_to_drive,
    transName: "sce-alignment-offset",
    transDescr: "sce-alignment-offset_expl",
    keyFigureId: ApiKeyFigure.SCE_ALIGNMENT_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "μ in °",
  },
  {
    getValue: r => r.orientation_uncertainty,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: ApiKeyFigure.SCE_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.sdx_rms_value,
    transName: "sdx-rms",
    transDescr: "sce-sdx-rms_expl",
    keyFigureId: ApiKeyFigure.SCE_SDX_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
];

export default analysisResultCspPtcMappingSce;
