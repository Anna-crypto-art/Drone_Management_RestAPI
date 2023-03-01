import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { AbsorberComponentLayer } from "./component-layers/absorber-component-layer";
import { LoopComponentLayer } from "./component-layers/loop-component-layer";
import { ScaComponentLayer } from "./component-layers/sca-component-layer";
import { SceComponentLayer } from "./component-layers/sce-component-layer";
import { ComponentLayer } from "../../shared/visualization/layers/component-layer";
import { MissingMirrorKeyFigureLayer } from "./key-figure-layers/mirror/missing-mirror-key-figure-layer";
import { ScaFrictionKeyFigureLayer } from "./key-figure-layers/sca/sca-friction-key-figure";
import { ScaTrackingKeyFigureLayer } from "./key-figure-layers/sca/sca-tracking-key-figure-layer";
import { ScaSdxKeyFigureLayer } from "./key-figure-layers/sca/sca-sdx-key-figure-layer";
import { SceSdxKeyFigureLayer } from "./key-figure-layers/sce/sce-sdx-key-figure-layer";
import { SceAlignmentKeyFigureLayer } from "./key-figure-layers/sce/sce-alignment-key-figure-layer";
import { BoolUndefinedHceKeyFigureLayer } from "./key-figure-layers/hce/bool-hce-key-figure-layer";
import { KeyFigureTypeMap } from "../../shared/visualization/types";
import { LayerColor } from "../../shared/visualization/layers/types";
import { GlassTemperatureKeyFigureLayer } from "./key-figure-layers/hce/glass-temperature-key-figure-layer";
import { ScaAverageTrackingKeyFigureLayer } from "./key-figure-layers/sca/sca-average-tracking-key-figure-layer";
import { RecommendedActionKeyFigureLayer } from "./key-figure-layers/hce/recommended-action-key-figure-layer";
import { HcePositionCenterKeyFigureLayer, HcePositionSupportKeyFigureLayer } from "./key-figure-layers/hce/hce-position-key-figure-layer";
import { GeoVisualCspPtcQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { SwivelComponentLayer } from "./component-layers/swivel-component-layer";
import { SwivelGrippingPotentialKeyFigureLayer } from "./key-figure-layers/swivel/swivel-gripping-potential-key-figure-layer";

export const COMPONENT_LAYERS: typeof ComponentLayer[] = [
  AbsorberComponentLayer,
  LoopComponentLayer,
  // MirrorComponentLayer, Too many mirrors (>200k) leads to OutOfMemory
  ScaComponentLayer,
  SceComponentLayer,
  SwivelComponentLayer,
];

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap<GeoVisualCspPtcQuery>[] = [
  {
    keyFigureId: ApiKeyFigure.MISSING_GLASS_TUBE_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { keyName: "missing-gct", description: "missing-gct_expl", zIndex: 11 },
    query: { missing_glass_tube: 1, undefined: 1 },
  },
  {
    keyFigureId: ApiKeyFigure.OXYGEN_PENETRATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { keyName: "oxygen-penetration", description: "oxygen-penetration_expl", zIndex: 11 },
    query: { oxygen_penetration: 1, undefined: 1 },
  },
  {
    keyFigureId: ApiKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { keyName: "hydrogen-penetration", description: "hydrogen-penetration_expl", zIndex: 11 },
    query: { h2_concentration: 1, undefined: 1 },
  },
  {
    keyFigureId: ApiKeyFigure.HOT_GLASS_TUBE_ENDS_ID,
    layerType: BoolUndefinedHceKeyFigureLayer,
    keyFigureInfo: { keyName: "hot-glass-tube-ends", description: "hot-glass-tube-ends_expl", zIndex: 11 },
    query: { hot_glass_tube_ends: 1, undefined: 1 },
  },
  {
    keyFigureId: ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID,
    layerType: GlassTemperatureKeyFigureLayer,
    keyFigureInfo: { keyName: "glass-tube-temperature-class", description: "glass-tube-temperature-class_expl" },
    subLayers: [
      {
        displayCondition: analysisResult => analysisResult.csp_ptc.glass_tube_temperature_class_count === 4,
        keyFigureInfo: { displayName: "glass-tube-temperature-class-4", zIndex: 14 },
        query: { glass_tube_temperature_class: 4 },
      },
      {
        keyFigureInfo: {
          templateName: "glassTubeTemperatureClass3",
          displayName: "glass-tube-temperature-class-3",
          zIndex: 13,
        },
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
        keyFigureInfo: { templateName: "glassTubeTemperatureNotMeasured", displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.HCE_RECOMMENDED_ACTION_CLASS_ID,
    layerType: RecommendedActionKeyFigureLayer,
    keyFigureInfo: { keyName: "recommended-action", description: "recommended-action_expl" },
    subLayers: [
      {
        keyFigureInfo: {
          displayName: "recommended-action-class-3",
          description: "recommended-action-class-3_expl",
          zIndex: 13,
        },
        query: { recommended_action_class: 3 },
      },
      {
        keyFigureInfo: {
          displayName: "recommended-action-class-2",
          description: "recommended-action-class-2_expl",
          zIndex: 12,
        },
        query: { recommended_action_class: 2 },
      },
      {
        keyFigureInfo: {
          displayName: "recommended-action-class-1",
          description: "recommended-action-class-1_expl",
          zIndex: 10,
        },
        query: { recommended_action_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    layerType: HcePositionSupportKeyFigureLayer,
    keyFigureInfo: { keyName: "hce-position-support-offset-class", description: "hce-position-support-offset_expl" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "hcePositionSupportOffsetClass3", displayName: "hce-position-support-offset-class-3", zIndex: 13 },
        query: { key_figure_class_name: "HcePositionSupportKeyFigure", hce_position_support_offset_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "hcePositionSupportOffsetClass2", displayName: "hce-position-support-offset-class-2", zIndex: 12 },
        query: { key_figure_class_name: "HcePositionSupportKeyFigure", hce_position_support_offset_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "hcePositionSupportOffsetClass1", displayName: "hce-position-support-offset-class-1", zIndex: 11 },
        query: { key_figure_class_name: "HcePositionSupportKeyFigure", hce_position_support_offset_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { key_figure_class_name: "HcePositionSupportKeyFigure", undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.HCE_POSITION_ID,
    layerType: HcePositionCenterKeyFigureLayer,
    keyFigureInfo: { keyName: "hce-position-center-offset-class", description: "hce-position-center-offset_expl" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "hcePositionCenterOffsetClass3", displayName: "hce-position-center-offset-class-3", zIndex: 13 },
        query: { key_figure_class_name: "HcePositionCenterKeyFigure", hce_position_center_offset_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "hcePositionCenterOffsetClass2", displayName: "hce-position-center-offset-class-2", zIndex: 12 },
        query: { key_figure_class_name: "HcePositionCenterKeyFigure", hce_position_center_offset_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "hcePositionCenterOffsetClass1", displayName: "hce-position-center-offset-class-1", zIndex: 11 },
        query: { key_figure_class_name: "HcePositionCenterKeyFigure", hce_position_center_offset_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { key_figure_class_name: "HcePositionCenterKeyFigure", undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.SCE_ALIGNMENT_ID,
    layerType: SceAlignmentKeyFigureLayer,
    keyFigureInfo: { keyName: "sce-alignment-offset", description: "sce-alignment-offset_expl" },
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
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.SCE_SDX_ID,
    layerType: SceSdxKeyFigureLayer,
    keyFigureInfo: { keyName: "sce-slope-deviation", description: "sce-slope-deviation_expl" },
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
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.SCA_TRACKING_DEVIATION_ID,
    layerType: ScaTrackingKeyFigureLayer,
    keyFigureInfo: { keyName: "tracking-offset", description: "tracking-offset_expl" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass3", displayName: "sca-orient-offset-class-3", zIndex: 13 },
        query: { key_figure_class_name: "ScaTrackingKeyFigure", orientation_offset_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass2", displayName: "sca-orient-offset-class-2", zIndex: 12 },
        query: { key_figure_class_name: "ScaTrackingKeyFigure", orientation_offset_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "scaOrientOffsetClass1", displayName: "sca-orient-offset-class-1", zIndex: 10 },
        query: { key_figure_class_name: "ScaTrackingKeyFigure", orientation_offset_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { key_figure_class_name: "ScaTrackingKeyFigure", undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.SCA_TRACKING_DEVIATION_ID,
    layerType: ScaAverageTrackingKeyFigureLayer,
    keyFigureInfo: { keyName: "average-tracking-offset", description: "average-tracking-offset_expl" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "scaAvgOrientOffsetClass3", displayName: "sca-avg-orient-offset-class-3", zIndex: 13 },
        query: { key_figure_class_name: "ScaAverageTrackingKeyFigure", orientation_offset_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "scaAvgOrientOffsetClass2", displayName: "sca-avg-orient-offset-class-2", zIndex: 12 },
        query: { key_figure_class_name: "ScaAverageTrackingKeyFigure", orientation_offset_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "scaAvgOrientOffsetClass1", displayName: "sca-avg-orient-offset-class-1", zIndex: 10 },
        query: { key_figure_class_name: "ScaAverageTrackingKeyFigure", orientation_offset_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { key_figure_class_name: "ScaAverageTrackingKeyFigure", undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.SCA_FRICTION_ID,
    layerType: ScaFrictionKeyFigureLayer,
    keyFigureInfo: { keyName: "torsion-caused-friction-mean", description: "torsion-caused-friction-mean_expl" },
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
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.SCA_SDX_ID,
    layerType: ScaSdxKeyFigureLayer,
    keyFigureInfo: { keyName: "sca-slope-deviation", description: "sca-slope-deviation_expl" },
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
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
  {
    keyFigureId: ApiKeyFigure.MISSING_MIRROR_ID,
    layerType: MissingMirrorKeyFigureLayer,
    keyFigureInfo: { keyName: "missing-mirror" },
    query: { undefined: 1 },
  },
  {
    keyFigureId: ApiKeyFigure.SWIVEL_GRIPPING_POTENTIAL_CLASS_ID,
    layerType: SwivelGrippingPotentialKeyFigureLayer,
    keyFigureInfo: { keyName: "rotation-joint-gripping-potential-class", description: "rotation-joint-gripping-potential-class_expl" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "rotation-joint-gripping-potential-class-3", zIndex: 13 },
        query: { gripping_potential_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "rotation-joint-gripping-potential-class-2", zIndex: 12 },
        query: { gripping_potential_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "rotation-joint-gripping-potential-class-1", zIndex: 10 },
        query: { gripping_potential_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ],
  },
];
