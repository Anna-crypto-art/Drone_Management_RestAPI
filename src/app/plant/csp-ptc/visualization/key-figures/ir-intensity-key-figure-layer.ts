import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import { FeatureInfo, FeatureInfos, Legend } from "./shared/types";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-ir-intensity";

const IR_INTENSITY_CLASS_COLORS = {1: "green", 2: "yellow", 3: "red"};

export class IrIntensityKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcIrIntensitySchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.IR_INTENSITY_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingIrIntensity;
  public readonly name = "irIntensity";

  protected zIndex = 1;

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'ir-intensity-class') {
      featureInfo.bold = true;
    }

    return featureInfo;
  }

  public getStyle(feature: FeatureLike): Style {
    const classification = this.getProperties(feature)?.value;
    const color = classification && IR_INTENSITY_CLASS_COLORS[classification];

    return new Style({
      stroke: color && new Stroke({
        color: color,
        width: 5,
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend {
    console.log("this.geoJSON:");
    console.log(this.geoJSON);

    return {
      id: this.keyFigureId.toString(),
      entries: Object.keys(IR_INTENSITY_CLASS_COLORS).map(clsKey => ({
        color: IR_INTENSITY_CLASS_COLORS[clsKey],
        name: this.vueComponent.$t(`ir-intensity-class-${clsKey}`).toString() + ` (<b>${
          this.geoJSON.features.filter(feature => feature.properties.value?.toString() === clsKey).length
        }</b>)`,
      })),
    }
  }
}