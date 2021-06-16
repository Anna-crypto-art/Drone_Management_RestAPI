import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcIrIntensitySchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-ir-intensity-schema";
import { FeatureInfo, Legend } from "./shared/types";
import analysisResultCspPtcMappingIrIntensity from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-ir-intensity";


export class CoatingDegratedKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcIrIntensitySchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.COATING_DEGRATION_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingIrIntensity;
  public readonly name = "O2Penetration";  

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'oxygen-penetration') {
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
          name: this.vueComponent.$t('oxygen-penetration').toString() + ` (<b>${this.geoJSON.features.length}</b>)`,
        }
      ]
    };
  }
}