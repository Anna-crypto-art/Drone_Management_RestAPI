import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { StyleFunction } from "ol/style/Style";
import { EventEmitter } from "events";

export interface BaseLayerType {
  name: string;
  type: "geojson" | "osm" | "group" | "custom";
  selected?: boolean;
  onSelected?: (selected: boolean) => void;
  visible?: boolean;
  styleClass?: string;
  reloadLayer?: boolean;
  id?: string;
  events?: EventEmitter;
  description?: string;
}

export interface GeoJSONLayer extends BaseLayerType {
  type: "geojson";
  geoJSONLoader: () => Record<string, unknown> | undefined | Promise<Record<string, unknown> | undefined>;
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

export type VectorGeoLayer = VectorLayer<VectorSource<Geometry>> | VectorImageLayer<VectorSource<Geometry>>;