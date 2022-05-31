import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { ComparedFeatureType, FeatureProperties, Legend, LegendEntry, PropsFeature } from "@/app/plant/shared/visualization/types";
import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class GlassTemperatureKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected created(): void {
    super.created();

    this.enableCompare = this.query!.glass_tube_temperature_class! > 1;
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    const comparedFeatureType = this.getComparedFeatureType(featureProperties, this.query!.glass_tube_temperature_class!);
    return this.getDiffColorByComparedFeatureType(comparedFeatureType);
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

    const compareEntries: LegendEntry[] = [];
    let featureCount = this.geoJSON!.features.length
    if (this.compareAnalysisResult) {
      const comparedFeatures = this.getComparedFeatures(this.query!.glass_tube_temperature_class!);
      featureCount -= comparedFeatures.goneFeatures.length;

      compareEntries.push({
        color: KeyFigureColors.red,
        name: this.vueComponent.$t("of-which-are-new").toString() + 
          this.getLegendEntryCount(comparedFeatures.newWorsenedFeatures.length),
        indent: true,
      });

      if (comparedFeatures.newImprovedFeatures.length > 0) {
        compareEntries.push({
          color: KeyFigureColors.grey,
          name: this.vueComponent.$t("of-which-are-new-but-improved").toString() + 
            this.getLegendEntryCount(comparedFeatures.newImprovedFeatures.length),
          indent: true,
        });
      }

      compareEntries.push({
        color: KeyFigureColors.green,
        name: this.vueComponent.$t("fixed").toString() + this.getLegendEntryCount(comparedFeatures.goneFixedFeatures.length),
      });

      if (comparedFeatures.goneImprovedFeatures.length > 0) {
        compareEntries.push({
          color: this.getColorWithAlpha(KeyFigureColors.green, 0.5),
          name: this.vueComponent.$t("improved-not-fixed").toString() + this.getLegendEntryCount(comparedFeatures.goneImprovedFeatures.length),
        });
      }
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
