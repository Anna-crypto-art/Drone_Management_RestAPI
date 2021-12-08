import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { MirrorKeyFigureLayer } from "./shared/mirror-key-figure-layer";
import { KeyFigureColors, Legend } from "./shared/types";

export class MissingMirrorKeyFigureLayer extends MirrorKeyFigureLayer {
  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | null | undefined = this.getPropertyValue<boolean | null>(feature);

    if (featureValue === null) {
      // With fill a SCE here...
      return new Style({
        fill: new Fill({
          color: KeyFigureColors.grey,
        }),
        text: this.showText(feature),
      });
    }
    
    return super.getStyle(feature);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const notMeasuredSCEFeaturesCount = this.geoJSON.features.filter(feature => feature.properties.value === null).length;
    const notMeasuredMirrorFeaturesCount = notMeasuredSCEFeaturesCount * this.geoJSON.custom.mirrors_per_sce!;
    const missingMirrorsFeaturesCount = this.geoJSON.features.length - notMeasuredSCEFeaturesCount;

    return {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: this.queryColor!.color!,
          name: this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(missingMirrorsFeaturesCount, 100),
        }, 
        {
          color: KeyFigureColors.grey,
          name: this.vueComponent.$t("not-measured").toString() + this.getLegendEntryCount(notMeasuredMirrorFeaturesCount),
        }
      ]
    };
  }
}