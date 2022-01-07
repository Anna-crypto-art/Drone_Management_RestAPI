import { LoadingEvent } from "../types/events";
import { Layer } from "ol/layer";
import Map from "ol/Map";
import { Source } from "ol/source";
import { BaseLayerType } from "../types/layers";

export default abstract class LayerLoader<T extends Layer<Source> | undefined> {
  protected loadedLayer?: T;

  constructor(
    public readonly layerType: BaseLayerType,
    protected readonly map: Map,
    protected loadingCallback?: (e: LoadingEvent) => void
  ) {
    if (layerType.selected) {
      this.load();
    }
  }

  public async load(): Promise<Layer<Source> | undefined> {
    if (this.loadedLayer) {
      return this.loadedLayer;
    }

    this.loadingCallback && this.loadingCallback({ loading: true });

    this.loadedLayer = await this.do_load();

    this.loadingCallback && this.loadingCallback({ loading: false });

    return this.loadedLayer;
  }

  public get loaded(): boolean {
    return !!this.loadedLayer;
  }

  abstract do_load(): Promise<T>;
}
