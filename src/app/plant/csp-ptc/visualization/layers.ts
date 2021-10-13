import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AbsorberComponentLayer } from "./components/absorber-component-layer";
import { LoopComponentLayer } from "./components/loop-component-layer";
import { MirrorComponentLayer } from "./components/mirror-component-layer";
import { ScaComponentLayer } from "./components/sca-component-layer";
import { SceComponentLayer } from "./components/sce-component-layer";
import { ComponentLayer } from "./components/shared/component-layer";
import { ScaSdxImageKeyFigureLayer } from "./key-figures/sca-sdx-image-key-figure-layer";
import { SceAngleKeyFigureLayer } from "./key-figures/sce-angle-key-figure-layer";
import { HceKeyFigureLayer } from "./key-figures/shared/hce-key-figure-layer";
import { KeyFigureInfo, QueryColor } from "./key-figures/shared/types";

export const COMPONENT_LAYERS: (typeof ComponentLayer)[] = [
  AbsorberComponentLayer,
  LoopComponentLayer,
  MirrorComponentLayer,
  ScaComponentLayer,
  SceComponentLayer,
];

enum KeyFigureColors {
  green = "green",
  yellow = "yellow",
  red = "red",
  grey = "grey",
}

type KeyFigureTypeMap = {
  keyFigureId: AnalysisResultKeyFigure,
  layerType: any, // (typeof KeyFigureLayer) leads to: Type "T" is not assignable to type "AnalysisResultCspPtcHceSchema"
  keyFigureInfo?: KeyFigureInfo, // for all layers
  layers?: { keyFigureInfo?: KeyFigureInfo, queryColor: QueryColor }[],
};

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap[] = [
  {
    keyFigureId: AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "glassTubeTemperature", keyName: "glass-tube-temperature-class" },
    layers: [
      { 
        keyFigureInfo: { displayName: "glass-tube-temperature-class-3" }, 
        queryColor: { color: KeyFigureColors.red, query: { glass_tube_temperature_class: 3 }},
      }, 
      { 
        keyFigureInfo: { displayName: "glass-tube-temperature-class-2" }, 
        queryColor: { color: KeyFigureColors.yellow, query: { glass_tube_temperature_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "glass-tube-temperature-class-1" }, 
        queryColor: { color: KeyFigureColors.green, query: { glass_tube_temperature_class: 1 }},
      }, 
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "irIntensity", keyName: "ir-intensity-class" },
    layers: [
      { 
        keyFigureInfo: { displayName: "ir-intensity-class-3" }, 
        queryColor: { color: KeyFigureColors.red, query: { ir_intensity_class: 3 }},
      }, 
      { 
        keyFigureInfo: { displayName: "ir-intensity-class-2" }, 
        queryColor: { color: KeyFigureColors.yellow, query: { ir_intensity_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "ir-intensity-class-1" }, 
        queryColor: { color: KeyFigureColors.green, query: { ir_intensity_class: 1 }},
      }, 
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "recommendedAction", keyName: "recommended-action" },
    layers: [
      { 
        keyFigureInfo: { displayName: "recommended-action-class--3" }, 
        queryColor: { color: KeyFigureColors.red, query: { recommended_action_class: 3 }},
      }, 
      { 
        keyFigureInfo: { displayName: "recommended-action-class--2" }, 
        queryColor: { color: KeyFigureColors.yellow, query: { recommended_action_class: 2 }},
      },
      {
        keyFigureInfo: { displayName: "recommended-action-class--1" }, 
        queryColor: { color: KeyFigureColors.green, query: { recommended_action_class: 1 }},
      }, 
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.COATING_DEGRADATION_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "O2Penetration", keyName: "oxygen-penetration" },
    layers: [
      { keyFigureInfo: { displayName: "oxygen-penetration" }, queryColor: { color: "#ad0045", query: { missing_glass_tube: 1 }}},
      { keyFigureInfo: { displayName: "no-oxygen-penetration" }, queryColor: { color: KeyFigureColors.green, query: { missing_glass_tube: 0 }}},
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "H2Concentration", keyName: "high-hydrogen-concentration" },
    layers: [
      { keyFigureInfo: { displayName: "high-hydrogen-concentration" }, queryColor: { color: "#ad0045", query: { h2_concentration: 1 }}},
      { keyFigureInfo: { displayName: "no-high-hydrogen-concentration" }, queryColor: { color: KeyFigureColors.green, query: { h2_concentration: 0 }}},
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.MISSING_GLASS_TUBE_ID,
    layerType: HceKeyFigureLayer,
    keyFigureInfo: { templateName: "missingGhr", keyName: "missing-gct" },
    layers: [
      { keyFigureInfo: { displayName: "missing-gct" }, queryColor: { color: "#850000", query: { missing_glass_tube: 1 }}},
      { keyFigureInfo: { displayName: "no-missing-gct" }, queryColor: { color: KeyFigureColors.green, query: { missing_glass_tube: 0 }}},
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
];
