import { LayerColor, KeyFigureColorScheme } from "@/app/plant/shared/visualization/layers/types";
import { FeatureProperties, Legend, LegendEntry } from "@/app/plant/shared/visualization/types";
import { CompareClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/compare-class-key-figure-mixin";
import { ICompareClassKeyFigureMixin } from "@/app/plant/shared/visualization/key-figure-mixins/types";
import { ClassHceKeyFigureLayer } from "./abstract/class-hce-key-figure-layer";
import { i18n } from "@/main";

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
      if (this.analysisResult.csp_ptc!.glass_tube_temperature_class_count === 4 && classValue === 3) {
        return this.getColorWithAlpha(this.color!, 0.7);
      }
  
      if (classValue === 2) {
        return this.getColorWithAlpha(this.color!, 0.3);
      }
    }

    if (this.colorScheme === KeyFigureColorScheme.TRAFFIC_LIGHT && this.analysisResult.csp_ptc!.glass_tube_temperature_class_count === 4
      && classValue === 3)
    {
      return LayerColor.orange;
    }

    return super.getClassColor(classValue);
  }

  public getLegend(): Legend | undefined {
    if (!this.geoJSON) {
      return undefined;
    }

    if (this.compareAnalysisResult) {
      return this.compareClassKeyFigureMixin.getDiffLegend();
    }

    return {
      id: this.getLegendId(),
      entries: [
        {
          color: this.getColor(),
          name: this.getLegendName() + 
            this.getLegendEntryCount(this.geoJSON!.features.length),
        }
      ],
    };
  }

  public getDisplayName(): string {
    if (
      this.options.displayName === "glass-tube-temperature-class-3" &&
      this.analysisResult.csp_ptc!.glass_tube_temperature_class_count === 3
    ) {
      // If we have 3 temperature classifications the third class is "Severe heat loss"
      return i18n.t("glass-tube-temperature-class-4").toString();
    }

    return super.getDisplayName();
  }

  public getDiffLegendName(): string {
    return this.getLegendName();
  }
}
