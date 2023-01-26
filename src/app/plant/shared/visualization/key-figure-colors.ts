import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { KeyFigureColors } from "./layers/types";

export const keyFigureRainbowColors: Record<ApiKeyFigure, KeyFigureColors> = {
  // HCE
  [ApiKeyFigure.MISSING_GLASS_TUBE_ID]: KeyFigureColors.BLUE_iurple,
  [ApiKeyFigure.OXYGEN_PENETRATION_ID]: KeyFigureColors.RED_coffeeWithChili,
  [ApiKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID]: KeyFigureColors.RED_solluxCaptor,
  [ApiKeyFigure.COATING_DEGRADATION_ID]: KeyFigureColors.RED_solluxCaptor,
  [ApiKeyFigure.HOT_GLASS_TUBE_ENDS_ID]: KeyFigureColors.diagramBad,
  [ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID]: KeyFigureColors.RED_retroBerry,
  [ApiKeyFigure.IR_INTENSITY_ID]: KeyFigureColors.RED_retroBerry,
  [ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID]: KeyFigureColors.red,
  [ApiKeyFigure.HCE_POSITION_ID]: KeyFigureColors.BLUE_midnightDarkRoyalBlue,

  // SCA
  [ApiKeyFigure.SCA_TRACKING_DEVIATION_ID]: KeyFigureColors.BLUE_jeopardyBlue,
  [ApiKeyFigure.SCA_ORIENTATION_ID]: KeyFigureColors.BLUE_jeopardyBlue,
  [ApiKeyFigure.SCA_FRICTION_ID]: KeyFigureColors.BLUE_gafaw,
  [ApiKeyFigure.SCA_SDX_ID]: KeyFigureColors.BLUE_berryLover,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID]: KeyFigureColors.BLUE_berryLover,
  // Not implemented
  [ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SCA_BALL_JOINT_FRICTION_ID]: KeyFigureColors.black,

  // SCE
  [ApiKeyFigure.SCE_ALIGNMENT_ID]: KeyFigureColors.GREEN_toxicCoconut,
  [ApiKeyFigure.SCE_ORIENTATION_ID]: KeyFigureColors.GREEN_toxicCoconut,
  [ApiKeyFigure.SCE_SDX_ID]: KeyFigureColors.GREEN_minecraftStevesTShirt,

  // MIRROR
  [ApiKeyFigure.MISSING_MIRROR_ID]: KeyFigureColors.orange,

  // TRACKER
  [ApiKeyFigure.TRACKER_SOILING_LEVEL_ID]: KeyFigureColors.RED_retroBerry,

  // Not implemented
  [ApiKeyFigure.MODULE_BROKEN_GLASS_ID]: KeyFigureColors.black,
  [ApiKeyFigure.MODULE_SHORT_CIRCUIT_ID]: KeyFigureColors.black,
  [ApiKeyFigure.MODULE_OPEN_CIRCUIT_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SUBSTRING_SHORT_CIRCUIT_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SUBSTRING_OPEN_CIRCUIT_ID]: KeyFigureColors.black,
  [ApiKeyFigure.CELL_BROKEN_ID]: KeyFigureColors.black,
  [ApiKeyFigure.CELL_TRANSFER_RESISTANCE_ID]: KeyFigureColors.black,
  [ApiKeyFigure.TRACKING_DEVIATION_ID]: KeyFigureColors.black,
  [ApiKeyFigure.MODULE_SOILING_LEVEL_ID]: KeyFigureColors.black,
  [ApiKeyFigure.TRACKER_ORTHO_IMAGES_RGB_ID]: KeyFigureColors.black,
  [ApiKeyFigure.TRACKER_ORTHO_IMAGES_IR_ID]: KeyFigureColors.black,
  [ApiKeyFigure.MODULE_ORTHO_IMAGES_RGB_ID]: KeyFigureColors.black,
  [ApiKeyFigure.MODULE_ORTHO_IMAGES_IR_ID]: KeyFigureColors.black,
};
