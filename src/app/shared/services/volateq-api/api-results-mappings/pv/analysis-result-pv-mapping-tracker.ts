import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import dateHelper from "../../../helper/date-helper";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultPvTrackerComparedSchema, AnalysisResultPvTrackerSchema } from "../../api-schemas/analysis-result-pv-tracker-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultPvMappingTracker: AnalysisResultMappings<
  AnalysisResultPvTrackerSchema, AnalysisResultPvTrackerComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.ambient_temperature,
    transName: "ambient-temperature",
    unit: "°C",
  },
  {
    getValue: r => r.wind_speed,
    transName: "wind-speed",
    unit: "m/s",
    getDiffValue: r => r.wind_speed__diff
  },
  {
    getValue: r => r.timestamp,
    transName: "time",
    formatter: value => dateHelper.toDateTime(value as string),
  },
  {
    getValue: r => r.tracking_angle,
    transName: "tracking-angle",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.tracking_angle__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.TRACKING_DEVIATION_ID,
    getValue: r => r.tracking_deviation,
    transName: "pv-tracker-tracking-deviation",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.tracking_deviation__diff,
  },
  {
    keyFigureId: ApiKeyFigure.TRACKER_SOILING_LEVEL_ID,
    getValue: r => r.soiling_level,
    transName: "pv-tracker-soiling-level",
    valueDescr: "pv-tracker-soiling-level-",
    transDescr: "pv-tracker-soiling-level_expl",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.soiling_level__diff,
    enableForRefMeasure: true,
  },
];

export default analysisResultPvMappingTracker;