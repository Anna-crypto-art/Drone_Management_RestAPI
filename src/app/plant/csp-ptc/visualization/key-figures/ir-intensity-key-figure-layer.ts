import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import { FeatureInfos, Legend } from "./shared/types";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-ir-intensity";

const IR_INTENSITY_CLASS_COLORS = {"1": "blue", "2": "green" ,"3": "yellow", "4": "red"};

export class IrIntensityKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcIrIntensitySchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.IR_INTENSITY_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingIrIntensity;
  public readonly name = "irIntensity";  

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

    return {
      entries: Object.keys(IR_INTENSITY_CLASS_COLORS).map(clsKey => ({
        color: IR_INTENSITY_CLASS_COLORS[clsKey],
        name: this.vueComponent.$t('class-subfield').toString() + " " + clsKey,
      })),
    }
  }
}