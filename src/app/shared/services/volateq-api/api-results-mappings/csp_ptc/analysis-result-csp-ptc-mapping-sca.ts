import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { AnalysisResultKeyFigure } from "../../api-analysis-result-key-figures";
import { AnalysisResultCspPtcScaSchema } from "../../api-schemas/analysis-result-csp-ptc-sca-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingSca: AnalysisResultMappings<AnalysisResultCspPtcScaSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.encoder_value,
    transName: "angle-value",
    transDescr: "angle-value_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.orientation_at_drive,
    transName: "orientation-at-drive",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.uncertainty_at_drive,
    transName: "uncertainty",
    transDescr: "uncertainty_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.tracking_encoder_offset,
    transName: "tracking-offset",
    transDescr: "tracking-offset_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_TRACKING_DEVIATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.average_tracking_offset,
    transName: "average-tracking-offset",
    transDescr: "average-tracking-offset_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_TRACKING_DEVIATION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.torsion_caused_friction_mean,
    transName: "torsion-caused-friction-mean",
    transDescr: "torsion-caused-friction-mean_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_FRICTION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.torsion_caused_friction_mean,
    transName: "torsion-caused-friction-mean",
    transDescr: "torsion-caused-friction-mean_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_FRICTION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.sdx_rms_value,
    transName: "slope-deviation",
    transDescr: "slope-deviation_expl",
    keyFigureId: AnalysisResultKeyFigure.SCA_SDX_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
];

export default analysisResultCspPtcMappingSca;
