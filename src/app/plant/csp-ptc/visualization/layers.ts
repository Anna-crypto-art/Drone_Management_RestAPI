import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AbsorberComponentLayer } from "./components/absorber-component-layer";
import { LoopComponentLayer } from "./components/loop-component-layer";
import { MirrorComponentLayer } from "./components/mirror-component-layer";
import { ScaComponentLayer } from "./components/sca-component-layer";
import { SceComponentLayer } from "./components/sce-component-layer";
import { ComponentLayer } from "../../shared/visualization/layers/component-layer";
import { MissingMirrorKeyFigureLayer } from "./key-figures/missing-mirror-key-figure-layer";
import { ScaFrictionKeyFigureLayer } from "./key-figures/sca-friction-key-figure";
import { ScaOrientationKeyFigureLayer } from "./key-figures/sca-orientation-key-figure-layer";
import { ScaSdxKeyFigureLayer } from "./key-figures/sca-sdx-key-figure-layer";
import { SceOrientationKeyFigureLayer } from "./key-figures/sce-orientation-key-figure-layer";
import { BoolUndefinedHceKeyFigureLayer } from "./key-figures/shared/bool-hce-key-figure-layer";
import { HceKeyFigureLayer } from "./key-figures/shared/hce-key-figure-layer";
import { ScaOrthoImageKeyFigureLayer } from "./key-figures/shared/sca-ortho-image-key-figure-layer";
import { KeyFigureTypeMap } from "../../shared/visualization/types";
import { KeyFigureColors } from "../../shared/visualization/layers/types";

export const COMPONENT_LAYERS: (typeof ComponentLayer)[] = [
  AbsorberComponentLayer,
  LoopComponentLayer,
  // MirrorComponentLayer, Too many mirrors (>200k) leads to OutOfMemory
  ScaComponentLayer,
  SceComponentLayer,
];

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap[] = [
  {
    keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_TUBE_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "missingGhr", keyName: "missing-gct" },
    queryColor: { color: KeyFigureColors.red, query: { missing_glass_tube: 1, undefined: 1 }}
  },
  {
    keyFigureId: AnalysisResultKeyFigure.OXYGEN_PENETRATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "O2Penetration", keyName: "oxygen-penetration" },
    queryColor: { color: KeyFigureColors.red, query: { oxygen_penetration: 1, undefined: 1 }}
  },
  {
    keyFigureId: AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "H2Concentration", keyName: "high-hydrogen-concentration" },
    queryColor: { color: KeyFigureColors.red, query: { h2_concentration: 1, undefined: 1 }}
  },
  {
    keyFigureId: AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "glassTubeTemperature", keyName: "glass-tube-temperature-class" },
    subLayers: [
      { 
        keyFigureInfo: { displayName: "glass-tube-temperature-class-3", zIndex: 13 }, 
        queryColor: { color: KeyFigureColors.red, query: { glass_tube_temperature_class: 3 }},
      }, 
      { 
        keyFigureInfo: { displayName: "glass-tube-temperature-class-2", zIndex: 12 }, 
        queryColor: { color: KeyFigureColors.yellow, query: { glass_tube_temperature_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "glass-tube-temperature-class-1", zIndex: 10 }, 
        queryColor: { color: KeyFigureColors.green, query: { glass_tube_temperature_class: 1 }},
      }, 
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "irIntensity", keyName: "ir-intensity-class" },
    subLayers: [
      { 
        keyFigureInfo: { displayName: "ir-intensity-class-3", zIndex: 13 }, 
        queryColor: { color: KeyFigureColors.red, query: { ir_intensity_class: 3 }},
      }, 
      { 
        keyFigureInfo: { displayName: "ir-intensity-class-2", zIndex: 12 }, 
        queryColor: { color: KeyFigureColors.yellow, query: { ir_intensity_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "ir-intensity-class-1", zIndex: 10 }, 
        queryColor: { color: KeyFigureColors.green, query: { ir_intensity_class: 1 }},
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "recommendedAction", keyName: "recommended-action" },
    subLayers: [
      { 
        keyFigureInfo: { templateName: "recommendedActionClass3", displayName: "recommended-action-class-3", zIndex: 13 }, 
        queryColor: { color: KeyFigureColors.red, query: { recommended_action_class: 3 }},
      }, 
      { 
        keyFigureInfo: { templateName: "recommendedActionClass2", displayName: "recommended-action-class-2", zIndex: 12 }, 
        queryColor: { color: KeyFigureColors.yellow, query: { recommended_action_class: 2 }},
      },
      {
        keyFigureInfo: { templateName: "recommendedActionClass1", displayName: "recommended-action-class-1", zIndex: 10 }, 
        queryColor: { color: KeyFigureColors.green, query: { recommended_action_class: 1 }},
      }, 
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCE_ORIENTATION_ID, 
    layerType: SceOrientationKeyFigureLayer,
    keyFigureInfo: { templateName: "sceOrientation", keyName: "sce-alignment-offset" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "sceOrientOffsetClass3", displayName: "sce-orient-offset-class-3", zIndex: 13 },
        queryColor: { colors: [KeyFigureColors.blue, KeyFigureColors.red],  query: { orientation_offset_class: 3 } }
      },
      {
        keyFigureInfo: { templateName: "sceOrientOffsetClass2", displayName: "sce-orient-offset-class-2", zIndex: 12 },
        queryColor: { colors: [KeyFigureColors.halfBlue, KeyFigureColors.halfRed], query: { orientation_offset_class: 2 } }
      },
      {
        keyFigureInfo: { templateName: "sceOrientOffsetClass1", displayName: "sce-orient-offset-class-1", zIndex: 10 },
        queryColor: { color: KeyFigureColors.green, query: { orientation_offset_class: 1 } }
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_ORIENTATION_ID, 
    layerType: ScaOrientationKeyFigureLayer,
    keyFigureInfo: { templateName: "scaOrientation", keyName: "sca-alignment-offset" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass3", displayName: "sca-orient-offset-class-3", zIndex: 13 },
        queryColor: { colors: [KeyFigureColors.blue, KeyFigureColors.red],  query: { orientation_offset_class: 3 } }
      },
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass2", displayName: "sca-orient-offset-class-2", zIndex: 12 },
        queryColor: { colors: [KeyFigureColors.halfBlue, KeyFigureColors.halfRed], query: { orientation_offset_class: 2 } }
      },
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass1", displayName: "sca-orient-offset-class-1", zIndex: 10 },
        queryColor: { color: KeyFigureColors.green, query: { orientation_offset_class: 1 } }
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_FRICTION_ID,
    layerType: ScaFrictionKeyFigureLayer,
    keyFigureInfo: { templateName: "scaFriction", keyName: "torsion-caused-friction-mean" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "sca-torsion-class-3", zIndex: 13 },
        queryColor: { color: KeyFigureColors.red, query: { torsion_class: 3 }},
      },
      {
        keyFigureInfo: { displayName: "sca-torsion-class-2", zIndex: 12 },
        queryColor: { color: KeyFigureColors.yellow, query: { torsion_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "sca-torsion-class-1", zIndex: 10 },
        queryColor: { color: KeyFigureColors.green, query: { torsion_class: 1 }},
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_SDX_ID,
    layerType: ScaSdxKeyFigureLayer,
    keyFigureInfo: { templateName: "scaSdx", keyName: "slope-deviation" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "slope-deviation-class-3", zIndex: 13 },
        queryColor: { color: KeyFigureColors.red, query: { sdx_class: 3 }},
      },
      {
        keyFigureInfo: { displayName: "slope-deviation-class-2", zIndex: 12 },
        queryColor: { color: KeyFigureColors.yellow, query: { sdx_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "slope-deviation-class-1", zIndex: 10 },
        queryColor: { color: KeyFigureColors.green, query: { sdx_class: 1 }},
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        queryColor: { color: KeyFigureColors.grey, query: { undefined: 1 }}
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.MISSING_MIRROR_ID,
    layerType: MissingMirrorKeyFigureLayer,
    keyFigureInfo: { keyName: "missing-mirror" },
    queryColor: { color: KeyFigureColors.red }
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_RGB_ID,
    layerType: ScaOrthoImageKeyFigureLayer,
    keyFigureInfo: { displayName: "ortho-image-rgb" }
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_IR_ID,
    layerType: ScaOrthoImageKeyFigureLayer,
    keyFigureInfo: { displayName: "ortho-image-ir" }
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_ORTHO_IMAGES_SDX_ID,
    layerType: ScaOrthoImageKeyFigureLayer,
    keyFigureInfo: { displayName: "ortho-image-sdx" }
  },
];
