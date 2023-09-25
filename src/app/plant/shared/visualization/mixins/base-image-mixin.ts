import { LayerBase } from "../layers/layer-base";
import { IImageMixin, MixinImage } from "./types";

export abstract class BaseImageMixin<T extends IImageMixin> {
  protected images: MixinImage[] | null = null;

  constructor(
    protected readonly layer: LayerBase & T,
  ) {}

  protected isImageAvailable(image: MixinImage): boolean {
    return this.images !== null && !!this.layer.analysisResult 
      && !!this.layer.analysisResult.key_figures.find(keyFigure => keyFigure.id === image.keyFigureId)
  }
}