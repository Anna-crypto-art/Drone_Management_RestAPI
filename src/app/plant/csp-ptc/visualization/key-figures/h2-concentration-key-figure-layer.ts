import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import { FeatureInfo, Legend } from "./shared/types";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-ir-intensity";


export class H2ConcentrationKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcIrIntensitySchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.H2_CONCENTRATION_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingIrIntensity;
  public readonly name = "H2Concentration";  

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'high-hydrogen-concentration') {
      featureInfo.bold = true;
    }

    return featureInfo;
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: 'red',
        width: 5,
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend {
    return {
      entries: [
        {
          color: 'red',
          name: this.vueComponent.$t('high-hydrogen-concentration').toString(),
        }
      ]
    };
  }
}