import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureInfo, Legend } from "./shared/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-hce";


export class CoatingDegratedKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.COATING_DEGRADATION_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;
  public readonly name = "O2Penetration";

  protected showPcsZoomLevel = 19;
  protected zIndex = 2;

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'oxygen-penetration') {
      featureInfo.bold = true;
    }

    return featureInfo;
  }

  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | undefined = this.getProperties(feature)?.value as boolean;

    return new Style({
      stroke: featureValue && new Stroke({
        color: '#5d0085',
        width: 5,
      }) || undefined,
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }
    
    const featureCount = this.geoJSON.features.filter(feature => feature.properties.value === true).length;

    return {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: '#5d0085',
          name: this.vueComponent.$t('oxygen-penetration').toString() + this.getLegendEntryCount(featureCount),
        }
      ]
    };
  }
}