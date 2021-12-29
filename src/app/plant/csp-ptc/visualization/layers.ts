import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { AbsorberComponentLayer } from "./components/absorber-component-layer";
import { LoopComponentLayer } from "./components/loop-component-layer";
import { MirrorComponentLayer } from "./components/mirror-component-layer";
import { ScaComponentLayer } from "./components/sca-component-layer";
import { SceComponentLayer } from "./components/sce-component-layer";
import { ComponentLayer } from "../../shared/visualization/layers/component-layer";
import { MissingMirrorKeyFigureLayer } from "./key-figures/missing-mirror-key-figure-layer";
import { ScaFrictionKeyFigureLayer } from "./key-figures/sca-friction-key-figure";
import { ScaTrackingKeyFigureLayer } from "./key-figures/sca-tracking-key-figure-layer";
import { ScaSdxKeyFigureLayer } from "./key-figures/sca-sdx-key-figure-layer";
import { SceAlignmentKeyFigureLayer } from "./key-figures/sce-alignment-key-figure-layer";
import { BoolUndefinedHceKeyFigureLayer } from "./key-figures/shared/bool-hce-key-figure-layer";
import { KeyFigureTypeMap } from "../../shared/visualization/types";
import { KeyFigureColors } from "../../shared/visualization/layers/types";
import { ClassHceKeyFigureLayer } from "./key-figures/shared/class-hce-key-figure-layer";

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
    query: { missing_glass_tube: 1, undefined: 1 }
  },
  {
    keyFigureId: AnalysisResultKeyFigure.OXYGEN_PENETRATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "O2Penetration", keyName: "oxygen-penetration" },
    query: { oxygen_penetration: 1, undefined: 1 }
  },
  {
    keyFigureId: AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { templateName: "H2Concentration", keyName: "high-hydrogen-concentration" },
    query: { h2_concentration: 1, undefined: 1 },
  },
  {
    keyFigureId: AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    layerType: ClassHceKeyFigureLayer,
    keyFigureInfo: { templateName: "glassTubeTemperature", keyName: "glass-tube-temperature-class" },
    subLayers: [
      { 
        keyFigureInfo: { displayName: "glass-tube-temperature-class-3", zIndex: 13 }, 
        query: { glass_tube_temperature_class: 3 },
      }, 
      { 
        keyFigureInfo: { displayName: "glass-tube-temperature-class-2", zIndex: 12 }, 
        query: { glass_tube_temperature_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "glass-tube-temperature-class-1", zIndex: 10 }, 
        query: { glass_tube_temperature_class: 1 },
      }, 
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey,
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.IR_INTENSITY_ID,
    layerType: ClassHceKeyFigureLayer,
    keyFigureInfo: { templateName: "irIntensity", keyName: "ir-intensity-class" },
    subLayers: [
      { 
        keyFigureInfo: { displayName: "ir-intensity-class-3", zIndex: 13 }, 
        query: { ir_intensity_class: 3 },
      }, 
      { 
        keyFigureInfo: { displayName: "ir-intensity-class-2", zIndex: 12 }, 
        query: { ir_intensity_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "ir-intensity-class-1", zIndex: 10 }, 
        query: { ir_intensity_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        color: KeyFigureColors.grey,
        query: { undefined: 1 }
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID,
    layerType: ClassHceKeyFigureLayer,
    keyFigureInfo: { templateName: "recommendedAction", keyName: "recommended-action" },
    subLayers: [
      { 
        keyFigureInfo: { templateName: "recommendedActionClass3", displayName: "recommended-action-class-3", zIndex: 13 }, 
        query: { recommended_action_class: 3 },
      }, 
      { 
        keyFigureInfo: { templateName: "recommendedActionClass2", displayName: "recommended-action-class-2", zIndex: 12 }, 
        query: { recommended_action_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "recommendedActionClass1", displayName: "recommended-action-class-1", zIndex: 10 }, 
        query: { recommended_action_class: 1 },
      }, 
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCE_ALIGNMENT_ID, 
    layerType: SceAlignmentKeyFigureLayer,
    keyFigureInfo: { templateName: "sceOrientation", keyName: "sce-alignment-offset" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "sceOrientOffsetClass3", displayName: "sce-orient-offset-class-3", zIndex: 13 },
        query: { orientation_offset_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "sceOrientOffsetClass2", displayName: "sce-orient-offset-class-2", zIndex: 12 },
        query: { orientation_offset_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "sceOrientOffsetClass1", displayName: "sce-orient-offset-class-1", zIndex: 10 },
        query: { orientation_offset_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey,
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.SCA_TRACKING_DEVIATION_ID, 
    layerType: ScaTrackingKeyFigureLayer,
    keyFigureInfo: { templateName: "scaOrientation", keyName: "sca-alignment-offset" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass3", displayName: "sca-orient-offset-class-3", zIndex: 13 },
        query: { orientation_offset_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass2", displayName: "sca-orient-offset-class-2", zIndex: 12 },
        query: { orientation_offset_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass1", displayName: "sca-orient-offset-class-1", zIndex: 10 },
        query: { orientation_offset_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey,
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
        query: { torsion_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "sca-torsion-class-2", zIndex: 12 },
        query: { torsion_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "sca-torsion-class-1", zIndex: 10 },
        query: { torsion_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey
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
        query: { sdx_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "slope-deviation-class-2", zIndex: 12 },
        query: { sdx_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "slope-deviation-class-1", zIndex: 10 },
        query: { sdx_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey,
      }
    ]
  },
  {
    keyFigureId: AnalysisResultKeyFigure.MISSING_MIRROR_ID,
    layerType: MissingMirrorKeyFigureLayer,
    keyFigureInfo: { keyName: "missing-mirror" },
  },
];
