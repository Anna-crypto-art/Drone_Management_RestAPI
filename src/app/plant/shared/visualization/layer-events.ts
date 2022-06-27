import { EventEmitter } from "events";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

export class LayerEvents extends EventEmitter {
  private readonly eventOrthoImageLoaded = "eventOrthoImageLoaded";
  private readonly eventRemoveOrthoImages = "eventRemoveOrthoImages";

  public emitOrthoImageLoaded(features: Feature<Geometry>[]) {
    this.emit(this.eventOrthoImageLoaded, features);
  }

  public onOrthoImageLoaded(callback: (features: Feature<Geometry>[]) => void) {
    this.on(this.eventOrthoImageLoaded, (features: Feature<Geometry>[]) => { callback(features); });
  }

  public emitRemoveOrthoImages(features: Feature<Geometry>[]) {
    this.emit(this.eventRemoveOrthoImages, features);
  }

  public onRemoveOrthoImages(callback: (features: Feature<Geometry>[]) => void) {
    this.on(this.eventRemoveOrthoImages, (features: Feature<Geometry>[]) => { callback(features); });
  }
}

export const layerEvents = new LayerEvents();