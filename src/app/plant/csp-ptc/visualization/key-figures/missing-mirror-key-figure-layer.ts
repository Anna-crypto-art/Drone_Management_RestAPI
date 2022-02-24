import { KeyFigureColors } from "@/app/plant/shared/visualization/layers/types";
import { Legend } from "@/app/plant/shared/visualization/types";
import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { MirrorKeyFigureLayer } from "./shared/mirror-key-figure-layer";

export class MissingMirrorKeyFigureLayer extends MirrorKeyFigureLayer {
  public getStyle(feature: FeatureLike): Style {
    const featureValue: boolean | null | undefined = this.getPropertyValue<boolean | null>(feature);

    if (featureValue === null) {
      // With fill a SCE here...
      return new Style({
        fill: this.query?.undefined && new Fill({
          color: KeyFigureColors.grey,
        }) || undefined,
        text: this.showText(feature),
      });
    }

    return super.getStyle(feature);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const notMeasuredSCEFeaturesCount = this.geoJSON.features.filter(
      feature => feature.properties.value === null
    ).length;
    const notMeasuredMirrorFeaturesCount = notMeasuredSCEFeaturesCount * this.geoJSON.custom.mirrors_per_sce!;
    const missingMirrorsFeaturesCount = this.geoJSON.features.length - notMeasuredSCEFeaturesCount;

    const legend = {
      id: this.keyFigureId.toString(),
      entries: [
        {
          color: this.color!,
          name:
            this.vueComponent.$t((this.keyFigureInfo.displayName || this.keyFigureInfo.keyName)!).toString() +
            this.getLegendEntryCount(missingMirrorsFeaturesCount, 100),
        },
      ],
    };

    if (this.query?.undefined) {
      legend.entries.push({
        color: KeyFigureColors.grey,
        name: this.vueComponent.$t("not-measured").toString() + 
          this.getLegendEntryCount(notMeasuredMirrorFeaturesCount),
      });
    }

    return legend;
  }
}
