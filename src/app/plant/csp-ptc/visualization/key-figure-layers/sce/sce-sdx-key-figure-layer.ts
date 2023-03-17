import { Legend } from "@/app/plant/shared/visualization/types";
import { SceKeyFigureLayer } from "./abstract/sce-key-figure-layer";

export class SceSdxKeyFigureLayer extends SceKeyFigureLayer {
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name:
            this.getLegendEntryTransName(
              "slope-deviation-class",
              this.analysisResult.csp_ptc!.sdx_rms_class_limits,
              this.query?.sdx_class,
              "[mrad]"
            ) + this.getLegendEntryCount(),
        },
      ],
    };
  }

  public getQueryClass(): number | undefined {
    return this.query?.sdx_class;
  }

  protected getColor(): string {
    return this.getClassColor(this.getQueryClass());
  }
}
