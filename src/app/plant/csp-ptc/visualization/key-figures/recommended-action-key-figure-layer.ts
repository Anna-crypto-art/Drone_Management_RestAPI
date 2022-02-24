import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class RecommendedActionKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected getClassColor(classValue: number | undefined): string {
    if (classValue === 2) {
      return this.getColorWithAlpha(this.color!, 0.3);
    }

    return super.getClassColor(classValue);
  }
}
