import { Legend } from "@/app/plant/shared/map-view/types";
import { SwivelKeyFigureLayer } from "./swivel-key-figure-layer";

export abstract class ClassSwivelKeyFigureLayer extends SwivelKeyFigureLayer {
  protected abstract getQueryClass(): number | undefined;
  
  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  public getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.color!,
          name: this.getLegendName() + this.getLegendEntryCount(),
        },
      ],
    };
  }
}