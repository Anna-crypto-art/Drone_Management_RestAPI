import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { KeyFigureColors } from "../shared/visualization/layers/types";

export const cspPtcKeyFigureRainbowColors: Record<ApiKeyFigure, KeyFigureColors> = {
  // HCE
  [ApiKeyFigure.MISSING_GLASS_TUBE_ID]: KeyFigureColors.BLUE_iurple,
  [ApiKeyFigure.OXYGEN_PENETRATION_ID]: KeyFigureColors.RED_coffeeWithChili,
  [ApiKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID]: KeyFigureColors.RED_solluxCaptor,
  [ApiKeyFigure.COATING_DEGRADATION_ID]: KeyFigureColors.RED_solluxCaptor,
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
  [ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID]: KeyFigureColors.black,
  [ApiKeyFigure.SCA_BALL_JOINT_FRICTION_ID]: KeyFigureColors.black,

  // SCE
  [ApiKeyFigure.SCE_ALIGNMENT_ID]: KeyFigureColors.GREEN_toxicCoconut,
  [ApiKeyFigure.SCE_ORIENTATION_ID]: KeyFigureColors.GREEN_toxicCoconut,
  [ApiKeyFigure.SCE_SDX_ID]: KeyFigureColors.black,

  // MIRROR
  [ApiKeyFigure.MISSING_MIRROR_ID]: KeyFigureColors.orange,
};
