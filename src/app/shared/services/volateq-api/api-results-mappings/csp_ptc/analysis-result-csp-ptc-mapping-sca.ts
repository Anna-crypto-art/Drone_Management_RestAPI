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
  },
  {
    getValue: r => r.orientation_at_drive,
    transName: "orientation-at-drive",
    keyFigureId: ApiKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.uncertainty_at_drive,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: ApiKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.tracking_encoder_offset,
    transName: "tracking-offset",
    transDescr: "tracking-offset_expl",
    keyFigureId: ApiKeyFigure.SCA_TRACKING_DEVIATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "μ in °",
    getDiffValue: r => r.tracking_encoder_offset__diff,
    diffPositive: "negative",
  },
  {
    getValue: r => r.average_tracking_offset,
    transName: "average-tracking-offset",
    transDescr: "average-tracking-offset_expl",
    keyFigureId: ApiKeyFigure.SCA_TRACKING_DEVIATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "μ in °",
    getDiffValue: r => r.average_tracking_offset__diff,
    diffPositive: "negative",
  },
  {
    getValue: r => r.torsion_caused_friction_mean,
    transName: "torsion-caused-friction-mean",
    transDescr: "torsion-caused-friction-mean_expl",
    keyFigureId: ApiKeyFigure.SCA_FRICTION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.torsion_caused_friction_mean__diff,
    diffPositive: "negative",
  },
  {
    getValue: r => r.sdx_rms_value,
    transName: "slope-deviation",
    transDescr: "slope-deviation_expl",
    keyFigureId: ApiKeyFigure.SCA_SDX_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.sdx_rms_value__diff,
    diffPositive: "negative",
  },
];

export default analysisResultCspPtcMappingSca;
