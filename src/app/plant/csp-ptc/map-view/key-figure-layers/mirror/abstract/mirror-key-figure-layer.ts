import { FeatureProperties, Legend } from "@/app/plant/shared/map-view/types";
import analysisResultCspPtcMappingMirror from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-mirror";
import { AnalysisResultCspPtcMirrorSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-mirror-schema";
import { FeatureLike } from "ol/Feature";
import { Fill, Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";

export class MirrorKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcMirrorSchema> {
  public readonly analysisResultMapping = analysisResultCspPtcMappingMirror;

  protected showPcsZoomLevel = 21;
  protected readonly strokeWidth = 3;
  protected readonly refMeasureFeatureStrokeWidth = 6;

  public getStyle(feature: FeatureLike): Style {
    const color = this.enableCompare && this.compareAnalysisResult && this.getDiffColor(this.getProperties(feature))
      || this.getColor();

    return new Style({
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        color: color,
        width: this.strokeWidth,
      }),
      text: this.showText(feature),
    });
  }

  public getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.color!,
          name: this.getLegendName() + this.getLegendEntryCount(),
        },
      ],
    };
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.getColor();
  }

  protected getColor(): string {
    return this.color!;
  }
}
