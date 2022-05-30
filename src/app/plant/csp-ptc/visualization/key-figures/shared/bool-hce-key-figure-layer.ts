import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { HceKeyFigureLayer } from "./hce-key-figure-layer";

export class BoolUndefinedHceKeyFigureLayer extends HceKeyFigureLayer {
  protected enableCompare = true;

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

  protected getDiffColor(feature: FeatureLike): string {
    const diffValue = this.getPropertyDiffValue(feature);
    if (diffValue === -1) { // Fixed
      return KeyFigureColors.green;
    }
    if (diffValue === 1) { // New
      return KeyFigureColors.red;
    }
    if (diffValue !== undefined) { // Compare mode on
      return KeyFigureColors.black;
    }

    return this.getColor();
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const notMeasuredFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.value === null).length;
    let featuresCount = this.geoJSON.features.length - notMeasuredFeaturesCount;

    let compareEntries: LegendEntry[] = [];
    if (this.compareAnalysisResult) {
      const fixedFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.diff_value === -1).length;
      const newFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.diff_value === 1).length;

      featuresCount = featuresCount - fixedFeaturesCount;

      compareEntries = [
        {
          color: KeyFigureColors.red,
          name: this.vueComponent.$t("of-which-are-new").toString() + this.getLegendEntryCount(newFeaturesCount),
          indent: true,
        },
        {
          color: KeyFigureColors.green,
          name: this.vueComponent.$t("fixed").toString() + this.getLegendEntryCount(fixedFeaturesCount),
        },
      ]
    }

    const legend = {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: this.compareAnalysisResult ? KeyFigureColors.black : this.color!,
          name:
            this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(featuresCount),
        },
        ...compareEntries
      ],
    };

    if (this.query?.undefined) {
      legend.entries.push({
        color: KeyFigureColors.grey,
        name: this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount(notMeasuredFeaturesCount),
      });
    }

    return legend;
  }
}
