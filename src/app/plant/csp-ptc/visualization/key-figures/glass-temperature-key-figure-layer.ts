import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class GlassTemperatureKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected getClassColor(classValue: number | undefined): string {
    if (this.analysisResult.csp_ptc.glass_tube_temperature_class_count === 4 && classValue === 3) {
      return this.getColorWithAlpha(this.color!, 0.7);
    }

    return super.getClassColor(classValue);
  }
}