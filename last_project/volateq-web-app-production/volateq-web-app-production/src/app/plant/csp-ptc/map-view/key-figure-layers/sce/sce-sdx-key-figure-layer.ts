import { Legend } from "@/app/plant/shared/map-view/types";
import { SceKeyFigureLayer } from "./abstract/sce-key-figure-layer";

export class SceSdxKeyFigureLayer extends SceKeyFigureLayer {
  public getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name: this.getLegendName() + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getLegendName(): string {
    if (!this.getQueryClass()) { // Avoids a stackoverflow
      return super.getLegendName();
    }

    return this.getLegendEntryTransName(
      "slope-deviation-class",
      this.analysisResult.csp_ptc!.sdx_rms_class_limits,
      this.getQueryClass(),
      "[mrad]"
    );
  }

  public getQueryClass(): 1 | 2 | 3 | undefined {
    return this.query?.sdx_class;
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }
}
