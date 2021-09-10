import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureInfo, Legend } from "./shared/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-hce";


export class H2ConcentrationKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.HIGH_HYDROGEN_CONCENTRATION_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;
  public readonly name = "H2Concentration"; 

  protected showPcsZoomLevel = 19;
  protected zIndex = 2;

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
        color: '#ad0045',
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
      entries: [
        {
          color: '#ad0045',
          name: this.vueComponent.$t('high-hydrogen-concentration').toString() + this.getLegendEntryCount(),
        }
      ]
    };
  }
}