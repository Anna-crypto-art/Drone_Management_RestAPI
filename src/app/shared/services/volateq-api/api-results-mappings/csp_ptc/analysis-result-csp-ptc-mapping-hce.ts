import { FilterFieldType } from "@/app/plant/shared/filter-fields/types";
import { ApiKeyFigure } from "../../api-key-figures";
import { AnalysisResultCspPtcHceSchema } from "../../api-schemas/analysis-result-csp-ptc-hce-schema";
import analysisResultMappingBase from "../analysis-result-mapping-base";
import { AnalysisResultMappings } from "../types";

const analysisResultCspPtcMappingHce: AnalysisResultMappings<AnalysisResultCspPtcHceSchema> = [
  ...analysisResultMappingBase,
  {
    getValue: r => r.htf_temperature,
    transName: "absorber-temperature",
  },
  {
    getValue: r => r.ambient_temperature,
    transName: "ambient-temperature",
  },
  {
    getValue: r => r.wind_speed,
    transName: "wind-speed",
  },
  {
    getValue: r => r.timestamp,
    transName: "time",
  },
  {
    getValue: r => r.position_in_loop,
    transName: "position-in-loop",
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.sca_tracking_angle,
    transName: "sca-tracking-angle",
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
    enableForDiagram: true,
    unit: "μ in °C",
  },
  {
    getValue: r => r.glass_tube_temperature_class,
    transName: "glass-tube-temperature-class",
    transDescr: "glass-tube-temperature-class_expl",
    keyFigureId: ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "μ of count"
  },
  {
    getValue: r => r.missing_glass_tube,
    transName: "missing-gct",
    transDescr: "missing-gct_expl",
    keyFigureId: ApiKeyFigure.MISSING_GLASS_TUBE_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    unit: "Count"
  },
  {
    getValue: r => r.oxygen_penetration,
    transName: "oxygen-penetration",
    transDescr: "oxygen-penetration_expl",
    keyFigureId: ApiKeyFigure.OXYGEN_PENETRATION_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    unit: "Count"
  },
  {
    getValue: r => r.h2_concentration,
    transName: "high-hydrogen-concentration",
    transDescr: "high-hydrogen-concentration_expl",
    keyFigureId: ApiKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
    filterType: FilterFieldType.BOOLEAN,
    enableForDiagram: true,
    unit: "Count"
  },
  {
    getValue: r => r.coating_degraded,
    transName: "coating-degration",
    transDescr: "coating-degration_expl",
    keyFigureId: ApiKeyFigure.COATING_DEGRADATION_ID,
    filterType: FilterFieldType.BOOLEAN,
  },
  {
    getValue: r => r.recommended_action_class,
    transName: "recommended-action",
    transDescr: "recommended-action_expl",
    keyFigureId: ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
    enableForDiagram: true,
    unit: "Count"
  },
  {
    getValue: r => r.glass_tube_temperature_class_limits,
    transName: "glass-tube-temperature-class-limits",
    keyFigureId: ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
  },
  {
    getValue: r => r.hce_position_total_offset,
    transName: "hce-position-total-offset",
    transDescr: "hce-position-offset-descr",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.hce_position_offset_class,
    transName: "hce-position-offset-class",
    transDescr: "hce-position-offset_expl",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.hce_position_lateral_offset,
    transName: "hce-position-lateral-offset",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
  {
    getValue: r => r.hce_position_vertical_offset,
    transName: "hce-position-vertical-offset",
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    filterType: FilterFieldType.NUMERIC_EXTENDED,
  },
];

export default analysisResultCspPtcMappingHce;
