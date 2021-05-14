import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke, Text, Fill } from 'ol/style';
import Feature, { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";

const IR_INTENSITY_CLASS_COLORS = {"1": "blue", "2": "green" ,"3": "yellow", "4": "red"};

export class IrIntensityKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcIrIntensitySchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.IR_INTENSITY_ID;
  public readonly name = "ir-intensity";

  protected getOnClickInfo(feature: Feature): Record<string, string> {
    // continue here
    return {};
  }

  public getStyle(feature: FeatureLike): Style {
    const classification = feature.get('class');
    const color = classification && IR_INTENSITY_CLASS_COLORS[classification];

    return new Style({
      stroke: color && new Stroke({
        color: color,
        width: 3,
      }),
      text: this.showText(feature),
    });
  }
}