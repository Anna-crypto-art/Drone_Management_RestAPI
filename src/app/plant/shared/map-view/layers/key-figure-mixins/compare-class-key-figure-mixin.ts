import { LayerColor } from "@/app/plant/shared/map-view/layers/types";
import { ComparedFeatureType } from "@/app/plant/shared/map-view/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/map-view/types";
import { CspPtcKeyFigureLayer } from "@/app/plant/csp-ptc/map-view/key-figure-layers/csp-ptc-key-figure-layer";
import { ICompareClassKeyFigureMixin } from "./types";
import { i18n } from "@/main";

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
          color: LayerColor.black,
          name: this.layer.getDiffLegendName() + this.layer.getLegendEntryCount( 
              comparedFeatures[ComparedFeatureType.NEW_IMPROVED].length +
              comparedFeatures[ComparedFeatureType.NEW_WORSENED].length +
              comparedFeatures[ComparedFeatureType.NO_CHANGE].length
            ),
        },
        {
          color: LayerColor.red,
          name: i18n.t("of-which-are-new").toString() + 
            this.layer.getLegendEntryCount(comparedFeatures[ComparedFeatureType.NEW_WORSENED].length),
          indent: true,
        },
        {
          color: LayerColor.strongGreen,
          name: i18n.t("improved").toString() +
            this.layer.getLegendEntryCount(comparedFeatures[ComparedFeatureType.GONE_IMPROVED].length),
        },
        ...(comparedFeatures[ComparedFeatureType.UNDEFINED].length > 0 ? [{
          color: LayerColor.grey,
          name: i18n.t("not-measured").toString() + 
          this.layer.getLegendEntryCount(comparedFeatures[ComparedFeatureType.UNDEFINED].length)
        }] : []),
      ],
    };
  }
}
