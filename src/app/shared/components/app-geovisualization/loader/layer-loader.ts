import { LoadingEvent } from "../types/events";
import { Layer } from "ol/layer";
import Map from "ol/Map";
import { Source } from "ol/source";
import { BaseLayerType, GeoJSONLayer } from "../types/layers";
import LayerRenderer from "ol/renderer/Layer";

export default abstract class LayerLoader<T extends Layer<Source, LayerRenderer<any>> | undefined> {
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

  public async load(): Promise<Layer<Source, LayerRenderer<any>> | undefined> {
    if (this.layerType.reloadLayer) {
      this.loadedLayer = undefined;
      this.layerType.reloadLayer = false;
    }

    if (this.loadedLayer) {
      return this.loadedLayer;
    }

    this.loadingCallback && this.loadingCallback({ loading: true });

    this.loadedLayer = await this.doLoad();

    this.loadingCallback && this.loadingCallback({ loading: false });

    return this.loadedLayer;
  }

  public get loaded(): boolean {
    return !!this.loadedLayer;
  }

  public async setVisible(visible: boolean) {
    if (visible) {
      (await this.load())?.setVisible(true);
    } else {
      if (this.loaded) {
        this.loadedLayer!.setVisible(false);

        if (this.layerType.reloadLayer) {
          this.map.removeLayer(this.loadedLayer!);
        }
      }
    }
  }

  abstract doLoad(): Promise<T>;
}
