import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import dateHelper from "../../../helper/date-helper";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcHceComparedSchema, AnalysisResultCspPtcHceSchema } from "../../api-schemas/analysis-result-csp-ptc-hce-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingHce: AnalysisResultMappings<AnalysisResultCspPtcHceSchema, AnalysisResultCspPtcHceComparedSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.htf_temperature,
    transName: "absorber-temperature",
    unit: "°C",
  },
  {
    getValue: r => r.ambient_temperature,
    transName: "ambient-temperature",
    unit: "°C",
  },
  {
    getValue: r => r.wind_speed,
    transName: "wind-speed",
    unit: "m/s",
  },
  {
    getValue: r => r.timestamp,
    transName: "time",
    formatter: value => dateHelper.toDateTime(value as string),
  },
  {
    getValue: r => r.position_in_loop,
    transName: "position-in-loop",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    formatter: value => `${(value as Array<number>)[0]} of ${(value as Array<number>)[1]}`,
  },
  {
    getValue: r => r.sca_tracking_angle,
    transName: "sca-tracking-angle",
    unit: "°",
  },
  {
    getValue: r => r.ir_intensity,
    transName: "ir-intensity",
    transDescr: "ir-intensity_expl",
    keyFigureId: ApiKeyFigure.IR_INTENSITY_ID,
  },
  {
    getValue: r => r.ir_intensity_class,
    transName: "ir-intensity-class",
    transDescr: "ir-intensity-class_expl",
    keyFigureId: ApiKeyFigure.IR_INTENSITY_ID,
  },
  {
    getValue: r => r.glass_tube_temperature,
    transName: "glass-tube-temperature",
    keyFigureId: ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "°C",
    getDiffValue: r => r.glass_tube_temperature__diff,
  },
  {
    getValue: r => r.glass_tube_temperature_class,
    transName: "glass-tube-temperature-class",
    transDescr: "glass-tube-temperature-class_expl",
    keyFigureId: ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.glass_tube_temperature_class__diff,
  },
  {
    getValue: r => r.missing_glass_tube,
    transName: "missing-gct",
    transDescr: "missing-gct_expl",
    keyFigureId: ApiKeyFigure.MISSING_GLASS_TUBE_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.missing_glass_tube__diff,
  },
  {
    getValue: r => r.oxygen_penetration,
    transName: "oxygen-penetration",
    transDescr: "oxygen-penetration_expl",
    keyFigureId: ApiKeyFigure.OXYGEN_PENETRATION_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.oxygen_penetration__diff,
  },
  {
    getValue: r => r.h2_concentration,
    transName: "hydrogen-penetration",
    transDescr: "hydrogen-penetration_expl",
    keyFigureId: ApiKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.h2_concentration__diff,
  },
  {
    getValue: r => r.coating_degraded,
    transName: "coating-degration",
    transDescr: "coating-degration_expl",
    keyFigureId: ApiKeyFigure.COATING_DEGRADATION_ID,
    filterType: FilterFieldType.BOOLEAN,
  },
  {
    getValue: r => r.hot_glass_tube_ends,
    transName: "hot-glass-tube-ends",
    transDescr: "hot-glass-tube-ends_expl",
    keyFigureId: ApiKeyFigure.HOT_GLASS_TUBE_ENDS_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    getDiffValue: r => r.hot_glass_tube_ends__diff,
  },
  {
    getValue: r => r.recommended_action_class,
    transName: "recommended-action",
    transDescr: "recommended-action_expl",
    keyFigureId: ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    getDiffValue: r => r.recommended_action_class__diff,
  },
  {
    getValue: r => r.glass_tube_temperature_class_limits,
    transName: "glass-tube-temperature-class-limits",
    keyFigureId: ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
  },
  {
    getValue: r => r.hce_position_support_lateral_offset,
    transName: "hce-position-support-lateral-offset",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "[mm]",
  },
  {
    getValue: r => r.hce_position_support_vertical_offset,
    transName: "hce-position-support-vertical-offset",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "[mm]",
  },
  {
    getValue: r => r.hce_position_support_offset_class,
    transName: "hce-position-support-offset-class",
    transDescr: "hce-position-support-offset_expl",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.hce_position_center_lateral_offset,
    transName: "hce-position-center-lateral-offset",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "[mm]",
  },
  {
    getValue: r => r.hce_position_center_vertical_offset,
    transName: "hce-position-center-vertical-offset",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    unit: "[mm]",
  },
  {
    getValue: r => r.hce_position_center_offset_class,
    transName: "hce-position-center-offset-class",
    transDescr: "hce-position-center-offset_expl",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
];

export default analysisResultCspPtcMappingHce;
