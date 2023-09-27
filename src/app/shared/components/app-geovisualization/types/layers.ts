import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { StyleFunction } from "ol/style/Style";
import { SequentialEventEmitter } from "@/app/shared/services/app-event-service/sequential-event-emitter";
import { FeatureLike } from "ol/Feature";
import { Coordinate } from "ol/coordinate";
import { IAppGeoJsonLayerCheckbox } from "./components";

export interface GeoJSON<T> {
  type: string;
  features: (FeatureLike & T)[] ;
}

export interface BaseLayerType {
  name: string;
  type: "geojson" | "osm" | "group" | "custom";
  selected?: boolean;
  onSelected?: (selected: boolean) => Promise<void> | void;
  visible?: boolean;
  styleClass?: string;
  reloadLayer?: boolean;
  id?: string;
  events?: SequentialEventEmitter;
  description?: string;
  disabled?: boolean;
}

export interface GeoJSONLayer extends BaseLayerType {
  type: "geojson";
  geoJSONLoader: () => GeoJSON<unknown> | undefined | Promise<GeoJSON<unknown> | undefined>;
  geoJSONOptions?: {
    dataProjection: string;
    featureProjection: string;
  };
  style?: StyleFunction;
  autoZoom?: boolean;
  zIndex?: number;
  layerType?: "VectorLayer" | "VectorImageLayer";
  minZoom?: number;
  myLocation?: Coordinate;
}

export interface OSMLayer extends BaseLayerType {
  type: "osm";
  satellite?: boolean;
}

export interface GroupLayer extends BaseLayerType {
  type: "group";
  childLayers: LayerType[];
  singleSelection?: boolean;
  icon?: string;
  customSlot?: string;
  collapsable?: boolean;
}

export interface CustomLayer extends BaseLayerType {
  type: "custom";
  customLoader: () => void | Promise<void>;
}

export type LayerType = GeoJSONLayer | OSMLayer | GroupLayer | CustomLayer;

export type VectorGeoLayer = VectorLayer<VectorSource<Geometry>> | VectorImageLayer<VectorSource<Geometry>>;

export interface IGeoLayer {
  id: string;
  name: string;
  selected: boolean;
  description: string | undefined;
  onSelectedChanged: () => Promise<void> | void;
  loadGeoJSON: () => GeoJSON<unknown> | undefined | Promise<GeoJSON<unknown> | undefined>;
  getStyle: StyleFunction;
  visible: boolean;
  reloadLayerOnNextSelection: boolean;
  autoZoom: boolean;
  zIndex: number | undefined;
  minZoom: number | undefined;
  loadedLayer: VectorGeoLayer | undefined;
  appLayerCheckbox: IAppGeoJsonLayerCheckbox | undefined;
}