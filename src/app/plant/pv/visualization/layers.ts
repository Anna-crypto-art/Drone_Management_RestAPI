import { ApiKeyFigure } from "@/app/shared/services/volateq-api/api-key-figures";
import { GeoVisualPvQuery } from "@/app/shared/services/volateq-api/api-requests/geo-visual-query-requests";
import { ComponentLayer } from "../../shared/visualization/layers/component-layer";
import { KeyFigureColors } from "../../shared/visualization/layers/types";
import { KeyFigureTypeMap } from "../../shared/visualization/types";
import { TrackerComponentLayer } from "./component-layers/tracker-component-layer";
import { TrackerSoilingKeyFigureLayer } from "./key-figure-layers/tracker/tracker-soiling-key-figure-layer";

export const COMPONENT_LAYERS: typeof ComponentLayer[] = [
  TrackerComponentLayer,
];

export const KEY_FIGURE_LAYERS: KeyFigureTypeMap<GeoVisualPvQuery>[] = [
  {
    keyFigureId: ApiKeyFigure.TRACKER_SOILING_LEVEL_ID,
    layerType: TrackerSoilingKeyFigureLayer,
    keyFigureInfo: { keyName: "tracker-soiling-level", description: "tracker-soiling-level_expl" },
    subLayers: [
      {
        keyFigureInfo: { displayName: "tracker-soiling-level-3", zIndex: 13 },
        query: { tracker_soiling_level: 3 },
      },
      {
        keyFigureInfo: { displayName: "tracker-soiling-level-2", zIndex: 12 },
        query: { tracker_soiling_level: 2 },
      },
      {
        keyFigureInfo: { displayName: "tracker-soiling-level-1", zIndex: 10 },
        query: { tracker_soiling_level: 1 },
      },
      {
        keyFigureInfo: { displayName: "not-measured", zIndex: 11 },
        query: { undefined: 1 },
        color: KeyFigureColors.grey,
        invisibleAutoSelection: true,
      },
    ]
  }
];