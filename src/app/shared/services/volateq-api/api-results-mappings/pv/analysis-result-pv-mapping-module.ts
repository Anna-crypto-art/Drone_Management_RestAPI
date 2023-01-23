import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import dateHelper from "../../../helper/date-helper";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultPvModuleComparedSchema, AnalysisResultPvModuleSchema } from "../../api-schemas/analysis-result-pv-module-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultPvMappingModule: AnalysisResultMappings<
  AnalysisResultPvModuleSchema, AnalysisResultPvModuleComparedSchema> = [
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
    getValue: r => r.tracker_tracking_angle,
    transName: "tracker-tracking-angle",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.tracker_tracking_angle__diff,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_SOILING_LEVEL_ID,
    getValue: r => r.soiling_level,
    transName: "pv-module-soiling-level",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.soiling_level__diff,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_BROKEN_GLASS_ID,
    getValue: r => r.broken_glass_class,
    transName: "pv-module-broken-glass",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.broken_glass_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_SHORT_CIRCUIT_ID,
    getValue: r => r.short_circuit_class,
    transName: "pv-module-short-circuit",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.short_circuit_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_OPEN_CIRCUIT_ID,
    getValue: r => r.open_circuit_class,
    transName: "pv-module-open-circuit",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.open_circuit_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.SUBSTRING_SHORT_CIRCUIT_ID,
    getValue: r => r.substring_short_circuit_class,
    transName: "pv-module-substring-short-circuit",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.substring_short_circuit_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.SUBSTRING_OPEN_CIRCUIT_ID,
    getValue: r => r.substring_open_circuit_class,
    transName: "pv-module-substring-open-circuit",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.substring_open_circuit_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.CELL_BROKEN_ID,
    getValue: r => r.cell_broken_class,
    transName: "pv-module-cell-broken",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.cell_broken_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.CELL_TRANSFER_RESISTANCE_ID,
    getValue: r => r.cell_transfer_resistance_class,
    transName: "pv-module-cell-transfer-resistance",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.cell_transfer_resistance_class__diff,
  },
];

export default analysisResultPvMappingModule;