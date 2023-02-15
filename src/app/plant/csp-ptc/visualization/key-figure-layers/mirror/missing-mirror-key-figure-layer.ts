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
      // We fill a SCE here...
      return new Style({
        fill: this.query?.undefined && new Fill({
          color: KeyFigureColors.grey,
        }) || undefined, // fill: undefined -> invisible
        text: this.showText(feature),
      });
    }

    return super.getStyle(feature);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    if (this.compareAnalysisResult) {
      return this.getDiffLegend();
    }

    const notMeasuredMirrorFeaturesCount = this.getNotMeasuredFeaturesCount();
    const missingMirrorsFeaturesCount = this.getMissingMirrorsFeaturesCount();

    const legend = {
      id: this.getLegendId(),
      entries: [
        {
          color: this.color!,
          name: this.getLegendName() + this.getLegendEntryCount(missingMirrorsFeaturesCount, 100),
        },
      ],
    };

    if (this.query?.undefined) {
      legend.entries.push({
        color: KeyFigureColors.grey,
        name: this.vueComponent.$t("not-measured").toString() + 
          this.getLegendEntryCount(notMeasuredMirrorFeaturesCount),
      });
    }

    return legend;
  }

  protected getDiffLegend(): Legend | undefined {
    const fixedFeaturesCount = this.geoJSON!.features.filter(feature => feature.properties.diff_value === -1).length;
    const newFeaturesCount = this.geoJSON!.features.filter(feature => feature.properties.diff_value === 1).length;
    const missingMirrorsFeaturesCount = this.getMissingMirrorsFeaturesCount() - fixedFeaturesCount;

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: KeyFigureColors.black,
          name: this.getLegendName() + this.getLegendEntryCount(missingMirrorsFeaturesCount, 100),
        },
        {
          color: KeyFigureColors.red,
          name: this.vueComponent.$t("of-which-are-new").toString() + this.getLegendEntryCount(newFeaturesCount),
          indent: true,
        },
        {
          color: KeyFigureColors.green,
          name: this.vueComponent.$t("fixed").toString() + this.getLegendEntryCount(fixedFeaturesCount),
        },
      ],
    };
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

  private getNotMeasuredSCEFeaturesCount(): number {
    return this.geoJSON!.features.filter(f => f.properties.value === null).length;
  }

  private getNotMeasuredFeaturesCount(): number {
    return this.getNotMeasuredSCEFeaturesCount() * this.geoJSON!.custom.mirrors_per_sce!;
  }

  private getMissingMirrorsFeaturesCount(): number {
    return this.geoJSON!.features.length - this.getNotMeasuredSCEFeaturesCount();
  }
}
