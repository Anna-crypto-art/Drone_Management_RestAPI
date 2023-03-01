import { LayerColor } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry, PropsFeature } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style } from "ol/style";
import { HceKeyFigureLayer } from "./abstract/hce-key-figure-layer";

export class BoolUndefinedHceKeyFigureLayer extends HceKeyFigureLayer {
  public enableCompare = true;

  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | null | undefined = this.getPropertyValue<boolean | null>(feature);

    if (featureValue === null) {
      return new Style({
        stroke: new Stroke({
          color: LayerColor.grey,
          width: this.strokeWidth,
        }),
        text: this.showText(feature),
      });
    }

    return super.getStyle(feature);
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    const diffValue = featureProperties.diff_value
    if (diffValue === -1) { // Fixed
      return LayerColor.green;
    }
    if (diffValue === 1) { // New
      return LayerColor.red;
    }

    return LayerColor.black;
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
          color: LayerColor.red,
          name: this.vueComponent.$t("of-which-are-new").toString() + this.getLegendEntryCount(newFeaturesCount),
          indent: true,
        },
        {
          color: LayerColor.green,
          name: this.vueComponent.$t("fixed").toString() + this.getLegendEntryCount(fixedFeaturesCount),
        },
      ]
    }

    const legend = {
      id: this.getLegendId(),
      entries: [
        {
          color: this.compareAnalysisResult ? LayerColor.black : this.color!,
          name: this.getLegendName() + this.getLegendEntryCount(featuresCount),
        },
        ...compareEntries
      ],
    };

    if (this.query?.undefined && !this.compareAnalysisResult) {
      legend.entries.push({
        color: LayerColor.grey,
        name: this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount(notMeasuredFeaturesCount),
      });
    }

    return legend;
  }
}
