import { ClassHceKeyFigureLayer } from "./abstract/class-hce-key-figure-layer";

export class RecommendedActionKeyFigureLayer extends ClassHceKeyFigureLayer {
  public getQueryClass(): number | undefined {
    return this.query?.recommended_action_class;
  }

  public getClassColor(classValue: number | undefined): string {
    if (classValue === 2) {
      return this.getColorWithAlpha(this.color!, 0.3);
    }

    return super.getClassColor(classValue);
  }
}
