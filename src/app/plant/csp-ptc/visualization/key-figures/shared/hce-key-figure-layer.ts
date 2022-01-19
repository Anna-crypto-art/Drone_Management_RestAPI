import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { Legend } from "@/app/plant/shared/visualization/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/csp_ptc/analysis-result-csp-ptc-mapping-hce";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export class HceKeyFigureLayer extends CspPtcKeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;

  protected readonly stokeWidth = 5;
  protected showPcsZoomLevel = 19;

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getColor(),
        width: this.stokeWidth,
      }),
      text: this.showText(feature),
    });
  }

  protected getColor(): string {
    return this.color!;
  }
}
