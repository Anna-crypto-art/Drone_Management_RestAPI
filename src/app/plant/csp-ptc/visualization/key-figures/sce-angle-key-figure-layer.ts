import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { FeatureLike } from "ol/Feature";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { AnalysisResultCspPtcSceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-sce-schema";
import { FeatureInfo, FeatureInfos, KeyFigureColors, Legend } from "./shared/types";
import analysisResultCspPtcMappingSce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-sce";


const SCE_ANGLE_OFFSET_COLORS = [undefined, 'green', 'yellow', 'red'];


export class SceOrientationKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcSceSchema> {
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

    const limitAt0 = this.analysisResult.csp_ptc.sce_orientation_offset_class_limits[0];
    const limitAt1 = this.analysisResult.csp_ptc.sce_orientation_offset_class_limits[1];
    const colorFilteredCount = (color: KeyFigureColors) => this.getLegendEntryCount(this.geoJSON!.features
        .filter(feature => this.getOffsetColor(feature.properties.value as number) === color).length);
    
    return {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: KeyFigureColors.blue,
          name: `-&infin;° - -${limitAt1}°: ${colorFilteredCount(KeyFigureColors.blue)}`
        },
        {
          color: KeyFigureColors.halfBlue,
          name: `-${limitAt1}° - -${limitAt0}°: ${colorFilteredCount(KeyFigureColors.halfBlue)}`
        },
        {
          color: KeyFigureColors.green,
          name: `-${limitAt0}° - ${limitAt0}°: ${colorFilteredCount(KeyFigureColors.green)}`
        },
        {
          color: KeyFigureColors.halfRed,
          name: `${limitAt0}° - ${limitAt1}°: ${colorFilteredCount(KeyFigureColors.halfRed)}`
        },
        {
          color: KeyFigureColors.red,
          name: `${limitAt1}° - &infin;°: ${colorFilteredCount(KeyFigureColors.red)}`
        },
        {
          color: KeyFigureColors.grey,
          name: this.vueComponent.$t("not-measured").toString() + colorFilteredCount(KeyFigureColors.grey),
        }
      ]
    };
  }

  private getOffsetColor(offsetValue?: number) {
    if (offsetValue === null || offsetValue === undefined) {
      return KeyFigureColors.grey;
    }

    const positiveOffsetValue = offsetValue < 0 ? offsetValue * -1 : offsetValue;
    if (positiveOffsetValue < this.analysisResult.csp_ptc.sce_orientation_offset_class_limits[0]) {
      return KeyFigureColors.green;
    }

    if (positiveOffsetValue >= this.analysisResult.csp_ptc.sce_orientation_offset_class_limits[0] &&
      positiveOffsetValue < this.analysisResult.csp_ptc.sce_orientation_offset_class_limits[1]) 
    {
      return offsetValue < 0 ? KeyFigureColors.halfBlue : KeyFigureColors.halfRed;
    }

    if (positiveOffsetValue >= this.analysisResult.csp_ptc.sce_orientation_offset_class_limits[1]) {
      return offsetValue < 0 ? KeyFigureColors.blue : KeyFigureColors.red;
    }
  }
  
}