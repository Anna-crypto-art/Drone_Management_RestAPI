import { FeatureLike } from "ol/Feature";
import { Fill, Stroke, Style } from "ol/style";
import { Legend } from "@/app/plant/shared/visualization/types";
import { PvKeyFigureLayer } from "../../pv-key-figure-layer";
import { AnalysisResultPvModuleSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-pv-module-schema";
import analysisResultPvMappingModule from "@/app/shared/services/volateq-api/api-results-mappings/pv/analysis-result-pv-mapping-module";

export abstract class ModuleKeyFigureLayer extends PvKeyFigureLayer<AnalysisResultPvModuleSchema> {
  protected readonly analysisResultMapping = analysisResultPvMappingModule;

  protected showPcsZoomLevel = 21;
  protected readonly colorTransparency = 0.3;
  protected readonly strokeWidth = 2;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      fill: new Fill({
        color: this.getColorWithAlpha(this.color, this.colorTransparency),
      }),
      stroke: new Stroke({
        color: this.getColorWithAlpha(this.color, this.colorTransparency),
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
      id: this.getLegendId(),
      entries: [
        {
          color: this.color,
          name: this.getLegendName() + this.getLegendEntryCount(),
        },
      ],
    };
  }
}
