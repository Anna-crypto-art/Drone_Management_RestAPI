import { Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { ScaKeyFigureLayer } from "./sca-key-figure-layer";


export class ScaOrthoImageKeyFigureLayer extends ScaKeyFigureLayer {
  public getStyle(feature: FeatureLike): Style {
    return new Style({
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
    return undefined;
  }
}