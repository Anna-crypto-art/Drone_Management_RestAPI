import { Legend } from "@/app/plant/shared/visualization/types";
import { ScaKeyFigureLayer } from "./shared/sca-key-figure-layer";


export class ScaSdxKeyFigureLayer extends ScaKeyFigureLayer {
  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureInfo.displayName || this.keyFigureId.toString(),
      entries: [
        {
          color: this.queryColor!.color!,
          name: this.getLegendEntryTransName(
            "slope-deviation-class",
            this.analysisResult.csp_ptc.sdx_rms_class_limits,
            this.queryColor?.query?.sdx_class,
            "[mrad]") + this.getLegendEntryCount(),
        }
      ]
    };
  }
}