import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { ComparedFeatureType, FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
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

    return {
      id: this.layer.getLegendId(),
      entries: [
        {
          color: KeyFigureColors.black,
          name: this.layer.getDiffLegendName() + this.layer.getLegendEntryCount(
              comparedFeatures[ComparedFeatureType.NEW_WORSENED].length + 
              comparedFeatures[ComparedFeatureType.NEW_IMPROVED].length +
              comparedFeatures[ComparedFeatureType.NO_CHANGE].length
            ),
        },
        {
          color: KeyFigureColors.red,
          name: this.layer.vueComponent.$t("of-which-are-new").toString() + 
            this.layer.getLegendEntryCount(comparedFeatures[ComparedFeatureType.NEW_WORSENED].length),
          indent: true,
        },
        {
          color: KeyFigureColors.green,
          name: this.layer.vueComponent.$t("improved").toString() +
            this.layer.getLegendEntryCount(comparedFeatures[ComparedFeatureType.GONE_IMPROVED].length),
        }
      ],
    };
  }
}
