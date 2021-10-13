import { LoadingEvent } from "../types/events";
import { OSMLayer } from "../types/layers";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { OSM } from "ol/source";
import TileSource from "ol/source/Tile";
import LayerLoader from "./layer-loader";

export class OSMLoader extends LayerLoader<TileLayer<TileSource>> {
  constructor(
    public readonly layerType: OSMLayer,
    map: Map,
    loadingEvent: (e: LoadingEvent) => void
  ) {
    super(layerType, map, loadingEvent);
  }

  async do_load(): Promise<TileLayer<TileSource>> {
    const mapLayer = new TileLayer({ source: new OSM() });

    this.map.addLayer(mapLayer);

    return mapLayer;
  }
}
