import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureInfo, Legend } from "./shared/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-hce";


export class MissingGhrKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.MISSING_GLASS_CLADDING_TUBE_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;
  public readonly name = "missingGhr";

  protected zIndex = 2;

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'missing-gct') {
      featureInfo.bold = true;
    }

    return featureInfo;
  }

  public getStyle(feature: FeatureLike): Style {
    return new Style({
      stroke: new Stroke({
        color: '#850000',
        width: 5,
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend {
    return {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: '#850000',
          name: this.vueComponent.$t('missing-gct').toString() + ` (<b>${this.geoJSON.features.length}</b>)`,
        }
      ]
    };
  }
}