import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { Legend } from "@/app/plant/shared/visualization/types";
import { AnalysisResultSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-schema-base";
import { FeatureLike } from "ol/Feature";
import { Style, Fill } from "ol/style";
import { CspPtcKeyFigureLayer } from "./csp-ptc-key-figure-layer";

export abstract class OrientationKeyFigureLayer<T extends AnalysisResultSchemaBase> extends CspPtcKeyFigureLayer<T> {
  protected abstract getOrientationOffsetClassLimits(): number[];

  public getStyle(feature: FeatureLike): Style {
    const offsetColor = this.getOffsetColor();

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

    return {
      id: this.keyFigureInfo.displayName!,
      entries: [
        {
          color: this.getOffsetColor(),
          name: this.getLegendName(),
        },
      ],
    };
  }

  private getOffsetColor(): string {
    if (this.query?.undefined === 1) {
      return KeyFigureColors.grey;
    }

    return this.getClassColor(this.query?.orientation_offset_class);
  }

  private getLegendName(): string {
    const limitAt0 = this.getOrientationOffsetClassLimits()[0];
    const limitAt1 = this.getOrientationOffsetClassLimits()[1];

    if (this.query?.undefined === 1) {
      return this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount();
    }
    if (this.query?.orientation_offset_class === 1) {
      return `less than ${limitAt0}°: ${this.getLegendEntryCount()}`;
    }
    if (this.query?.orientation_offset_class === 2) {
      return `between ${limitAt0}° - ${limitAt1}°: ${this.getLegendEntryCount()}`;
    }
    if (this.query?.orientation_offset_class === 3) {
      return `greater than ${limitAt1}°: ${this.getLegendEntryCount()}`;
    }

    throw Error("Unsupported query value for orientation offset");
  }
}
