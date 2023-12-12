import { LayerColor } from "@/app/plant/shared/map-view/layers/types";
import { FeatureProperties } from "@/app/plant/shared/map-view/types";
import analysisResultCspPtcMappingSwivel from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-swivel";
import { AnalysisResultCspPtcSwivelSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-swivel-schema";
import { FeatureLike } from "ol/Feature";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "../../csp-ptc-key-figure-layer";

export class SwivelKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcSwivelSchema> {
  public readonly analysisResultMapping = analysisResultCspPtcMappingSwivel;

  protected showPcsZoomLevel = 19;

  protected zoomWidths: Record<number, number | { width: number; mobileOnly: boolean; }> | null = {
    17.5: 5,
    18: 7,
    18.5: 10,
    19: 15,
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      image: new Circle({
        radius: this.zoomWidth || 3,
        fill: new Fill({ 
          color: this.enableCompare && this.compareAnalysisResult && this.getDiffColor(this.getProperties(feature)) || this.getColor() }),
        stroke: new Stroke({
          color: LayerColor.black,
          width: 1,
        }),
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