import { LayerColor, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { complimentaryColor } from "@/app/shared/services/helper/color-helper";
import { FeatureLike } from "ol/Feature";
import { CspPtcKeyFigureLayer } from "../../../csp-ptc/visualization/key-figure-layers/csp-ptc-key-figure-layer";
import { CompareClassLimitsKeyFigureMixin } from "./compare-class-limits-key-figure-mixin";
import { ICompareClassLimitsKeyFigureMixin } from "./types";

export class OffsetClassKeyFigureMixin extends CompareClassLimitsKeyFigureMixin {
  public constructor(
    layer: CspPtcKeyFigureLayer<any> & ICompareClassLimitsKeyFigureMixin
  ) {
    super(layer);

    this.layer.enableCompare =  this.layer.getQueryClass()! > 1;
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

    if (this.layer.getQueryClass() === 2 || this.layer.getQueryClass() === 3) {
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
      return LayerColor.grey;
    }

    let color = this.layer.getClassColor(this.layer.getQueryClass());
    if (complementary && this.layer.getQueryClass() && this.layer.getQueryClass()! > 1) {
      if (this.layer.colorScheme === KeyFigureColorScheme.RAINBOW) {
        color = complimentaryColor(color);
      } else if (this.layer.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT) {
        if (this.layer.getQueryClass() === 2) {
          color = this.layer.getColorWithAlpha(LayerColor.blue, 0.4);
        } else if (this.layer.getQueryClass() === 3) {
          color = LayerColor.blue;
        }
      }
    } else if (!complementary && this.layer.getQueryClass() && this.layer.getQueryClass() === 2) {
      color = this.layer.getColorWithAlpha(LayerColor.red, 0.4);
    }

    return color;
  }

  private getLegendName(negativeOffset = false, featureCount?: number): string {
    const unit = this.layer.getUnit();
    const limitAt0 = this.layer.getClassLimits()[0] + unit;
    const limitAt1 = this.layer.getClassLimits()[1] + unit;

    if (this.layer.query?.undefined === 1) {
      return this.layer.vueComponent.$t("not-measured").toString() + this.layer.getLegendEntryCount();
    }

    if (this.layer.getQueryClass() === 1) {
      return this.layer.vueComponent.$t("less-than", {limit: limitAt0}).toString() + ": " + this.layer.getLegendEntryCount();
    }

    if (this.layer.getQueryClass() === 2) {
      if (negativeOffset) {
        return this.layer.vueComponent.$t("between-and", {limit1: "-" + limitAt1, limit2: "-" + limitAt0}).toString() +
          ": " + this.layer.getLegendEntryCount(featureCount);
      }

      return this.layer.vueComponent.$t("between-and", {limit1: limitAt0, limit2: limitAt1}).toString() +
          ": " + this.layer.getLegendEntryCount(featureCount);
    }
    
    if (this.layer.getQueryClass() === 3) {
      if (negativeOffset) {
        return this.layer.vueComponent.$t("less-than", {limit: "-" + limitAt1}).toString() + 
          ": " + this.layer.getLegendEntryCount(featureCount);
      }

      return this.layer.vueComponent.$t("greater-than", {limit: limitAt1}).toString() +
         ": " + this.layer.getLegendEntryCount(featureCount);
    }

    throw Error("Unsupported query value for orientation offset");
  }

  public getDiffLegendName(): string {
    return this.layer.vueComponent.$t("alignment-offset-class-" + this.layer.getQueryClass(), {
      limit0: this.layer.getClassLimits()[0],
      limit1: this.layer.getClassLimits()[1],
    }).toString()
  }
}
