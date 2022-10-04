import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { complimentaryColor } from "@/app/shared/services/helper/color-helper";
import { FeatureLike } from "ol/Feature";
import { CspPtcKeyFigureLayer } from "../csp-ptc-key-figure-layer";
import { IOffsetClassKeyFigureMixin } from "./types";

export class OffsetClassKeyFigureMixin {
  public constructor(
    private readonly layer: CspPtcKeyFigureLayer<any> & IOffsetClassKeyFigureMixin
  ) {
    this.layer.enableCompare =  this.layer.getQueryOffsetClass()! > 1;
  }

  public getColor(feature: FeatureLike): string {
    const featureProperties = this.layer.getProperties(feature)

    if (this.layer.enableCompare && this.layer.compareAnalysisResult) {
      return this.getDiffColor(featureProperties);
    }
 
    const offset = featureProperties?.value;
    const complementary = offset !== undefined && offset !== null && offset < 0;

    return this.getOffsetColor(complementary);
  }

  private getDiffColor(featureProperties: FeatureProperties): string {
    const comparedFeatureType = this.layer.getComparedFeatureType(featureProperties, this.layer.getQueryOffsetClass()!);
    return this.layer.getDiffColorByComparedFeatureType(comparedFeatureType);
  }

  public getLegend(): Legend | undefined {
    if (!this.layer.geoJSON) {
      return undefined;
    }

    if (this.layer.compareAnalysisResult) {
      return this.getDiffLegend();
    }

    const negativeFeatureCount = this.layer.geoJSON!.features.filter(feature => feature.properties.value! < 0).length;
    const positiveFeatureCount = this.layer.geoJSON!.features.filter(feature => feature.properties.value! >= 0).length;

    const legendEntries: LegendEntry[] = [{
        color: this.getOffsetColor(),
        name: this.getLegendName(false, positiveFeatureCount),
      },
    ];

    if (this.layer.getQueryOffsetClass() === 2 || this.layer.getQueryOffsetClass() === 3) {
      legendEntries.push({
        color: this.getOffsetColor(true),
        name: this.getLegendName(true, negativeFeatureCount),
      });
    }

    return {
      id: this.layer.getLegendId(),
      entries: legendEntries
    };
  }

  private getOffsetColor(complementary = false): string {
    if (this.layer.query?.undefined === 1) {
      return KeyFigureColors.grey;
    }

    let color = this.layer.getClassColor(this.layer.getQueryOffsetClass());
    if (complementary && this.layer.getQueryOffsetClass() && this.layer.getQueryOffsetClass()! > 1) {
      if (this.layer.colorScheme === KeyFigureColorScheme.RAINBOW) {
        color = complimentaryColor(color);
      } else if (this.layer.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
        if (this.layer.getQueryOffsetClass() === 2) {
          color = this.layer.getColorWithAlpha(KeyFigureColors.blue, 0.4);
        } else if (this.layer.getQueryOffsetClass() === 3) {
          color = KeyFigureColors.blue;
        }
      }
    } else if (!complementary && this.layer.getQueryOffsetClass() && this.layer.getQueryOffsetClass() === 2) {
      color = this.layer.getColorWithAlpha(KeyFigureColors.red, 0.4);
    }

    return color;
  }

  private getLegendName(negativeOffset = false, featureCount?: number): string {
    const unit = this.layer.getUnit();
    const limitAt0 = this.layer.getOffsetClassLimits()[0] + unit;
    const limitAt1 = this.layer.getOffsetClassLimits()[1] + unit;

    if (this.layer.query?.undefined === 1) {
      return this.layer.vueComponent.$t("not-measured").toString() + this.layer.getLegendEntryCount();
    }

    if (this.layer.getQueryOffsetClass() === 1) {
      return this.layer.vueComponent.$t("less-than", {limit: limitAt0}).toString() + ": " + this.layer.getLegendEntryCount();
    }

    if (this.layer.getQueryOffsetClass() === 2) {
      if (negativeOffset) {
        return this.layer.vueComponent.$t("between-and", {limit1: "-" + limitAt1, limit2: "-" + limitAt0}).toString() +
          ": " + this.layer.getLegendEntryCount(featureCount);
      }

      return this.layer.vueComponent.$t("between-and", {limit1: limitAt0, limit2: limitAt1}).toString() +
          ": " + this.layer.getLegendEntryCount(featureCount);
    }
    
    if (this.layer.getQueryOffsetClass() === 3) {
      if (negativeOffset) {
        return this.layer.vueComponent.$t("less-than", {limit: "-" + limitAt1}).toString() + 
          ": " + this.layer.getLegendEntryCount(featureCount);
      }

      return this.layer.vueComponent.$t("greater-than", {limit: limitAt1}).toString() +
         ": " + this.layer.getLegendEntryCount(featureCount);
    }

    throw Error("Unsupported query value for orientation offset");
  }

  private getDiffLegend(): Legend {
    const comparedFeatures = this.layer.getComparedFeatures(this.layer.getQueryOffsetClass()!);

    const compareEntries: LegendEntry[] = [{
      color: KeyFigureColors.red,
      name: this.layer.vueComponent.$t("of-which-are-new").toString() + 
        this.layer.getLegendEntryCount(comparedFeatures.newWorsenedFeatures.length),
      indent: true,
    }];

    if (comparedFeatures.newImprovedFeatures.length > 0) {
      compareEntries.push({
        color: KeyFigureColors.grey,
        name: this.layer.vueComponent.$t("of-which-are-new-but-improved").toString() + 
          this.layer.getLegendEntryCount(comparedFeatures.newImprovedFeatures.length),
        indent: true,
      });
    }

    compareEntries.push({
      color: KeyFigureColors.green,
      name: this.layer.vueComponent.$t("fixed").toString() +
        this.layer.getLegendEntryCount(comparedFeatures.goneFixedFeatures.length),
    });

    if (comparedFeatures.goneImprovedFeatures.length > 0) {
      compareEntries.push({
        color: this.layer.getColorWithAlpha(KeyFigureColors.green, 0.5),
        name: this.layer.vueComponent.$t("improved-not-fixed").toString() + 
          this.layer.getLegendEntryCount(comparedFeatures.goneImprovedFeatures.length),
      });
    }

    return {
      id: this.layer.getLegendId(),
      entries: [
        {
          color: KeyFigureColors.black,
          name: this.layer.vueComponent.$t("alignment-offset-class-" + this.layer.getQueryOffsetClass(), {
              limit0: this.layer.getOffsetClassLimits()[0],
              limit1: this.layer.getOffsetClassLimits()[1],
            }).toString() + this.layer.getLegendEntryCount(this.layer.geoJSON!.features.length - comparedFeatures.goneFeatures.length),
        },
        ...compareEntries
      ],
    };
  }

  public getFeaturePropertiesClassValue(properties: FeatureProperties): FeatureProperties {
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
    const limitAt0 = this.layer.getOffsetClassLimits()[0];
    const limitAt1 = this.layer.getOffsetClassLimits()[1];

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
