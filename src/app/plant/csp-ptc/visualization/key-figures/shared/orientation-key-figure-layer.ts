import { KeyFigureLayer } from "./key-figure-layer";
import { FeatureLike } from "ol/Feature";
import { Style, Fill } from 'ol/style';
import { KeyFigureColors, Legend } from "./types";
import { AnalysisResultCspPtcSchemaBase } from "@/app/shared/services/volateq-api/api-schemas/analysis-result-csp-ptc-schema-base";


export abstract class OrientationKeyFigureLayer<T extends AnalysisResultCspPtcSchemaBase> extends KeyFigureLayer<T> {

  protected abstract getOrientationOffsetClassLimits(): number[];

  public getStyle(feature: FeatureLike): Style {
    const offsetColor = this.getOffsetColor(this.getProperties(feature).value as number) as string;

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

    const limitAt0 = this.getOrientationOffsetClassLimits()[0];
    const limitAt1 = this.getOrientationOffsetClassLimits()[1];

    const colorFilteredCount = (color: KeyFigureColors) => this.getLegendEntryCount(this.geoJSON!.features
        .filter(feature => this.getOffsetColor(feature.properties.value as number) === color).length);
    
    let legendEntries: { color: string, name: string }[] = [];
    if (this.queryColor?.query?.undefined === 1) {
      legendEntries = [{
        color: KeyFigureColors.grey,
        name: this.vueComponent.$t("not-measured").toString() + colorFilteredCount(KeyFigureColors.grey),
      }];
    } else if (this.queryColor?.query?.orientation_offset_class === 1) {
      legendEntries = [{
        color: KeyFigureColors.green,
        name: `-${limitAt0}° - ${limitAt0}°: ${colorFilteredCount(KeyFigureColors.green)}`
      }];
    } else if (this.queryColor?.query?.orientation_offset_class === 2) {
      legendEntries = [
        {
          color: KeyFigureColors.halfBlue,
          name: `-${limitAt1}° - -${limitAt0}°: ${colorFilteredCount(KeyFigureColors.halfBlue)}`
        }, 
        {
          color: KeyFigureColors.halfRed,
          name: `${limitAt0}° - ${limitAt1}°: ${colorFilteredCount(KeyFigureColors.halfRed)}`
        },
      ];
    } else if (this.queryColor?.query?.orientation_offset_class === 3) {
      legendEntries = [
        {
          color: KeyFigureColors.blue,
          name: `-&infin;° - -${limitAt1}°: ${colorFilteredCount(KeyFigureColors.blue)}`
        },
        {
          color: KeyFigureColors.red,
          name: `${limitAt1}° - &infin;°: ${colorFilteredCount(KeyFigureColors.red)}`
        },
      ];
    }

    return {
      id: this.keyFigureInfo.displayName!,
      entries: legendEntries,
    };
  }

  private getOffsetColor(offsetValue?: number) {
    if (this.queryColor!.color) {
      return this.queryColor!.color;
    }

    return offsetValue! < 0 ? this.queryColor!.colors![0] : this.queryColor!.colors![1];
  }
  
}