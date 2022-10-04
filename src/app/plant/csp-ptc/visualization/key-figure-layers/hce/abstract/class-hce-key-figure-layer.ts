import { Legend } from "@/app/plant/shared/visualization/types";
import { HceKeyFigureLayer } from "./hce-key-figure-layer";

export abstract class ClassHceKeyFigureLayer extends HceKeyFigureLayer {
  protected abstract getQueryClass(): number | undefined;
  
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name: this.vueComponent.$t(this.getLegendName()).toString() + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }

  protected getLegendName(): string {
    return (this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!;
  }
}
