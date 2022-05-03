import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Stroke, Style, Icon, Image } from "ol/style";
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

    return new Style({
      stroke: new Stroke({
        color: this.getDiffColor(feature),
        width: this.stokeWidth,
      }),
      text: this.showText(feature),
    });
  }

  private getDiffValue(feature: FeatureLike): number | undefined {
    if (this.enableCompare && this.compareAnalysisResult) {
      return this.getPropertyDiffValue(feature);
    }
  }

  protected getDiffColor(feature: FeatureLike): string {
    if (this.getDiffValue(feature) === -1) {
      return this.getColorWithAlpha(this.color, 0.3);
    }

    return this.getColor();
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const notMeasuredFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.value === null).length;
    const featuresCount = this.geoJSON.features.length - notMeasuredFeaturesCount;

    const legend = {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: this.color!,
          name:
            this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(featuresCount),
        },
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
