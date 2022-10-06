import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { CspPtcKeyFigureLayer } from "../csp-ptc-key-figure-layer";
import { ICompareClassKeyFigureMixin } from "./types";

export class CompareClassKeyFigureMixin<T extends ICompareClassKeyFigureMixin>  {
  public constructor(
    protected readonly layer: CspPtcKeyFigureLayer<any> & T
  ) {}

  public getDiffColor(featureProperties: FeatureProperties): string {
    const comparedFeatureType = this.layer.getComparedFeatureType(featureProperties, this.layer.getQueryClass()!);
    return this.layer.getDiffColorByComparedFeatureType(comparedFeatureType);
  }

  public getDiffLegend(): Legend {
    const comparedFeatures = this.layer.getComparedFeatures(this.layer.getQueryClass()!);

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
          name: this.layer.getDiffLegendName() + this.layer.getLegendEntryCount(this.layer.geoJSON!.features.length - comparedFeatures.goneFeatures.length),
        },
        ...compareEntries
      ],
    };
  }
}
