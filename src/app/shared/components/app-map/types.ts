import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import { StyleFunction } from "ol/style/Style";
import { FeatureLike } from "ol/Feature";
import Map from "ol/Map";

export interface GeoJSON<T> {
  type: string;
  features: (FeatureLike & T)[] ;
}

export interface IAppGeoJsonLayerCheckbox {
  map: Map;
  setSelected(selected: boolean): Promise<void>;
}

export type VectorGeoLayer = VectorLayer<VectorSource<Geometry>> | VectorImageLayer<VectorSource<Geometry>>;

export interface IGeoLayer {
  id: string;
  name: string;
  selected: boolean;
  description: string | undefined;
  onSelectedChanged: () => Promise<void> | void;
  loadGeoJSON: () => GeoJSON<unknown> | undefined | Promise<GeoJSON<unknown> | undefined>;
  style: StyleFunction;
  visible: boolean;
  reloadLayerOnNextSelection: boolean;
  autoZoom: boolean;
  zIndex: number | undefined;
  minZoomLevel: number | undefined;
  loadedLayer: VectorGeoLayer | undefined;
  appLayerCheckbox: IAppGeoJsonLayerCheckbox | undefined;
}
