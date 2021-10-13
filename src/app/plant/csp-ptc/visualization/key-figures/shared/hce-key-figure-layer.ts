import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { KeyFigureLayer } from "./key-figure-layer";
import { Legend } from "./types";

export abstract class HceKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;

  protected showPcsZoomLevel = 19;

  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | undefined = this.getProperties(feature)?.value as boolean;

    return new Style({
      stroke: featureValue && new Stroke({
        color: this.queryColor!.color,
        width: 5,
      }) || undefined,
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: this.queryColor!.color,
          name: this.vueComponent.$t(this.keyFigureInfo.displayName!).toString() + this.getLegendEntryCount(),
        }
      ]
    };
  }
}