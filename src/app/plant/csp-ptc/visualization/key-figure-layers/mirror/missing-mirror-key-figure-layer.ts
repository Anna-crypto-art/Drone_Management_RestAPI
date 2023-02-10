import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { MirrorKeyFigureLayer } from "./abstract/mirror-key-figure-layer";

export class MissingMirrorKeyFigureLayer extends MirrorKeyFigureLayer {
  public enableCompare = true;

  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | null | undefined = this.getPropertyValue<boolean | null>(feature);

    if (featureValue === null) {
      // With fill a SCE here...
      return new Style({
        fill: this.query?.undefined && new Fill({
          color: KeyFigureColors.grey,
        }) || undefined,
        text: this.showText(feature),
      });
    }

    return super.getStyle(feature);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const notMeasuredSCEFeaturesCount = this.geoJSON.features.filter(
      feature => feature.properties.value === null
    ).length;
    const notMeasuredMirrorFeaturesCount = notMeasuredSCEFeaturesCount * this.geoJSON.custom.mirrors_per_sce!;
    let missingMirrorsFeaturesCount = this.geoJSON.features.length - notMeasuredSCEFeaturesCount;

    let compareEntries: LegendEntry[] = [];
    if (this.compareAnalysisResult) {
      const fixedFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.diff_value === -1).length;
      const newFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.diff_value === 1).length;
      missingMirrorsFeaturesCount = missingMirrorsFeaturesCount - fixedFeaturesCount;

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
      id: this.getLegendId(),
      entries: [
        {
          color: this.compareAnalysisResult ? KeyFigureColors.black : this.color!,
          name:
            this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(missingMirrorsFeaturesCount, 100),
        },
        ...compareEntries
      ],
    };

    if (this.query?.undefined && !this.compareAnalysisResult) {
      legend.entries.push({
        color: KeyFigureColors.grey,
        name: this.vueComponent.$t("not-measured").toString() + 
          this.getLegendEntryCount(notMeasuredMirrorFeaturesCount),
      });
    }

    return legend;
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    const diffValue = featureProperties.diff_value
    if (diffValue === -1) { // Fixed
      return KeyFigureColors.green;
    }
    if (diffValue === 1) { // New
      return KeyFigureColors.red;
    }
    return KeyFigureColors.black;
  }
}
