import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { LayerColor } from "./layers/types";

export const keyFigureRainbowColors: Record<ApiKeyFigure, LayerColor> = {
  // HCE
  [ApiKeyFigure.MISSING_GLASS_TUBE_ID]: LayerColor.BLUE_iurple,
  [ApiKeyFigure.OXYGEN_PENETRATION_ID]: LayerColor.RED_coffeeWithChili,
  [ApiKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID]: LayerColor.RED_solluxCaptor,
  [ApiKeyFigure.COATING_DEGRADATION_ID]: LayerColor.RED_solluxCaptor,
  [ApiKeyFigure.HOT_GLASS_TUBE_ENDS_ID]: LayerColor.diagramBad,
  [ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID]: LayerColor.RED_retroBerry,
  [ApiKeyFigure.IR_INTENSITY_ID]: LayerColor.RED_retroBerry,
  [ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID]: LayerColor.red,
  [ApiKeyFigure.HCE_POSITION_ID]: LayerColor.BLUE_midnightDarkRoyalBlue,

  // SCA
  [ApiKeyFigure.SCA_TRACKING_DEVIATION_ID]: LayerColor.BLUE_jeopardyBlue,
  [ApiKeyFigure.SCA_ORIENTATION_ID]: LayerColor.BLUE_jeopardyBlue,
  [ApiKeyFigure.SCA_FRICTION_ID]: LayerColor.BLUE_gafaw,
  [ApiKeyFigure.SCA_SDX_ID]: LayerColor.BLUE_berryLover,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_SDX_ID]: LayerColor.BLUE_berryLover,
  // Not implemented
  [ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_ONLINE_ID]: LayerColor.black,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_IR_ID]: LayerColor.black,
  [ApiKeyFigure.SCA_ORTHO_IMAGES_RGB_OFFLINE_ID]: LayerColor.black,
  [ApiKeyFigure.SCA_BALL_JOINT_FRICTION_ID]: LayerColor.black,

  // SCE
  [ApiKeyFigure.SCE_ALIGNMENT_ID]: LayerColor.GREEN_toxicCoconut,
  [ApiKeyFigure.SCE_ORIENTATION_ID]: LayerColor.GREEN_toxicCoconut,
  [ApiKeyFigure.SCE_SDX_ID]: LayerColor.GREEN_minecraftStevesTShirt,

  // MIRROR
  [ApiKeyFigure.MISSING_MIRROR_ID]: LayerColor.orange,

  // SWIVEL
  [ApiKeyFigure.SWIVEL_GRIPPING_POTENTIAL_CLASS_ID]: LayerColor.BLUE_liturgicalTemptation,

  // TRACKER
  [ApiKeyFigure.TRACKER_SOILING_LEVEL_ID]: LayerColor.RED_retroBerry,

  // Not implemented
  [ApiKeyFigure.MODULE_BROKEN_GLASS_ID]: LayerColor.black,
  [ApiKeyFigure.MODULE_SHORT_CIRCUIT_ID]: LayerColor.black,
  [ApiKeyFigure.MODULE_OPEN_CIRCUIT_ID]: LayerColor.black,
  [ApiKeyFigure.SUBSTRING_SHORT_CIRCUIT_ID]: LayerColor.black,
  [ApiKeyFigure.SUBSTRING_OPEN_CIRCUIT_ID]: LayerColor.black,
  [ApiKeyFigure.CELL_BROKEN_ID]: LayerColor.black,
  [ApiKeyFigure.CELL_TRANSFER_RESISTANCE_ID]: LayerColor.black,
  [ApiKeyFigure.TRACKING_DEVIATION_ID]: LayerColor.black,
  [ApiKeyFigure.MODULE_SOILING_LEVEL_ID]: LayerColor.black,
  [ApiKeyFigure.TRACKER_ORTHO_IMAGES_RGB_ID]: LayerColor.black,
  [ApiKeyFigure.TRACKER_ORTHO_IMAGES_IR_ID]: LayerColor.black,
  [ApiKeyFigure.MODULE_ORTHO_IMAGES_RGB_ID]: LayerColor.black,
  [ApiKeyFigure.MODULE_ORTHO_IMAGES_IR_ID]: LayerColor.black,
};
