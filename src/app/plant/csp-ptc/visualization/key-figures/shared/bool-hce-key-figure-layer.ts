import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { HceKeyFigureLayer } from "./hce-key-figure-layer";
import { KeyFigureColors, Legend } from "./types";

export class BoolUndefinedHceKeyFigureLayer extends HceKeyFigureLayer {
  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | null | undefined = this.getPropertyValue<boolean | null>(feature);

    if (featureValue === null) {
      return new Style({
        stroke: new Stroke({
          color: KeyFigureColors.grey,
          width: this.stokeWidth,
        }),
        text: this.showText(feature),
      });
    }
    
    return super.getStyle(feature);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const notMeasuredFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.value === null).length;
    const featuresCount = this.geoJSON.features.length - notMeasuredFeaturesCount;

    return {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: this.queryColor!.color,
          name: this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(featuresCount),
        }, 
        {
          color: KeyFigureColors.grey,
          name: this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount(notMeasuredFeaturesCount),
        }
      ]
    };
  }
}