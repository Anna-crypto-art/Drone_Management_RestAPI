import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { complimentaryColor } from "@/app/shared/services/helper/color-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { FeatureLike } from "ol/Feature";
import { Style, Fill } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export abstract class OffsetClassKeyFigureLayer<T extends AnalysisResultSchemaBase> extends CspPtcKeyFigureLayer<T> {
  protected abstract getOffsetClassLimits(): number[];
  protected abstract getQueryOffsetClass(): number | undefined;

  protected created(): void {
    this.enableCompare = this.getQueryOffsetClass() === 3;
  }

  public getStyle(feature: FeatureLike): Style {
    const offset = this.getProperties(feature)?.value;
    const complementary = offset !== undefined && offset !== null && offset < 0;
    const offsetColor = this.getDiffColor(feature, complementary);

    return new Style({
      fill: new Fill({
        color: offsetColor,
      }),
      text: this.showText(feature),
    });
  }

  protected getDiffColor(feature: FeatureLike, complementary = false): string {
    if (this.compareAnalysisResult) {
      const diffValue = this.getPropertyDiffValue(feature);
      if (diffValue !== undefined) {
        if (diffValue < 0) {
          return KeyFigureColors.green;
        }
        if (diffValue > 0) {
          return KeyFigureColors.black;
        }
      }
    }

    return this.getOffsetColor(complementary)
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    let negativeFeatureCount = this.geoJSON!.features.filter(feature => feature.properties.value! < 0).length;
    let positiveFeatureCount = this.geoJSON!.features.filter(feature => feature.properties.value! >= 0).length;

    let compareEntries: LegendEntry[] = []
    if (this.compareAnalysisResult) {
      const limitAt1 = this.getOffsetClassLimits()[1];

      const negativeFixedFeatureCount = this.geoJSON!.features.filter(feature => {
        return feature.properties.value! < 0 && feature.properties.diff_value && feature.properties.diff_value < 0 
          && Math.abs(feature.properties.value! as number) < limitAt1;
      }).length;

      const positiveFixedFeatureCount = this.geoJSON!.features.filter(feature => {
        return feature.properties.value! >= 0 && feature.properties.diff_value && feature.properties.diff_value < 0 
          && feature.properties.value! < limitAt1;
      }).length;

      negativeFeatureCount -= negativeFixedFeatureCount;
      positiveFeatureCount -= positiveFixedFeatureCount;

      const newFeaturesCount = this.geoJSON!.features.filter(feature => {
        return feature.properties.diff_value && feature.properties.diff_value > 0 && 
          ((feature.properties.value! as number) - feature.properties.diff_value) < limitAt1;
      }).length;

      compareEntries = [
        {
          color: KeyFigureColors.green,
          name: this.vueComponent.$t("fixed").toString() + 
            this.getLegendEntryCount(negativeFixedFeatureCount + positiveFixedFeatureCount)
        },
        {
          color: KeyFigureColors.black,
          name: this.vueComponent.$t("new").toString() + 
            this.getLegendEntryCount(newFeaturesCount)
        }
      ]
    } 

    const legendEntries: LegendEntry[] = [{
        color: this.getOffsetColor(),
        name: this.getLegendName(false, positiveFeatureCount),
      },
    ];

    if (this.getQueryOffsetClass() === 2 || this.getQueryOffsetClass() === 3) {
      legendEntries.push({
        color: this.getOffsetColor(true),
        name: this.getLegendName(true, negativeFeatureCount),
      });
    }

    return {
      id: this.keyFigureInfo.displayName!,
      entries: [...legendEntries, ...compareEntries]
    };
  }

  private getOffsetColor(complementary = false): string {
    if (this.query?.undefined === 1) {
      return KeyFigureColors.grey;
    }

    let color = this.getClassColor(this.getQueryOffsetClass());
    if (complementary && this.getQueryOffsetClass() && this.getQueryOffsetClass()! > 1) {
      if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
        color = complimentaryColor(color);
      } else if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
        if (this.getQueryOffsetClass() === 2) {
          color = this.getColorWithAlpha(KeyFigureColors.blue, 0.4);
        } else if (this.getQueryOffsetClass() === 3) {
          color = KeyFigureColors.blue;
        }
      }
    } else if (!complementary && this.getQueryOffsetClass() && this.getQueryOffsetClass() === 2) {
      color = this.getColorWithAlpha(KeyFigureColors.red, 0.4);
    }

    return color;
  }

  private getLegendName(negativeOffset = false, featureCount: number): string {
    const limitAt0 = this.getOffsetClassLimits()[0];
    const limitAt1 = this.getOffsetClassLimits()[1];

    if (this.query?.undefined === 1) {
      return this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount();
    }

    if (this.getQueryOffsetClass() === 1) {
      return `less than ${limitAt0}°: ${this.getLegendEntryCount()}`;
    }

    
    if (this.getQueryOffsetClass() === 2) {
      if (negativeOffset) {
        return `between -${limitAt1}° and -${limitAt0}°: ${this.getLegendEntryCount(featureCount)}`;
      }

      return `between ${limitAt0}° and ${limitAt1}°: ${this.getLegendEntryCount(featureCount)}`;
    }
    if (this.getQueryOffsetClass() === 3) {
      if (negativeOffset) {
        return `less than -${limitAt1}°: ${this.getLegendEntryCount(featureCount)}`;
      }

      return `greater than ${limitAt1}°: ${this.getLegendEntryCount(featureCount)}`;
    }

    throw Error("Unsupported query value for orientation offset");
  }
}
