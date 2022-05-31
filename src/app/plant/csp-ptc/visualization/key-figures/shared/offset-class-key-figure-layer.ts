import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { ComparedFeatureType, FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { complimentaryColor } from "@/app/shared/services/helper/color-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { FeatureLike } from "ol/Feature";
import { Style, Fill } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export abstract class OffsetClassKeyFigureLayer<T extends AnalysisResultSchemaBase> extends CspPtcKeyFigureLayer<T> {
  protected abstract getOffsetClassLimits(): number[];
  protected abstract getQueryOffsetClass(): number | undefined;

  protected created(): void {
    super.created();

    this.enableCompare = this.getQueryOffsetClass()! > 1;
  }

  public getStyle(feature: FeatureLike): Style {
    const featureProperties = this.getProperties(feature);
    
    let color!: string;
    if (this.enableCompare && this.compareAnalysisResult) {
      color = this.getDiffColor(featureProperties);
    } else {
      const offset = featureProperties?.value;
      const complementary = offset !== undefined && offset !== null && offset < 0;

      color = this.getOffsetColor(complementary);
    }

    return new Style({
      fill: new Fill({
        color: color,
      }),
      text: this.showText(feature),
    });
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    const comparedFeatureType = this.getComparedFeatureType(featureProperties, this.getQueryOffsetClass()!);
    return this.getDiffColorByComparedFeatureType(comparedFeatureType);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    if (this.compareAnalysisResult) {
      return this.getDiffLegend();
    }

    const negativeFeatureCount = this.geoJSON!.features.filter(feature => feature.properties.value! < 0).length;
    const positiveFeatureCount = this.geoJSON!.features.filter(feature => feature.properties.value! >= 0).length;

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
      entries: legendEntries
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
      return this.vueComponent.$t("less-than", {limit: limitAt0 + "°"}).toString() + ": " + this.getLegendEntryCount();
    }

    if (this.getQueryOffsetClass() === 2) {
      if (negativeOffset) {
        return this.vueComponent.$t("between-and", {limit1: "-" + limitAt1 + "°", limit2: "-" + limitAt0 + "°"}).toString() +
          ": " + this.getLegendEntryCount();
      }

      return this.vueComponent.$t("between-and", {limit1: limitAt0 + "°", limit2: limitAt1 + "°"}).toString() +
          ": " + this.getLegendEntryCount();
    }
    
    if (this.getQueryOffsetClass() === 3) {
      if (negativeOffset) {
        return this.vueComponent.$t("less-than", {limit: "-" + limitAt1 + "°"}).toString() + ": " + this.getLegendEntryCount();
      }

      return this.vueComponent.$t("greater-than", {limit: limitAt1 + "°"}).toString() + ": " + this.getLegendEntryCount();
    }

    throw Error("Unsupported query value for orientation offset");
  }

  protected getDiffLegend(): Legend {
    const comparedFeatures = this.getComparedFeatures(this.getQueryOffsetClass()!);

    const compareEntries: LegendEntry[] = [{
      color: KeyFigureColors.red,
      name: this.vueComponent.$t("of-which-are-new").toString() + 
        this.getLegendEntryCount(comparedFeatures.newWorsenedFeatures.length),
      indent: true,
    }];

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
      name: this.vueComponent.$t("fixed").toString() +
        this.getLegendEntryCount(comparedFeatures.goneFixedFeatures.length),
    });

    if (comparedFeatures.goneImprovedFeatures.length > 0) {
      compareEntries.push({
        color: this.getColorWithAlpha(KeyFigureColors.green, 0.5),
        name: this.vueComponent.$t("improved-not-fixed").toString() + 
          this.getLegendEntryCount(comparedFeatures.goneImprovedFeatures.length),
      });
    }

    return {
      id: this.keyFigureInfo.displayName!,
      entries: [
        {
          color: KeyFigureColors.black,
          name: this.vueComponent.$t("alignment-offset-class-" + this.getQueryOffsetClass(), {
              limit0: this.getOffsetClassLimits()[0],
              limit1: this.getOffsetClassLimits()[1],
            }).toString() + this.getLegendEntryCount(this.geoJSON!.features.length - comparedFeatures.goneFeatures.length),
        },
        ...compareEntries
      ],
    };
  }

  protected getComparedFeatureType(properties: FeatureProperties, currentClass: number): ComparedFeatureType {
    return super.getComparedFeatureType(this.getFeaturePropertiesClassValue(properties), currentClass);
  }

  private getFeaturePropertiesClassValue(properties: FeatureProperties): FeatureProperties {
    const featureValue: number = properties.value! as number;
    const featureDiffValue: number = (properties.diff_value || 0) as number;

    const classFeatureValue = this.getFeatureClassValue(featureValue);
    let classFeatureDiffValue = this.getFeatureClassValue(featureValue + featureDiffValue) - classFeatureValue;

    // keep the diff direction
    if (classFeatureDiffValue < 0 && featureDiffValue > 0 || classFeatureDiffValue > 0 && featureDiffValue < 0) {
      classFeatureDiffValue *= -1;
    }

    return {
      name: properties.name,
      value: classFeatureValue,
      diff_value: classFeatureDiffValue,
    };
  }

  private getFeatureClassValue(featureValue: number): number {
    const limitAt0 = this.getOffsetClassLimits()[0];
    const limitAt1 = this.getOffsetClassLimits()[1];

    featureValue = Math.abs(featureValue);

    if (featureValue < limitAt0) {
      return 1;
    } else if (featureValue >= limitAt0 && featureValue < limitAt1) {
      return 2;
    } else if (featureValue >= limitAt1) {
      return 3;
    }

    throw Error("featureValue exceeds class ranges")
  }
}
