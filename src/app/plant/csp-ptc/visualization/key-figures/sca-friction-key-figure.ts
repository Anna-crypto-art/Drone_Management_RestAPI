import { Legend } from "./shared/types";
import { ScaKeyFigureLayer } from "./shared/sca-key-figure-layer";


export class ScaFrictionKeyFigureLayer extends ScaKeyFigureLayer {
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
            "sca-torsion-class", 
            this.analysisResult.csp_ptc.sca_torsion_class_limits,
            this.queryColor?.query?.torsion_class) + this.getLegendEntryCount(),
        }
      ]
    };
  }
}