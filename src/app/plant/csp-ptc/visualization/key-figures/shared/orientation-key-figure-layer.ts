import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { Legend } from "@/app/plant/shared/visualization/types";
import { complimentaryColor } from "@/app/shared/services/helper/color-helper";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { FeatureLike } from "ol/Feature";
import { Style, Fill } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export abstract class OrientationKeyFigureLayer<T extends AnalysisResultSchemaBase> extends CspPtcKeyFigureLayer<T> {
  protected abstract getOrientationOffsetClassLimits(): number[];

  public getStyle(feature: FeatureLike): Style {
    const orientationOffset = this.getProperties(feature)?.value;
    const complementary = orientationOffset ? orientationOffset < 0 : false;
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

    if (this.query?.orientation_offset_class === 2 || this.query?.orientation_offset_class === 3) {
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

    let color: string = this.color!;
    if (complementary && this.query?.orientation_offset_class && this.query?.orientation_offset_class > 1) {
      color = complimentaryColor(color);
    }

    return this.getClassColor(this.query?.orientation_offset_class, color);
  }

  private getLegendName(negativeOffset = false): string {
    const limitAt0 = this.getOrientationOffsetClassLimits()[0];
    const limitAt1 = this.getOrientationOffsetClassLimits()[1];

    if (this.query?.undefined === 1) {
      return this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount();
    }

    if (this.query?.orientation_offset_class === 1) {
      return `less than ${limitAt0}°: ${this.getLegendEntryCount()}`;
    }

    const featureCount = this.geoJSON!.features.filter(feature => 
      negativeOffset ? feature.properties.value! < 0 :
      feature.properties.value! >= 0
    ).length;

    if (this.query?.orientation_offset_class === 2) {
      if (negativeOffset) {
        return `between -${limitAt1}° and -${limitAt0}°: ${this.getLegendEntryCount(featureCount)}`;
      }

      return `between ${limitAt0}° and ${limitAt1}°: ${this.getLegendEntryCount(featureCount)}`;
    }
    if (this.query?.orientation_offset_class === 3) {
      if (negativeOffset) {
        return `less than -${limitAt1}°: ${this.getLegendEntryCount(featureCount)}`;
      }

      return `greater than ${limitAt1}°: ${this.getLegendEntryCount(featureCount)}`;
    }

    throw Error("Unsupported query value for orientation offset");
  }
}
