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
    transDescr: "tracker-tracking-angle_expl",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.tracker_tracking_angle__diff,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_SOILING_LEVEL_ID,
    getValue: r => r.soiling_level,
    transName: "pv-module-soiling-level",
    valueDescr: "pv-module-soiling-level-",
    transDescr: "pv-module-soiling-level_expl",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.soiling_level__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_BROKEN_GLASS_ID,
    getValue: r => r.broken_glass_class,
    transName: "pv-module-broken-glass",
    valueDescr: "pv-module-broken-glass-class-",
    transDescr: "pv-module-broken-glass_expl",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.broken_glass_class__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.PID_ID,
    getValue: r => r.pid,
    transName: "pv-module-pid",
    transDescr: "pv-module-pid_expl",
    filterType: FilterFieldType.BOOLEAN,
    getDiffValue: r => r.pid__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_OPEN_CIRCUIT_ID,
    getValue: r => r.open_circuit,
    transName: "pv-module-open-circuit",
    transDescr: "pv-module-open-circuit_expl",
    filterType: FilterFieldType.BOOLEAN,
    getDiffValue: r => r.open_circuit__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_BYPASS_DIODE_ACTIVE_ID,
    getValue: r => r.bypass_diode_active,
    transName: "pv-module-bypass-diode-active",
    transDescr: "pv-module-bypass-diode-active_expl",
    filterType: FilterFieldType.BOOLEAN,
    getDiffValue: r => r.broken_glass_class__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.SUBSTRING_OPEN_CIRCUIT_ID,
    getValue: r => r.substring_open_circuit_class,
    transName: "pv-module-substring-open-circuit",
    transDescr: "pv-module-substring-open-circuit_expl",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.substring_open_circuit_class__diff,
  },
  {
    keyFigureId: ApiKeyFigure.CELL_HOTSPOT_ID,
    getValue: r => r.cell_hotspot,
    transName: "pv-module-cell-hotspot",
    transDescr: "pv-module-cell-hotspot_expl",
    filterType: FilterFieldType.BOOLEAN,
    getDiffValue: r => r.cell_hotspot__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.CELL_TRANSFER_RESISTANCE_ID,
    getValue: r => r.cell_transfer_resistance_class,
    transName: "pv-module-cell-transfer-resistance",
    valueDescr: "pv-module-cell-transfer-resistance-class-",
    transDescr: "pv-module-cell-transfer-resistance_expl",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    getDiffValue: r => r.cell_transfer_resistance_class__diff,
    enableForRefMeasure: true,
  },
  {
    keyFigureId: ApiKeyFigure.SHADOWING_ID,
    getValue: r => r.shadowing,
    transName: "pv-module-shadowing",
    transDescr: "pv-module-shadowing_expl",
    filterType: FilterFieldType.BOOLEAN,
    getDiffValue: r => r.shadowing__diff,
    enableForRefMeasure: true,
  },
];

export default analysisResultPvMappingModule;