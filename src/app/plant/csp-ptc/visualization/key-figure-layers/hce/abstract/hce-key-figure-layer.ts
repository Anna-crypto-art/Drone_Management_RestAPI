import { FeatureProperties } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";

export abstract class HceKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;

  protected readonly strokeWidth = 5;
  protected showPcsZoomLevel = 19;
  protected readonly refMeasureFeatureStrokeWidth = 8;

  protected zoomWidths = {
    18: { width: 10, mobileOnly: true },
    18.5: { width: 15, mobileOnly: true },
    19: { width: 20, mobileOnly: true },
    19.5: { width: 25, mobileOnly: true },
    20: { width: 30, mobileOnly: true },
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.enableCompare && this.compareAnalysisResult && this.getDiffColor(this.getProperties(feature))
          || this.getColor(),
        width: this.zoomWidth || this.strokeWidth,
      }),
      text: this.showText(feature),
    });
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.getColor();
  }

  protected getColor(): string {
    return this.color!;
  }
}
