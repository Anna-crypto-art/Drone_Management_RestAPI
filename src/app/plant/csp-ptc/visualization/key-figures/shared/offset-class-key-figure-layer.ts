import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { Legend } from "@/app/plant/shared/visualization/types";
import { complimentaryColor } from "@/app/shared/services/helper/color-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { FeatureLike } from "ol/Feature";
import { Style, Fill } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export abstract class OffsetClassKeyFigureLayer<T extends AnalysisResultSchemaBase> extends CspPtcKeyFigureLayer<T> {
  protected abstract getOffsetClassLimits(): number[];
  protected abstract getQueryOffsetClass(): number | undefined;

  public getStyle(feature: FeatureLike): Style {
    const offset = this.getProperties(feature)?.value;
    const complementary = offset !== undefined && offset !== null && offset < 0;
    const offsetColor = this.getOffsetColor(complementary);

    return new Style({
      fill: new Fill({
        color: offsetColor,
      }),
      text: this.showText(feature),
    });
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const legendEntries = [{
        color: this.getOffsetColor(),
        name: this.getLegendName(),
      },
    ];

    if (this.getQueryOffsetClass() === 2 || this.getQueryOffsetClass() === 3) {
      legendEntries.push({
        color: this.getOffsetColor(true),
        name: this.getLegendName(true),
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

  private getLegendName(negativeOffset = false): string {
    const limitAt0 = this.getOffsetClassLimits()[0];
    const limitAt1 = this.getOffsetClassLimits()[1];

    if (this.query?.undefined === 1) {
      return this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount();
    }

    if (this.getQueryOffsetClass() === 1) {
      return `less than ${limitAt0}°: ${this.getLegendEntryCount()}`;
    }

    const featureCount = this.geoJSON!.features.filter(feature => 
      negativeOffset ? feature.properties.value! < 0 :
      feature.properties.value! >= 0
    ).length;

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
