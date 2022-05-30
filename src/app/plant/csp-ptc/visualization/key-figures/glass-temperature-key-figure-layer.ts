import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class GlassTemperatureKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected created(): void {
    super.created();

    this.enableCompare = this.analysisResult.csp_ptc.glass_tube_temperature_class_count === this.query!.glass_tube_temperature_class!
  }

  protected getDiffColor(feature: FeatureLike): string {
    const diffValue = this.getPropertyDiffValue(feature);
    
    if (diffValue !== undefined) { // compare mode
      if (diffValue > 0 || diffValue < 0) {
        const classValue = this.query?.glass_tube_temperature_class;
        if (classValue) {
          if (diffValue > 0) { // New
            return KeyFigureColors.red;
          }
          if (diffValue < 0) { // Fixed
            return KeyFigureColors.green;
          }
        }
      }

      return KeyFigureColors.black;
    }

    return super.getDiffColor(feature);
  }

  protected getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 4 && classValue === 3) {
        return this.getColorWithAlpha(this.color!, 0.7);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.3);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT && this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 4
      && classValue === 3)
    {
      return KeyFigureColors.orange;
    }

    return super.getClassColor(classValue);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    let compareEntries: LegendEntry[] = [];
    let featureCount = this.geoJSON!.features.length
    if (this.compareAnalysisResult) {
      const fixedFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.diff_value && feature.properties.diff_value < 0).length;
      const newFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.diff_value && feature.properties.diff_value > 0).length;
      featureCount = featureCount - fixedFeaturesCount;

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

    return {
      id: this.keyFigureInfo.displayName || this.keyFigureId.toString(),
      entries: [
        {
          color: this.compareAnalysisResult ? KeyFigureColors.black : this.getColor(),
          name: this.vueComponent.$t(this.getLegendName()).toString() + this.getLegendEntryCount(featureCount),
        },
        ...compareEntries
      ],
    };
  }

  protected getLegendName(): string {
    if (
      this.keyFigureInfo.displayName === "glass-tube-temperature-class-3" &&
      this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 3
    ) {
      // If we have 3 temperature classifications the third class is "Severe heat loss"
      return "glass-tube-temperature-class-4";
    }

    return super.getLegendName();
  }
}
