import { KeyFigureLayer } from "@/app/plant/shared/visualization/layers/key-figure-layer";
import { Legend } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingMirror from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-mirror";
import { AnalysisResultCspPtcMirrorSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-mirror-schema";
import { FeatureLike } from "ol/Feature";
import { Fill, Stroke, Style } from "ol/style";

export class MirrorKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcMirrorSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingMirror;

  protected showPcsZoomLevel = 21;
  protected readonly strokeWidth = 3;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.queryColor!.color,
      }),
      stroke: new Stroke({
        color: this.queryColor!.color,
        width: this.strokeWidth,
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureInfo.displayName || this.keyFigureId.toString(),
      entries: [
        {
          color: this.queryColor!.color!,
          name: this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(),
        }
      ]
    };
  }
}