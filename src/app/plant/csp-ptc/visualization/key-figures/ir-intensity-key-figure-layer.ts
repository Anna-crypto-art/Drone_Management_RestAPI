import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureInfo, FeatureInfos, Legend } from "./shared/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-hce";

const IR_INTENSITY_CLASS_COLORS = {1: "green", 2: "yellow", 3: "red"};

export class IrIntensityKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.IR_INTENSITY_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;
  public readonly name = "irIntensity";

  protected showPcsZoomLevel = 19;
  protected zIndex = 1;

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'ir-intensity-class') {
      featureInfo.bold = true;
    }

    return featureInfo;
  }

  public getStyle(feature: FeatureLike): Style {
    const classification = this.getProperties(feature)?.value as number;
    const color = classification && IR_INTENSITY_CLASS_COLORS[classification];

    return new Style({
      stroke: color && new Stroke({
        color: color,
        width: 5,
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    return {
      id: this.keyFigureId.toString(),
      entries: Object.keys(IR_INTENSITY_CLASS_COLORS).map(clsKey => {
        const classCount = this.geoJSON!.features.filter(feature => feature.properties.value?.toString() === clsKey).length;
        return {
          color: IR_INTENSITY_CLASS_COLORS[clsKey],
          name: this.vueComponent.$t(`ir-intensity-class-${clsKey}`).toString() + this.getLegendEntryCount(classCount),
        }
      }),
    }
  }
}