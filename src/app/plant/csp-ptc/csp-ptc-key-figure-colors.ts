import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureColors } from "../shared/visualization/layers/types";

export const cspPtcKeyFigureColors: Record<AnalysisResultKeyFigure, KeyFigureColors> = {
  // HCE
  [AnalysisResultKeyFigure.MISSING_GLASS_TUBE_ID]: KeyFigureColors.RED_pizs,
  [AnalysisResultKeyFigure.OXYGEN_PENETRATION_ID]: KeyFigureColors.RED_coffeeWithChili,
  [AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID]: KeyFigureColors.RED_solluxCaptor,
  [AnalysisResultKeyFigure.COATING_DEGRADATION_ID]: KeyFigureColors.RED_solluxCaptor,
  [AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID]: KeyFigureColors.RED_retroBerry,
  [AnalysisResultKeyFigure.IR_INTENSITY_ID]: KeyFigureColors.RED_retroBerry,
  [AnalysisResultKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID]: KeyFigureColors.red,

  // SCA
  [AnalysisResultKeyFigure.SCA_TRACKING_DEVIATION_ID]: KeyFigureColors.BLUE_jeopardyBlue,
  [AnalysisResultKeyFigure.SCA_ORIENTATION_ID]: KeyFigureColors.BLUE_jeopardyBlue,
  [AnalysisResultKeyFigure.SCA_FRICTION_ID]: KeyFigureColors.BLUE_gafaw,
  [AnalysisResultKeyFigure.SCA_SDX_ID]: KeyFigureColors.BLUE_berryLover,
  [AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_SDX_ID]: KeyFigureColors.BLUE_berryLover,
  [AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_RGB_ID]: KeyFigureColors.black,
  [AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_IR_ID]: KeyFigureColors.black,

  // SCE
  [AnalysisResultKeyFigure.SCE_ALIGNMENT_ID]: KeyFigureColors.GREEN_dirtyLuigi,
  [AnalysisResultKeyFigure.SCE_ORIENTATION_ID]: KeyFigureColors.GREEN_dirtyLuigi,
  [AnalysisResultKeyFigure.SCE_SDX_ID]: KeyFigureColors.black,

  // MIRROR
  [AnalysisResultKeyFigure.MISSING_MIRROR_ID]: KeyFigureColors.orange,
};