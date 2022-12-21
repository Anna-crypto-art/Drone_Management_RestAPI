import { ComponentLayer } from "../../shared/visualization/layers/component-layer";
import { TrackerComponentLayer } from "./component-layers/tracker-component-layer";

export const COMPONENT_LAYERS: typeof ComponentLayer[] = [
  TrackerComponentLayer,
];