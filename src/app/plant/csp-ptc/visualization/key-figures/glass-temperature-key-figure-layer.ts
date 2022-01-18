import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class GlassTemperatureKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected getClassColor(classValue: number | undefined): string {
    if (this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 4 && classValue === 3) {
      return this.getColorWithAlpha(this.color!, 0.7);
    }

    return super.getClassColor(classValue);
  }

  protected getLegendName(): string {
    if (this.keyFigureInfo.displayName === "glass-tube-temperature-class-3" && 
      this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 3) 
    {
      // If we have 3 temperature classifications the third class is "Severe heat loss"
      return "glass-tube-temperature-class-4";
    }

    return super.getLegendName();
  }
}