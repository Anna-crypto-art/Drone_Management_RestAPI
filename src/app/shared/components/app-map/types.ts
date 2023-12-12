import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";
import Style, { StyleFunction } from "ol/style/Style";
import { FeatureLike } from "ol/Feature";
import Map from "ol/Map";
import { BaseAuthComponent } from "../base-auth-component/base-auth-component";
import { BaseComponent } from "../base-component/base-component";

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
  selected: boolean;
  description: string | undefined;
  name: string;
  getDisplayName: () => string;
  onSelectedChanged: () => Promise<void> | void;
  loadGeoJSON: () => GeoJSON<unknown> | undefined | Promise<GeoJSON<unknown> | undefined>;
  style: (feature: FeatureLike) => Style | Style[];
  setLoading: (loading: boolean, loadingStatus?: string) => Promise<void>;
  visible: boolean;
  reloadLayerOnNextSelection: boolean;
  autoZoom: boolean;
  zIndex: number | undefined;
  minZoomLevel: number | undefined;
  loadedLayer: VectorGeoLayer | undefined;
  appLayerCheckbox: IAppGeoJsonLayerCheckbox & BaseAuthComponent | undefined;
}
