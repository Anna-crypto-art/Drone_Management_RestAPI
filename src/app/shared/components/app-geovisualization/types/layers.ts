import { StyleFunction } from "ol/style/Style";

export interface BaseLayerType {
  name: string;
  type: "geojson" | "osm" | "group" | "custom";
  selected?: boolean;
  onSelected?: (selected: boolean) => void;
  visible?: boolean;
  styleClass?: string;
  reloadLayer?: boolean;
}

export interface GeoJSONLayer extends BaseLayerType {
  type: "geojson";
  geoJSONLoader: () => Record<string, unknown> | Promise<Record<string, unknown>>;
  geoJSONOptions?: {
    dataProjection: string;
    featureProjection: string;
  };
  style?: StyleFunction;
  autoZoom?: boolean;
  zIndex?: number;
  layerType?: "VectorLayer" | "VectorImageLayer";
}

export interface OSMLayer extends BaseLayerType {
  type: "osm";
  satellite?: boolean;
}

export interface GroupLayer extends BaseLayerType {
  type: "group";
  childLayers: LayerType[];
  singleSelection?: boolean;
}

export interface CustomLayer extends BaseLayerType {
  type: "custom";
  customLoader: () => void | Promise<void>;
}

export type LayerType = GeoJSONLayer | OSMLayer | GroupLayer | CustomLayer;
