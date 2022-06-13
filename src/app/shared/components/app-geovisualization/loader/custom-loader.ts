import { LoadingEvent } from "../types/events";
import { CustomLayer } from "../types/layers";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import LayerLoader from "./layer-loader";

export class CustomLoader extends LayerLoader<undefined> {
  constructor(public readonly layerType: CustomLayer, map: Map, loadingEvent: (e: LoadingEvent) => void) {
    super(layerType, map, loadingEvent);
  }

  async doLoad(): Promise<undefined> {
    await this.layerType.customLoader();

    this.map.getLayers().forEach(layer => {
      if (layer instanceof VectorLayer) {
        layer.getSource().changed();
      }
    });

    return undefined;
  }
}
