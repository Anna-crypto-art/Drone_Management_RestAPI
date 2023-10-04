import { Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { ModuleKeyFigureLayer } from "./pv-module-key-figure";

export abstract class ModuleClassKeyFigure extends ModuleKeyFigureLayer {
  public getStyle(feature: FeatureLike): Style {
    const classColor = this.getClassColor(this.getQueryClassParam());

    const style = super.getStyle(feature);
    style.getFill().setColor(this.getColorWithAlpha(classColor, this.colorTransparency));
    style.getStroke().setColor(classColor)

    return style
  }

  public getLegend(): Legend | undefined {
    const legend = super.getLegend();

    if (!legend) {
      return legend;
    }

    legend.entries[0].color = this.getClassColor(this.getQueryClassParam());

    return legend;
  }

  protected abstract getQueryClassParam(): number;
}