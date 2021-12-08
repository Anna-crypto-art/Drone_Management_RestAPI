import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AbsorberComponentLayer } from "./components/absorber-component-layer";
import { LoopComponentLayer } from "./components/loop-component-layer";
import { MirrorComponentLayer } from "./components/mirror-component-layer";
import { ScaComponentLayer } from "./components/sca-component-layer";
import { SceComponentLayer } from "./components/sce-component-layer";
import { ComponentLayer } from "./components/shared/component-layer";
import { MissingMirrorKeyFigureLayer } from "./key-figures/missing-mirror-key-figure-layer";
import { ScaSdxImageKeyFigureLayer } from "./key-figures/sca-sdx-image-key-figure-layer";
import { SceAngleKeyFigureLayer } from "./key-figures/sce-angle-key-figure-layer";
import { BoolUndefinedHceKeyFigureLayer } from "./key-figures/shared/bool-hce-key-figure-layer";
import { HceKeyFigureLayer } from "./key-figures/shared/hce-key-figure-layer";
import { KeyFigureColors, KeyFigureInfo, QueryColor } from "./key-figures/shared/types";

export const COMPONENT_LAYERS: (typeof ComponentLayer)[] = [
  AbsorberComponentLayer,
  LoopComponentLayer,
  // MirrorComponentLayer, Too many mirrors (>200k) leads to OutOfMemory
  ScaComponentLayer,
  SceComponentLayer,
];

export type KeyFigureTypeMap = {
  keyFigureId: AnalysisResultKeyFigure,
  layerType: any, // (typeof KeyFigureLayer) leads to: Type "T" is not assignable to type "AnalysisResultCspPtcHceSchema"
  /**
   * applies to all subLayers if not overwritten
   */
  keyFigureInfo?: KeyFigureInfo,
  /**
   * URL query parameters and color for the layer
   */
  queryColor?: QueryColor,
  /**
   * If the layer has subLayers it will be handled as a group layer.
   */
  subLayers?: { keyFigureInfo?: KeyFigureInfo, queryColor: QueryColor }[],
};

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap[] = [
  {
    keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_TUBE_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "missingGhr", keyName: "missing-gct" },
    queryColor: { color: KeyFigureColors.red, query: { missing_glass_tube: 1, undefined: 1 }}
  },
  {
    keyFigureId: AnalysisResultKeyFigure.COATING_DEGRADATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "O2Penetration", keyName: "oxygen-penetration" },
    queryColor: { color: KeyFigureColors.red, query: { coating_degraded: 1, undefined: 1 }}
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
    keyFigureId: AnalysisResultKeyFigure.SCE_ANGLE_ID, 
    layerType: SceAngleKeyFigureLayer,
    keyFigureInfo: { templateName: "sceAngle", keyName: "angle-deviation" },
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_SDX_IMAGE_ID, 
    layerType: ScaSdxImageKeyFigureLayer,
    keyFigureInfo: { templateName: "SDX-Images", keyName: "sdx-images" },
  },
  {
    keyFigureId: AnalysisResultKeyFigure.MISSING_MIRROR_ID,
    layerType: MissingMirrorKeyFigureLayer,
    keyFigureInfo: { keyName: "missing-mirror" },
    queryColor: { color: KeyFigureColors.red }
  }
];
