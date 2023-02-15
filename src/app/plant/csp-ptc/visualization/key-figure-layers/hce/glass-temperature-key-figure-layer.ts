import { KeyFigureColors, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { CompareClassKeyFigureMixin } from "../key-figure-mixins/compare-class-key-figure-mixin";
import { ICompareClassKeyFigureMixin } from "../key-figure-mixins/types";
import { ClassHceKeyFigureLayer } from "./abstract/class-hce-key-figure-layer";

export class GlassTemperatureKeyFigureLayer extends ClassHceKeyFigureLayer implements ICompareClassKeyFigureMixin {
  private compareClassKeyFigureMixin!: CompareClassKeyFigureMixin<ICompareClassKeyFigureMixin>;

  protected created(): void {
    super.created();

    this.compareClassKeyFigureMixin = new CompareClassKeyFigureMixin(this);

    this.enableCompare = this.query!.glass_tube_temperature_class! > 1;
  }

  public getQueryClass(): number | undefined {
    return this.query?.glass_tube_temperature_class;
  }

  protected getDiffColor(featureProperties: FeatureProperties): string {
    return this.compareClassKeyFigureMixin.getDiffColor(featureProperties);
  }

  public getClassColor(classValue: number | undefined): string {
    if (this.colorScheme === KeyFigureColorScheme.RAINBOW) {
      if (this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 4 && classValue === 3) {
        return this.getColorWithAlpha(this.color!, 0.7);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.3);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT && this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 4
      && classValue === 3)
    {
      return KeyFigureColors.orange;
    }

    return super.getClassColor(classValue);
  }

  protected getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    const compareEntries: LegendEntry[] = [];
    if (this.compareAnalysisResult) {
      return this.compareClassKeyFigureMixin.getDiffLegend();
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name: this.vueComponent.$t(this.getLegendName()).toString() + 
            this.getLegendEntryCount(this.geoJSON!.features.length),
        },
        ...compareEntries
      ],
    };
  }

  protected getLegendName(): string {
    if (
      this.keyFigureInfo.displayName === "glass-tube-temperature-class-3" &&
      this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 3
    ) {
      // If we have 3 temperature classifications the third class is "Severe heat loss"
      return this.vueComponent.$t("glass-tube-temperature-class-4").toString();
    }

    return super.getLegendName();
  }

  public getDiffLegendName(): string {
    return this.getLegendName();
  }
}
