import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { Legend } from "@/app/plant/shared/visualization/types";
import { PvKeyFigureLayer } from "../../pv-key-figure-layer";
import { AnalysisResultPvTrackerSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-pv-tracker-schema";
import analysisResultPvMappingTracker from "@/app/shared/services/volateq-api/api-results-mappings/pv/analysis-result-pv-mapping-tracker";

export abstract class TrackerKeyFigureLayer extends PvKeyFigureLayer<AnalysisResultPvTrackerSchema> {
  protected readonly analysisResultMapping = analysisResultPvMappingTracker;

  protected showPcsZoomLevel = 16;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.getColor(),
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
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

  protected abstract getColor(): string;
}
