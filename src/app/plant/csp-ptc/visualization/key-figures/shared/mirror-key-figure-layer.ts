import analysisResultCspPtcMappingMirror from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-mirror";
import { AnalysisResultCspPtcMirrorSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-mirror-schema";
import { FeatureLike } from "ol/Feature";
import { Fill, Stroke, Style } from "ol/style";
import { KeyFigureLayer } from "./key-figure-layer";
import { KeyFigureColors, Legend } from "./types";

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