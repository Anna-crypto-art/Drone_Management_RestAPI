import { Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Style } from "ol/style";
import { ModuleKeyFigureLayer } from "./pv-module-key-figure";

export abstract class ModuleClassKeyFigure extends ModuleKeyFigureLayer {
  public getStyle(feature: FeatureLike): Style {
    const style = super.getStyle(feature);
    
    style.getFill().setColor(this.getClassColor(this.getQueryClassParam()));
    
    return style
  }

  protected getLegend(): Legend | undefined {
    const legend = super.getLegend();

    if (!legend) {
      return legend;
    }

    legend.entries[0].color = this.getClassColor(this.getQueryClassParam());

    return legend;
  }

  protected abstract getQueryClassParam(): number;
}