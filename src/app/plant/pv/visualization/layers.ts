import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualPvQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { ComponentLayer } from "../../shared/visualization/layers/component-layer";
import { LayerColor } from "../../shared/visualization/layers/types";
import { KeyFigureTypeMap } from "../../shared/visualization/types";
import { TrackerComponentLayer } from "./component-layers/tracker-component-layer";
import { ModuleBrokenGlassKeyFigure } from "./key-figure-layers/module/module-broken-glass-key-figure";
import { ModuleCellBrokenKeyFigure } from "./key-figure-layers/module/module-cell-broken-key-figure";
import { ModuleCellTransferResistanceKeyFigure } from "./key-figure-layers/module/module-cell-transfer-resistance-key-figure";
import { ModuleOpenCircuitKeyFigure } from "./key-figure-layers/module/module-open-circuit-key-figure";
import { ModuleShortCircuitKeyFigure } from "./key-figure-layers/module/module-short-circuit-key-figure";
import { ModuleSoilingKeyFigure } from "./key-figure-layers/module/module-soiling-key-figure";
import { ModuleSubstringShortCircuitKeyFigure } from "./key-figure-layers/module/module-substring-short-circuit-key-figure";
import { TrackerSoilingKeyFigureLayer } from "./key-figure-layers/tracker/tracker-soiling-key-figure-layer";
import { TrackingDeviationKeyFigureLayer } from "./key-figure-layers/tracker/tracking-deviation-key-figure-layer";

export const COMPONENT_LAYERS: typeof ComponentLayer[] = [
  TrackerComponentLayer,
];

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap<GeoVisualPvQuery>[] = [
  {
    keyFigureId: ApiKeyFigure.TRACKER_SOILING_LEVEL_ID,
    layerType: TrackerSoilingKeyFigureLayer,
    keyFigureInfo: { keyName: "pv-tracker-soiling-level", description: "pv-tracker-soiling-level_expl" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "pvTrackerSolingLevel3", displayName: "pv-tracker-soiling-level-3", zIndex: 13 },
        query: { tracker_soiling_level: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-tracker-soiling-level-2", zIndex: 12 },
        query: { tracker_soiling_level: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-tracker-soiling-level-1", zIndex: 10 },
        query: { tracker_soiling_level: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.TRACKING_DEVIATION_ID,
    layerType: TrackingDeviationKeyFigureLayer,
    keyFigureInfo: { keyName: "pv-tracker-tracking-deviation", description: "pv-tracker-tracking-deviation_expl" },
    subLayers: [
      {
        keyFigureInfo: { templateName: "pvTrackerDeviation3", displayName: "pv-tracker-alignment-offset-class-3", zIndex: 13 },
        query: { tracker_deviation_class: 3 },
      },
      {
        keyFigureInfo: { templateName: "pvTrackerDeviation2", displayName: "pv-tracker-alignment-offset-class-2", zIndex: 12 },
        query: { tracker_deviation_class: 2 },
      },
      {
        keyFigureInfo: { templateName: "pvTrackerDeviation1", displayName: "pv-tracker-alignment-offset-class-1", zIndex: 10 },
        query: { tracker_deviation_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_SOILING_LEVEL_ID,
    layerType: ModuleSoilingKeyFigure,
    keyFigureInfo: { keyName: "pv-module-soiling-level", description: "pv-module-soiling-level_expl" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-soiling-level-3", zIndex: 13 },
        query: { module_soiling_level: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-soiling-level-2", zIndex: 12 },
        query: { module_soiling_level: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-soiling-level-1", zIndex: 10 },
        query: { module_soiling_level: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_BROKEN_GLASS_ID,
    layerType: ModuleBrokenGlassKeyFigure,
    keyFigureInfo: { keyName: "pv-module-broken-glass" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-broken-glass-class-3", zIndex: 13 },
        query: { module_broken_glass_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-broken-glass-class-2", zIndex: 12 },
        query: { module_broken_glass_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-broken-glass-class-1", zIndex: 10 },
        query: { module_broken_glass_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_SHORT_CIRCUIT_ID,
    layerType: ModuleShortCircuitKeyFigure,
    keyFigureInfo: { keyName: "pv-module-short-circuit" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-short-circuit-class-3", zIndex: 13 },
        query: { module_short_circuit_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-short-circuit-class-2", zIndex: 12 },
        query: { module_short_circuit_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-short-circuit-class-1", zIndex: 10 },
        query: { module_short_circuit_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.MODULE_OPEN_CIRCUIT_ID,
    layerType: ModuleOpenCircuitKeyFigure,
    keyFigureInfo: { keyName: "pv-module-open-circuit" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-open-circuit-class-2", zIndex: 12 },
        query: { module_open_circuit_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-open-circuit-class-1", zIndex: 10 },
        query: { module_open_circuit_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.SUBSTRING_SHORT_CIRCUIT_ID,
    layerType: ModuleSubstringShortCircuitKeyFigure,
    keyFigureInfo: { keyName: "pv-module-substring-short-circuit" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-substring-short-circuit-class-3", zIndex: 13 },
        query: { module_substring_short_circuit_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-substring-short-circuit-class-2", zIndex: 12 },
        query: { module_substring_short_circuit_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-substring-short-circuit-class-1", zIndex: 10 },
        query: { module_substring_short_circuit_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.CELL_BROKEN_ID,
    layerType: ModuleCellBrokenKeyFigure,
    keyFigureInfo: { keyName: "pv-module-cell-broken" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-cell-broken-class-3", zIndex: 13 },
        query: { module_cell_broken_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-cell-broken-class-2", zIndex: 12 },
        query: { module_cell_broken_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-cell-broken-class-1", zIndex: 10 },
        query: { module_cell_broken_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
  {
    keyFigureId: ApiKeyFigure.CELL_TRANSFER_RESISTANCE_ID,
    layerType: ModuleCellTransferResistanceKeyFigure,
    keyFigureInfo: { keyName: "pv-module-cell-transfer-resistance" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "pv-module-cell-transfer-resistance-class-3", zIndex: 13 },
        query: { module_cell_transfer_resistance_class: 3 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-cell-transfer-resistance-class-2", zIndex: 12 },
        query: { module_cell_transfer_resistance_class: 2 },
      },
      {
        keyFigureInfo: { displayName: "pv-module-cell-transfer-resistance-class-1", zIndex: 10 },
        query: { module_cell_transfer_resistance_class: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: LayerColor.grey,
        invisibleAutoSelection: true,
      },
    ]
  },
];