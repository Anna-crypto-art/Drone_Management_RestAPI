import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";
import { FeatureInfo, FeatureInfos, Legend } from "./shared/types";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-sce";


const SCE_ANGLE_OFFSET_COLOR_RANGES = [0.01, 0.15, 0.3];
const SCE_ANGLE_OFFSET_COLORS = [undefined, 'green', 'yellow', 'red'];


export class SceAngleKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcSceSchema> {
  protected readonly analysisResultMapping = analysisResultCspPtcMappingSce;

  protected showPcsZoomLevel = 18;

  public getStyle(feature: FeatureLike): Style {
    const offsetColor = this.getOffsetColor(this.getProperties(feature).value as number);

    return new Style({
      fill: offsetColor && new Fill({
        color: offsetColor,
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
          color: "green",
          name: "0° - 0.149°" + this.getLegendEntryCount(this.geoJSON.features
            .filter(feature => this.getOffsetColor(feature.properties.value as number) == SCE_ANGLE_OFFSET_COLORS[1]).length) 
        },
        { 
          color: "yellow", 
          name: "0.15° - 0.299°" + this.getLegendEntryCount(this.geoJSON.features
            .filter(feature => this.getOffsetColor(feature.properties.value as number) == SCE_ANGLE_OFFSET_COLORS[2]).length) 
        },
        { 
          color: "red",
          name: "0.3° - &infin;" + this.getLegendEntryCount(this.geoJSON.features
            .filter(feature => this.getOffsetColor(feature.properties.value as number) == SCE_ANGLE_OFFSET_COLORS[3]).length)
        },
      ]
    };
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