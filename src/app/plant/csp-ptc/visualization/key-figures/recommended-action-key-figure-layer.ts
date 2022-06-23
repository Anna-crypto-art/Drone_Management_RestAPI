import { ClassHceKeyFigureLayer } from "./shared/class-hce-key-figure-layer";

export class RecommendedActionKeyFigureLayer extends ClassHceKeyFigureLayer {
  protected getQueryClass(): number | undefined {
    return this.query?.recommended_action_class;
  }

  protected getClassColor(classValue: number | undefined): string {
    if (classValue === 2) {
      return this.getColorWithAlpha(this.color!, 0.3);
    }

    return super.getClassColor(classValue);
  }
}
