import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { AnalysisResultCspPtcSceAngleSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-angle-schema";
import { FeatureInfos } from "./shared/types";
import analysisResultCspPtcMappingSceAngle from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-sce-angle";


const SCE_ANGLE_OFFSET_COLOR_RANGES = [0.01, 0.15, 0.3];
const SCE_ANGLE_OFFSET_COLORS = [undefined, 'green', 'yellow', 'red'];


export class SceAngleKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcSceAngleSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.SCE_ANGLE_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSceAngle;
  public readonly name = "sce-alignment-offset";

  public getStyle(feature: FeatureLike): Style {
    const offsetColor = this.getOffsetColor(this.getProperties(feature).value);

    return new Style({
      fill: offsetColor && new Fill({
        color: offsetColor,
      }) || undefined,
      text: this.showText(feature),
    });
  }

  private getOffsetColor(offsetValue?: number) {
    if (!offsetValue) {
      return undefined;
    }
    offsetValue = offsetValue < 0 ? offsetValue * -1 : offsetValue;

    let i = 0;
    while (i < SCE_ANGLE_OFFSET_COLOR_RANGES.length) {
      if (offsetValue < SCE_ANGLE_OFFSET_COLOR_RANGES[i]) {
        return SCE_ANGLE_OFFSET_COLORS[i];
      }
      i++;
    }
    return SCE_ANGLE_OFFSET_COLORS[i];
  }
  
}