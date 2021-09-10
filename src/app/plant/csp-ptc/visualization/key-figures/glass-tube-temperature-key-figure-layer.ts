import { AnalysisResultKeyFigure } from "@/app/shared/services/volateq-api/api-analysis-result-key-figures";
import { KeyFigureLayer } from "./shared/key-figure-layer";
import { Style, Stroke, Text, Fill } from 'ol/style';
import { FeatureLike } from "ol/Feature";
import { AnalysisResultCspPtcHceSchema } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-hce-schema";
import { FeatureInfo, FeatureInfos, Legend } from "./shared/types";
import analysisResultCspPtcMappingHce from "@/app/shared/services/volateq-api/api-results-mappings/analysis-result-csp-ptc-mapping-hce";

const GLASS_TUBE_TEMPERATURE_CLASS_COLORS = {1: "green", 2: "yellow", 3: "red"};

export class GlassTubeTemperatureKeyFigureLayer extends KeyFigureLayer<AnalysisResultCspPtcHceSchema> {
  protected readonly keyFigureId = AnalysisResultKeyFigure.GLASS_TUBE_TEMPERATURE_ID;
  protected readonly analysisResultMapping = analysisResultCspPtcMappingHce;
  public readonly name = "glassTubeTemperature";

  protected showPcsZoomLevel = 19;
  protected zIndex = 1;

  protected mapRecordEntryToFeatureInfo(key: string, value: unknown, descr?: string): FeatureInfo | undefined {
    const featureInfo = super.mapRecordEntryToFeatureInfo(key, value, descr);
    
    if (featureInfo && key == 'glass-tube-temperature-class') {
      featureInfo.bold = true;
    }

    return featureInfo;
  }

  public getStyle(feature: FeatureLike): Style {
    const classification = this.getProperties(feature)?.value;
    const color = classification && GLASS_TUBE_TEMPERATURE_CLASS_COLORS[classification];

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
      entries: Object.keys(GLASS_TUBE_TEMPERATURE_CLASS_COLORS).map(clsKey => {
        const classCount = this.geoJSON!.features.filter(feature => feature.properties.value?.toString() === clsKey).length;
        return {
          color: GLASS_TUBE_TEMPERATURE_CLASS_COLORS[clsKey],
          name: this.vueComponent.$t(`glass-tube-temperature-class-${clsKey}`).toString() + this.getLegendEntryCount(classCount),
        }
      }),
    }
  }
}