import { Legend } from "@/app/plant/shared/visualization/types";
import { SwivelKeyFigureLayer } from "./swivel-key-figure-layer";

export abstract class ClassSwivelKeyFigureLayer extends SwivelKeyFigureLayer {
  protected abstract getQueryClass(): number | undefined;
  
  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.color!,
          name: this.vueComponent.$t(this.getLegendName()).toString() + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getLegendName(): string {
    return (this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!;
  }
}
