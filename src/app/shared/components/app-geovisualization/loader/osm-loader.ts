import { LoadingEvent } from "../types/events";
import { OSMLayer } from "../types/layers";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import { OSM, Source, XYZ } from "ol/source";
import TileSource from "ol/source/Tile";
import LayerLoader from "./layer-loader";
import { Layer } from "ol/layer";
import LayerRenderer from "ol/renderer/Layer";

export class OSMLoader extends LayerLoader<TileLayer<TileSource>> {
  constructor(public readonly layerType: OSMLayer, map: Map, loadingEvent: (e: LoadingEvent) => void) {
    super(layerType, map, loadingEvent);
  }

  async do_load(): Promise<TileLayer<TileSource>> {
    let mapLayer!: TileLayer<TileSource>;

    if (this.layerType.satellite) {
      mapLayer = new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        })
      });
    } else {
      mapLayer = new TileLayer({ source: new OSM() });
    }

    this.map.addLayer(mapLayer);

    return mapLayer;
  }
}
